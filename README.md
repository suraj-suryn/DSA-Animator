# 🧠 DSA Animator — Learn Data Structures Visually

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
