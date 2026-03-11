import React, { useState } from 'react';
import useThreatStore from './store';
import useThreatStream from './hooks/useThreatStream';
import ThreatMap from './components/ThreatMap';
import { Radar, Wifi, WifiOff, Globe, ZoomIn, ZoomOut, Database, X } from 'lucide-react';

export default function App() {
  useThreatStream('ws://localhost:8000/ws/threats');

  const threats = useThreatStore(state => state.threats);
  const isConnected = useThreatStore(state => state.isConnected);
  const selectedCountry = useThreatStore(state => state.selectedCountry);
  const setSelectedCountry = useThreatStore(state => state.setSelectedCountry);

  const filteredThreats = selectedCountry
    ? threats.filter(t => t.target_country === selectedCountry || t.source_country === selectedCountry)
    : threats;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090a0f] text-slate-300 font-mono">
      
      {/* FULL SCREEN MAP */}
      <div className="absolute inset-0 z-0">
        <ThreatMap threats={filteredThreats} />
      </div>

      {/* TOP LEFT HEADER OVERLAY */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <Radar className="text-[#00ffcc] animate-pulse" size={40} />
          <div>
            <h1 className="text-3xl font-bold text-white tracking-[0.2em]">
              THREAT<span className="text-[#00ffcc]">SCOPE</span>
            </h1>
            <p className="text-xs text-[#00ffcc]/70 tracking-widest mt-1">CYBERTHREAT REAL-TIME MAP</p>
          </div>
        </div>
      </div>

      {/* TOP RIGHT CONTROLS OVERLAY */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        <div className="glass-panel px-4 py-2 flex items-center justify-center gap-2 text-xs border border-[#00ffcc]/30 bg-[#00ffcc]/5 text-[#00ffcc]">
          {isConnected ? <Wifi size={14} /> : <WifiOff size={14} className="text-red-500" />}
          {isConnected ? "LIVE" : "CONNECTING..."}
        </div>
        
        <div className="glass-panel p-2 flex flex-col items-center gap-3 border border-white/10 bg-black/40 backdrop-blur-md mt-4">
          <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Global View" onClick={() => setSelectedCountry(null)}><Globe size={20} className="text-white/70" /></button>
          <div className="w-full h-px bg-white/10" />
          <button className="p-2 hover:bg-white/10 rounded transition-colors"><ZoomIn size={20} className="text-white/70" /></button>
          <button className="p-2 hover:bg-white/10 rounded transition-colors"><ZoomOut size={20} className="text-white/70" /></button>
          <div className="w-full h-px bg-white/10" />
          <button className="p-2 hover:bg-white/10 rounded transition-colors flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/50 tracking-widest leading-none">DEMO</span>
            <span className="text-[10px] text-[#00ffcc] font-bold leading-none">ON</span>
          </button>
        </div>
      </div>

      {/* BOTTOM LEGEND OVERLAY (KASPERSKY STYLE) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex pointer-events-none">
        <div className="flex items-center border border-white/10 bg-black/40 backdrop-blur-md pointer-events-auto">
          {[
            { id: 'OAS', color: '#00ff66', name: 'On-Access Scan' },
            { id: 'ODS', color: '#ff3333', name: 'On-Demand Scan' },
            { id: 'MAV', color: '#ff9900', name: 'Mail Anti-Virus' },
            { id: 'WAV', color: '#00ccff', name: 'Web Anti-Virus' },
            { id: 'IDS', color: '#ff00ff', name: 'Intrusion Detection' },
            { id: 'VUL', color: '#ffff00', name: 'Vulnerability' },
            { id: 'KAS', color: '#9900ff', name: 'Anti-Spam' },
            { id: 'RMW', color: '#00ffcc', name: 'Ransomware' },
          ].map((item, i) => (
            <div key={item.id} className="group relative px-6 py-3 border-r border-white/10 last:border-0 hover:bg-white/5 cursor-pointer transition-colors flex flex-col items-center">
              <span className="text-[10px] text-white/40 mb-1">0</span>
              <span style={{ color: item.color }} className="text-xs font-bold tracking-widest">{item.id}</span>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 whitespace-nowrap px-3 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COUNTRY DRILL-DOWN PANEL (LEFT SIDE) */}
      {selectedCountry && (
        <div className="absolute top-32 left-6 z-10 w-80 bg-black/60 backdrop-blur-md border border-white/20 p-4 animate-fade-in shadow-2xl shadow-black">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 uppercase tracking-widest">{selectedCountry}</h2>
              <p className="text-[10px] text-[#00ffcc] tracking-widest">REGION INTELLIGENCE</p>
            </div>
            <button onClick={() => setSelectedCountry(null)} className="text-white/50 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
             <div className="bg-white/5 p-3 border border-white/10">
               <div className="text-[10px] text-white/50 mb-1 tracking-widest">INCIDENTS DETECTED</div>
               <div className="text-2xl font-bold text-white">{filteredThreats.length}</div>
             </div>
             
             <div className="bg-white/5 p-3 border border-white/10">
               <div className="text-[10px] text-white/50 mb-1 tracking-widest">RECENT TARGETS</div>
               <div className="space-y-2 mt-2">
                 {filteredThreats.filter(t => t.target_country === selectedCountry).slice(0,3).map((t, i) => (
                   <div key={i} className="text-xs flex justify-between items-center bg-black/40 p-1">
                     <span className="text-white/80">{t.target_ip}</span>
                     <span className="text-[#00ffcc] text-[10px] uppercase">{t.attack_type}</span>
                   </div>
                 ))}
                 {filteredThreats.filter(t => t.target_country === selectedCountry).length === 0 && (
                   <div className="text-xs text-white/40 italic">No incoming threats.</div>
                 )}
               </div>
             </div>

             <div className="bg-white/5 p-3 border border-red-500/20">
               <div className="text-[10px] text-red-500/80 mb-1 tracking-widest">OUTBOUND ATTACKS</div>
               <div className="space-y-2 mt-2">
                 {filteredThreats.filter(t => t.source_country === selectedCountry).slice(0,3).map((t, i) => (
                   <div key={i} className="text-xs flex justify-between items-center bg-black/40 p-1">
                     <span className="text-white/80">→ {t.target_country}</span>
                     <span className="text-red-500 text-[10px] uppercase">{t.attack_type}</span>
                   </div>
                 ))}
                  {filteredThreats.filter(t => t.source_country === selectedCountry).length === 0 && (
                   <div className="text-xs text-white/40 italic">No outgoing threats.</div>
                 )}
               </div>
             </div>
          </div>
        </div>
      )}


      {/* FEED FLOATING PANEL (RIGHT SIDE) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-10 w-80 max-h-[60vh] flex flex-col gap-2 mt-8 pointer-events-none">
        <div className="flex items-center gap-2 mb-2 bg-black/60 backdrop-blur-md border border-white/10 p-2 w-max pointer-events-auto">
          <Database size={14} className="text-[#00ffcc]" />
          <span className="text-xs text-white tracking-widest">LIVE EVENT STREAM</span>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-2 pointer-events-auto">
          {filteredThreats.slice(0, 20).map((threat, idx) => {
             const typeColor = threat.severity === 'Critical' ? 'text-red-500' :
                               threat.severity === 'High' ? 'text-[#ff9900]' : 'text-[#00ccff]';
             const typeBorder = threat.severity === 'Critical' ? 'border-red-500/30 bg-black/60' :
                                threat.severity === 'High' ? 'border-[#ff9900]/30 bg-black/60' : 'border-[#00ccff]/30 bg-black/60';
             
             return (
              <div key={idx} className={`p-3 border ${typeBorder} backdrop-blur-md flex flex-col gap-1 text-[11px] animate-fade-in`}>
                <div className="flex justify-between items-center mb-1 border-b border-white/10 pb-1">
                   <span className={`font-bold uppercase tracking-widest ${typeColor}`}>{threat.attack_type}</span>
                   <span className="text-white/40">{new Date(threat.timestamp).toLocaleTimeString([], {hourCycle: 'h23'})}</span>
                </div>
                <div className="text-white/90 font-bold">{threat.source_ip} <span className="text-white/30 font-normal">→</span> {threat.target_ip}</div>
                <div className="text-white/60">{threat.source_country} <span className="text-white/30">to</span> {threat.target_country}</div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}