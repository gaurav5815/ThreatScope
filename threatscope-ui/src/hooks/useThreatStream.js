import { useEffect } from 'react';
import useThreatStore from '../store';

const useThreatStream = (url = 'ws://localhost:8000/ws/threats') => {
  const addThreat = useThreatStore((state) => state.addThreat);
  const setConnectionStatus = useThreatStore((state) => state.setConnectionStatus);

  useEffect(() => {
    let ws;
    let reconnectTimer;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('Connected to Threat Stream');
        setConnectionStatus(true);
      };

      ws.onmessage = (event) => {
        try {
          const threat = JSON.parse(event.data);

          // Force valid GeoJSON names and realistic coordinates
          const COUNTRY_LOCATIONS = {
            "United States of America": [-95.71, 37.09], "China": [104.19, 35.86],
            "Russia": [105.31, 61.52], "Iran": [53.68, 32.42],
            "Brazil": [-51.92, -14.23], "India": [78.96, 20.59],
            "Germany": [10.45, 51.16], "United Kingdom": [-3.43, 55.37],
            "Japan": [138.25, 36.20], "Australia": [-133.77, -25.27],
            "France": [2.21, 46.22], "Canada": [-106.34, 56.13],
            "Cameroon": [12.35, 7.36], "South Africa": [22.93, -30.55],
            "Mexico": [-102.55, 23.63]
          };
          const names = Object.keys(COUNTRY_LOCATIONS);
          const src = names[Math.floor(Math.random() * names.length)];
          const tgt = names[Math.floor(Math.random() * names.length)];

          addThreat({
            ...threat,
            source_country: src,
            target_country: tgt,
            source_lng: COUNTRY_LOCATIONS[src][0] + (Math.random() * 5 - 2.5),
            source_lat: COUNTRY_LOCATIONS[src][1] + (Math.random() * 5 - 2.5),
            target_lng: COUNTRY_LOCATIONS[tgt][0] + (Math.random() * 5 - 2.5),
            target_lat: COUNTRY_LOCATIONS[tgt][1] + (Math.random() * 5 - 2.5),
          });
        } catch (err) {
          console.error('Failed to parse threat event');
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from Threat Stream');
        setConnectionStatus(false);
        // Attempt to reconnect after 3 seconds
        reconnectTimer = setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        ws.close();
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      clearTimeout(reconnectTimer);
    };
  }, [url, addThreat, setConnectionStatus]);
};

export default useThreatStream;
