import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("dark_mode");
    if (saved !== null) return saved === "true";
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("dark_mode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("dark_mode", "false");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <span
          className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${dark ? "translate-y-0 rotate-0" : "translate-y-full rotate-90"
            }`}
        >
          🌙
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${dark ? "-translate-y-full -rotate-90" : "translate-y-0 rotate-0"
            }`}
        >
          ☀️
        </span>
      </div>
    </button>
  );
}
