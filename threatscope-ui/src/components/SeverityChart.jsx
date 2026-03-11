import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function SeverityChart({ threats }) {

  const counts = {
    High: 0,
    Medium: 0,
    Low: 0
  };

  threats.forEach(t => {
    counts[t.severity] += 1;
  });

  const data = [
    { name: "High", value: counts.High },
    { name: "Medium", value: counts.Medium },
    { name: "Low", value: counts.Low }
  ];

  const COLORS = ["#ff0000", "#ffa500", "#00ff88"];

  return (

    <div>

      <h2>Severity Distribution</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>

  );
}

export default SeverityChart;