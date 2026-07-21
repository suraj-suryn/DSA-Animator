# 🧠 DSA Animator — Learn Data Structures Visually

> A **100% free**, interactive DSA learning platform for students — no login, no credit card, no cost ever.

**Live Site:** https://suraj-suryn.github.io/DSA-Animator

---

## What is DSA Animator?

DSA Animator is a student-focused web app that teaches Data Structures & Algorithms through **step-by-step animations**. Students interact with each algorithm — watching the call stack build, nodes highlight, tables fill, and pointers move — organized into three levels that unlock as you progress.

---

## Features

### 🟢 Beginner Level (Always Unlocked)
| Topic | What You'll Learn |
|---|---|
| 📦 **Arrays** | Linear search, Two Pointer, Insert, Delete |
| 🥞 **Stack** | Push, Pop, Peek — LIFO with plate animation |
| 🚶 **Queue** | Enqueue, Dequeue, Peek — FIFO with ticket line |

### 🔵 Intermediate Level (Unlocks after Beginner complete)
| Topic | What You'll Learn |
|---|---|
| 📊 **Sorting** | Bubble, Selection, Insertion sort with bar chart |
| 🔍 **Binary Search** | Eliminate half each step — O(log n) with step log |
| 🔗 **Linked List** | Insert head/tail, delete, traverse with pointer arrows |
| 🔄 **Recursion** | Call stack build-up and unwind — factorial animation |
| #️⃣ **Hashing** | Hash function, buckets, collision chaining |

### 🔴 Advanced Level (Unlocks after Intermediate complete)
| Topic | What You'll Learn |
|---|---|
| 🌲 **Binary Tree** | BFS level order, DFS Inorder & Preorder traversal |
| 🌐 **Graph** | BFS and DFS on undirected graph with SVG animation |
| 🔺 **Heap** | Min-Heap insert (bubble up) & extract (bubble down) |
| 💰 **Dynamic Programming** | Fibonacci + Climbing Stairs — DP table fill animation |
| 🌳 **Trie** | Insert words, search, visualize prefix tree |

### Cross-Topic Features
- 🌙 **Dark / Light theme** toggle with localStorage persistence
- 📝 **Notes tab** — plain-English explanation + real-world uses
- 🔢 **Algorithm tab** — numbered step-by-step logic
- 💻 **Code tab** — complete Java code with Copy button
- ✅ **Mark as Complete** button — saves progress to localStorage
- 📊 **Progress bars** — per level + overall completion tracker
- 🔒 **Level lock/unlock** — Intermediate unlocks after Beginner, Advanced unlocks after Intermediate
- 🐢🐇 **Speed control** — slow down or speed up all animations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| State | React Context + localStorage |
| Hosting | GitHub Pages (free, forever) |
| CI/CD | `gh-pages` npm package |

---

## Project Structure

```
src/
├── App.jsx                                    # Router + providers
├── context/
│   ├── ThemeContext.jsx                        # Dark/Light theme
│   └── ProgressContext.jsx                    # Level unlock + completion
├── components/
│   ├── Navbar.jsx                             # Navigation
│   ├── InfoPanel.jsx                          # Notes/Algorithm/Code tabs
│   └── CompletionButton.jsx                   # Mark as Complete
├── pages/
│   └── Home.jsx                               # Level sections with lock/unlock
└── visualizers/
    ├── Array/ArrayVisualizer.jsx
    ├── Sorting/SortingVisualizer.jsx
    ├── Stack/StackVisualizer.jsx
    ├── Queue/QueueVisualizer.jsx
    ├── BinarySearch/BinarySearchVisualizer.jsx
    ├── LinkedList/LinkedListVisualizer.jsx
    ├── Recursion/RecursionVisualizer.jsx
    ├── Hashing/HashingVisualizer.jsx
    ├── BinaryTree/BinaryTreeVisualizer.jsx
    ├── Graph/GraphVisualizer.jsx
    ├── Heap/HeapVisualizer.jsx
    ├── DP/DPVisualizer.jsx
    └── Trie/TrieVisualizer.jsx
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+ and npm (free)

### Run Locally

```bash
git clone https://github.com/suraj-suryn/DSA-Animator.git
cd DSA-Animator
npm install
npm run dev
```

Open http://localhost:5173/DSA-Animator

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

> **First time:** GitHub repo → Settings → Pages → Branch → `gh-pages` → Save

The site goes live at `https://<your-username>.github.io/DSA-Animator`

---

