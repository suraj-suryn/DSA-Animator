import { createContext, useContext, useState, useEffect } from "react";

// All live topics keyed by id
export const LEVELS = [
  {
    id: "beginner",
    label: "Beginner",
    color: "emerald",
    icon: "🟢",
    description: "Start here — core data structures",
    topics: [
      { id: "array", path: "/array", emoji: "📦", title: "Arrays", desc: "Linear search, two pointers, insert, delete" },
      { id: "stack", path: "/stack", emoji: "🥞", title: "Stack", desc: "Push, Pop, Peek — LIFO animated" },
      { id: "queue", path: "/queue", emoji: "🚶", title: "Queue", desc: "Enqueue, Dequeue, Peek — FIFO animated" },
    ],
  },
  {
    id: "intermediate",
    label: "Intermediate",
    color: "blue",
    icon: "🔵",
    description: "Unlock after completing Beginner",
    topics: [
      { id: "sorting", path: "/sorting", emoji: "📊", title: "Sorting", desc: "Bubble, Selection & Insertion sort" },
      { id: "binary-search", path: "/binary-search", emoji: "🔍", title: "Binary Search", desc: "Eliminate half each step — O(log n)" },
      { id: "linked-list", path: "/linked-list", emoji: "🔗", title: "Linked List", desc: "Insert, delete, traverse with pointers" },
      { id: "recursion", path: "/recursion", emoji: "🔄", title: "Recursion", desc: "Call stack animation, factorial, fibonacci" },
      { id: "hashing", path: "/hashing", emoji: "#️⃣", title: "Hashing", desc: "Key → hash → bucket mapping" },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    color: "purple",
    icon: "🔴",
    description: "Unlock after completing Intermediate",
    topics: [
      { id: "tree", path: "/tree", emoji: "🌲", title: "Binary Tree", desc: "BFS & DFS traversal animated" },
      { id: "graph", path: "/graph", emoji: "🌐", title: "Graph", desc: "BFS, DFS traversal animated" },
      { id: "heap", path: "/heap", emoji: "🔺", title: "Heap", desc: "Min-heap insert/extract animated" },
      { id: "dp", path: "/dp", emoji: "💰", title: "Dynamic Programming", desc: "Fibonacci DP table fill" },
      { id: "trie", path: "/trie", emoji: "🌳", title: "Trie", desc: "Prefix tree insert & search" },
    ],
  },
];

const BEGINNER_IDS = LEVELS[0].topics.map((t) => t.id);
const INTERMEDIATE_IDS = LEVELS[1].topics.map((t) => t.id);

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dsa-completed") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dsa-completed", JSON.stringify(completed));
  }, [completed]);

  const markComplete = (topicId) => {
    setCompleted((prev) => prev.includes(topicId) ? prev : [...prev, topicId]);
  };

  const isCompleted = (topicId) => completed.includes(topicId);

  const isLevelUnlocked = (levelId) => {
    if (levelId === "beginner") return true;
    if (levelId === "intermediate") return BEGINNER_IDS.every((id) => completed.includes(id));
    if (levelId === "advanced") return INTERMEDIATE_IDS.every((id) => completed.includes(id));
    return false;
  };

  const levelProgress = (levelId) => {
    const level = LEVELS.find((l) => l.id === levelId);
    const live = level.topics.filter((t) => !t.soon);
    const done = live.filter((t) => completed.includes(t.id)).length;
    return { done, total: live.length };
  };

  const totalCompleted = completed.length;
  const totalLive = LEVELS.flatMap((l) => l.topics.filter((t) => !t.soon)).length;

  return (
    <ProgressContext.Provider value={{ completed, markComplete, isCompleted, isLevelUnlocked, levelProgress, totalCompleted, totalLive }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
