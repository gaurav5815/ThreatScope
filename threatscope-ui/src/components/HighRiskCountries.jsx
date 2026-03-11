function HighRiskCountries({ threats, setSelectedCountry }) {

  const counts = {};

  threats.forEach(t => {

    if(t.severity === "High") {

      counts[t.country] = (counts[t.country] || 0) + 1;

    }

  });

  const sorted = Object.entries(counts)
  .sort((a,b)=>b[1]-a[1]);

  return(

    <div style={{
      background:"#0b0f1c",
      padding:"20px",
      borderRadius:"10px"
    }}>

      <h2>High Risk Threat Source</h2>

      {sorted.map(([country,count]) => (

        <div
          key={country}
          style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"8px",
            cursor:"pointer",
            borderBottom:"1px solid #222"
          }}

          onClick={()=>setSelectedCountry(country)}

        >

          <span>{country}</span>
          <span style={{color:"red"}}>{count}</span>

        </div>

      ))}

    </div>

  );

}

export default HighRiskCountries;