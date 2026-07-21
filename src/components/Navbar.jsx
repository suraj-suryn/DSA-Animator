import { Link, useLocation } from 'react-router-dom';

const topics = [
  { path: '/array', label: '📦 Arrays' },
  { path: '/sorting', label: '📊 Sorting' },
  { path: '/stack', label: '🥞 Stack' },
  { path: '/linked-list', label: '🔗 Linked List' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-indigo-700 text-white px-6 py-3 flex items-center gap-6 flex-wrap shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight hover:text-indigo-200">
        🧠 DSA Learn
      </Link>
      <div className="flex gap-2 flex-wrap">
        {topics.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              pathname === path
                ? 'bg-white text-indigo-700'
                : 'hover:bg-indigo-600 text-indigo-100'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
