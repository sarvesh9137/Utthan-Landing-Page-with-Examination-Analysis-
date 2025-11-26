import React from "react";
import { motion } from "framer-motion";
import { BookOpen, PenTool, Calculator } from "lucide-react";

export default function DomainCard({
  title,
  total = 0,
  levels = [],
  categories = [],
  color,
}) {
  /* ---------------------------------------------
     ICON MAP
  --------------------------------------------- */
  const icons = {
    READING: <BookOpen size={24} className="md:w-7 md:h-7" />,
    WRITING: <PenTool size={24} className="md:w-7 md:h-7" />,
    NUMERACY: <Calculator size={24} className="md:w-7 md:h-7" />,
  };

  /* ---------------------------------------------
     SAFETY NORMALIZATION
  --------------------------------------------- */
  const safeLevels = Array.isArray(levels) ? levels : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  const isLoadingLevels = safeLevels.length === 0;
  const isLoadingCategories = safeCategories.length === 0;

  /* ---------------------------------------------
     CATEGORY COLOR PICKER
  --------------------------------------------- */
  const getCategoryColor = (categoryName = "") => {
    const name = categoryName.toLowerCase();

    if (name.includes("mainstream")) return "#22c55e"; // Green
    if (name.includes("developing")) return "#facc15"; // Yellow
    return "#ef4444"; // Red (Needs Improvement)
  };

  /* ---------------------------------------------
     LEVEL BAR COLOR PICKER
  --------------------------------------------- */
  const getLevelColor = (level) => {
    if (["L4", "L5"].includes(level)) return "#22c55e"; // High
    if (["L2", "L3"].includes(level)) return "#facc15"; // Mid
    return "#ef4444"; // Low
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl rounded-2xl border border-white/50 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* ---------------------------------------------
          CARD HEADER
      --------------------------------------------- */}
      <div
        className="px-4 md:px-6 py-3 md:py-4 text-white flex justify-between items-center"
        style={{ background: color }}
      >
        <div className="flex items-center gap-2 md:gap-3 text-white font-bold text-lg md:text-xl">
          {icons[title]}
          {title}
        </div>

        <div className="text-right">
          <p className="text-xs opacity-80">Total Students</p>
          <p className="text-xl md:text-2xl font-bold">
            {Number(total).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 md:space-y-10">

        {/* ---------------------------------------------
            LEVEL DISTRIBUTION (L0–L5)
        --------------------------------------------- */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Level Distribution (%)
          </h3>

          {isLoadingLevels ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((x) => (
                <div key={x} className="animate-pulse">
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-20 mb-1"></div>
                  <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {safeLevels.map((row, idx) => {
                const level = row.level;
                const percent = Number(row.percentage) || 0;

                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span>{level}</span>
                      <span>{percent}%</span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: getLevelColor(level),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ---------------------------------------------
            CATEGORY OVERVIEW
        --------------------------------------------- */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Category Overview</h3>

          {isLoadingCategories ? (
            <div className="text-gray-400 text-sm">Loading...</div>
          ) : (
            <div className="space-y-4">
              {safeCategories.map((cat, i) => {
                const name = cat.category || "Unknown";
                const percent = Number(cat.percentage) || 0;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-3 transition-colors duration-300"
                  >
                    <div className="flex justify-between font-medium text-sm dark:text-gray-200">
                      <span>{name}</span>
                      <span>{percent}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percent}%`,
                          background: getCategoryColor(name),
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
