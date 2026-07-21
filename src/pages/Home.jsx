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
    desc: 'Bubble, Selection & Insertion sort animations',
    color: 'from-purple-500 to-purple-700',
    difficulty: 'Beginner',
  },
  {
    path: '/stack',
    emoji: '🥞',
    title: 'Stack',
    desc: 'Push, Pop, Peek — visualized step by step',
    color: 'from-pink-500 to-pink-700',
    difficulty: 'Beginner',
    soon: true,
  },
  {
    path: '/linked-list',
    emoji: '🔗',
    title: 'Linked List',
    desc: 'Insert, delete, traverse nodes with pointers',
    color: 'from-blue-500 to-blue-700',
    difficulty: 'Intermediate',
    soon: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Hero */}
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-300 mb-3">
          Learn DSA Visually — Free Forever
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Step-by-step animated visualizations of Data Structures & Algorithms.
          Built for students, by developers.
        </p>
        <Link
          to="/array"
          className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg"
        >
          Start Learning →
        </Link>
      </div>

      {/* Topic cards */}
      <div className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {topics.map(({ path, emoji, title, desc, color, difficulty, soon }) => (
          <Link
            key={path}
            to={soon ? '#' : path}
            className={`block rounded-2xl bg-gradient-to-br ${color} text-white p-6 shadow-lg hover:scale-105 transition-transform ${soon ? 'opacity-70 cursor-default' : ''}`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-4xl">{emoji}</span>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{difficulty}</span>
                {soon && <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-semibold">Coming Soon</span>}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-white/80 text-sm">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-gray-400 dark:text-gray-600 text-sm">
        100% Free • No Login Required • Open Source
      </div>
    </div>
  );
}