## How the Level System Works

1. **Beginner** (Arrays, Stack, Queue) is always accessible
2. Complete all Beginner topics → **Intermediate unlocks**
3. Complete all Intermediate topics → **Advanced unlocks**
4. Each topic has a **✅ Mark as Complete** button — progress saved in localStorage
5. Returning students see their progress restored automatically

---

## How Each Visualizer is Built

Every visualizer follows the same structure:
- **Visual area** — animated data structure (SVG for trees/graphs, DOM for arrays/stacks)
- **Message box** — real-time narration of each step
- **Speed slider** — 🐢 slow to 🐇 fast
- **Buttons** — trigger operations (Insert, Search, Push, etc.)
- **InfoPanel** — 3 tabs: Notes, Algorithm, Code (Java)
- **CompletionButton** — saves topic as done

---

## Contributing

PRs welcome! To add a new visualizer:
1. Create `src/visualizers/YourTopic/YourTopicVisualizer.jsx`
2. Add to `LEVELS` array in `src/context/ProgressContext.jsx`
3. Add a route in `src/App.jsx`

---

## Author

**Suraj** — https://github.com/suraj-suryn

## License

MIT — free to use, share, and modify.


> A **100% free**, interactive DSA learning platform for students — no login, no credit card, no cost ever.

**Live Site:** https://suraj-suryn.github.io/DSA-Animator

---

## What is DSA Animator?

DSA Animator is a student-focused web app that teaches Data Structures & Algorithms through **step-by-step animations**. Instead of just reading theory or watching videos, students can interact with each algorithm — controlling speed, stepping through operations, and seeing exactly what happens at each stage.

---

## Features

| Feature | Status |
|---|---|
| 📦 Array Visualizer (Linear Search, Two Pointer, Insert, Delete) | ✅ Live |
| 📊 Sorting Visualizer (Bubble, Selection, Insertion) with bar chart | ✅ Live |
| 🥞 Stack Visualizer (Push, Pop, Peek) | 🔜 Coming Soon |
| 🔗 Linked List Visualizer | 🔜 Coming Soon |
| 🌲 Tree Traversal (BFS / DFS) | 🔜 Coming Soon |
| 📈 Binary Search | 🔜 Coming Soon |
| ⚡ Graph Algorithms (Dijkstra, BFS) | 🔜 Coming Soon |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Hosting | GitHub Pages (free) |
| CI/CD | gh-pages npm package |

---

## Project Structure

```
src/
├── App.jsx                              # Router + layout
├── components/
│   └── Navbar.jsx                       # Navigation bar
├── pages/
│   └── Home.jsx                         # Landing page with topic cards
└── visualizers/
    ├── Array/
    │   └── ArrayVisualizer.jsx          # Interactive array operations
    └── Sorting/
        └── SortingVisualizer.jsx        # Animated sorting with bar chart
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+ (free)
- npm (comes with Node.js)

### Run Locally

```bash
git clone https://github.com/suraj-suryn/DSA-Animator.git
cd DSA-Animator
npm install
npm run dev
```

Open http://localhost:5173/DSA-Animator

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

> **First time:** GitHub repo → Settings → Pages → Source → `gh-pages` branch → Save

---

## How Each Visualizer Works

### Array Visualizer
- **Linear Search** — highlights each element as it is checked
- **Two Pointer** — sorts array, shows left/right pointers converging
- **Insert at End** — adds element with highlight animation
- **Delete at Index** — removes element and shows left-shift

### Sorting Visualizer
- **Bar chart** represents array values visually
- **Yellow bars** = currently being compared
- **Green bars** = sorted and in final position
- Supports **Bubble Sort**, **Selection Sort**, **Insertion Sort**
- Shows **time complexity table** below

---

## Roadmap

- [ ] Stack & Queue visualizers
- [ ] Linked List with pointer arrows
- [ ] Binary Search with range highlighting
- [ ] Tree (BFS / DFS) node traversal animation
- [ ] Graph visualizer (Dijkstra, BFS)
- [ ] Progress tracking via localStorage
- [ ] Quiz / mini-test per topic
- [ ] Dark mode

---

## Contributing

PRs welcome! To add a new visualizer:
1. Create `src/visualizers/YourTopic/YourTopicVisualizer.jsx`
2. Add a route in `App.jsx`
3. Add a card in `pages/Home.jsx`

---

## Author

**Suraj** — https://github.com/suraj-suryn

## License

MIT — free to use, share, and modify.
