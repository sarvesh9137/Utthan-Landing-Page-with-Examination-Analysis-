export default function Cards({ title, levels, categories }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">{title}</h3>

      <div className="space-y-3">
        {levels.map((l) => (
          <div key={l.level} className="bg-indigo-50 dark:bg-slate-700 p-3 rounded-lg transition-colors duration-300">
            <p className="font-semibold dark:text-gray-200">{l.level}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {l.total_students} students ({l.percentage}%)
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-bold dark:text-gray-200">Category Breakdown</h4>
        {categories.map((c) => (
          <p key={c.category} className="text-sm text-gray-700 dark:text-gray-300">
            {c.category}: {c.total_students} ({c.percentage}%)
          </p>
        ))}
      </div>
    </div>
  );
}
