import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { downloadChart } from "../utils/downloadChart";

const COLORS = ["#10B981", "#EF4444", "#F97316"]; // Green, Red, Orange

export default function ClassAttendance({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <h2 className="text-2xl font-bold">Class-wise Attendance Summary</h2>
                <p className="text-indigo-100 mt-1">
                    Detailed attendance breakdown for each class.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <motion.div
                        key={item.class}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-5 flex flex-col transition-colors duration-300"
                    >
                        <div className="flex items-center justify-between mb-4 border-b dark:border-slate-700 pb-2">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                                {item.class}
                            </h3>
                            <button
                                onClick={() => downloadChart(`class-chart-${item.class.replace(/\s+/g, '-')}`, `class_${item.class.replace(/\s+/g, '_')}_attendance`)}
                                className="p-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
                                title="Download Chart"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            {/* MINI PIE CHART */}
                            <div id={`class-chart-${item.class.replace(/\s+/g, '-')}`} className="w-32 h-32 relative bg-white dark:bg-slate-800">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: "Present", value: Number(item.present) },
                                                { name: "Absent", value: Number(item.absent) },
                                                { name: "Long Absent", value: Number(item.long_absent) },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={50}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {COLORS.map((color, i) => (
                                                <Cell key={`cell-${i}`} fill={color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* STATS TABLE */}
                            <div className="flex-1 ml-4 text-sm">
                                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                                    <span className="text-slate-500 dark:text-slate-400">Total</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                                        {item.total_students}
                                    </span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                                    <span className="text-green-600 dark:text-green-400">Present</span>
                                    <div className="text-right">
                                        <span className="font-bold text-green-700 dark:text-green-500 block">{item.present}</span>
                                        <span className="text-xs text-green-600/70 dark:text-green-400/70">
                                            {((item.present / item.total_students) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                                    <span className="text-red-500 dark:text-red-400">Absent</span>
                                    <div className="text-right">
                                        <span className="font-bold text-red-600 dark:text-red-500 block">{item.absent}</span>
                                        <span className="text-xs text-red-500/70 dark:text-red-400/70">
                                            {((item.absent / item.total_students) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-orange-500 dark:text-orange-400">Long Abs</span>
                                    <div className="text-right">
                                        <span className="font-bold text-orange-600 dark:text-orange-500 block">
                                            {item.long_absent}
                                        </span>
                                        <span className="text-xs text-orange-500/70 dark:text-orange-400/70">
                                            {((item.long_absent / item.total_students) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
