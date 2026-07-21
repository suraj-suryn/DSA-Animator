import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';

const BS_NOTES = [
  { type: 'heading', text: 'What is Binary Search?' },
  { type: 'text', text: 'Binary Search works on SORTED arrays. Instead of checking every element, it eliminates half the search space with each comparison.' },
  { type: 'bullet', text: '<strong>Requirement:</strong> Array must be sorted' },
  { type: 'bullet', text: '<strong>Strategy:</strong> Compare target with middle → discard half → repeat' },
  { type: 'bullet', text: '<strong>Why O(log n)?</strong> Each step halves the problem: n → n/2 → n/4 → 1' },
  { type: 'heading', text: 'Binary vs Linear Search' },
  { type: 'bullet', text: '<strong>Linear Search:</strong> O(n) — checks every element, works on unsorted' },
  { type: 'bullet', text: '<strong>Binary Search:</strong> O(log n) — needs sorted array, exponentially faster' },
  { type: 'tip', text: 'log₂(1,000,000) ≈ 20. Binary search finds any element in 1 million items in just 20 comparisons!' },
  { type: 'complexity', items: [
    { label: 'Best', value: 'O(1)', color: 'text-green-500' },
    { label: 'Average/Worst', value: 'O(log n)', color: 'text-green-500' },
    { label: 'Space', value: 'O(1)', color: 'text-green-500' },
  ]},
];

const BS_ALGORITHM = [
  { type: 'heading', text: 'Iterative Binary Search' },
  { num: 1, text: 'Set <strong>left = 0</strong>, <strong>right = n - 1</strong>' },
  { num: 2, text: 'While <strong>left ≤ right</strong>: compute <strong>mid = (left + right) / 2</strong>' },
  { num: 3, text: 'If <strong>arr[mid] == target</strong> → return mid ✅' },
  { num: 4, text: 'If <strong>arr[mid] < target</strong> → search right: <strong>left = mid + 1</strong>' },
  { num: 5, text: 'If <strong>arr[mid] > target</strong> → search left: <strong>right = mid - 1</strong>' },
  { num: 6, text: 'Loop ends → return -1 (not found)' },
  { type: 'heading', text: 'Common Variations' },
  { num: 1, text: '<strong>First/last occurrence</strong> — continue searching after finding match' },
  { num: 2, text: '<strong>Rotated array search</strong> — determine which half is sorted first' },
  { num: 3, text: '<strong>Find insert position</strong> — return left when loop ends (LeetCode 35)' },
];

const BS_CODE = `// Iterative Binary Search — O(log n)
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
        // Use this form to avoid integer overflow
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;         // Found!
        } else if (arr[mid] < target) {
            left = mid + 1;     // Search right half
        } else {
            right = mid - 1;    // Search left half
        }
    }
    return -1;  // Not found
}

// Recursive Binary Search — O(log n) time, O(log n) space
public int binarySearchRec(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearchRec(arr, target, mid + 1, right);
    return binarySearchRec(arr, target, left, mid - 1);
}

// Java built-in
int[] sorted = {3, 7, 12, 19, 25, 33};
int idx = Arrays.binarySearch(sorted, 19);  // returns 3`;

const INITIAL = [3, 7, 12, 19, 25, 33, 44, 56, 68, 75];

