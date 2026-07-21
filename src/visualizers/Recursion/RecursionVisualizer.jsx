import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const REC_NOTES = [
  { type: 'heading', text: 'What is Recursion?' },
  { type: 'text', text: 'Recursion is when a function calls itself to solve a smaller version of the same problem. It consists of two parts: a base case (stopping condition) and a recursive case.' },
  { type: 'bullet', text: '<strong>Base case:</strong> When to STOP — prevents infinite loop' },
  { type: 'bullet', text: '<strong>Recursive case:</strong> Call self with smaller input' },
  { type: 'bullet', text: '<strong>Call stack:</strong> Each call adds a frame — popped when it returns' },
  { type: 'heading', text: 'How the Call Stack Works' },
  { type: 'bullet', text: 'Each recursive call PUSHES a frame onto the call stack' },
  { type: 'bullet', text: 'When base case is reached, frames are POPPED (results bubble up)' },
  { type: 'tip', text: 'Too many recursive calls without a base case = Stack Overflow! Always define your base case first.' },
  { type: 'complexity', items: [
    { label: 'Factorial Time', value: 'O(n)', color: 'text-yellow-500' },
    { label: 'Space (stack)', value: 'O(n)', color: 'text-yellow-500' },
    { label: 'Fibonacci Naive', value: 'O(2ⁿ)', color: 'text-red-500' },
  ]},
];
const REC_ALGORITHM = [
  { type: 'heading', text: 'Factorial — factorial(n)' },
  { num: 1, text: '<strong>Base case:</strong> if n == 0 or n == 1, return 1' },
  { num: 2, text: '<strong>Recursive case:</strong> return n × factorial(n-1)' },
  { num: 3, text: 'factorial(4) → 4 × factorial(3)' },
  { num: 4, text: 'factorial(3) → 3 × factorial(2)' },
  { num: 5, text: 'factorial(2) → 2 × factorial(1)' },
  { num: 6, text: 'factorial(1) → <strong>returns 1</strong> (base case!)' },
  { num: 7, text: 'Results bubble back: 2×1=2, 3×2=6, 4×6=<strong>24</strong>' },
];
const REC_CODE = `// Factorial — Recursive
public int factorial(int n) {
    // Base case — ALWAYS define this first!
    if (n <= 1) return 1;

    // Recursive case
    return n * factorial(n - 1);
}

// Fibonacci — Recursive (naive O(2^n))
public int fibonacci(int n) {
    if (n <= 1) return n;  // base cases
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Fibonacci — Memoized O(n)
Map<Integer, Integer> memo = new HashMap<>();
public int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    int result = fibMemo(n-1) + fibMemo(n-2);
    memo.put(n, result);
    return result;
}

// Sum of array — Recursive
public int sum(int[] arr, int i) {
    if (i == arr.length) return 0;  // base case
    return arr[i] + sum(arr, i + 1);
}`;

export default function RecursionVisualizer() {
  const [n, setN] = useState(5);
  const [stack, setStack] = useState([]);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('Set n and click Animate to see the call stack build up');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setStack([]); setResult(null); setMessage('Set n and click Animate to see the call stack build up'); stopRef.current = true; setIsRunning(false); };

  const animate = async () => {
    const val = Math.min(Math.max(parseInt(n) || 5, 1), 8);
    setN(val); setIsRunning(true); stopRef.current = false;
    setStack([]); setResult(null);

    // Build up call stack
    setMessage('Building call stack (pushing frames)...');
    const frames = [];
    for (let i = val; i >= 1; i--) {
      if (stopRef.current) return;
      frames.push({ n: i, state: 'calling', label: i === 1 ? `factorial(1) = 1 ✅ BASE CASE` : `factorial(${i}) = ${i} × factorial(${i - 1})` });
      setStack([...frames]);
      setMessage(`Calling factorial(${i})... pushing to call stack`);
      await delay(speed);
    }

    // Unwind
    await delay(speed * 0.5);
    setMessage('Base case reached! Now unwinding (popping frames)...');
    let acc = 1;
    for (let i = 1; i <= val; i++) {
      if (stopRef.current) return;
      acc = acc * i;
      const newFrames = frames.slice(0, val - i).map((f) => ({ ...f, state: 'done' }));
      setStack([...newFrames, { n: i, state: 'returning', label: `factorial(${i}) returns ${acc}`, result: acc }]);
      setMessage(`factorial(${i}) returns ${acc} — popping frame`);
      await delay(speed);
    }
    setStack([]);
    setResult(acc);
    setMessage(`✅ factorial(${val}) = ${acc}`);
    setIsRunning(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-1">Recursion Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Watch the call stack build up and unwind for factorial(n)</p>

      {/* Input */}
      <div className="flex gap-3 items-center mb-5 flex-wrap">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">n =</label>
        <input type="number" min="1" max="8" value={n} onChange={(e) => setN(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-violet-400" />
        <span className="text-xs text-gray-400">(max 8 to fit screen)</span>
      </div>

      {/* Call stack visual */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 mb-4 min-h-48">
        <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">📚 Call Stack</div>
        {stack.length === 0 && !result && <p className="text-gray-400 italic text-sm text-center mt-8">Call stack is empty</p>}
        <div className="flex flex-col-reverse gap-2">
          {stack.map((frame, i) => (
            <div key={i} className={`px-4 py-2.5 rounded-lg text-sm font-medium border-l-4 transition-all duration-300 ${
              frame.state === 'returning' ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-300' :
              frame.state === 'calling' ? 'bg-violet-100 dark:bg-violet-950 border-violet-500 text-violet-800 dark:text-violet-300' :
              'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500'
            }`}>
              {frame.label}
            </div>
          ))}
        </div>
        {result !== null && (
          <div className="mt-4 text-center text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            🎉 Result: {result}
          </div>
        )}
      </div>

      <div className="bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded-lg p-3 mb-5 text-center text-violet-800 dark:text-violet-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span>
        <input type="range" min="200" max="1200" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-violet-500" />
        <span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3">
        <button onClick={animate} disabled={isRunning} className="px-5 py-2 bg-violet-600 text-white rounded-lg text-sm font-bold hover:bg-violet-700 disabled:opacity-40">▶ Animate factorial({n})</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={REC_NOTES} algorithm={REC_ALGORITHM} code={REC_CODE} />
      <CompletionButton topicId="recursion" />
    </div>
  );
}
