import { useState, useRef } from 'react';

const INITIAL = [64, 34, 25, 12, 22, 11, 90];

export default function SortingVisualizer() {
  const [arr, setArr] = useState([...INITIAL]);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [message, setMessage] = useState('Choose a sorting algorithm to animate');
  const [isRunning, setIsRunning] = useState(false);
  const [algo, setAlgo] = useState('bubble');
  const stopRef = useRef(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const reset = () => {
    setArr([...INITIAL]);
    setComparing([]);
    setSorted([]);
    setMessage('Choose a sorting algorithm to animate');
    stopRef.current = true;
    setIsRunning(false);
  };

  // BUBBLE SORT
  const bubbleSort = async () => {
    setIsRunning(true);
    stopRef.current = false;
    const a = [...arr];
    const n = a.length;
    const sortedIdx = new Set();

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;
        setComparing([j, j + 1]);
        setMessage(`Comparing ${a[j]} and ${a[j + 1]}`);
        await delay(500);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          setArr([...a]);
          setMessage(`Swapped → ${a[j]} and ${a[j + 1]}`);
          await delay(400);
        }
      }
      sortedIdx.add(n - 1 - i);
      setSorted([...sortedIdx]);
    }
    sortedIdx.add(0);
    setSorted([...sortedIdx]);
    setComparing([]);
    setMessage('✅ Array sorted using Bubble Sort!');
    setIsRunning(false);
  };

  // SELECTION SORT
  const selectionSort = async () => {
    setIsRunning(true);
    stopRef.current = false;
    const a = [...arr];
    const n = a.length;
    const sortedIdx = new Set();

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (stopRef.current) return;
        setComparing([minIdx, j]);
        setMessage(`Finding minimum... checking ${a[j]} vs current min ${a[minIdx]}`);
        await delay(500);
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        setArr([...a]);
        setMessage(`Placed minimum (${a[i]}) at index ${i}`);
        await delay(400);
      }
      sortedIdx.add(i);
      setSorted([...sortedIdx]);
    }
    sortedIdx.add(n - 1);
    setSorted([...sortedIdx]);
    setComparing([]);
    setMessage('✅ Array sorted using Selection Sort!');
    setIsRunning(false);
  };

  // INSERTION SORT
  const insertionSort = async () => {
    setIsRunning(true);
    stopRef.current = false;
    const a = [...arr];
    const n = a.length;

    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;
      setMessage(`Inserting ${key} into sorted portion...`);
      while (j >= 0 && a[j] > key) {
        if (stopRef.current) return;
        setComparing([j, j + 1]);
        a[j + 1] = a[j];
        setArr([...a]);
        setMessage(`Shifting ${a[j + 1]} right`);
        await delay(500);
        j--;
      }
      a[j + 1] = key;
      setArr([...a]);
      setMessage(`✅ Placed ${key} at index ${j + 1}`);
      await delay(400);
    }
    setSorted([...Array(n).keys()]);
    setComparing([]);
    setMessage('✅ Array sorted using Insertion Sort!');
    setIsRunning(false);
  };

  const runSort = () => {
    if (algo === 'bubble') bubbleSort();
    else if (algo === 'selection') selectionSort();
    else insertionSort();
  };

  const maxVal = Math.max(...arr);

  const getBarColor = (i) => {
    if (sorted.includes(i)) return 'bg-green-500';
    if (comparing.includes(i)) return 'bg-yellow-400';
    return 'bg-indigo-500';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-1">Sorting Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Watch sorting algorithms work step by step</p>

      {/* Bar chart */}
      <div className="flex items-end gap-2 justify-center h-48 mb-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{val}</span>
            <div
              className={`w-10 rounded-t-md transition-all duration-300 ${getBarColor(i)}`}
              style={{ height: `${(val / maxVal) * 130}px` }}
            />
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 mb-6 text-center text-indigo-800 dark:text-indigo-300 font-medium text-sm min-h-10">
        {message}
      </div>

      {/* Algorithm selector */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {['bubble', 'selection', 'insertion'].map((a) => (
          <button
            key={a}
            onClick={() => setAlgo(a)}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              algo === a
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            } disabled:opacity-40`}
          >
            {a.charAt(0).toUpperCase() + a.slice(1)} Sort
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={runSort} disabled={isRunning}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-40">
          ▶ Sort Now
        </button>
        <button onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
          ↺ Reset
        </button>
      </div>

      {/* Complexity table */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 text-sm">
        <p className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Time Complexity</p>
        <table className="w-full text-center text-xs">
          <thead>
            <tr className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
              <th className="p-2 rounded-tl">Algorithm</th>
              <th className="p-2">Best</th>
              <th className="p-2">Average</th>
              <th className="p-2 rounded-tr">Worst</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[
              ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)'],
              ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)'],
              ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)'],
            ].map(([name, b, avg, w]) => (
              <tr key={name} className="bg-white dark:bg-gray-800">
                <td className="p-2 font-medium text-left">{name}</td>
                <td className="p-2 text-green-600">{b}</td>
                <td className="p-2 text-yellow-600">{avg}</td>
                <td className="p-2 text-red-500">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
