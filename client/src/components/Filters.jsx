import React, { useState } from "react";

export default function Filters({ onApply }) {
  const [filters, setFilters] = useState({
    student_name: "",
    ward: "",
    school_name: "",
    medium: "",
    class: "",
  });

  function update(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-md p-6 space-y-4 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Filter Students</h2>

      <div className="grid md:grid-cols-4 gap-6">

        {/* Student Name */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Student Name</label>
          <input
            type="text"
            placeholder="Search student name"
            className="w-full mt-1 px-4 py-2 border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-colors duration-300"
            value={filters.student_name}
            onChange={(e) => update("student_name", e.target.value)}
          />
        </div>

        {/* Class — text input */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Class</label>
          <input
            type="text"
            placeholder="Search class (I, II, III...)"
            className="w-full mt-1 px-4 py-2 border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-colors duration-300"
            value={filters.class}
            onChange={(e) => update("class", e.target.value)}
          />
        </div>

        {/* Ward */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ward</label>
          <input
            type="text"
            placeholder="Search ward"
            className="w-full mt-1 px-4 py-2 border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-colors duration-300"
            value={filters.ward}
            onChange={(e) => update("ward", e.target.value)}
          />
        </div>

        {/* School Name */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School Name</label>
          <input
            type="text"
            placeholder="Search school name"
            className="w-full mt-1 px-4 py-2 border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-colors duration-300"
            value={filters.school_name}
            onChange={(e) => update("school_name", e.target.value)}
          />
        </div>

        {/* Medium */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Medium</label>
          <input
            type="text"
            placeholder="Search Medium"
            className="w-full mt-1 px-4 py-2 border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-colors duration-300"
            value={filters.medium}
            onChange={(e) => update("medium", e.target.value)}
          />
        </div>

      </div>

      {/* Apply Button */}
      <div className="text-right">
        <button
          onClick={() => onApply(filters)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
