import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function BarChartComp({ data }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis */}
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />

          {/* Y-axis */}
          <YAxis />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{
              borderRadius: "10px",
              borderColor: "#ddd"
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: 10 }}
          />

          {/* STACKED BARS */}
          <Bar
            dataKey="Present"
            stackId="attendance"
            fill="#22c55e"
            animationDuration={1200}
          />
          <Bar
            dataKey="Absent"
            stackId="attendance"
            fill="#ef4444"
            animationDuration={1400}
          />
          <Bar
            dataKey="LongAbsent"
            stackId="attendance"
            fill="#f59e0b"
            animationDuration={1600}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
