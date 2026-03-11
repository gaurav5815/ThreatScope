import React, { useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { ArcLayer, ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView } from '@deck.gl/core';
import useThreatStore from '../store';

// High-res world geojson for solid continents
const COUNTRY_GEOJSON = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 20,
  zoom: 1.5,
  pitch: 0,
  bearing: 0
};

export default function ThreatMap({ threats }) {
  const setSelectedCountry = useThreatStore(state => state.setSelectedCountry);
  const selectedCountry = useThreatStore(state => state.selectedCountry);

  // Background Starry style (simulated with CSS for performance)
  const mapContainerStyle = {
    backgroundImage: `radial-gradient(ellipse at bottom, #1f272a 0%, #151a1d 100%)`,
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  };

  // Base Earth - solid polygons
  const earthLayer = new GeoJsonLayer({
    id: 'base-map',
    data: COUNTRY_GEOJSON,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    getLineColor: [20, 25, 23, 150],  // Dark border
    getFillColor: d => {
      // Highlight selected country
      if (selectedCountry && d.properties.name === selectedCountry) {
        return [70, 95, 85, 255]; // Lighter highlight
      }
      return [46, 55, 53, 255]; // Solid dark grey/green continents (Kaspersky style)
    },
    getPointRadius: 100,
    getLineWidth: 1,
    pickable: true,
    onClick: (info) => {
       if (info.object) {
         setSelectedCountry(info.object.properties.name);
       } else {
         setSelectedCountry(null);
       }
    }
  });

  const recentThreats = useMemo(() => threats.slice(0, 15), [threats]);

  // Arcs between source and target
  const arcLayer = new ArcLayer({
    id: 'arcs',
    data: recentThreats,
    getSourcePosition: d => [d.source_lng, d.source_lat],
    getTargetPosition: d => [d.target_lng, d.target_lat],
    getSourceColor: (d, {index}) => [255, 51, 51, Math.max(20, 255 - index * 15)],   // Red for source, fade out
    getTargetColor: (d, {index}) => [0, 204, 255, Math.max(20, 255 - index * 15)],  // Cyan for target, fade out
    getWidth: d => (d.severity === 'Critical' ? 3 : d.severity === 'High' ? 2 : 1),
    pickable: true,
  });

  // Source nodes
  const scatterLayer = new ScatterplotLayer({
    id: 'scatter-source',
    data: recentThreats,
    getPosition: d => [d.source_lng, d.source_lat],
    getFillColor: (d, {index}) => [255, 51, 51, Math.max(20, 255 - index * 15)],
    getRadius: 100000,
    radiusScale: 2,
    radiusMinPixels: 3,
    radiusMaxPixels: 8,
    pickable: true,
  });

  // Target nodes (impact)
  const impactLayer = new ScatterplotLayer({
    id: 'scatter-target',
    data: recentThreats,
    getPosition: d => [d.target_lng, d.target_lat],
    getFillColor: (d, {index}) => [0, 204, 255, Math.max(20, 255 - index * 15)],
    getRadius: 80000,
    radiusScale: 1.5,
    radiusMinPixels: 2,
    radiusMaxPixels: 6,
    pickable: true,
  });

  return (
    <div style={mapContainerStyle} className="bg-[#151a1d]">
      {/* CSS Stars overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0))',
             backgroundRepeat: 'repeat',
             backgroundSize: '200px 200px'
           }}
      />
      
      <DeckGL
        views={new GlobeView({})}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[earthLayer, arcLayer, scatterLayer, impactLayer]}
        parameters={{
          clearColor: [0, 0, 0, 0], // Transparent to show the CSS background
          depthTest: true
        }}
        onClick={(info) => {
          // If clicked on empty space (not the earth/country), deselect
          if (!info.object) {
            setSelectedCountry(null);
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Glowing atmosphere ring via CSS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[70vh] rounded-full shadow-[0_0_120px_40px_rgba(40,65,55,0.3)] pointer-events-none -z-10" />
    </div>
  );
}