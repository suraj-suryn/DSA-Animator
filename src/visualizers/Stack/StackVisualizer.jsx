import { useState, useRef } from 'react';

const MAX = 8;

export default function StackVisualizer() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [inputVal, setInputVal] = useState('');
  const [message, setMessage] = useState('A stack is LIFO — Last In, First Out');
  const [highlighted, setHighlighted] = useState(null); // index
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const stopRef = useRef(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const reset = () => {
    setStack([10, 20, 30]);
    setHighlighted(null);
    setMessage('A stack is LIFO — Last In, First Out');
    stopRef.current = true;
    setIsRunning(false);
  };

  // PUSH
  const push = async () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return setMessage('Enter a number to push');
    if (stack.length >= MAX) return setMessage(`❌ Stack Overflow! Max size is ${MAX}`);
    setIsRunning(true);
    stopRef.current = false;
    setMessage(`Pushing ${val} onto the top of the stack...`);
    await delay(speed);
    const newStack = [...stack, val];
    setStack(newStack);
    setHighlighted(newStack.length - 1);
    setMessage(`✅ Pushed ${val} — it's now on top (index ${newStack.length - 1})`);
    await delay(speed);
    setHighlighted(null);
    setIsRunning(false);
    setInputVal('');
  };

  // POP
  const pop = async () => {
    if (stack.length === 0) return setMessage('❌ Stack Underflow! Stack is empty');
    setIsRunning(true);
    stopRef.current = false;
    const top = stack[stack.length - 1];
    setHighlighted(stack.length - 1);
    setMessage(`Popping top element: ${top}...`);
    await delay(speed);
    setStack(stack.slice(0, -1));
    setHighlighted(null);
    setMessage(`✅ Popped ${top} from stack`);
    setIsRunning(false);
  };

  // PEEK
  const peek = async () => {
    if (stack.length === 0) return setMessage('❌ Stack is empty — nothing to peek');
    setIsRunning(true);
    stopRef.current = false;
    const top = stack[stack.length - 1];
    setHighlighted(stack.length - 1);
    setMessage(`👀 Peek: Top element is ${top} (not removed)`);
    await delay(speed * 2);
    setHighlighted(null);
    setIsRunning(false);
  };

  // DEMO — push then pop sequence
  const demo = async () => {
    setIsRunning(true);
    stopRef.current = false;
    const vals = [55, 66, 77];
    for (const v of vals) {
      if (stopRef.current) return;
      if (stack.length >= MAX) break;
      setMessage(`Pushing ${v}...`);
      setStack((s) => { const ns = [...s, v]; return ns; });
      setHighlighted(stack.length);
      await delay(speed);
    }
    await delay(speed);
    setMessage('Now popping all pushed elements...');
    await delay(speed);
    for (let i = 0; i < vals.length; i++) {
      if (stopRef.current) return;
      setStack((s) => { setHighlighted(s.length - 1); return s.slice(0, -1); });
      await delay(speed);
    }
    setHighlighted(null);
    setMessage('✅ Demo complete! Stack is back to original');
    setIsRunning(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">Stack Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">LIFO — Last In, First Out · Like a stack of plates</p>

      {/* Stack visual — plates stacked bottom to top */}
      <div className="flex flex-col-reverse items-center gap-1.5 min-h-64 justify-end mb-2 py-4 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-700">
        {stack.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-600 text-sm italic mb-4">Stack is empty</p>
        ) : (
          stack.map((val, i) => (
            <div key={i} className="relative flex items-center">
              {/* TOP label */}
              {i === stack.length - 1 && (
                <span className="absolute -right-14 text-xs font-bold text-pink-500 dark:text-pink-400 animate-bounce">
                  ← TOP
                </span>
              )}
              <div
                className={`w-48 h-11 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-all duration-300 ${
                  highlighted === i
                    ? 'bg-yellow-400 border-yellow-500 text-gray-900 scale-110 shadow-lg'
                    : 'bg-pink-500 dark:bg-pink-700 border-pink-600 dark:border-pink-800 text-white'
                }`}
              >
                {val}
                <span className="ml-3 text-xs opacity-60 font-normal">[{i}]</span>
              </div>
            </div>
          ))
        )}
        {/* Base plate */}
        <div className="w-56 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2" />
      </div>

      <div className="text-center text-xs text-gray-400 dark:text-gray-500 mb-4">
        Size: {stack.length} / {MAX}  |  {stack.length === 0 ? 'Empty' : `Top = ${stack[stack.length - 1]}`}
      </div>

      {/* Message */}
      <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-lg p-3 mb-5 text-center text-pink-800 dark:text-pink-300 font-medium text-sm min-h-10">
        {message}
      </div>

      {/* Speed slider */}
      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span>
        <input type="range" min="200" max="1200" step="100" value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 accent-pink-500" />
        <span>🐇</span>
        <span className="text-xs w-16">{speed}ms</span>
      </div>

      {/* Input + buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input type="number" placeholder="Value" value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && push()}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button onClick={push} disabled={isRunning}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 disabled:opacity-40">
          ⬆ Push
        </button>
        <button onClick={pop} disabled={isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-40">
          ⬇ Pop
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
          <li><strong>Push:</strong> Add element to top — O(1)</li>
          <li><strong>Pop:</strong> Remove element from top — O(1)</li>
          <li><strong>Peek:</strong> View top element without removing — O(1)</li>
          <li><strong>Stack Overflow:</strong> Push to a full stack</li>
          <li><strong>Use cases:</strong> Undo/redo, function call stack, browser back button</li>
        </ul>
      </div>
    </div>
  );
}
