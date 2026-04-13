// import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useEffect, useRef, useState } from 'react'
// import React from 'react'

// delete L.Icon.Default.prototype._getIconUrl

// // ===================== ICONS =====================

// function makeShipIcon(color, angle = 0) {
//   const hex =
//     color === 'green' ? '#00e5a0' :
//     color === 'amber' ? '#ffb340' :
//     color === 'red'   ? '#ff4d6a' :
//     '#7aa5c8'

//   const svg = `
//     <div style="transform: rotate(${angle}deg); pointer-events: none;">
//       <svg width="26" height="26" viewBox="0 0 24 24" style="pointer-events: none;">
//         <polygon points="12,2 22,22 12,18 2,22" fill="${hex}" />
//       </svg>
//     </div>
//   `

//   return L.divIcon({
//     html: svg,
//     className: '',
//     iconSize: [26, 26],
//     iconAnchor: [13, 13],
//     popupAnchor: [0, -14]
//   })
// }

// function makePortIcon() {
//   const svg = `
//     <svg width="28" height="28">
//       <circle cx="14" cy="14" r="12" fill="rgba(0,180,255,0.15)" stroke="#00b4ff"/>
//       <circle cx="14" cy="14" r="5" fill="#00b4ff"/>
//     </svg>`

//   return L.divIcon({
//     html: svg,
//     className: '',
//     iconSize: [28, 28],
//     iconAnchor: [14, 14],
//   })
// }

// // ===================== HELPERS =====================

// function getEtaColor(eta) {
//   if (!eta) return 'gray'
//   const h = parseFloat(eta)
//   if (h < 1) return 'green'
//   if (h <= 4) return 'amber'
//   return 'red'
// }

// // ===================== RADAR =====================

// function RadarOverlay({ selectedPort, ports, range }) {
//   const map = useMap()
//   const [angle, setAngle] = useState(0)
//   const [radiusPx, setRadiusPx] = useState(200)

//   useEffect(() => {
//     const id = setInterval(() => {
//       setAngle(a => (a + 2) % 360)
//     }, 30)
//     return () => clearInterval(id)
//   }, [])

//   const selected = ports.find(p => p.name === selectedPort)
//   if (!selected) return null

//   useEffect(() => {
//     if (!map || !selected) return

//     const updateRadius = () => {
//       const center = map.latLngToContainerPoint([selected.lat, selected.lon])
//       const edge = map.latLngToContainerPoint([
//         selected.lat + (range / 111),
//         selected.lon
//       ])
//       setRadiusPx(Math.abs(edge.y - center.y))
//     }

//     updateRadius()
//     map.on('zoom', updateRadius)
//     map.on('move', updateRadius)

//     return () => {
//       map.off('zoom', updateRadius)
//       map.off('move', updateRadius)
//     }
//   }, [map, selected, range])

//   const centerPoint = map.latLngToContainerPoint([selected.lat, selected.lon])

//   return (
//     <>
//       <div
//         style={{
//           position: 'absolute',
//           left: centerPoint.x,
//           top: centerPoint.y,
//           width: radiusPx,
//           height: 2,
//           background: '#00ffb4',
//           transformOrigin: '0% 50%',
//           transform: `rotate(${angle}deg)`,
//           boxShadow: '0 0 10px #00ffb4',
//           pointerEvents: 'none',
//           zIndex: 500
//         }}
//       />
//       <div
//         style={{
//           position: 'absolute',
//           left: centerPoint.x - 4,
//           top: centerPoint.y - 4,
//           width: 8,
//           height: 8,
//           borderRadius: '50%',
//           background: '#00ffb4',
//           boxShadow: '0 0 10px #00ffb4',
//           pointerEvents: 'none',
//           zIndex: 500
//         }}
//       />
//     </>
//   )
// }

// // ===================== AUTO ZOOM =====================

// // function FitBounds({ selectedPort, ports, range }) {
// //   const map = useMap()
// //   const doneRef = useRef(false)

// //   useEffect(() => {
// //     doneRef.current = false
// //   }, [selectedPort, range])

// //   useEffect(() => {
// //     if (!selectedPort || doneRef.current) return

// //     const p = ports.find(p => p.name === selectedPort)
// //     if (!p) return

// //     const delta = range / 111

// //     map.fitBounds([
// //       [p.lat - delta, p.lon - delta],
// //       [p.lat + delta, p.lon + delta]
// //     ], { padding: [40, 40] })

