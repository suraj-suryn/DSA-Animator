import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const HEAP_NOTES = [
  { type: 'heading', text: 'What is a Heap?' },
  { type: 'text', text: 'A heap is a complete binary tree stored as an array. In a Min-Heap, every parent is smaller than its children. In a Max-Heap, every parent is larger.' },
  { type: 'bullet', text: '<strong>Min-Heap:</strong> Root is always the MINIMUM element' },
  { type: 'bullet', text: '<strong>Max-Heap:</strong> Root is always the MAXIMUM element' },
  { type: 'bullet', text: '<strong>Array storage:</strong> Parent of i is at (i-1)/2; children at 2i+1 and 2i+2' },
  { type: 'heading', text: 'Operations' },
  { type: 'bullet', text: '<strong>Insert:</strong> Add at end, bubble UP to restore heap property — O(log n)' },
  { type: 'bullet', text: '<strong>Extract Min/Max:</strong> Remove root, move last to root, bubble DOWN — O(log n)' },
  { type: 'bullet', text: '<strong>Peek:</strong> View min/max without removing — O(1)' },
  { type: 'tip', text: 'Use PriorityQueue in Java — it implements a Min-Heap internally. Top K problems always use heaps!' },
  { type: 'complexity', items: [
    { label: 'Insert', value: 'O(log n)', color: 'text-green-500' },
    { label: 'Extract', value: 'O(log n)', color: 'text-green-500' },
    { label: 'Peek Min', value: 'O(1)', color: 'text-green-500' },
  ]},
];
const HEAP_ALGORITHM = [
  { type: 'heading', text: 'Insert (Bubble Up)' },
  { num: 1, text: 'Add new element at the <strong>end</strong> of the array' },
  { num: 2, text: 'Compare with parent: if smaller (min-heap) → <strong>swap</strong>' },
  { num: 3, text: 'Repeat until parent is smaller or reach root' },
  { type: 'heading', text: 'Extract Min (Bubble Down)' },
  { num: 1, text: 'Save the root value (minimum)' },
  { num: 2, text: 'Move the <strong>last element to root</strong>' },
  { num: 3, text: 'Compare with children: if larger → <strong>swap with smaller child</strong>' },
  { num: 4, text: 'Repeat until heap property is restored' },
];
const HEAP_CODE = `// Min-Heap using PriorityQueue in Java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

minHeap.offer(5);   // Insert — O(log n)
minHeap.offer(2);
minHeap.offer(8);
minHeap.offer(1);

int min = minHeap.peek();    // 1 — view min, O(1)
int removed = minHeap.poll(); // 1 — extract min, O(log n)

// Max-Heap
PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Collections.reverseOrder());
maxHeap.offer(5);
int max = maxHeap.peek(); // 5

// Classic: K Largest Elements
public int[] kLargest(int[] nums, int k) {
    PriorityQueue<Integer> minH = new PriorityQueue<>();
    for (int n : nums) {
        minH.offer(n);
        if (minH.size() > k) minH.poll(); // remove smallest
    }
    return minH.stream().mapToInt(i -> i).toArray();
}

// Manual Min-Heap
class MinHeap {
    int[] arr; int size;
    void insert(int val) {
        arr[size++] = val;
        int i = size - 1;
        while (i > 0 && arr[(i-1)/2] > arr[i]) {
            swap(i, (i-1)/2); i = (i-1)/2;
        }
    }
}`;

