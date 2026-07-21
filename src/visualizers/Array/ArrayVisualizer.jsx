import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';

const ARRAY_NOTES = [
  { type: 'heading', text: 'What is an Array?' },
  { type: 'text', text: 'An array is a collection of elements stored in contiguous memory locations. Each element can be accessed directly using its index in O(1) time.' },
  { type: 'bullet', text: '<strong>Index starts at 0</strong> — the first element is at index 0' },
  { type: 'bullet', text: '<strong>Fixed size</strong> — in most languages, arrays have a fixed length' },
  { type: 'bullet', text: '<strong>Contiguous memory</strong> — elements are stored next to each other' },
  { type: 'heading', text: 'Common Operations' },
  { type: 'bullet', text: '<strong>Access:</strong> arr[i] → O(1) — instant by index' },
  { type: 'bullet', text: '<strong>Search (Linear):</strong> Check each element → O(n)' },
  { type: 'bullet', text: '<strong>Insert at end:</strong> O(1) amortized' },
  { type: 'bullet', text: '<strong>Delete at index:</strong> Shift elements left → O(n)' },
  { type: 'tip', text: 'Use arrays when you need fast random access by index and the size is known in advance.' },
  { type: 'complexity', items: [
    { label: 'Access', value: 'O(1)', color: 'text-green-500' },
    { label: 'Search', value: 'O(n)', color: 'text-yellow-500' },
    { label: 'Insert/Delete', value: 'O(n)', color: 'text-red-500' },
  ]},
];

const ARRAY_ALGORITHM = [
  { type: 'heading', text: 'Linear Search' },
  { num: 1, text: 'Start at index <strong>i = 0</strong>' },
  { num: 2, text: 'Compare <strong>arr[i]</strong> with the target value' },
  { num: 3, text: 'If <strong>arr[i] == target</strong> → return index i (found!)' },
  { num: 4, text: 'Otherwise increment i → move to next element' },
  { num: 5, text: 'If i reaches end without match → return -1 (not found)' },
  { type: 'heading', text: 'Two Pointer' },
  { num: 1, text: 'Sort the array first' },
  { num: 2, text: 'Place <strong>left pointer</strong> at index 0, <strong>right pointer</strong> at last index' },
  { num: 3, text: 'Compute <strong>sum = arr[left] + arr[right]</strong>' },
  { num: 4, text: 'If sum == target → pair found!' },
  { num: 5, text: 'If sum < target → move left pointer right (need larger values)' },
  { num: 6, text: 'If sum > target → move right pointer left (need smaller values)' },
  { num: 7, text: 'Repeat until left >= right' },
];

const ARRAY_CODE = `// Linear Search — O(n)
public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}

// Two Pointer — O(n log n) with sort, O(n) search
public int[] twoSum(int[] arr, int target) {
    Arrays.sort(arr);
    int left = 0, right = arr.length - 1;

    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            return new int[]{arr[left], arr[right]};
        } else if (sum < target) {
            left++;   // Need bigger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    return new int[]{};  // No pair found
}

// Insert at end (ArrayList)
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.add(99);  // O(1) amortized

// Delete at index
list.remove(2);  // O(n) — elements shift left`;

const INITIAL = [12, 35, 7, 48, 21, 56, 3];

