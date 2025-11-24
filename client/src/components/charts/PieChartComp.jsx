import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#10B981", "#FBBF24", "#EF4444"];

export default function PieChartComp({ data }) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={95} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
