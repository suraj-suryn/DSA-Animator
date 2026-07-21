import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArrayVisualizer from "./visualizers/Array/ArrayVisualizer";
import SortingVisualizer from "./visualizers/Sorting/SortingVisualizer";

function ComingSoon({ topic }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">{topic} — Coming Soon</h2>
      <p className="text-gray-500">This visualizer is under construction. Check back soon!</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/DSA-Animator">
      <Navbar />
      <main className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/stack" element={<ComingSoon topic="Stack" />} />
          <Route path="/linked-list" element={<ComingSoon topic="Linked List" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