// //     doneRef.current = true
// //   }, [selectedPort, range, ports, map])

// //   return null
// // }

// function FitBounds({ selectedPort, ports, range }) {
//   const map = useMap()
//   const prevPortRef = useRef('')
//   const prevRangeRef = useRef(null)

//   useEffect(() => {
//     if (!selectedPort) return

//     const portChanged = selectedPort !== prevPortRef.current
//     const rangeChanged = range !== prevRangeRef.current

//     if (!portChanged && !rangeChanged) return

//     const p = ports.find(p => p.name === selectedPort)
//     if (!p) return

//     const delta = range / 111

//     map.fitBounds([
//       [p.lat - delta, p.lon - delta],
//       [p.lat + delta, p.lon + delta]
//     ], { padding: [40, 40] })

//     prevPortRef.current = selectedPort
//     prevRangeRef.current = range

//   }, [selectedPort, range, ports, map])

//   return null
// }


// // ===================== MAIN =====================

// export default function MapView({ ships, selectedPort, ports, range }) {

//   const selected = ports.find(p => p.name === selectedPort)
//   const pathsRef = useRef({})

//   return (
//     <MapContainer
//       center={[20, 80]}
//       zoom={5}
//       style={{ height: '100%', width: '100%' }}
//     >
//       <TileLayer
//         url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//       />

//       <FitBounds selectedPort={selectedPort} ports={ports} range={range} />

//       {selected && (
//         <>
//           <Marker position={[selected.lat, selected.lon]} icon={makePortIcon()} />

//           <Circle
//             center={[selected.lat, selected.lon]}
//             radius={range * 1000}
//             pathOptions={{
//               color: '#00b4ff',
//               dashArray: '6 6',
//               fillOpacity: 0.05
//             }}
//           />

//           <RadarOverlay selectedPort={selectedPort} ports={ports} range={range} />
//         </>
//       )}

//       {ships.map(ship => {

//         if (!pathsRef.current[ship.mmsi]) {
//           pathsRef.current[ship.mmsi] = []
//         }

//         const path = pathsRef.current[ship.mmsi]
//         path.push([ship.lat, ship.lon])
//         if (path.length > 20) path.shift()

//         const color = getEtaColor(ship.eta)
//         const angle = ship.heading || ship.cog || 0
//         const colorHex =
//           color === 'green' ? '#00e5a0' :
//           color === 'amber' ? '#ffb340' :
//           color === 'red'   ? '#ff4d6a' :
//           '#7aa5c8'

//         return (
//           <React.Fragment key={ship.mmsi}>

//             {path.length > 1 && (
//               <Polyline
//                 positions={path}
//                 pathOptions={{ color: colorHex, weight: 2, opacity: 0.6 }}
//               />
//             )}

//             <Marker
//               position={[ship.lat, ship.lon]}
//               icon={makeShipIcon(color, angle)}
//               eventHandlers={{
//                 click: (e) => {
//                   e.originalEvent.stopPropagation()
//                   setTimeout(() => e.target.openPopup(), 10)
//                 }
//               }}
//             >
//               <Popup>
//                 <div style={{
//                   fontFamily: 'monospace',
//                   fontSize: '12px',
//                   color: '#e8f4ff',
//                   lineHeight: '1.8',
//                   minWidth: '200px'
//                 }}>
//                   <strong style={{ color: colorHex, fontSize: '13px' }}>
//                     {ship.name || 'Unknown Vessel'}
//                   </strong><br/>
//                   <span style={{ color: '#7aa5c8' }}>MMSI:</span> {ship.mmsi}<br/>
//                   <span style={{ color: '#7aa5c8' }}>Distance:</span> {ship.distanceKm} km<br/>
//                   <span style={{ color: '#7aa5c8' }}>Speed:</span> {ship.sog ?? 0} kn<br/>
//                   <span style={{ color: '#7aa5c8' }}>Heading:</span> {ship.heading ?? '—'}°<br/>
//                   <span style={{ color: '#7aa5c8' }}>COG:</span> {ship.cog ?? '—'}°<br/>
//                   <span style={{ color: '#7aa5c8' }}>ETA:</span>{' '}
//                   <span style={{ color: colorHex }}>{ship.eta ?? 'Anchored'}</span>
//                 </div>
//               </Popup>
//             </Marker>

//           </React.Fragment>
//         )
//       })}

//     </MapContainer>
//   )
// }




import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import React from 'react'

delete L.Icon.Default.prototype._getIconUrl

