function ThreatTable({ threats }) {

  return (

    <div style={{
      background:"#0b0f1c",
      padding:"20px",
      borderRadius:"10px",
      marginTop:"20px"
    }}>

      <h2 style={{marginBottom:"10px"}}>Live Threat Feed</h2>

      <table style={{
        width:"100%",
        borderCollapse:"collapse",
        fontSize:"14px"
      }}>

        <thead>
          <tr style={{borderBottom:"1px solid #333"}}>
            <th>IP Address</th>
            <th>Country</th>
            <th>Attack Type</th>
            <th>Severity</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>

          {[...threats]
            .sort((a,b)=> new Date(b.time) - new Date(a.time))
            .map((t,i)=>(

            <tr key={i} style={{borderBottom:"1px solid #222"}}>

              <td>{t.ip}</td>
              <td>{t.country}</td>
              <td>{t.type}</td>

              <td style={{
                color:
                  t.severity==="High" ? "red" :
                  t.severity==="Medium" ? "orange" :
                  "#00ff88"
              }}>
                {t.severity}
              </td>

              <td>{t.time}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ThreatTable;