export default function HeapVisualizer() {
  const [heap, setHeap] = useState([1, 3, 2, 7, 6, 8, 5]);
  const [highlighted, setHighlighted] = useState([]);
  const [message, setMessage] = useState('A Min-Heap — parent is always ≤ children');
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setHeap([1, 3, 2, 7, 6, 8, 5]); setHighlighted([]); setMessage('A Min-Heap — parent is always ≤ children'); stopRef.current = true; setIsRunning(false); };

  const insert = async () => {
    const v = parseInt(inputVal); if (isNaN(v)) return setMessage('Enter a number');
    setIsRunning(true); stopRef.current = false;
    let arr = [...heap, v];
    setHeap([...arr]);
    let i = arr.length - 1;
    setHighlighted([i]);
    setMessage(`Inserted ${v} at index ${i}. Bubbling UP...`);
    await delay(speed);
    while (i > 0) {
      if (stopRef.current) return;
      const parent = Math.floor((i - 1) / 2);
      if (arr[parent] <= arr[i]) break;
      setHighlighted([i, parent]);
      setMessage(`arr[${i}]=${arr[i]} < parent arr[${parent}]=${arr[parent]} → Swap!`);
      await delay(speed);
      [arr[i], arr[parent]] = [arr[parent], arr[i]];
      setHeap([...arr]);
      i = parent;
    }
    setHighlighted([i]);
    setMessage(`✅ ${v} inserted! Min = ${arr[0]}`);
    await delay(speed); setHighlighted([]); setIsRunning(false); setInputVal('');
  };

  const extractMin = async () => {
    if (!heap.length) return setMessage('Heap is empty');
    setIsRunning(true); stopRef.current = false;
    const min = heap[0];
    setHighlighted([0]);
    setMessage(`Extracting min = ${min}. Moving last element to root...`);
    await delay(speed);
    let arr = [...heap];
    arr[0] = arr[arr.length - 1];
    arr.pop();
    setHeap([...arr]);
    let i = 0;
    setMessage(`Bubbling DOWN to restore heap...`);
    await delay(speed);
    while (true) {
      if (stopRef.current) return;
      const l = 2 * i + 1, r = 2 * i + 2;
      let smallest = i;
      if (l < arr.length && arr[l] < arr[smallest]) smallest = l;
      if (r < arr.length && arr[r] < arr[smallest]) smallest = r;
      if (smallest === i) break;
      setHighlighted([i, smallest]);
      setMessage(`arr[${i}]=${arr[i]} > child arr[${smallest}]=${arr[smallest]} → Swap!`);
      await delay(speed);
      [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
      setHeap([...arr]);
      i = smallest;
    }
    setHighlighted([]);
    setMessage(`✅ Extracted min = ${min}. New min = ${arr[0] ?? 'empty'}`);
    setIsRunning(false);
  };

  // Tree positions for up to 15 nodes
  const getPos = (i) => {
    const level = Math.floor(Math.log2(i + 1));
    const levelStart = Math.pow(2, level) - 1;
    const posInLevel = i - levelStart;
    const totalInLevel = Math.pow(2, level);
    const x = ((posInLevel + 0.5) / totalInLevel) * 90 + 5;
    const y = level * 20 + 8;
    return { x, y };
  };

  const edges = heap.map((_, i) => i > 0 ? [Math.floor((i - 1) / 2), i] : null).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-1">Heap Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Min-Heap — root is always the minimum · Watch bubble up/down animations</p>

      {/* Tree + Array view */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 mb-4">
        <svg viewBox="0 0 100 75" className="w-full" style={{ maxHeight: '200px' }}>
          {edges.map(([a, b], i) => (
            <line key={i} x1={getPos(a).x} y1={getPos(a).y} x2={getPos(b).x} y2={getPos(b).y}
              stroke="#94A3B8" strokeWidth="0.7" />
          ))}
          {heap.map((val, i) => {
            const { x, y } = getPos(i);
            const isHighlighted = highlighted.includes(i);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="6.5" fill={isHighlighted ? '#FBBF24' : i === 0 ? '#EF4444' : '#F43F5E'}
                  stroke="white" strokeWidth="0.5" className="transition-all duration-300" />
                <text x={x} y={y + 1.5} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="4" fontWeight="bold">{val}</text>
              </g>
            );
          })}
        </svg>
        {/* Array view */}
        <div className="mt-3">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-semibold">Array representation:</p>
          <div className="flex gap-1 flex-wrap">
            {heap.map((v, i) => (
              <div key={i} className={`flex flex-col items-center transition-all duration-300`}>
                <div className={`w-9 h-9 flex items-center justify-center rounded font-bold text-sm ${highlighted.includes(i) ? 'bg-yellow-400 text-gray-900' : i === 0 ? 'bg-red-500 text-white' : 'bg-rose-500 text-white'}`}>{v}</div>
                <span className="text-xs text-gray-400">[{i}]</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-lg p-3 mb-5 text-center text-rose-800 dark:text-rose-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span><input type="range" min="200" max="1200" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-rose-500" /><span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input type="number" placeholder="Value" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && insert()}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-rose-400" />
        <button onClick={insert} disabled={isRunning} className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 disabled:opacity-40">+ Insert</button>
        <button onClick={extractMin} disabled={isRunning} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-40">⬆ Extract Min</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={HEAP_NOTES} algorithm={HEAP_ALGORITHM} code={HEAP_CODE} />
      <CompletionButton topicId="heap" />
    </div>
  );
}
