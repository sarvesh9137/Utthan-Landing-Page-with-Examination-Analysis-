import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { downloadChart, copyChartToClipboard } from "../../utils/downloadChart";

const COLORS = ["#10B981", "#EF4444", "#F97316"]; // Green (Present), Red (Absent), Orange (Long Absent)

export default function AttendancePieChart({ data }) {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for 3D effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="w-full h-96 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col items-center justify-center overflow-hidden relative"
            style={{ perspective: "1000px" }}
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

            <div className="w-full flex items-center justify-between mb-4 relative z-10">
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900"
                >
                    Overall Attendance Distribution
                </motion.h3>
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyChartToClipboard('attendance-pie-chart')}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium shadow-sm"
                        title="Copy Chart to Clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadChart('attendance-pie-chart', 'overall_attendance_distribution')}
                        className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium shadow-md"
                        title="Download Chart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                    </motion.button>
                </div>
            </div>

            <motion.div
                id="attendance-pie-chart"
                className="w-full h-full relative"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* 3D shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-lg blur-xl transform translate-z-[-20px]" />

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
                            animationBegin={0}
                            animationDuration={800}
                            animationEasing="ease-out"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    style={{
                                        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
}
