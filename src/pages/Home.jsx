import { Link } from "react-router-dom";
import { LEVELS, useProgress } from "../context/ProgressContext";

const GRAD = {
  emerald: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-indigo-600",
  purple: "from-purple-500 to-pink-600",
};
const DONE_CARD = {
  emerald: "border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950",
  blue: "border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-950",
  purple: "border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-950",
};

export default function Home() {
  const { isCompleted, isLevelUnlocked, levelProgress, totalCompleted, totalLive } = useProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Hero */}
      <div className="text-center py-12 px-6">
        <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          100% Free · No Login · Open Source
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Learn DSA Visually
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-6">
          Interactive step-by-step animations. Complete each level to unlock the next.
        </p>

        {/* Overall progress bar */}
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-2xl p-4 shadow border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <span>Overall Progress</span>
            <span>{totalCompleted} / {totalLive} topics</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${totalLive > 0 ? (totalCompleted / totalLive) * 100 : 0}%` }}
            />
          </div>
          {totalCompleted === totalLive && totalLive > 0 && (
            <p className="text-center text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
              🎉 All topics completed!
            </p>
          )}
        </div>
      </div>

      {/* Level sections */}
      <div className="max-w-5xl mx-auto px-6 pb-16 space-y-8">
        {LEVELS.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const { done, total } = levelProgress(level.id);
          const pct = total > 0 ? (done / total) * 100 : 0;
          const grad = GRAD[level.color];
          const doneCard = DONE_CARD[level.color];

          return (
            <div key={level.id} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              {/* Level header */}
              <div className={`bg-gradient-to-r ${grad} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-none">{level.label}</h2>
                    <p className="text-white/70 text-xs mt-0.5">
                      {unlocked ? level.description : `🔒 ${level.description}`}
                    </p>
                  </div>
                </div>
                {unlocked ? (
                  <div className="text-right shrink-0">
                    <div className="text-white text-sm font-semibold mb-1">{done}/{total} done</div>
                    <div className="w-28 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl opacity-80">🔒</div>
                )}
              </div>

              {/* Topics grid */}
              <div className={`p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ${unlocked ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-950"}`}>
                {level.topics.map((topic) => {
                  const isDone = isCompleted(topic.id);
                  const base = "relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 group min-h-24";

                  // Locked level
                  if (!unlocked) {
                    return (
                      <div key={topic.id} className={`${base} border-gray-200 dark:border-gray-800 opacity-35 cursor-not-allowed`}>
                        <div className="text-3xl mb-2 grayscale">🔒</div>
                        <div className="text-xs font-semibold text-gray-400">{topic.title}</div>
                      </div>
                    );
                  }

                  // Coming soon
                  if (topic.soon) {
                    return (
                      <div key={topic.id} className={`${base} border-dashed border-gray-300 dark:border-gray-700 opacity-55 cursor-not-allowed`}>
                        <div className="text-3xl mb-2">{topic.emoji}</div>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">{topic.title}</div>
                        <span className="mt-1.5 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full">Soon</span>
                      </div>
                    );
                  }

                  // Live & accessible
                  return (
                    <Link
                      key={topic.id}
                      to={topic.path}
                      className={`${base} ${
                        isDone
                          ? doneCard
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md hover:-translate-y-0.5 bg-white dark:bg-gray-800"
                      }`}
                    >
                      {isDone && (
                        <span className="absolute top-2 right-2 text-base">✅</span>
                      )}
                      <div className="text-3xl mb-2">{topic.emoji}</div>
                      <div className={`text-xs font-bold leading-tight ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-gray-800 dark:text-gray-200"}`}>
                        {topic.title}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-tight hidden sm:block">{topic.desc}</div>
                      {!isDone && (
                        <span className="mt-2 text-xs text-indigo-500 dark:text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Start →
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pb-8 text-gray-400 dark:text-gray-600 text-xs">
        DSA Learn · Free forever · Open Source
      </div>
    </div>
  );
}
