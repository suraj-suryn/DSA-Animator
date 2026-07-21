import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const BT_NOTES = [
  { type: 'heading', text: 'What is a Binary Tree?' },
  { type: 'text', text: 'A binary tree is a hierarchical data structure where each node has at most 2 children: left and right. The topmost node is called the root.' },
  { type: 'bullet', text: '<strong>Root:</strong> The topmost node' },
  { type: 'bullet', text: '<strong>Leaf:</strong> A node with no children' },
  { type: 'bullet', text: '<strong>Height:</strong> Length of longest path from root to leaf' },
  { type: 'heading', text: 'Tree Traversals' },
  { type: 'bullet', text: '<strong>BFS (Level Order):</strong> Visit nodes level by level — uses a Queue' },
  { type: 'bullet', text: '<strong>DFS Inorder (L→Root→R):</strong> Gives sorted order for BST' },
  { type: 'bullet', text: '<strong>DFS Preorder (Root→L→R):</strong> Used to copy a tree' },
  { type: 'bullet', text: '<strong>DFS Postorder (L→R→Root):</strong> Used to delete a tree' },
  { type: 'tip', text: 'BFS uses a Queue. DFS uses a Stack (or recursion). Remember this for interviews!' },
  { type: 'complexity', items: [
    { label: 'Search BST', value: 'O(log n)', color: 'text-green-500' },
    { label: 'Traversal', value: 'O(n)', color: 'text-yellow-500' },
    { label: 'Space', value: 'O(n)', color: 'text-yellow-500' },
  ]},
];
const BT_ALGORITHM = [
  { type: 'heading', text: 'BFS — Level Order Traversal' },
  { num: 1, text: 'Add root to a <strong>Queue</strong>' },
  { num: 2, text: 'While queue not empty: <strong>dequeue node</strong>, visit it' },
  { num: 3, text: 'Enqueue its <strong>left child</strong> then <strong>right child</strong>' },
  { num: 4, text: 'Continue until queue is empty' },
  { type: 'heading', text: 'DFS — Inorder (L→Root→R)' },
  { num: 1, text: 'Recursively visit <strong>left subtree</strong>' },
  { num: 2, text: 'Visit <strong>current node</strong>' },
  { num: 3, text: 'Recursively visit <strong>right subtree</strong>' },
];
const BT_CODE = `// Binary Tree Node
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// BFS — Level Order Traversal
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        result.add(level);
    }
    return result;
}

// DFS — Inorder (left, root, right) → sorted for BST
public void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);
    inorder(root.right, result);
}

// Max depth of binary tree
public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`;

// Fixed tree structure: indices 0-14 for a complete tree level by level
const TREE = [
  { val: 1, level: 0, pos: 0 },
  { val: 2, level: 1, pos: 0 }, { val: 3, level: 1, pos: 1 },
  { val: 4, level: 2, pos: 0 }, { val: 5, level: 2, pos: 1 },
  { val: 6, level: 2, pos: 2 }, { val: 7, level: 2, pos: 3 },
];

// BFS order: 0,1,2,3,4,5,6
// Inorder: 3,1,4,0,5,2,6
const BFS_ORDER = [0, 1, 2, 3, 4, 5, 6];
const INORDER = [3, 1, 4, 0, 5, 2, 6];
const PREORDER = [0, 1, 3, 4, 2, 5, 6];

export default function BinaryTreeVisualizer() {
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(-1);
  const [message, setMessage] = useState('Choose BFS or DFS traversal to animate');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(700);
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setVisited([]); setCurrent(-1); setMessage('Choose BFS or DFS traversal to animate'); stopRef.current = true; setIsRunning(false); };

  const runTraversal = async (order, label) => {
    setIsRunning(true); stopRef.current = false;
    setVisited([]); setCurrent(-1);
    setMessage(`Starting ${label}...`);
    const vis = [];
    for (const idx of order) {
      if (stopRef.current) return;
      setCurrent(idx);
      setMessage(`Visiting node [${TREE[idx].val}] — ${label}`);
      await delay(speed);
      vis.push(idx);
      setVisited([...vis]);
    }
    setCurrent(-1);
    setMessage(`✅ ${label} complete! Order: ${order.map((i) => TREE[i].val).join(' → ')}`);
    setIsRunning(false);
  };

  // Layout positions for rendering
  const positions = [
    { x: 50, y: 6 },
    { x: 25, y: 30 }, { x: 75, y: 30 },
    { x: 12, y: 58 }, { x: 37, y: 58 }, { x: 63, y: 58 }, { x: 88, y: 58 },
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];

  const nodeColor = (i) => {
    if (current === i) return '#FBBF24';
    if (visited.includes(i)) return '#10B981';
    return '#6366F1';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Binary Tree Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Animate BFS and DFS traversals on a binary tree</p>

      {/* Tree SVG */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 mb-4">
        <svg viewBox="0 0 100 80" className="w-full" style={{ maxHeight: '220px' }}>
          {edges.map(([a, b], i) => (
            <line key={i} x1={positions[a].x} y1={positions[a].y + 4} x2={positions[b].x} y2={positions[b].y - 4}
              stroke={visited.includes(b) ? '#10B981' : '#94A3B8'} strokeWidth="0.8" />
          ))}
          {TREE.map((node, i) => (
            <g key={i}>
              <circle cx={positions[i].x} cy={positions[i].y} r="6" fill={nodeColor(i)}
                className="transition-all duration-300" stroke="white" strokeWidth="0.5" />
              <text x={positions[i].x} y={positions[i].y + 1.2} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="4" fontWeight="bold">{node.val}</text>
            </g>
          ))}
        </svg>
        {/* Legend */}
        <div className="flex gap-4 justify-center text-xs mt-2">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-indigo-500" /><span className="text-gray-500">Unvisited</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400" /><span className="text-gray-500">Current</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-gray-500">Visited</span></div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-5 text-center text-green-800 dark:text-green-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span><input type="range" min="300" max="1500" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-green-500" /><span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={() => runTraversal(BFS_ORDER, 'BFS (Level Order)')} disabled={isRunning} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40">🌊 BFS Level Order</button>
        <button onClick={() => runTraversal(INORDER, 'DFS Inorder (L→Root→R)')} disabled={isRunning} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">🔽 DFS Inorder</button>
        <button onClick={() => runTraversal(PREORDER, 'DFS Preorder (Root→L→R)')} disabled={isRunning} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40">🔼 DFS Preorder</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={BT_NOTES} algorithm={BT_ALGORITHM} code={BT_CODE} />
      <CompletionButton topicId="tree" />
    </div>
  );
}
