import { useState } from "react";
import { useProgress } from "../context/ProgressContext";

export default function CompletionButton({ topicId }) {
  const { isCompleted, markComplete } = useProgress();
  const [justDone, setJustDone] = useState(false);
  const done = isCompleted(topicId);

  const handleClick = () => {
    markComplete(topicId);
    setJustDone(true);
    setTimeout(() => setJustDone(false), 3000);
  };

  if (done) {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl">
        <span className="text-2xl">✅</span>
        <div>
          <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Topic Completed!</p>
          <p className="text-emerald-600 dark:text-emerald-500 text-xs">Great work — return to Home to continue your learning path</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {justDone && (
        <div className="text-center mb-3 text-2xl animate-bounce">🎉🎊🎉</div>
      )}
      <button
        onClick={handleClick}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-emerald-300 dark:hover:shadow-emerald-900"
      >
        ✅ Mark as Complete & Unlock Next Level
      </button>
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">
        Click after you understand this topic
      </p>
    </div>
  );
}