// ===================== ICONS =====================

function makeShipIcon(color, angle = 0, riskScore = 0) {
  const hex =
    color === 'green' ? '#00e5a0' :
    color === 'amber' ? '#ffb340' :
    color === 'red'   ? '#ff4d6a' :
    '#7aa5c8'

  const isHigh = riskScore >= 70

  const pulseRing = isHigh ? `
    <div style="
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 40px; height: 40px;
      border-radius: 50%;
      border: 1.5px solid #ff4d6a;
      animation: pulseRing 1.5s ease-out infinite;
      pointer-events: none;
    "></div>
  ` : ''

  const svg = `
    <style>
      @keyframes pulseRing {
        0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
      }
    </style>
    <div style="
      position: relative;
      width: 26px; height: 26px;
      display: flex; align-items: center; justify-content: center;
    ">
      ${pulseRing}
      <div style="transform: rotate(${angle}deg); pointer-events: none; position: relative; z-index: 1;">
        <svg width="26" height="26" viewBox="0 0 24 24" style="pointer-events: none;">
          <polygon points="12,2 22,22 12,18 2,22" fill="${hex}" />
        </svg>
      </div>
    </div>
  `

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28]
  })
}

function makePortIcon() {
  const svg = `
    <svg width="28" height="28">
      <circle cx="14" cy="14" r="12" fill="rgba(0,180,255,0.15)" stroke="#00b4ff"/>
      <circle cx="14" cy="14" r="5" fill="#00b4ff"/>
    </svg>`

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

// ===================== HELPERS =====================

function getEtaColor(eta) {
  if (!eta) return 'gray'
  const h = parseFloat(eta)
  if (h < 1) return 'green'
  if (h <= 4) return 'amber'
  return 'red'
}

function getRiskLabel(score) {
  if (score >= 70) return { label: 'HIGH',   color: '#ff4d6a' }
  if (score >= 40) return { label: 'MEDIUM', color: '#ffb340' }
  return               { label: 'LOW',    color: '#00e5a0' }
}

// ===================== RADAR =====================

function RadarOverlay({ selectedPort, ports, range }) {
  const map = useMap()
  const [angle, setAngle] = useState(0)
  const [radiusPx, setRadiusPx] = useState(200)

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(a => (a + 2) % 360)
    }, 30)
    return () => clearInterval(id)
  }, [])

  const selected = ports.find(p => p.name === selectedPort)
  if (!selected) return null

  useEffect(() => {
    if (!map || !selected) return

    const updateRadius = () => {
      const center = map.latLngToContainerPoint([selected.lat, selected.lon])
      const edge = map.latLngToContainerPoint([
        selected.lat + (range / 111),
        selected.lon
      ])
      setRadiusPx(Math.abs(edge.y - center.y))
    }

    updateRadius()
    map.on('zoom', updateRadius)
    map.on('move', updateRadius)

    return () => {
      map.off('zoom', updateRadius)
      map.off('move', updateRadius)
    }
  }, [map, selected, range])

  const centerPoint = map.latLngToContainerPoint([selected.lat, selected.lon])

  return (
    <>
      <div style={{
        position: 'absolute',
        left: centerPoint.x,
        top: centerPoint.y,
        width: radiusPx,
        height: 2,
        background: '#00ffb4',
        transformOrigin: '0% 50%',
        transform: `rotate(${angle}deg)`,
        boxShadow: '0 0 10px #00ffb4',
        pointerEvents: 'none',
        zIndex: 500
      }} />
      <div style={{
        position: 'absolute',
        left: centerPoint.x - 4,
        top: centerPoint.y - 4,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#00ffb4',
        boxShadow: '0 0 10px #00ffb4',
        pointerEvents: 'none',
        zIndex: 500
      }} />
    </>
  )
}

// ===================== AUTO ZOOM =====================

function FitBounds({ selectedPort, ports, range }) {
  const map = useMap()
  const prevPortRef = useRef('')
  const prevRangeRef = useRef(null)

  useEffect(() => {
    if (!selectedPort) return

    const portChanged  = selectedPort !== prevPortRef.current
    const rangeChanged = range !== prevRangeRef.current

    if (!portChanged && !rangeChanged) return

    const p = ports.find(p => p.name === selectedPort)
    if (!p) return

    const delta = range / 111

    map.fitBounds([
      [p.lat - delta, p.lon - delta],
      [p.lat + delta, p.lon + delta]
    ], { padding: [40, 40] })

    prevPortRef.current  = selectedPort
    prevRangeRef.current = range

  }, [selectedPort, range, ports, map])

  return null
}

