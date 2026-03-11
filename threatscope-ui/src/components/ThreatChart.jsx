import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ThreatChart({data}){

const countTypes = {};

data.forEach(t=>{
  countTypes[t.type] = (countTypes[t.type] || 0) + 1;
});

const chartData = Object.keys(countTypes).map(key=>({
  name:key,
  value:countTypes[key]
}));

const COLORS = ["#ff4d4d","#ffcc00","#3399ff","#66ff66"];

return(

<div>

<h2>Attack Type Distribution</h2>

<PieChart width={400} height={300}>
<Pie
data={chartData}
dataKey="value"
nameKey="name"
cx="50%"
cy="50%"
outerRadius={100}
label
>

{chartData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</div>

)

}

export default ThreatChart;