import { useState, useRef } from 'react';

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

      {/* Concept box */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Concepts</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Linear Search:</strong> Check each element one by one — O(n)</li>
          <li><strong>Two Pointer:</strong> Use two indices moving toward each other — O(n) after sort</li>
          <li><strong>Insert at end:</strong> Direct access — O(1)</li>
          <li><strong>Delete at index:</strong> Elements shift — O(n)</li>
        </ul>
      </div>
    </div>
  );
}