// ===================== MAIN =====================

export default function MapView({ ships, selectedPort, ports, range }) {

  const selected = ports.find(p => p.name === selectedPort)
  const pathsRef = useRef({})

  return (
    <MapContainer
      center={[20, 80]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <FitBounds selectedPort={selectedPort} ports={ports} range={range} />

      {selected && (
        <>
          <Marker position={[selected.lat, selected.lon]} icon={makePortIcon()} />
          <Circle
            center={[selected.lat, selected.lon]}
            radius={range * 1000}
            pathOptions={{ color: '#00b4ff', dashArray: '6 6', fillOpacity: 0.05 }}
          />
          <RadarOverlay selectedPort={selectedPort} ports={ports} range={range} />
        </>
      )}

      {ships.map(ship => {

        if (!pathsRef.current[ship.mmsi]) {
          pathsRef.current[ship.mmsi] = []
        }

        const path = pathsRef.current[ship.mmsi]
        path.push([ship.lat, ship.lon])
        if (path.length > 20) path.shift()

        const color = getEtaColor(ship.eta)
        const angle = ship.heading || ship.cog || 0
        const colorHex =
          color === 'green' ? '#00e5a0' :
          color === 'amber' ? '#ffb340' :
          color === 'red'   ? '#ff4d6a' :
          '#7aa5c8'

        const risk = getRiskLabel(ship.riskScore ?? 0)

        return (
          <React.Fragment key={ship.mmsi}>

            {path.length > 1 && (
              <Polyline
                positions={path}
                pathOptions={{ color: colorHex, weight: 2, opacity: 0.6 }}
              />
            )}

            <Marker
              position={[ship.lat, ship.lon]}
              icon={makeShipIcon(color, angle, ship.riskScore ?? 0)}
              eventHandlers={{
                click: (e) => {
                  e.originalEvent.stopPropagation()
                  setTimeout(() => e.target.openPopup(), 10)
                }
              }}
            >
              <Popup>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#e8f4ff',
                  lineHeight: '1.8',
                  minWidth: '200px'
                }}>
                  <strong style={{ color: colorHex, fontSize: '13px' }}>
                    {ship.name || 'Unknown Vessel'}
                  </strong><br/>
                  <span style={{ color: '#7aa5c8' }}>MMSI:</span> {ship.mmsi}<br/>
                  <span style={{ color: '#7aa5c8' }}>Distance:</span> {ship.distanceKm} km<br/>
                  <span style={{ color: '#7aa5c8' }}>Speed:</span> {ship.sog ?? 0} kn<br/>
                  <span style={{ color: '#7aa5c8' }}>Heading:</span> {ship.heading ?? '—'}°<br/>
                  <span style={{ color: '#7aa5c8' }}>COG:</span> {ship.cog ?? '—'}°<br/>
                  <span style={{ color: '#7aa5c8' }}>ETA:</span>{' '}
                  <span style={{ color: colorHex }}>{ship.eta ?? 'Anchored'}</span><br/>

                  <div style={{ borderTop: '1px solid rgba(0,180,255,0.15)', margin: '6px 0' }}/>

                  <span style={{ color: '#7aa5c8' }}>Risk Score:</span>{' '}
                  <span style={{ color: risk.color, fontWeight: 'bold' }}>
                    {ship.riskScore ?? 0}/100 — {risk.label}
                  </span><br/>

                  {ship.riskBreakdown && (
                    <div style={{
                      marginTop: '4px',
                      padding: '6px 8px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: '#3a6080',
                      lineHeight: '1.9'
                    }}>
                      <span style={{ color: '#7aa5c8' }}>Dist:</span> +{ship.riskBreakdown.distance}pts{'  '}
                      <span style={{ color: '#7aa5c8' }}>Speed:</span> +{ship.riskBreakdown.speed}pts<br/>
                      <span style={{ color: '#7aa5c8' }}>ETA:</span> +{ship.riskBreakdown.eta}pts{'  '}
                      <span style={{ color: '#7aa5c8' }}>Heading:</span> +{ship.riskBreakdown.heading}pts<br/>
                      <span style={{ color: '#7aa5c8' }}>Moving:</span> +{ship.riskBreakdown.moving}pts
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>

          </React.Fragment>
        )
      })}

    </MapContainer>
  )
}

