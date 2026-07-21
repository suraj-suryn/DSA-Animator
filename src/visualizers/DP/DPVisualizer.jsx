import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const DP_NOTES = [
  { type: 'heading', text: 'What is Dynamic Programming?' },
  { type: 'text', text: 'Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Two approaches: Memoization (top-down) and Tabulation (bottom-up).' },
  { type: 'bullet', text: '<strong>Optimal Substructure:</strong> Optimal solution uses optimal solutions of subproblems' },
  { type: 'bullet', text: '<strong>Overlapping Subproblems:</strong> Same subproblems solved multiple times without DP' },
  { type: 'bullet', text: '<strong>Memoization:</strong> Recursion + cache (top-down)' },
  { type: 'bullet', text: '<strong>Tabulation:</strong> Fill table iteratively (bottom-up)' },
  { type: 'heading', text: 'Classic Problems' },
  { type: 'bullet', text: 'Fibonacci, Climbing Stairs, House Robber, Longest Increasing Subsequence' },
  { type: 'tip', text: 'DP = Recursion + Memoization. If you can write the recursive solution, converting to DP is the next step!' },
  { type: 'complexity', items: [
    { label: 'Fibonacci DP', value: 'O(n)', color: 'text-green-500' },
    { label: 'Naive Fib', value: 'O(2ⁿ)', color: 'text-red-500' },
    { label: 'Space', value: 'O(n)', color: 'text-yellow-500' },
  ]},
];
const DP_ALGORITHM = [
  { type: 'heading', text: 'Fibonacci — Bottom-Up DP' },
  { num: 1, text: 'Create <strong>dp array</strong> of size n+1' },
  { num: 2, text: 'Set <strong>dp[0] = 0</strong>, <strong>dp[1] = 1</strong> (base cases)' },
  { num: 3, text: 'For i from 2 to n: <strong>dp[i] = dp[i-1] + dp[i-2]</strong>' },
  { num: 4, text: 'Return <strong>dp[n]</strong>' },
  { type: 'heading', text: 'Climbing Stairs (same pattern!)' },
  { num: 1, text: 'To reach stair n: you came from stair n-1 or n-2' },
  { num: 2, text: '<strong>dp[i] = dp[i-1] + dp[i-2]</strong>' },
  { num: 3, text: 'Same recurrence as Fibonacci!' },
];
const DP_CODE = `// Fibonacci — Naive Recursion O(2^n) — BAD!
public int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n-1) + fibNaive(n-2); // recomputes same values!
}

// Fibonacci — Memoization O(n) time, O(n) space
Map<Integer, Long> memo = new HashMap<>();
public long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long result = fibMemo(n-1) + fibMemo(n-2);
    memo.put(n, result);
    return result;
}

// Fibonacci — Tabulation O(n) time, O(n) space
public long fibDP(int n) {
    if (n <= 1) return n;
    long[] dp = new long[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

// Space-optimized O(1) space
public long fibOpt(int n) {
    if (n <= 1) return n;
    long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long curr = prev1 + prev2;
        prev2 = prev1; prev1 = curr;
    }
    return prev1;
}

// Climbing Stairs — same recurrence as Fibonacci!
public int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}`;

export default function DPVisualizer() {
  const [n, setN] = useState(8);
  const [dp, setDp] = useState([]);
  const [current, setCurrent] = useState(-1);
  const [message, setMessage] = useState('Set n and click Animate to watch the DP table fill up');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [mode, setMode] = useState('fib');
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setDp([]); setCurrent(-1); setMessage('Set n and click Animate to watch the DP table fill up'); stopRef.current = true; setIsRunning(false); };

  const animate = async () => {
    const val = Math.min(Math.max(parseInt(n) || 8, 2), 15);
    setN(val); setIsRunning(true); stopRef.current = false;
    setDp([]); setCurrent(-1);
    const table = new Array(val + 1).fill(0);
    table[0] = 0; table[1] = 1;
    setDp([...table]);
    setMessage(`Base cases: dp[0]=0, dp[1]=1`);
    await delay(speed);

    for (let i = 2; i <= val; i++) {
      if (stopRef.current) return;
      setCurrent(i);
      table[i] = table[i - 1] + table[i - 2];
      setDp([...table]);
      setMessage(`dp[${i}] = dp[${i-1}](${table[i-1]}) + dp[${i-2}](${table[i-2]}) = ${table[i]}`);
      await delay(speed);
    }
    setCurrent(-1);
    setMessage(`✅ ${mode === 'fib' ? `Fibonacci(${val})` : `Climbing Stairs(${val})`} = ${table[val]}`);
    setIsRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">Dynamic Programming Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Watch the DP table fill step by step — Fibonacci & Climbing Stairs</p>

      {/* Mode selector */}
      <div className="flex gap-3 mb-5">
        {['fib', 'stairs'].map((m) => (
          <button key={m} onClick={() => { setMode(m); reset(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${mode === m ? 'bg-orange-600 text-white border-orange-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50'}`}>
            {m === 'fib' ? '🐇 Fibonacci' : '🪜 Climbing Stairs'}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 items-center mb-5 flex-wrap">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">n =</label>
        <input type="number" min="2" max="15" value={n} onChange={(e) => setN(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <span className="text-xs text-gray-400">(max 15)</span>
      </div>

      {/* DP Table */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 mb-4 overflow-x-auto">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">📊 DP Table</p>
        {dp.length === 0 ? <p className="text-gray-400 italic text-sm text-center py-4">Click Animate to start</p> : (
          <div className="flex gap-2 flex-wrap">
            {dp.map((val, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-300 ${
                  current === i ? 'bg-yellow-400 border-yellow-500 text-gray-900 scale-110 shadow-lg' :
                  val > 0 || i <= 1 ? 'bg-orange-500 dark:bg-orange-700 border-orange-600 text-white' :
                  'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-300'
                }`}>{val}</div>
                <span className="text-xs text-gray-400 mt-1">dp[{i}]</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recurrence reminder */}
      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg px-4 py-2 mb-4 text-center">
        <code className="text-orange-700 dark:text-orange-300 font-mono text-sm">dp[i] = dp[i-1] + dp[i-2]</code>
      </div>

      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-5 text-center text-orange-800 dark:text-orange-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span><input type="range" min="200" max="1200" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-orange-500" /><span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3">
        <button onClick={animate} disabled={isRunning} className="px-5 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 disabled:opacity-40">▶ Animate n={n}</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={DP_NOTES} algorithm={DP_ALGORITHM} code={DP_CODE} />
      <CompletionButton topicId="dp" />
    </div>
  );
}
