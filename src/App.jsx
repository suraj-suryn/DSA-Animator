import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArrayVisualizer from "./visualizers/Array/ArrayVisualizer";
import SortingVisualizer from "./visualizers/Sorting/SortingVisualizer";
import StackVisualizer from "./visualizers/Stack/StackVisualizer";
import QueueVisualizer from "./visualizers/Queue/QueueVisualizer";
import BinarySearchVisualizer from "./visualizers/BinarySearch/BinarySearchVisualizer";

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
              <Route path="/linked-list" element={<ComingSoon topic="Linked List" />} />
              <Route path="/tree" element={<ComingSoon topic="Binary Tree" />} />
              <Route path="/graph" element={<ComingSoon topic="Graph" />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
