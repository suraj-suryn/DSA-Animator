import { Link } from 'react-router-dom';

const topics = [
  {
    path: '/array',
    emoji: '📦',
    title: 'Arrays',
    desc: 'Linear search, two pointers, insert, delete',
    color: 'from-indigo-500 to-indigo-700',
    difficulty: 'Beginner',
  },
  {
    path: '/sorting',
    emoji: '📊',
    title: 'Sorting',
    desc: 'Bubble, Selection & Insertion sort with bar chart',
    color: 'from-purple-500 to-purple-700',
    difficulty: 'Beginner',
  },
  {
    path: '/stack',
    emoji: '🥞',
    title: 'Stack',
    desc: 'Push, Pop, Peek — animated plate stack (LIFO)',
    color: 'from-pink-500 to-pink-700',
    difficulty: 'Beginner',
  },
  {
    path: '/queue',
    emoji: '🚶',
    title: 'Queue',
    desc: 'Enqueue, Dequeue, Peek — ticket line (FIFO)',
    color: 'from-orange-500 to-orange-700',
    difficulty: 'Beginner',
  },
  {
    path: '/binary-search',
    emoji: '🔍',
    title: 'Binary Search',
    desc: 'Eliminate half the array each step — O(log n)',
    color: 'from-blue-500 to-blue-700',
    difficulty: 'Beginner',
  },
  {
    path: '/linked-list',
    emoji: '🔗',
    title: 'Linked List',
    desc: 'Insert, delete, traverse nodes with pointers',
    color: 'from-teal-500 to-teal-700',
    difficulty: 'Intermediate',
    soon: true,
  },
  {
    path: '/tree',
    emoji: '🌲',
    title: 'Binary Tree',
    desc: 'BFS & DFS traversal with animated nodes',
    color: 'from-green-500 to-green-700',
    difficulty: 'Intermediate',
    soon: true,
  },
  {
    path: '/graph',
    emoji: '🌐',
    title: 'Graph',
    desc: 'BFS, DFS, Dijkstra shortest path',
    color: 'from-cyan-500 to-cyan-700',
    difficulty: 'Advanced',
    soon: true,
  },
];

export default function Home() {
  const live = topics.filter((t) => !t.soon);
  const coming = topics.filter((t) => t.soon);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Hero */}
      <div className="text-center py-14 px-6">
        <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          100% Free · No Login · Open Source
        </div>
        <h1 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-300 mb-3">
          Learn DSA Visually
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Interactive step-by-step animations of Data Structures & Algorithms.
          Built for students who want to <em>see</em> how it works.
        </p>
        <Link
          to="/array"
          className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg"
        >
          Start Learning →
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        {/* Live topics */}
        <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
          ✅ Live — Ready to Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {live.map(({ path, emoji, title, desc, color, difficulty }) => (
            <Link
              key={path}
              to={path}
              className={`block rounded-2xl bg-gradient-to-br ${color} text-white p-5 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{difficulty}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <p className="text-white/80 text-sm">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
          🔜 Coming Soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coming.map(({ path, emoji, title, desc, color, difficulty }) => (
            <div
              key={path}
              className={`block rounded-2xl bg-gradient-to-br ${color} text-white p-5 opacity-50 cursor-not-allowed`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{emoji}</span>
                <div className="flex gap-1 flex-col items-end">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{difficulty}</span>
                  <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-semibold">Soon</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <p className="text-white/80 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pb-8 text-gray-400 dark:text-gray-600 text-sm">
        {live.length} topics live · {coming.length} coming soon
      </div>
    </div>
  );
}