export default function BinarySearchVisualizer() {
  const [arr] = useState(INITIAL);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [mid, setMid] = useState(null);
  const [found, setFound] = useState(null);
  const [eliminated, setEliminated] = useState([]);
  const [message, setMessage] = useState('Enter a number to search (array is sorted)');
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [steps, setSteps] = useState([]);
  const stopRef = useRef(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const reset = () => {
    setLeft(null); setRight(null); setMid(null);
    setFound(null); setEliminated([]);
    setMessage('Enter a number to search (array is sorted)');
    setSteps([]);
    stopRef.current = true;
    setIsRunning(false);
  };

  const search = async () => {
    const target = parseInt(inputVal);
    if (isNaN(target)) return setMessage('Enter a valid number');
    setIsRunning(true);
    stopRef.current = false;
    setFound(null); setEliminated([]);
    setSteps([]);
    let l = 0, r = arr.length - 1;
    const stepLog = [];

    setMessage(`Searching for ${target} in sorted array...`);
    await delay(speed);

    while (l <= r) {
      if (stopRef.current) return;
      const m = Math.floor((l + r) / 2);
      setLeft(l); setRight(r); setMid(m);
      const logEntry = `Step: left=${l}, right=${r}, mid=${m} → arr[${m}]=${arr[m]}`;
      stepLog.push(logEntry);
      setSteps([...stepLog]);

      if (arr[m] === target) {
        setMessage(`✅ Found ${target} at index ${m}! Took ${stepLog.length} step(s)`);
        setFound(m);
        setLeft(null); setRight(null); setMid(null);
        setIsRunning(false);
        return;
      } else if (arr[m] < target) {
        setMessage(`arr[${m}]=${arr[m]} < ${target} → search RIGHT half`);
        await delay(speed);
        setEliminated((e) => [...e, ...Array.from({ length: m - l + 1 }, (_, i) => l + i)]);
        l = m + 1;
      } else {
        setMessage(`arr[${m}]=${arr[m]} > ${target} → search LEFT half`);
        await delay(speed);
        setEliminated((e) => [...e, ...Array.from({ length: r - m + 1 }, (_, i) => m + i)]);
        r = m - 1;
      }
      await delay(speed);
    }

    setMessage(`❌ ${target} not found. Binary search complete in ${stepLog.length} step(s)`);
    setLeft(null); setRight(null); setMid(null);
    setIsRunning(false);
  };

  const getBoxStyle = (i) => {
    if (found === i) return 'bg-green-500 text-white scale-110 shadow-lg border-green-600';
    if (mid === i) return 'bg-yellow-400 text-gray-900 scale-105 shadow-md border-yellow-500';
    if (eliminated.includes(i)) return 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-300 dark:border-gray-700 opacity-40';
    if (left !== null && right !== null && i >= left && i <= right)
      return 'bg-blue-500 text-white border-blue-600';
    return 'bg-indigo-500 text-white border-indigo-600';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">Binary Search Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Requires a sorted array · Eliminates half the search space each step — O(log n)
      </p>

      {/* Array */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-400 ${getBoxStyle(i)}`}>
              {val}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">[{i}]</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center text-xs mb-5 flex-wrap">
        {[
          { color: 'bg-indigo-500', label: 'Unsearched' },
          { color: 'bg-blue-500', label: 'Active range' },
          { color: 'bg-yellow-400', label: 'Mid (checking)' },
          { color: 'bg-green-500', label: 'Found!' },
          { color: 'bg-gray-300 dark:bg-gray-700 opacity-50', label: 'Eliminated' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded ${color}`} />
            <span className="text-gray-600 dark:text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-5 text-center text-blue-800 dark:text-blue-300 font-medium text-sm min-h-10">
        {message}
      </div>

      {/* Speed slider */}
      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span>
        <input type="range" min="200" max="1500" step="100" value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 accent-blue-500" />
        <span>🐇</span>
        <span className="text-xs w-16">{speed}ms/step</span>
      </div>

      {/* Input + buttons */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <input type="number" placeholder="Search value" value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={search} disabled={isRunning}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-40">
          🔍 Search
        </button>
        <button onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
          ↺ Reset
        </button>
      </div>

      {/* Step log */}
      {steps.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 mb-5 text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
          <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">Step Log</p>
          {steps.map((s, i) => <div key={i}>Step {i + 1}: {s.replace('Step: ', '')}</div>)}
        </div>
      )}

      <InfoPanel notes={BS_NOTES} algorithm={BS_ALGORITHM} code={BS_CODE} />
    </div>
  );
}