export default function ArrayVisualizer() {
  const [arr, setArr] = useState(INITIAL);
  const [highlighted, setHighlighted] = useState([]);
  const [found, setFound] = useState(null);
  const [message, setMessage] = useState('Click an operation to animate it');
  const [inputVal, setInputVal] = useState('');
  const [inputIdx, setInputIdx] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const stopRef = useRef(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const reset = () => {
    setArr([...INITIAL]);
    setHighlighted([]);
    setFound(null);
    setMessage('Click an operation to animate it');
    stopRef.current = true;
    setIsRunning(false);
  };

  // LINEAR SEARCH
  const linearSearch = async () => {
    const target = parseInt(inputVal);
    if (isNaN(target)) return setMessage('Enter a number to search');
    setIsRunning(true);
    stopRef.current = false;
    setFound(null);
    setMessage(`Searching for ${target}...`);
    for (let i = 0; i < arr.length; i++) {
      if (stopRef.current) return;
      setHighlighted([i]);
      setMessage(`Checking index ${i}: arr[${i}] = ${arr[i]}`);
      await delay(700);
      if (arr[i] === target) {
        setFound(i);
        setMessage(`✅ Found ${target} at index ${i}!`);
        setHighlighted([]);
        setIsRunning(false);
        return;
      }
    }
    setMessage(`❌ ${target} not found in array`);
    setHighlighted([]);
    setIsRunning(false);
  };

  // INSERT AT END
  const insertEnd = async () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return setMessage('Enter a number to insert');
    setIsRunning(true);
    stopRef.current = false;
    setMessage(`Inserting ${val} at end...`);
    const newArr = [...arr, val];
    setArr(newArr);
    setHighlighted([newArr.length - 1]);
    setMessage(`✅ Inserted ${val} at index ${newArr.length - 1}`);
    await delay(800);
    setHighlighted([]);
    setIsRunning(false);
  };

  // DELETE AT INDEX
  const deleteAtIndex = async () => {
    const idx = parseInt(inputIdx);
    if (isNaN(idx) || idx < 0 || idx >= arr.length)
      return setMessage(`Enter a valid index (0–${arr.length - 1})`);
    setIsRunning(true);
    stopRef.current = false;
    setHighlighted([idx]);
    setMessage(`Deleting arr[${idx}] = ${arr[idx]}...`);
    await delay(700);
    const newArr = arr.filter((_, i) => i !== idx);
    setArr(newArr);
    setHighlighted([]);
    setMessage(`✅ Deleted element at index ${idx}. Remaining elements shifted left.`);
    setIsRunning(false);
  };

  // TWO POINTER DEMO (sum pair)
  const twoPointer = async () => {
    const sorted = [...arr].sort((a, b) => a - b);
    const target = parseInt(inputVal);
    if (isNaN(target)) return setMessage('Enter a target sum for Two Pointer');
    setArr(sorted);
    setIsRunning(true);
    stopRef.current = false;
    let l = 0, r = sorted.length - 1;
    while (l < r) {
      if (stopRef.current) return;
      setHighlighted([l, r]);
      const sum = sorted[l] + sorted[r];
      setMessage(`left=${sorted[l]} + right=${sorted[r]} = ${sum}  (target: ${target})`);
      await delay(900);
      if (sum === target) {
        setFound(l);
        setMessage(`✅ Pair found: arr[${l}]=${sorted[l]} + arr[${r}]=${sorted[r]} = ${target}`);
        setHighlighted([l, r]);
        setIsRunning(false);
        return;
      } else if (sum < target) l++;
      else r--;
    }
    setMessage(`❌ No pair found with sum = ${target}`);
    setHighlighted([]);
    setIsRunning(false);
  };

  const getBoxColor = (i) => {
    if (found === i) return 'bg-green-500 text-white scale-110 shadow-lg shadow-green-300';
    if (highlighted.includes(i)) return 'bg-yellow-400 text-gray-900 scale-105 shadow-md shadow-yellow-200';
    return 'bg-indigo-600 text-white';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-1">Array Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Step-by-step animation of common array operations</p>

      {/* Array display */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold text-lg transition-all duration-300 ${getBoxColor(i)}`}>
              {val}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">[{i}]</span>
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 mb-6 text-center text-indigo-800 dark:text-indigo-300 font-medium text-sm min-h-10">
        {message}
      </div>

      {/* Inputs */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <input
          type="number"
          placeholder="Value"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Index"
          value={inputIdx}
          onChange={(e) => setInputIdx(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={linearSearch} disabled={isRunning}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">
          🔍 Linear Search
        </button>
        <button onClick={twoPointer} disabled={isRunning}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40">
          👈👉 Two Pointer
        </button>
        <button onClick={insertEnd} disabled={isRunning}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40">
          ➕ Insert at End
        </button>
        <button onClick={deleteAtIndex} disabled={isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-40">
          🗑️ Delete at Index
        </button>
        <button onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
          ↺ Reset
        </button>
      </div>

      {/* Concept box replaced by InfoPanel */}
      <InfoPanel notes={ARRAY_NOTES} algorithm={ARRAY_ALGORITHM} code={ARRAY_CODE} />
    </div>
  );
}
