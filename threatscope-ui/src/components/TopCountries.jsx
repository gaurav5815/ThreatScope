function TopCountries({ threats }) {

  const counts = {};

  threats.forEach(t=>{
    counts[t.country] = (counts[t.country] || 0) + 1;
  });

  const sorted = Object.entries(counts)
  .sort((a,b)=>b[1]-a[1])
  .slice(0,5);

  return(

    <div style={{
      background:"#111",
      padding:"20px",
      borderRadius:"10px"
    }}>

      <h3>Top Threat Countries</h3>

      {sorted.map(([country,count],i)=>(
        <p key={i}>{country} — {count}</p>
      ))}

    </div>

  )

}

export default TopCountries;