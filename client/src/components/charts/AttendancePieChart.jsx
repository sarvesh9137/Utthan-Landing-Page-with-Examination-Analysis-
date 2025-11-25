import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { downloadChart, copyChartToClipboard } from "../../utils/downloadChart";

const COLORS = ["#10B981", "#EF4444", "#F97316"]; // Green (Present), Red (Absent), Orange (Long Absent)

export default function AttendancePieChart({ data }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full h-96 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex flex-col items-center justify-center"
        >
            <div className="w-full flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-700">
                    Overall Attendance Distribution
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => copyChartToClipboard('attendance-pie-chart')}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                        title="Copy Chart to Clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    </button>
                    <button
                        onClick={() => downloadChart('attendance-pie-chart', 'overall_attendance_distribution')}
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
            </div>
            <div id="attendance-pie-chart" className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
