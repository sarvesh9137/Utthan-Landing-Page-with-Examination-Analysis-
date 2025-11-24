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

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Examination Analytics</h1>
          <p className="text-blue-100 text-lg mt-3">
            Analyze student performance across wards.
          </p>
        </div>

        {/* WARD ATTENDANCE SUMMARY */}
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border dark:border-slate-700 p-6 space-y-6 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
            Ward-wise Attendance Summary
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  {["Ward", "Total Students", "Present", "Absent", "Long Absent"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {attendance.map((w) => (
                  <tr key={w.ward} className="hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                    <td className="px-6 py-3 dark:text-slate-300">{w.ward}</td>
                    <td className="px-6 py-3 dark:text-slate-300">{w.total_students}</td>
                    <td className="px-6 py-3 text-green-700 dark:text-green-400">{w.present}</td>
                    <td className="px-6 py-3 text-red-600 dark:text-red-400">{w.absent}</td>
                    <td className="px-6 py-3 text-orange-600 dark:text-orange-400">{w.long_absent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <BarChartComp
            data={attendance.map((w) => ({
              name: w.ward,
              Present: w.present,
              Absent: w.absent,
              LongAbsent: w.long_absent,
            }))}
          />
        </div>

        {/* PIE CHART */}
        <AttendancePieChart
          data={[
            { name: "Present", value: attendance.reduce((a, b) => a + (b.present || 0), 0) },
            { name: "Absent", value: attendance.reduce((a, b) => a + (b.absent || 0), 0) },
            { name: "Long Absent", value: attendance.reduce((a, b) => a + (b.long_absent || 0), 0) },
          ]}
        />

        {/* CLASS ATTENDANCE */}
        <ClassAttendance data={classData} />

        {/* FILTERS */}
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl border dark:border-slate-700 p-6 transition-colors duration-300">
          <Filters
            onApply={(f) => {
              setFilters(f);
              fetchStudents(1, f);
            }}
          />
        </div>

        {/* LEARNING DISTRIBUTION CHARTS */}
        <LearningDistributionCharts />

        {/* DOMAIN CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          <DomainCard title="READING" color="#0284C7" total={totals.reading} levels={levels.reading} categories={categories.reading} />
          <DomainCard title="WRITING" color="#059669" total={totals.writing} levels={levels.writing} categories={categories.writing} />
          <DomainCard title="NUMERACY" color="#f97316" total={totals.numeracy} levels={levels.numeracy} categories={categories.numeracy} />
        </div>

        {/* STUDENT TABLE */}
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border dark:border-slate-700 overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Student Records</h3>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-scroll">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="sticky top-0 bg-white dark:bg-slate-800 shadow-md">
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
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {students.map((s, i) => (
                  <tr key={s.id} className={`${i % 2 ? "bg-slate-50 dark:bg-slate-700/50" : "bg-white dark:bg-slate-800"} hover:bg-blue-50 dark:hover:bg-slate-700 transition`}>
                    <td className="px-6 py-4 font-medium dark:text-slate-200">{s.student_name}</td>
                    <td className="px-6 py-4 dark:text-slate-300">{s.gender}</td>
                    <td className="px-6 py-4 dark:text-slate-300">{s.ward}</td>
                    <td className="px-6 py-4 dark:text-slate-300">{s.school_name}</td>
                    <td className="px-6 py-4">{mediumBadge(s.medium)}</td>

                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                      {s.student_class || "-"}
                    </td>

                    <td className="px-6 py-4">{levelBadge(s.reading_level)}</td>
                    <td className="px-6 py-4">{levelBadge(s.writing_level)}</td>
                    <td className="px-6 py-4">{levelBadge(s.numeracy_level)}</td>
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
        </div>
      </div>
    </section>
  );
}
