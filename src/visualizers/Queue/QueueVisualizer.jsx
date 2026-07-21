import { useState, useRef } from 'react';

const MAX = 7;

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [inputVal, setInputVal] = useState('');
  const [message, setMessage] = useState('A queue is FIFO — First In, First Out');
  const [highlightFront, setHighlightFront] = useState(false);
  const [highlightBack, setHighlightBack] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const stopRef = useRef(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const reset = () => {
    setQueue([10, 20, 30]);
    setHighlightFront(false); setHighlightBack(false);
    setMessage('A queue is FIFO — First In, First Out');
    stopRef.current = true;
    setIsRunning(false);
  };

  // ENQUEUE — add to back
  const enqueue = async () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return setMessage('Enter a number to enqueue');
    if (queue.length >= MAX) return setMessage(`❌ Queue Full! Max size is ${MAX}`);
    setIsRunning(true);
    stopRef.current = false;
    setHighlightBack(true);
    setMessage(`Enqueuing ${val} at the BACK of the queue...`);
    await delay(speed);
    setQueue((q) => [...q, val]);
    setMessage(`✅ ${val} added to back. Front=${queue[0]}, Back=${val}`);
    await delay(speed);
    setHighlightBack(false);
    setIsRunning(false);
    setInputVal('');
  };

  // DEQUEUE — remove from front
  const dequeue = async () => {
    if (queue.length === 0) return setMessage('❌ Queue is empty — nothing to dequeue');
    setIsRunning(true);
    stopRef.current = false;
    const front = queue[0];
    setHighlightFront(true);
    setMessage(`Dequeuing ${front} from the FRONT of the queue...`);
    await delay(speed);
    setQueue((q) => q.slice(1));
    setHighlightFront(false);
    setMessage(`✅ Dequeued ${front} from front`);
    setIsRunning(false);
  };

  // PEEK front
  const peek = async () => {
    if (queue.length === 0) return setMessage('❌ Queue is empty');
    setIsRunning(true);
    stopRef.current = false;
    setHighlightFront(true);
    setMessage(`👀 Front element is ${queue[0]} (not removed)`);
    await delay(speed * 2);
    setHighlightFront(false);
    setIsRunning(false);
  };

  // DEMO
  const demo = async () => {
    setIsRunning(true);
    stopRef.current = false;
    const vals = [40, 50, 60];
    for (const v of vals) {
      if (stopRef.current) return;
      if (queue.length >= MAX) break;
      setMessage(`Enqueuing ${v}...`);
      setHighlightBack(true);
      setQueue((q) => [...q, v]);
      await delay(speed);
      setHighlightBack(false);
      await delay(speed / 2);
    }
    setMessage('Now dequeuing elements from front...');
    await delay(speed);
    for (let i = 0; i < vals.length; i++) {
      if (stopRef.current) return;
      setHighlightFront(true);
      await delay(speed);
      setQueue((q) => q.slice(1));
      setHighlightFront(false);
      await delay(speed / 2);
    }
    setMessage('✅ Demo complete — queue is back to original');
    setIsRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">Queue Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">FIFO — First In, First Out · Like a ticket line</p>

      {/* Queue horizontal display */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6 mb-4">
        {/* Arrows + labels */}
        <div className="flex items-center justify-between mb-2 px-2 text-xs font-bold text-gray-500 dark:text-gray-400">
          <span className="text-green-600 dark:text-green-400">⬇ DEQUEUE (front)</span>
          <span className="text-orange-500 dark:text-orange-400">ENQUEUE (back) ⬇</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {queue.length === 0 ? (
            <div className="w-full text-center text-gray-400 dark:text-gray-600 italic text-sm py-4">Queue is empty</div>
          ) : (
            queue.map((val, i) => (
              <div key={i} className="flex flex-col items-center shrink-0">
                <div className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-all duration-300 ${
                  i === 0 && highlightFront
                    ? 'bg-green-400 border-green-500 text-gray-900 scale-110 shadow-lg'
                    : i === queue.length - 1 && highlightBack
                    ? 'bg-yellow-400 border-yellow-500 text-gray-900 scale-110 shadow-lg'
                    : 'bg-orange-500 dark:bg-orange-700 border-orange-600 text-white'
                }`}>
                  {val}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {i === 0 ? 'FRONT' : i === queue.length - 1 ? 'BACK' : `[${i}]`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 dark:text-gray-500 mb-4">
        Size: {queue.length} / {MAX}
        {queue.length > 0 && `  |  Front = ${queue[0]}  |  Back = ${queue[queue.length - 1]}`}
      </div>

      {/* Message */}
      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-5 text-center text-orange-800 dark:text-orange-300 font-medium text-sm min-h-10">
        {message}
      </div>

      {/* Speed */}
      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span>
        <input type="range" min="200" max="1200" step="100" value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 accent-orange-500" />
        <span>🐇</span>
        <span className="text-xs w-16">{speed}ms</span>
      </div>

      {/* Input + buttons */}
      <div className="flex gap-3 flex-wrap">
        <input type="number" placeholder="Value" value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enqueue()}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button onClick={enqueue} disabled={isRunning}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-40">
          ➡ Enqueue
        </button>
        <button onClick={dequeue} disabled={isRunning}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40">
          ⬅ Dequeue
        </button>
        <button onClick={peek} disabled={isRunning}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 disabled:opacity-40">
          👀 Peek
        </button>
        <button onClick={demo} disabled={isRunning}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 disabled:opacity-40">
          ▶ Demo
        </button>
        <button onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
          ↺ Reset
        </button>
      </div>

      {/* Concept box */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Concepts</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Enqueue:</strong> Add to back — O(1)</li>
          <li><strong>Dequeue:</strong> Remove from front — O(1)</li>
          <li><strong>Peek:</strong> View front element — O(1)</li>
          <li><strong>Use cases:</strong> Print queue, CPU scheduling, BFS graph traversal</li>
          <li><strong>vs Stack:</strong> Stack = LIFO (last plate), Queue = FIFO (ticket line)</li>
        </ul>
      </div>
    </div>
  );
}
