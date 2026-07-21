import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const HASH_NOTES = [
  { type: 'heading', text: 'What is Hashing?' },
  { type: 'text', text: 'Hashing converts a key into an array index using a hash function. This allows near-instant O(1) average access, insert, and delete — much faster than searching.' },
  { type: 'bullet', text: '<strong>Hash function:</strong> Maps key → index (e.g., key % tableSize)' },
  { type: 'bullet', text: '<strong>Bucket:</strong> Each array slot that stores values' },
  { type: 'bullet', text: '<strong>Collision:</strong> Two keys hash to the same index' },
  { type: 'bullet', text: '<strong>Chaining:</strong> Handle collisions by storing a list at each bucket' },
  { type: 'heading', text: 'Real World Uses' },
  { type: 'bullet', text: '<strong>HashMap / HashSet</strong> in Java use hashing internally' },
  { type: 'bullet', text: '<strong>Database indexing</strong> — fast record lookup' },
  { type: 'bullet', text: '<strong>Password storage</strong> — store hash, not plain password' },
  { type: 'tip', text: 'HashMap is the most-used data structure in coding interviews — know it inside out!' },
  { type: 'complexity', items: [
    { label: 'Insert/Search', value: 'O(1) avg', color: 'text-green-500' },
    { label: 'Worst Case', value: 'O(n)', color: 'text-red-500' },
    { label: 'Space', value: 'O(n)', color: 'text-yellow-500' },
  ]},
];
const HASH_ALGORITHM = [
  { type: 'heading', text: 'Insert(key, value)' },
  { num: 1, text: 'Compute <strong>index = hashFunction(key)</strong>' },
  { num: 2, text: 'Go to <strong>table[index]</strong>' },
  { num: 3, text: 'If empty → store value there' },
  { num: 4, text: 'If occupied (collision) → append to chain (linked list)' },
  { type: 'heading', text: 'Search(key)' },
  { num: 1, text: 'Compute <strong>index = hashFunction(key)</strong>' },
  { num: 2, text: 'Go to <strong>table[index]</strong>' },
  { num: 3, text: 'Search through the chain for matching key' },
  { num: 4, text: 'Return value if found, null if not' },
];
const HASH_CODE = `// HashMap in Java — built-in hash table
import java.util.HashMap;

HashMap<String, Integer> map = new HashMap<>();

// Insert — O(1) average
map.put("apple", 5);
map.put("banana", 3);
map.put("cherry", 8);

// Search — O(1) average
int count = map.get("apple");  // 5

// Contains check
if (map.containsKey("banana")) {
    System.out.println("Found!");
}

// Delete — O(1) average
map.remove("banana");

// Iterate
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}

// Classic interview: Two Sum using HashMap — O(n)
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement))
            return new int[]{seen.get(complement), i};
        seen.put(nums[i], i);
    }
    return new int[]{};
}`;

const TABLE_SIZE = 7;
const hashFn = (key) => {
  let h = 0;
  for (let c of String(key)) h = (h * 31 + c.charCodeAt(0)) % TABLE_SIZE;
  return h;
};

export default function HashingVisualizer() {
  const [table, setTable] = useState(Array(TABLE_SIZE).fill(null).map(() => []));
  const [inputKey, setInputKey] = useState('');
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [message, setMessage] = useState('Type a key and click Insert to see hashing in action');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(700);
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setTable(Array(TABLE_SIZE).fill(null).map(() => [])); setHighlightIdx(-1); setMessage('Type a key and click Insert to see hashing in action'); stopRef.current = true; setIsRunning(false); };

  const insert = async () => {
    const key = inputVal.trim(); if (!key) return setMessage('Enter a key');
    setIsRunning(true); stopRef.current = false;
    const idx = hashFn(key);
    setMessage(`Computing hash("${key}") = ${idx}...`); await delay(speed);
    setHighlightIdx(idx);
    const collision = table[idx].length > 0;
    setMessage(collision ? `⚡ Collision at bucket ${idx}! Chaining "${key}" to existing items` : `✅ Bucket ${idx} is free — storing "${key}"`);
    await delay(speed);
    setTable((t) => { const n = t.map((b) => [...b]); n[idx] = [...n[idx], key]; return n; });
    await delay(speed); setHighlightIdx(-1);
    setIsRunning(false); setInputVal('');
  };

  const search = async () => {
    const key = inputVal.trim(); if (!key) return setMessage('Enter a key to search');
    setIsRunning(true); stopRef.current = false;
    const idx = hashFn(key);
    setMessage(`hash("${key}") = ${idx} → checking bucket ${idx}...`); await delay(speed);
    setHighlightIdx(idx);
    const found = table[idx].includes(key);
    setMessage(found ? `✅ Found "${key}" in bucket ${idx}!` : `❌ "${key}" not found in bucket ${idx}`);
    await delay(speed * 1.5); setHighlightIdx(-1); setIsRunning(false);
  };

  const [inputVal, setInputVal] = useState('');

  const preload = async () => {
    for (const word of ['apple', 'dog', 'cat', 'bird', 'fish']) {
      const idx = hashFn(word);
      setTable((t) => { const n = t.map((b) => [...b]); n[idx] = [...n[idx], word]; return n; });
      await delay(300);
    }
    setMessage('Loaded sample words! Try searching for "apple" or "cat"');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">Hashing Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Hash function: sum of char codes % {TABLE_SIZE}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Table size = {TABLE_SIZE} buckets</p>

      {/* Hash table visual */}
      <div className="grid grid-cols-1 gap-2 mb-5">
        {table.map((bucket, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-lg border-2 px-4 py-2.5 transition-all duration-300 ${
            highlightIdx === i ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-950 scale-[1.02]' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
          }`}>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 font-bold text-sm shrink-0">{i}</div>
            <div className="text-xs text-gray-400 dark:text-gray-600 shrink-0">→</div>
            <div className="flex gap-2 flex-wrap flex-1 min-h-6">
              {bucket.length === 0 ? (
                <span className="text-gray-300 dark:text-gray-700 italic text-xs">empty</span>
              ) : (
                bucket.map((item, j) => (
                  <span key={j} className="bg-amber-500 text-white px-2 py-0.5 rounded-md text-xs font-medium">{item}</span>
                ))
              )}
            </div>
            {bucket.length > 1 && <span className="text-xs text-orange-500 font-bold shrink-0">⚡ chain</span>}
          </div>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-5 text-center text-amber-800 dark:text-amber-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span><input type="range" min="300" max="1500" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-amber-500" /><span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input type="text" placeholder="Key (e.g. apple)" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && insert()}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <button onClick={insert} disabled={isRunning} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 disabled:opacity-40">+ Insert</button>
        <button onClick={search} disabled={isRunning} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 disabled:opacity-40">🔍 Search</button>
        <button onClick={preload} disabled={isRunning} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40">📦 Load samples</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={HASH_NOTES} algorithm={HASH_ALGORITHM} code={HASH_CODE} />
      <CompletionButton topicId="hashing" />
    </div>
  );
}
