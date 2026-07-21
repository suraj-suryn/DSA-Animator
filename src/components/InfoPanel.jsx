import { useState } from "react";

const TABS = ["📝 Notes", "🔢 Algorithm", "💻 Code"];

export default function InfoPanel({ notes, algorithm, code, language = "Java" }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all ${
              active === i
                ? "bg-white dark:bg-gray-800 border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 text-sm">

        {/* NOTES */}
        {active === 0 && (
          <div className="space-y-2.5 text-gray-700 dark:text-gray-300 leading-relaxed">
            {notes.map((n, i) =>
              n.type === "heading" ? (
                <p key={i} className="font-bold text-gray-900 dark:text-white mt-5 first:mt-0 text-base">{n.text}</p>
              ) : n.type === "bullet" ? (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-indigo-500 shrink-0 mt-0.5 font-bold">•</span>
                  <span dangerouslySetInnerHTML={{ __html: n.text }} />
                </div>
              ) : n.type === "tip" ? (
                <div key={i} className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-2.5 text-yellow-800 dark:text-yellow-300 flex gap-2 items-start">
                  <span className="shrink-0">💡</span>
                  <span dangerouslySetInnerHTML={{ __html: n.text }} />
                </div>
              ) : n.type === "complexity" ? (
                <div key={i} className="grid grid-cols-3 gap-2 mt-2">
                  {n.items.map((item) => (
                    <div key={item.label} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 text-center border dark:border-gray-700">
                      <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{item.label}</div>
                      <div className={`font-bold text-sm ${item.color}`}>{item.value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p key={i}>{n.text}</p>
              )
            )}
          </div>
        )}

        {/* ALGORITHM */}
        {active === 1 && (
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            {algorithm.map((step, i) =>
              step.type === "heading" ? (
                <p key={i} className="font-bold text-gray-900 dark:text-white mt-5 first:mt-0 text-base">{step.text}</p>
              ) : (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {step.num ?? i + 1}
                  </span>
                  <span className="pt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.text }} />
                </div>
              )
            )}
          </div>
        )}

        {/* CODE */}
        {active === 2 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{language}</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-xs px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
              >
                📋 Copy
              </button>
            </div>
            <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs leading-relaxed border border-gray-800 font-mono whitespace-pre">
{code}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
