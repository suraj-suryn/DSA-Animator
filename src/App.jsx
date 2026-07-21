import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProgressProvider } from "./context/ProgressContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArrayVisualizer from "./visualizers/Array/ArrayVisualizer";
import SortingVisualizer from "./visualizers/Sorting/SortingVisualizer";
import StackVisualizer from "./visualizers/Stack/StackVisualizer";
import QueueVisualizer from "./visualizers/Queue/QueueVisualizer";
import BinarySearchVisualizer from "./visualizers/BinarySearch/BinarySearchVisualizer";
import LinkedListVisualizer from "./visualizers/LinkedList/LinkedListVisualizer";
import RecursionVisualizer from "./visualizers/Recursion/RecursionVisualizer";
import HashingVisualizer from "./visualizers/Hashing/HashingVisualizer";
import BinaryTreeVisualizer from "./visualizers/BinaryTree/BinaryTreeVisualizer";
import GraphVisualizer from "./visualizers/Graph/GraphVisualizer";
import HeapVisualizer from "./visualizers/Heap/HeapVisualizer";
import DPVisualizer from "./visualizers/DP/DPVisualizer";
import TrieVisualizer from "./visualizers/Trie/TrieVisualizer";

function ComingSoon({ topic }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">{topic} — Coming Soon</h2>
      <p className="text-gray-500 dark:text-gray-400">This visualizer is under construction. Check back soon!</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter basename="/DSA-Animator">
          <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/array" element={<ArrayVisualizer />} />
              <Route path="/sorting" element={<SortingVisualizer />} />
              <Route path="/stack" element={<StackVisualizer />} />
              <Route path="/queue" element={<QueueVisualizer />} />
              <Route path="/binary-search" element={<BinarySearchVisualizer />} />
              <Route path="/linked-list" element={<LinkedListVisualizer />} />
              <Route path="/recursion" element={<RecursionVisualizer />} />
              <Route path="/hashing" element={<HashingVisualizer />} />
              <Route path="/tree" element={<BinaryTreeVisualizer />} />
              <Route path="/graph" element={<GraphVisualizer />} />
              <Route path="/heap" element={<HeapVisualizer />} />
              <Route path="/dp" element={<DPVisualizer />} />
              <Route path="/trie" element={<TrieVisualizer />} />
            </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}
