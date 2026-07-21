import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const G_NOTES = [
  { type: 'heading', text: 'What is a Graph?' },
  { type: 'text', text: 'A graph is a collection of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles and no fixed root.' },
  { type: 'bullet', text: '<strong>Vertex (Node):</strong> A point in the graph' },
  { type: 'bullet', text: '<strong>Edge:</strong> A connection between two vertices' },
  { type: 'bullet', text: '<strong>Undirected:</strong> Edges go both ways (A↔B)' },
  { type: 'bullet', text: '<strong>Directed:</strong> Edges have direction (A→B only)' },
  { type: 'heading', text: 'BFS vs DFS' },
  { type: 'bullet', text: '<strong>BFS:</strong> Explores level by level — uses Queue — finds shortest path' },
  { type: 'bullet', text: '<strong>DFS:</strong> Goes deep before backtracking — uses Stack/recursion' },
  { type: 'tip', text: 'BFS = shortest path in unweighted graphs. DFS = detecting cycles, topological sort.' },
  { type: 'complexity', items: [
    { label: 'BFS/DFS', value: 'O(V+E)', color: 'text-yellow-500' },
    { label: 'Space', value: 'O(V)', color: 'text-yellow-500' },
    { label: 'Dijkstra', value: 'O((V+E)logV)', color: 'text-red-500' },
  ]},
];
const G_ALGORITHM = [
  { type: 'heading', text: 'BFS' },
  { num: 1, text: 'Mark start node as visited, add to <strong>Queue</strong>' },
  { num: 2, text: 'While queue not empty: dequeue a node, process it' },
  { num: 3, text: 'For each unvisited neighbor: mark visited, enqueue' },
  { type: 'heading', text: 'DFS' },
  { num: 1, text: 'Mark start node as visited, push to <strong>Stack</strong>' },
  { num: 2, text: 'While stack not empty: pop a node, process it' },
  { num: 3, text: 'For each unvisited neighbor: mark visited, push to stack' },
];
const G_CODE = `// Graph using Adjacency List
Map<Integer, List<Integer>> graph = new HashMap<>();

// Add edge (undirected)
void addEdge(int u, int v) {
    graph.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
    graph.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
}

// BFS — O(V + E)
List<Integer> bfs(int start) {
    List<Integer> order = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(start);
    visited.add(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
    return order;
}

// DFS — O(V + E)
List<Integer> dfs(int start) {
    List<Integer> order = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    Stack<Integer> stack = new Stack<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (!visited.contains(node)) {
            visited.add(node);
            order.add(node);
            for (int n : graph.getOrDefault(node, new ArrayList<>()))
                if (!visited.contains(n)) stack.push(n);
        }
    }
    return order;
}`;

// 6-node undirected graph
const NODES = [
  { id: 0, label: 'A', x: 50, y: 10 },
  { id: 1, label: 'B', x: 20, y: 35 },
  { id: 2, label: 'C', x: 80, y: 35 },
  { id: 3, label: 'D', x: 10, y: 70 },
  { id: 4, label: 'E', x: 45, y: 70 },
  { id: 5, label: 'F', x: 80, y: 70 },
];
const EDGES = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]];
const ADJ = { 0:[1,2], 1:[0,3,4], 2:[0,4,5], 3:[1], 4:[1,2], 5:[2] };

const bfsOrder = () => {
  const visited = new Set([0]); const q = [0]; const order = [];
  while (q.length) { const n = q.shift(); order.push(n); for (const nb of ADJ[n]) { if (!visited.has(nb)) { visited.add(nb); q.push(nb); } } }
  return order;
};
const dfsOrder = () => {
  const visited = new Set(); const st = [0]; const order = [];
  while (st.length) { const n = st.pop(); if (!visited.has(n)) { visited.add(n); order.push(n); for (const nb of [...ADJ[n]].reverse()) { if (!visited.has(nb)) st.push(nb); } } }
  return order;
};

export default function GraphVisualizer() {
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(-1);
  const [activeEdges, setActiveEdges] = useState([]);
  const [message, setMessage] = useState('Choose BFS or DFS — both start from node A');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(700);
  const stopRef = useRef(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setVisited([]); setCurrent(-1); setActiveEdges([]); setMessage('Choose BFS or DFS — both start from node A'); stopRef.current = true; setIsRunning(false); };

  const runTraversal = async (getOrder, label) => {
    setIsRunning(true); stopRef.current = false;
    setVisited([]); setCurrent(-1); setActiveEdges([]);
    const order = getOrder();
    setMessage(`Starting ${label} from node A...`);
    const vis = [];
    for (let step = 0; step < order.length; step++) {
      if (stopRef.current) return;
      const n = order[step];
      setCurrent(n);
      setMessage(`Visiting node ${NODES[n].label} — ${label}`);
      if (step > 0) {
        const prev = order[step - 1];
        const edgeKey = EDGES.findIndex(([a, b]) => (a === prev && b === n) || (a === n && b === prev));
        if (edgeKey >= 0) setActiveEdges((e) => [...e, edgeKey]);
      }
      await delay(speed);
      vis.push(n); setVisited([...vis]);
    }
    setCurrent(-1);
    setMessage(`✅ ${label} complete! Order: ${order.map((i) => NODES[i].label).join(' → ')}`);
    setIsRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">Graph Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Undirected graph — animate BFS and DFS traversals</p>

      {/* Graph SVG */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 mb-4">
        <svg viewBox="0 0 100 85" className="w-full" style={{ maxHeight: '250px' }}>
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
              stroke={activeEdges.includes(i) ? '#06B6D4' : '#94A3B8'} strokeWidth={activeEdges.includes(i) ? 1.5 : 0.8}
              className="transition-all duration-300" />
          ))}
          {NODES.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="7"
                fill={current === node.id ? '#FBBF24' : visited.includes(node.id) ? '#06B6D4' : '#6366F1'}
                stroke="white" strokeWidth="0.8" className="transition-all duration-300" />
              <text x={node.x} y={node.y + 1.5} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="5" fontWeight="bold">{node.label}</text>
            </g>
          ))}
        </svg>
        <div className="flex gap-4 justify-center text-xs mt-2">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-indigo-500" /><span className="text-gray-500">Unvisited</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400" /><span className="text-gray-500">Current</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-cyan-500" /><span className="text-gray-500">Visited</span></div>
        </div>
      </div>

      <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-lg p-3 mb-5 text-center text-cyan-800 dark:text-cyan-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span><input type="range" min="300" max="1500" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-cyan-500" /><span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={() => runTraversal(bfsOrder, 'BFS')} disabled={isRunning} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 disabled:opacity-40">🌊 BFS Traversal</button>
        <button onClick={() => runTraversal(dfsOrder, 'DFS')} disabled={isRunning} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">🌀 DFS Traversal</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={G_NOTES} algorithm={G_ALGORITHM} code={G_CODE} />
      <CompletionButton topicId="graph" />
    </div>
  );
}
