import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const TRIE_NOTES = [
  { type: 'heading', text: 'What is a Trie?' },
  { type: 'text', text: 'A Trie (prefix tree) is a tree where each path from root to a node represents a prefix. It is perfect for storing and searching strings by their characters.' },
  { type: 'bullet', text: '<strong>Root:</strong> Empty string — represents the start' },
  { type: 'bullet', text: '<strong>Each edge:</strong> Represents one character' },
  { type: 'bullet', text: '<strong>End marker:</strong> A flag marking the end of a valid word' },
  { type: 'heading', text: 'Real World Uses' },
  { type: 'bullet', text: '<strong>Autocomplete</strong> — search suggestions as you type' },
  { type: 'bullet', text: '<strong>Spell checker</strong> — quickly verify if word exists' },
  { type: 'bullet', text: '<strong>IP routing</strong> — longest prefix matching' },
  { type: 'tip', text: 'Trie beats HashMap for prefix search! Search by prefix in O(L) where L = prefix length.' },
  { type: 'complexity', items: [
    { label: 'Insert', value: 'O(L)', color: 'text-green-500' },
    { label: 'Search', value: 'O(L)', color: 'text-green-500' },
    { label: 'Space', value: 'O(N×L)', color: 'text-yellow-500' },
  ]},
];
const TRIE_ALGORITHM = [
  { type: 'heading', text: 'Insert(word)' },
  { num: 1, text: 'Start at <strong>root</strong>' },
  { num: 2, text: 'For each character in word:' },
  { num: 3, text: 'If child for character exists → move to it' },
  { num: 4, text: 'If not → <strong>create new node</strong> for that character' },
  { num: 5, text: 'After last character → mark node as <strong>end of word</strong>' },
  { type: 'heading', text: 'Search(word)' },
  { num: 1, text: 'Start at <strong>root</strong>' },
  { num: 2, text: 'For each character → follow the child edge' },
  { num: 3, text: 'If any character missing → word <strong>NOT found</strong>' },
  { num: 4, text: 'If all chars matched → check <strong>end-of-word flag</strong>' },
];
const TRIE_CODE = `// Trie Node
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

class Trie {
    TrieNode root = new TrieNode();

    // Insert — O(L) where L = word length
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
    }

    // Search exact word — O(L)
    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return node.isEnd;
    }

    // Starts with prefix — O(L)
    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return true;  // prefix found (no isEnd check)
    }
}`;

// Build trie structure for visualization
const buildTrie = (words) => {
  const root = { char: '', children: {}, isEnd: false, id: 'root' };
  let idCount = 0;
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = { char: ch, children: {}, isEnd: false, id: `n${++idCount}` };
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  return root;
};

const SAMPLE_WORDS = ['cat', 'car', 'card', 'care', 'dog', 'do'];

// Flatten trie to renderable nodes + edges
const flattenTrie = (root, x, y, spread) => {
  const nodes = [], edges = [];
  const traverse = (node, px, py, cx, cy, sp) => {
    nodes.push({ ...node, x: cx, y: cy });
    if (px !== null) edges.push({ from: { x: px, y: py }, to: { x: cx, y: cy } });
    const children = Object.values(node.children);
    const total = children.length;
    children.forEach((child, i) => {
      const nx = cx + (i - (total - 1) / 2) * sp;
      traverse(child, cx, cy, nx, cy + 18, Math.max(sp * 0.55, 8));
    });
  };
  traverse(root, null, null, x, y, spread);
  return { nodes, edges };
};

