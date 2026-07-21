import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const topics = [
  { path: '/array', label: '📦 Arrays' },
  { path: '/sorting', label: '📊 Sorting' },
  { path: '/stack', label: '🥞 Stack' },
  { path: '/linked-list', label: '🔗 Linked List' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { dark, toggle } = useTheme();

  return (
    <nav className="bg-indigo-700 dark:bg-gray-900 text-white px-6 py-3 flex items-center gap-4 flex-wrap shadow-md transition-colors duration-300">
      <Link to="/" className="text-xl font-bold tracking-tight hover:text-indigo-200 dark:hover:text-indigo-300">
        🧠 DSA Learn
      </Link>
      <div className="flex gap-2 flex-wrap flex-1">
        {topics.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              pathname === path
                ? 'bg-white text-indigo-700 dark:bg-indigo-400 dark:text-white'
                : 'hover:bg-indigo-600 dark:hover:bg-gray-700 text-indigo-100'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium transition-all"
      >
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}
