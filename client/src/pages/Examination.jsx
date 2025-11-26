import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import BarChartComp from "../components/charts/BarChartComp";
import AttendancePieChart from "../components/charts/AttendancePieChart";
import ClassAttendance from "../components/ClassAttendance";
import DomainCard from "../components/DomainCard";
import LearningDistributionCharts from "../components/LearningDistributionCharts";
import { motion } from "framer-motion";

import {
  getStudents,
  getWardAverage,
  getWardAttendance,
  getClassAttendance,
  getLevels,
  getCategories,
  getSubjectTotals,
} from "../api";
import { exportToExcel } from "../utils/exportToExcel";
import { Download } from "lucide-react";

export default function Examination() {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });

  // Filters saved here
  const [filters, setFilters] = useState({});

  const [levels, setLevels] = useState({
    reading: [],
    writing: [],
    numeracy: [],
  });

  const [categories, setCategories] = useState({
    reading: [],
    writing: [],
    numeracy: [],
  });

  const [totals, setTotals] = useState({
    reading: 0,
    writing: 0,
    numeracy: 0,
  });

  const [attendance, setAttendance] = useState([]);
  const [classData, setClassData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  /* -----------------------------------------
      INITIAL LOAD
  ----------------------------------------- */
  useEffect(() => {
    fetchStudents(1, filters);
    loadLevelAndCategoryData();
    loadAttendance();
  }, []);

  /* -----------------------------------------
      FETCH STUDENTS
      Supports pagination + filters
  ----------------------------------------- */
  async function fetchStudents(page = 1, appliedFilters = filters) {
    const res = await getStudents({
      ...appliedFilters,
      page,
      limit: 10,
    });

    if (!res || !Array.isArray(res.data)) {
      setStudents([]);
      return;
    }

    setStudents(res.data);
    setMeta({ page: res.page, totalPages: res.totalPages });
  }

  /* -----------------------------------------
      LOAD LEVELS + CATEGORIES + TOTALS
  ----------------------------------------- */
  async function loadLevelAndCategoryData() {
    const subjects = ["reading", "writing", "numeracy"];
    const levelObj = {};
    const categoryObj = {};

    for (let sub of subjects) {
      const levelsRes = await getLevels(sub);
      const catRes = await getCategories(sub);

      levelObj[sub] = (levelsRes || []).filter((r) =>
        ["L0", "L1", "L2", "L3", "L4", "L5"].includes(r.level)
      );

      categoryObj[sub] = catRes || [];
    }

    const totalsRes = await getSubjectTotals();
    setLevels(levelObj);
    setCategories(categoryObj);
    setTotals(totalsRes);

    const wardAvg = await getWardAverage("reading");
    setWardData(wardAvg || []);
  }

  /* -----------------------------------------
      LOAD ATTENDANCE
  ----------------------------------------- */
  async function loadAttendance() {
    const wardRes = await getWardAttendance();
    setAttendance(wardRes || []);

    const classRes = await getClassAttendance();
    setClassData(classRes || []);
  }

  /* -----------------------------------------
      LEVEL BADGE
  ----------------------------------------- */
  const levelBadge = (level) => {
    const colors = {
      L0: "bg-gray-200 text-gray-700 border-gray-400",
      L1: "bg-red-100 text-red-700 border-red-300",
      L2: "bg-amber-100 text-amber-700 border-amber-300",
      L3: "bg-yellow-100 text-yellow-700 border-yellow-400",
      L4: "bg-green-100 text-green-700 border-green-300",
      L5: "bg-emerald-100 text-emerald-700 border-emerald-300",
    };

    if (!colors[level]) return <span>-</span>;

    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`px-3 py-1 text-xs font-semibold border rounded-full shadow-sm ${colors[level]}`}
      >
        {level}
      </motion.span>
    );
  };

  /* -----------------------------------------
      MEDIUM BADGE
  ----------------------------------------- */
  const mediumBadge = (m = "Unknown") => {
    const colors = {
      English: "bg-blue-100 text-blue-700 border-blue-300",
      Hindi: "bg-green-100 text-green-700 border-green-300",
      Marathi: "bg-orange-100 text-orange-700 border-orange-300",
      Urdu: "bg-purple-100 text-purple-700 border-purple-300",
      Unknown: "bg-gray-200 text-gray-700 border-gray-300",
    };

    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`px-3 py-1 text-xs font-semibold border rounded-full shadow-sm ${colors[m] || colors.Unknown
          }`}
      >
        {m}
      </motion.span>
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Fetch ALL students with current filters (no pagination limit)
      const res = await getStudents({
        ...filters,
        page: 1,
        limit: 10000, // Large limit to get all records
      });

      if (res && res.data) {
        const exportData = res.data.map(s => ({
          Name: s.student_name,
          Gender: s.gender,
          Ward: s.ward,
          School: s.school_name,
          Medium: s.medium,
          Class: s.student_class,
          Reading: s.reading_level,
          Writing: s.writing_level,
          Numeracy: s.numeracy_level
        }));

        exportToExcel(exportData, 'Student_Records', 'Students');
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data.");
    } finally {
      setIsExporting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#82298B] via-[#2B3E8E] to-[#82298B] bg-[length:400%_400%] animate-gradient p-4 md:p-6 lg:p-10 transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto space-y-6 md:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* HEADER */}
        <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 md:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Examination Analytics</h1>
          <p className="text-blue-100 text-sm md:text-lg mt-2 md:mt-3 font-light">
            Analyze student performance across wards with real-time insights.
          </p>
        </motion.div>

        {/* WARD ATTENDANCE SUMMARY */}
        <motion.div variants={itemVariants} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl rounded-2xl border border-white/50 dark:border-slate-700 p-4 md:p-6 space-y-4 md:space-y-6 transition-colors duration-300">
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#82298B] to-[#2B3E8E] text-center">
            Ward-wise Attendance Summary
          </h2>

          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-100 dark:bg-slate-700">
                    <tr>
                      {["Ward", "Total Students", "Present", "Absent", "Long Absent"].map((h) => (
                        <th key={h} className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {attendance.map((w) => (
                      <tr key={w.ward} className="hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                        <td className="px-3 md:px-6 py-3 text-sm md:text-base dark:text-slate-300 whitespace-nowrap">{w.ward}</td>
                        <td className="px-3 md:px-6 py-3 text-sm md:text-base dark:text-slate-300">{w.total_students}</td>
                        <td className="px-3 md:px-6 py-3 text-sm md:text-base text-green-700 dark:text-green-400">{w.present}</td>
                        <td className="px-3 md:px-6 py-3 text-sm md:text-base text-red-600 dark:text-red-400">{w.absent}</td>
                        <td className="px-3 md:px-6 py-3 text-sm md:text-base text-orange-600 dark:text-orange-400">{w.long_absent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <BarChartComp
            data={attendance.map((w) => ({
              name: w.ward,
              Present: w.present,
              Absent: w.absent,
              LongAbsent: w.long_absent,
            }))}
          />
        </motion.div>

        {/* PIE CHART */}
        {/* PIE CHART */}
        <motion.div variants={itemVariants}>
          <AttendancePieChart
            data={[
              { name: "Present", value: attendance.reduce((a, b) => a + (b.present || 0), 0) },
              { name: "Absent", value: attendance.reduce((a, b) => a + (b.absent || 0), 0) },
              { name: "Long Absent", value: attendance.reduce((a, b) => a + (b.long_absent || 0), 0) },
            ]}
          />
        </motion.div>

        {/* CLASS ATTENDANCE */}
        {/* CLASS ATTENDANCE */}
        <motion.div variants={itemVariants}>
          <ClassAttendance data={classData} />
        </motion.div>

        {/* FILTERS */}
        {/* FILTERS */}
        <motion.div variants={itemVariants} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg rounded-2xl border border-white/50 dark:border-slate-700 p-6 transition-colors duration-300">
          <Filters
            onApply={(f) => {
              setFilters(f);
              fetchStudents(1, f);
            }}
          />
        </motion.div>

        {/* LEARNING DISTRIBUTION CHARTS */}
        {/* LEARNING DISTRIBUTION CHARTS */}
        <motion.div variants={itemVariants}>
          <LearningDistributionCharts />
        </motion.div>

        {/* DOMAIN CARDS */}
        {/* DOMAIN CARDS */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <DomainCard title="READING" color="#0284C7" total={totals.reading} levels={levels.reading} categories={categories.reading} />
          <DomainCard title="WRITING" color="#059669" total={totals.writing} levels={levels.writing} categories={categories.writing} />
          <DomainCard title="NUMERACY" color="#f97316" total={totals.numeracy} levels={levels.numeracy} categories={categories.numeracy} />
        </motion.div>

        {/* STUDENT TABLE */}
        {/* STUDENT TABLE */}
        <motion.div variants={itemVariants} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl rounded-2xl border border-white/50 dark:border-slate-700 overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r from-[#82298B] to-[#2B3E8E] px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <h3 className="text-lg md:text-xl font-bold text-white">Student Records</h3>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              {isExporting ? "Exporting..." : "Export to Excel"}
            </button>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-scroll">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="sticky top-0 bg-white dark:bg-slate-800 shadow-md z-10">
                <tr>
                  {[
                    "Name",
                    "Gender",
                    "Ward",
                    "School",
                    "Medium",
                    "Class",
                    "Reading",
                    "Writing",
                    "Numeracy",
                  ].map((h) => (
                    <th key={h} className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {students.map((s, i) => (
                  <tr key={s.id} className={`${i % 2 ? "bg-slate-50 dark:bg-slate-700/50" : "bg-white dark:bg-slate-800"} hover:bg-blue-50 dark:hover:bg-slate-700 transition`}>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium dark:text-slate-200 whitespace-nowrap">{s.student_name}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-sm md:text-base dark:text-slate-300">{s.gender}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-sm md:text-base dark:text-slate-300">{s.ward}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-sm md:text-base dark:text-slate-300 max-w-xs truncate" title={s.school_name}>{s.school_name}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">{mediumBadge(s.medium)}</td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">
                      {s.student_class || "-"}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4">{levelBadge(s.reading_level)}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">{levelBadge(s.writing_level)}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">{levelBadge(s.numeracy_level)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t dark:border-slate-700">
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              onChange={(p) => fetchStudents(p, filters)}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