export default function TrieVisualizer() {
  const [words, setWords] = useState([...SAMPLE_WORDS]);
  const [inputVal, setInputVal] = useState('');
  const [highlighted, setHighlighted] = useState([]);
  const [message, setMessage] = useState('A Trie storing: ' + SAMPLE_WORDS.join(', '));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const trie = buildTrie(words);
  const { nodes, edges } = flattenTrie(trie, 50, 8, 45);

  const reset = () => { setWords([...SAMPLE_WORDS]); setHighlighted([]); setMessage('A Trie storing: ' + SAMPLE_WORDS.join(', ')); stopRef.current = true; setIsRunning(false); };

  const insertWord = async () => {
    const word = inputVal.trim().toLowerCase(); if (!word || word.length > 8) return setMessage('Enter a word (max 8 chars)');
    if (words.includes(word)) return setMessage(`"${word}" is already in the trie`);
    setIsRunning(true); stopRef.current = false;
    // Animate path
    let node = trie; const path = ['root'];
    for (const ch of word) {
      if (stopRef.current) return;
      const next = node.children[ch];
      if (next) { path.push(next.id); node = next; setHighlighted([...path]); setMessage(`Following existing edge '${ch}'...`); }
      else { setMessage(`Creating new node '${ch}'...`); }
      await delay(speed);
    }
    setWords((w) => [...w, word]);
    setHighlighted([]);
    setMessage(`✅ Inserted "${word}" — marked as end of word`);
    setIsRunning(false); setInputVal('');
  };

  const searchWord = async () => {
    const word = inputVal.trim().toLowerCase(); if (!word) return setMessage('Enter a word to search');
    setIsRunning(true); stopRef.current = false;
    let node = trie; const path = ['root'];
    for (const ch of word) {
      if (stopRef.current) return;
      if (!node.children[ch]) {
        setHighlighted([...path]);
        setMessage(`❌ Character '${ch}' not found — "${word}" is NOT in trie`);
        await delay(speed); setHighlighted([]); setIsRunning(false); return;
      }
      node = node.children[ch]; path.push(node.id);
      setHighlighted([...path]);
      setMessage(`Following '${ch}'...`);
      await delay(speed);
    }
    const found = node.isEnd;
    setMessage(found ? `✅ Found "${word}" in trie!` : `⚠️ "${word}" is a prefix but not a complete word`);
    await delay(speed); setHighlighted([]); setIsRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-1">Trie Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Prefix tree — efficient string storage and searching</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Words: <strong>{words.join(', ')}</strong></p>

      {/* Trie SVG */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 mb-4 overflow-x-auto">
        <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: '280px' }}>
          {edges.map((e, i) => (
            <line key={i} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} stroke="#94A3B8" strokeWidth="0.6" />
          ))}
          {nodes.map((node, i) => {
            const isHL = highlighted.includes(node.id);
            return (
              <g key={node.id || i}>
                <circle cx={node.x} cy={node.y} r={node.id === 'root' ? 5 : 4.5}
                  fill={isHL ? '#FBBF24' : node.isEnd ? '#10B981' : '#A855F7'}
                  stroke="white" strokeWidth="0.5" className="transition-all duration-300" />
                <text x={node.x} y={node.y + 1.5} textAnchor="middle" dominantBaseline="middle"
                  fill="white" fontSize="3.5" fontWeight="bold">
                  {node.id === 'root' ? '·' : node.char}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex gap-4 justify-center text-xs mt-2">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-500" /><span className="text-gray-500">Char node</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-gray-500">End of word</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400" /><span className="text-gray-500">Highlighted</span></div>
        </div>
      </div>

      <div className="bg-fuchsia-50 dark:bg-fuchsia-950 border border-fuchsia-200 dark:border-fuchsia-800 rounded-lg p-3 mb-5 text-center text-fuchsia-800 dark:text-fuchsia-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span><input type="range" min="200" max="1200" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-fuchsia-500" /><span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input type="text" placeholder="Word (e.g. cap)" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && insertWord()}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-fuchsia-400" />
        <button onClick={insertWord} disabled={isRunning} className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg text-sm font-medium hover:bg-fuchsia-700 disabled:opacity-40">+ Insert</button>
        <button onClick={searchWord} disabled={isRunning} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">🔍 Search</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={TRIE_NOTES} algorithm={TRIE_ALGORITHM} code={TRIE_CODE} />
      <CompletionButton topicId="trie" />
    </div>
  );
}
