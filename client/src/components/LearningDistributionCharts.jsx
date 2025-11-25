import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { getLevels, getWardAttendance, getClassAttendance } from "../api";
import { downloadChart } from "../utils/downloadChart";

const COLORS = ["#EF4444", "#F97316", "#FACC15", "#EAB308", "#22C55E", "#15803D"]; // L0-L5 Colors

export default function LearningDistributionCharts() {
    const [filters, setFilters] = useState({ class: "", ward: "" });
    const [data, setData] = useState({ reading: [], writing: [], numeracy: [] });
    const [wards, setWards] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        loadOptions();
    }, []);

    useEffect(() => {
        fetchData();
    }, [filters]);

    const loadOptions = async () => {
        // Fetch available wards and classes for dropdowns
        const wardRes = await getWardAttendance();
        if (wardRes) setWards(wardRes.map((w) => w.ward));

        const classRes = await getClassAttendance();
        if (classRes) setClasses(classRes.map((c) => c.class));
    };

    const fetchData = async () => {
        const subjects = ["reading", "writing", "numeracy"];
        const newData = {};

        for (let sub of subjects) {
            const res = await getLevels(sub, filters);
            newData[sub] = (res || []).map((item) => ({
                name: item.level,
                value: Number(item.total_students),
                percentage: item.percentage,
            }));
        }
        setData(newData);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const ChartSection = ({ title, chartData, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center"
        >
            <div className="w-full flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${color}`}></span>
                    {title}
                </h3>
                <button
                    onClick={() => {
                        const chartId = `chart-${title.toLowerCase().replace(/\s+/g, '-')}`;
                        const filename = `${title.toLowerCase().replace(/\s+/g, '_')}_distribution`;
                        downloadChart(chartId, filename);
                    }}
                    className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                    title="Download Chart"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                </button>
            </div>
            <div id={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            label={({ name, percentage }) => `${name} (${percentage}%)`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );

    return (
        <section className="space-y-8">
            {/* FILTERS */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                    Learning Distribution Analysis
                </h2>
                <div className="flex gap-4 items-center">
                    <select
                        name="class"
                        value={filters.class}
                        onChange={handleFilterChange}
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">All Classes</option>
                        {classes.map((c) => (
                            <option key={c} value={c}>
                                Class {c}
                            </option>
                        ))}
                    </select>

                    <select
                        name="ward"
                        value={filters.ward}
                        onChange={handleFilterChange}
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">All Wards</option>
                        {wards.map((w) => (
                            <option key={w} value={w}>
                                Ward {w}
                            </option>
                        ))}
                    </select>

                    {(filters.class || filters.ward) && (
                        <button
                            onClick={() => setFilters({ class: "", ward: "" })}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>
            </div>

            {/* CHARTS GRID */}
            <div className="grid md:grid-cols-3 gap-8">
                <ChartSection title="Reading Levels" chartData={data.reading} color="bg-blue-500" />
                <ChartSection title="Writing Levels" chartData={data.writing} color="bg-green-500" />
                <ChartSection title="Numeracy Levels" chartData={data.numeracy} color="bg-orange-500" />
            </div>
        </section>
    );
}
