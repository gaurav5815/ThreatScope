import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

function SeverityTimeline({ threats }) {

  const grouped = {};

  threats.forEach(t => {

    const date = t.time.slice(0,10);

    if(!grouped[date]) {
      grouped[date] = { date, High:0, Medium:0, Low:0 };
    }

    grouped[date][t.severity]++;

  });

  const data = Object.values(grouped);

  return (

    <div>

      <h2>Distribution of Severity</h2>

      <LineChart width={600} height={300} data={data}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="date"/>
        <YAxis/>

        <Tooltip/>
        <Legend/>

        <Line type="monotone" dataKey="High" stroke="#ff0000"/>
        <Line type="monotone" dataKey="Medium" stroke="#ffa500"/>
        <Line type="monotone" dataKey="Low" stroke="#00ff88"/>

      </LineChart>

    </div>

  );

}

export default SeverityTimeline;