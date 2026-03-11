import { Activity, ShieldAlert, Globe, ServerCrash } from 'lucide-react';

export default function ThreatStats({ threats }) {
  const total = threats.length;
  const critical = threats.filter(t => t.severity === 'Critical').length;
  const high = threats.filter(t => t.severity === 'High').length;
  
  // Unique targeted countries
  const countries = new Set(threats.map(t => t.target_country)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="glass-panel p-4 flex items-center justify-between">
        <div>
          <p className="text-soc-300 text-sm font-mono mb-1">Total Events</p>
          <h2 className="text-3xl font-bold text-white">{total}</h2>
        </div>
        <div className="p-3 bg-neon-blue/10 rounded-lg">
          <Activity className="text-neon-blue" size={24} />
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center justify-between neon-border">
        <div>
          <p className="text-soc-300 text-sm font-mono mb-1">Critical Threats</p>
          <h2 className="text-3xl font-bold neon-text-red">{critical}</h2>
        </div>
        <div className="p-3 bg-neon-red/10 rounded-lg">
          <ShieldAlert className="text-neon-red" size={24} />
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center justify-between">
        <div>
          <p className="text-soc-300 text-sm font-mono mb-1">High Severity</p>
          <h2 className="text-3xl font-bold text-orange-500">{high}</h2>
        </div>
        <div className="p-3 bg-orange-500/10 rounded-lg">
          <ServerCrash className="text-orange-500" size={24} />
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center justify-between">
        <div>
          <p className="text-soc-300 text-sm font-mono mb-1">Targeted Regions</p>
          <h2 className="text-3xl font-bold text-white">{countries}</h2>
        </div>
        <div className="p-3 bg-neon-blue/10 rounded-lg">
          <Globe className="text-neon-blue" size={24} />
        </div>
      </div>
    </div>
  );
}