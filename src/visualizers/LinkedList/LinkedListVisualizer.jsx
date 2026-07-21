import { useState, useRef } from 'react';
import InfoPanel from '../../components/InfoPanel';
import CompletionButton from '../../components/CompletionButton';

const LL_NOTES = [
  { type: 'heading', text: 'What is a Linked List?' },
  { type: 'text', text: 'A linked list is a linear data structure where elements (nodes) are stored in memory non-contiguously. Each node contains data and a pointer to the next node.' },
  { type: 'bullet', text: '<strong>Node:</strong> Contains data + next pointer' },
  { type: 'bullet', text: '<strong>Head:</strong> Pointer to the first node' },
  { type: 'bullet', text: '<strong>Tail:</strong> Last node — its next = null' },
  { type: 'heading', text: 'Linked List vs Array' },
  { type: 'bullet', text: '<strong>Array:</strong> Fixed size, O(1) access, O(n) insert/delete' },
  { type: 'bullet', text: '<strong>Linked List:</strong> Dynamic size, O(n) access, O(1) insert/delete at known position' },
  { type: 'tip', text: 'Use Linked List when you have frequent insertions/deletions. Use Array when you need fast random access.' },
  { type: 'complexity', items: [
    { label: 'Insert Head', value: 'O(1)', color: 'text-green-500' },
    { label: 'Search', value: 'O(n)', color: 'text-yellow-500' },
    { label: 'Delete', value: 'O(n)', color: 'text-yellow-500' },
  ]},
];
const LL_ALGORITHM = [
  { type: 'heading', text: 'Insert at Head' },
  { num: 1, text: 'Create a new node with given data' },
  { num: 2, text: 'Set <strong>newNode.next = head</strong>' },
  { num: 3, text: 'Update <strong>head = newNode</strong>' },
  { type: 'heading', text: 'Insert at Tail' },
  { num: 1, text: 'Create a new node, set <strong>newNode.next = null</strong>' },
  { num: 2, text: 'If list empty → set head = newNode' },
  { num: 3, text: 'Otherwise traverse to last node, set <strong>last.next = newNode</strong>' },
  { type: 'heading', text: 'Delete a Node' },
  { num: 1, text: 'If deleting head → <strong>head = head.next</strong>' },
  { num: 2, text: 'Otherwise find node before target' },
  { num: 3, text: 'Set <strong>prev.next = target.next</strong> (bypass target)' },
];
const LL_CODE = `// Node class
class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; this.next = null; }
}

class LinkedList {
    Node head;

    // Insert at head — O(1)
    void insertHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    // Insert at tail — O(n)
    void insertTail(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
    }

    // Delete by value — O(n)
    void delete(int data) {
        if (head == null) return;
        if (head.data == data) { head = head.next; return; }
        Node curr = head;
        while (curr.next != null && curr.next.data != data)
            curr = curr.next;
        if (curr.next != null) curr.next = curr.next.next;
    }

    // Traverse — O(n)
    void print() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }
}`;

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState([10, 20, 30, 40]);
  const [highlighted, setHighlighted] = useState(-1);
  const [message, setMessage] = useState('A linked list — each node points to the next');
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const stopRef = useRef(false);

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const reset = () => { setNodes([10, 20, 30, 40]); setHighlighted(-1); setMessage('A linked list — each node points to the next'); stopRef.current = true; setIsRunning(false); };

  const insertHead = async () => {
    const v = parseInt(inputVal); if (isNaN(v)) return setMessage('Enter a value');
    setIsRunning(true); stopRef.current = false;
    setMessage(`Creating new node [${v}]...`); await delay(speed);
    setNodes((n) => [v, ...n]);
    setHighlighted(0);
    setMessage(`✅ Inserted ${v} at HEAD — new head now points to old head`);
    await delay(speed * 1.5); setHighlighted(-1); setIsRunning(false); setInputVal('');
  };

  const insertTail = async () => {
    const v = parseInt(inputVal); if (isNaN(v)) return setMessage('Enter a value');
    setIsRunning(true); stopRef.current = false;
    for (let i = 0; i < nodes.length; i++) {
      if (stopRef.current) return;
      setHighlighted(i); setMessage(`Traversing to tail... at node [${nodes[i]}]`); await delay(speed);
    }
    setNodes((n) => [...n, v]);
    setHighlighted(nodes.length);
    setMessage(`✅ Inserted ${v} at TAIL — last node now points to new node`);
    await delay(speed * 1.5); setHighlighted(-1); setIsRunning(false); setInputVal('');
  };

  const deleteHead = async () => {
    if (!nodes.length) return setMessage('List is empty');
    setIsRunning(true); stopRef.current = false;
    setHighlighted(0); setMessage(`Deleting HEAD node [${nodes[0]}]...`); await delay(speed);
    setNodes((n) => n.slice(1));
    setHighlighted(-1); setMessage(`✅ Deleted HEAD — new head is now [${nodes[1] ?? 'null'}]`);
    setIsRunning(false);
  };

  const traverse = async () => {
    setIsRunning(true); stopRef.current = false;
    for (let i = 0; i < nodes.length; i++) {
      if (stopRef.current) return;
      setHighlighted(i); setMessage(`Visiting node [${nodes[i]}] at position ${i}`); await delay(speed);
    }
    setHighlighted(-1); setMessage('✅ Traversal complete — reached null'); setIsRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">Linked List Visualizer</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Singly Linked List — each node holds data + pointer to next</p>

      {/* Visual */}
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-6 mb-4 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mr-2">HEAD →</span>
          {nodes.length === 0 ? <span className="text-gray-400 italic text-sm">null (empty list)</span> : (
            nodes.map((val, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className={`flex rounded-lg overflow-hidden border-2 transition-all duration-300 ${highlighted === i ? 'border-yellow-400 scale-105 shadow-lg' : 'border-teal-500 dark:border-teal-700'}`}>
                  <div className={`px-4 py-3 font-bold text-white ${highlighted === i ? 'bg-yellow-400 text-gray-900' : 'bg-teal-500 dark:bg-teal-700'}`}>{val}</div>
                  <div className="px-2 py-3 bg-teal-700 dark:bg-teal-900 text-teal-200 text-xs flex items-center">→</div>
                </div>
                {i < nodes.length - 1 && <span className="text-teal-500 mx-1 text-lg font-bold">→</span>}
              </div>
            ))
          )}
          <span className="text-gray-500 dark:text-gray-400 font-bold ml-2">null</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 dark:text-gray-500 text-center mb-4">Size: {nodes.length} nodes</div>

      <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-3 mb-5 text-center text-teal-800 dark:text-teal-300 font-medium text-sm min-h-10">{message}</div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <span>🐢</span>
        <input type="range" min="200" max="1200" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-teal-500" />
        <span>🐇</span><span className="text-xs w-16">{speed}ms</span>
      </div>

      <div className="flex gap-3 flex-wrap mb-2">
        <input type="number" placeholder="Value" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-teal-400" />
        <button onClick={insertHead} disabled={isRunning} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-40">+ Insert Head</button>
        <button onClick={insertTail} disabled={isRunning} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 disabled:opacity-40">+ Insert Tail</button>
        <button onClick={deleteHead} disabled={isRunning} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-40">✕ Delete Head</button>
        <button onClick={traverse} disabled={isRunning} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 disabled:opacity-40">▶ Traverse</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">↺ Reset</button>
      </div>

      <InfoPanel notes={LL_NOTES} algorithm={LL_ALGORITHM} code={LL_CODE} />
      <CompletionButton topicId="linked-list" />
    </div>
  );
}
