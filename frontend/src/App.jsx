
// import { useState, useEffect, useRef } from 'react'
// import MapView from './MapView'
// import './App.css'

// function Clock() {
//   const [time, setTime] = useState('')

//   useEffect(() => {
//     const tick = () => {
//       const n = new Date()
//       const h = String(n.getUTCHours()).padStart(2,'0')
//       const m = String(n.getUTCMinutes()).padStart(2,'0')
//       const s = String(n.getUTCSeconds()).padStart(2,'0')
//       setTime(`${h}:${m}:${s} UTC`)
//     }
//     tick()
//     const id = setInterval(tick, 1000)
//     return () => clearInterval(id)
//   }, [])

//   return <div className="clock">{time}</div>
// }

// function getAvgDistance(ships) {
//   if (!ships.length) return '--'
//   const avg = ships.reduce((a, s) => a + (s.distanceKm || 0), 0) / ships.length
//   return avg.toFixed(1) + ' km'
// }

// function getAvgSpeed(ships) {
//   if (!ships.length) return '--'
//   const moving = ships.filter(s => s.sog > 0)
//   if (!moving.length) return '0 kn'
//   const avg = moving.reduce((a, s) => a + s.sog, 0) / moving.length
//   return avg.toFixed(1) + ' kn'
// }

// export default function App() {
//   const [ports, setPorts] = useState([])
//   const [selectedPort, setSelectedPort] = useState('')
//   const [range, setRange] = useState(100)  // ✅ changed from 1000 to 100
//   const [ships, setShips] = useState([])
//   const [status, setStatus] = useState('Connecting...')
//   const [tracking, setTracking] = useState(false)

//   const wsRef = useRef(null)

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080')
//     wsRef.current = ws

//     ws.onopen = () => setStatus('Connected — select port')

//     ws.onmessage = (e) => {
//       const data = JSON.parse(e.data)

//       if (data.type === 'ports') {
//         setPorts(data.data)
//         return
//       }

//       if (data.error) {
//         setStatus(`Error: ${data.error}`)
//         return
//       }

//       setShips(prev => {
//         const filtered = prev.filter(s => s.mmsi !== data.mmsi)
//         const updated = [...filtered, data]
//         setStatus(`Live — ${updated.length} vessels`)
//         return updated
//       })
//     }

//     ws.onclose = () => {
//       setStatus('Disconnected')
//       setTracking(false)
//     }

//     ws.onerror = () => {
//       setStatus('Connection error')
//     }

//     return () => ws.close()
//   }, [])

//   const startTracking = () => {
//     const ws = wsRef.current
//     if (!ws || ws.readyState !== WebSocket.OPEN) return

//     ws.send(JSON.stringify({ stop: true }))

//     setShips([])
//     setTracking(true)
//     setStatus('Tracking started...')

//     ws.send(JSON.stringify({
//       port: selectedPort,
//       rangeKm: Number(range)
//     }))
//   }

//   const stopTracking = () => {
//     const ws = wsRef.current
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify({ stop: true }))
//     }
//     setTracking(false)
//     setStatus('Stopped')
//   }

//   const selectedPortData = ports.find(p => p.name === selectedPort)

//   return (
//     <div className="app-container">

//       {/* TOPBAR */}
//       <div className="topbar">

//         <div className="logo">
//           <span className="logo-text">
//             VESSEL<span>TRACK</span>
//           </span>
//         </div>

//         <div className="topbar-center">
//           {selectedPortData && (
//             <div className="port-coords">
//               {selectedPortData.lat.toFixed(4)}° N • {selectedPortData.lon.toFixed(4)}° E — {selectedPortData.name}
//             </div>
//           )}
//         </div>

//         <div className="topbar-right">
//           <div className={`live-badge ${!tracking ? 'offline' : ''}`}>
//             {tracking ? 'LIVE FEED' : 'STANDBY'}
//           </div>
//           <Clock />
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="main-grid">

//         {/* LEFT PANEL */}
//         <div className="left-panel">

//           {/* SEARCH */}
//           <div className="panel-section">
//             <div className="section-label">Search Parameters</div>

//             <select
//               className="port-select"
//               value={selectedPort}
//               onChange={e => setSelectedPort(e.target.value)}
//             >
//               <option value="" disabled hidden>Select Port</option>
//               {ports.map(p => (
//                 <option key={p.name} value={p.name}>{p.name}</option>
//               ))}
//             </select>

//             <div className="range-row">
//               <label>Detection radius</label>
//               <span className="range-val">{range} km</span>
//             </div>

//             <input
//               type="range"
//               min="50"
//               max="2000"
//               step="50"
//               value={range}
//               onChange={e => setRange(Number(e.target.value))}
//             />

//             <div className="btn-row">
//               <button className="btn btn-start" onClick={startTracking} disabled={!selectedPort}>
//                 Start Tracking
//               </button>

//               <button className="btn btn-stop" onClick={stopTracking} disabled={!tracking}>
//                 Stop
//               </button>
//             </div>
//           </div>

//           {/* STATUS */}
//           <div className="status-bar">
//             <div className={`status-dot ${tracking ? 'live' : ''}`}></div>
//             {status}
//           </div>

//           {/* LIVE OVERVIEW */}
//           <div className="panel-section">
//             <div className="section-label">Live Overview</div>

//             <div className="stat-grid">

//               <div className="stat-card blue">
//                 <div className="stat-label">Vessels</div>
//                 <div className="stat-value">{ships.length}</div>
//                 <div className="stat-sub">within {range} km</div>
//               </div>

//               <div className="stat-card green">
//                 <div className="stat-label">Closest</div>
//                 <div className="stat-value">
//                   {ships.length > 0
//                     ? Math.min(...ships.map(s => s.distanceKm || 0)).toFixed(2) + ' km'
//                     : '--'}
//                 </div>
//               </div>

//               <div className="stat-card amber">
//                 <div className="stat-label">Avg Speed</div>
//                 <div className="stat-value">{getAvgSpeed(ships)}</div>
//               </div>

//               <div className="stat-card neutral">
//                 <div className="stat-label">Avg Distance</div>
//                 <div className="stat-value">{getAvgDistance(ships)}</div>
//               </div>

//             </div>
//           </div>

//         </div>

//         {/* MAP */}
//         <div className="map-area">
//           <div className="map-canvas">
//             <MapView
//               ships={ships}
//               selectedPort={selectedPort}
//               ports={ports}
//               range={range}
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }



import { useState, useEffect, useRef } from 'react'
import MapView from './MapView'
import './App.css'

function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const h = String(n.getUTCHours()).padStart(2,'0')
      const m = String(n.getUTCMinutes()).padStart(2,'0')
      const s = String(n.getUTCSeconds()).padStart(2,'0')
      setTime(`${h}:${m}:${s} UTC`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <div className="clock">{time}</div>
}

function getAvgDistance(ships) {
  if (!ships.length) return '--'
  const avg = ships.reduce((a, s) => a + (s.distanceKm || 0), 0) / ships.length
  return avg.toFixed(1) + ' km'
}

function getAvgSpeed(ships) {
  if (!ships.length) return '--'
  const moving = ships.filter(s => s.sog > 0)
  if (!moving.length) return '0 kn'
  const avg = moving.reduce((a, s) => a + s.sog, 0) / moving.length
  return avg.toFixed(1) + ' kn'
}

export default function App() {
  const [ports, setPorts] = useState([])
  const [selectedPort, setSelectedPort] = useState('')
  const [range, setRange] = useState(100)
  const [ships, setShips] = useState([])
  const [status, setStatus] = useState('Connecting...')
  const [tracking, setTracking] = useState(false)

  const wsRef = useRef(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    wsRef.current = ws

    ws.onopen = () => setStatus('Connected — select port')

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.type === 'ports') {
        setPorts(data.data)
        return
      }

      if (data.error) {
        setStatus(`Error: ${data.error}`)
        return
      }

      setShips(prev => {
        const filtered = prev.filter(s => s.mmsi !== data.mmsi)
        const updated = [...filtered, data]
        setStatus(`Live — ${updated.length} vessels`)
        return updated
      })
    }

    ws.onclose = () => {
      setStatus('Disconnected')
      setTracking(false)
    }

    ws.onerror = () => {
      setStatus('Connection error')
    }

    return () => ws.close()
  }, [])

  const startTracking = () => {
    const ws = wsRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return

    ws.send(JSON.stringify({ stop: true }))
    setShips([])
    setTracking(true)
    setStatus('Tracking started...')

    ws.send(JSON.stringify({
      port: selectedPort,
      rangeKm: Number(range)
    }))
  }

  const stopTracking = () => {
    const ws = wsRef.current
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ stop: true }))
    }
    setTracking(false)
    setStatus('Stopped')
  }

  const selectedPortData = ports.find(p => p.name === selectedPort)

  const highRiskCount = ships.filter(s => s.riskScore >= 70).length
  const medRiskCount  = ships.filter(s => s.riskScore >= 40 && s.riskScore < 70).length

  return (
    <div className="app-container">

      {/* TOPBAR */}
      <div className="topbar">
        <div className="logo">
          <span className="logo-text">VESSEL<span>TRACK</span></span>
        </div>

        <div className="topbar-center">
          {selectedPortData && (
            <div className="port-coords">
              {selectedPortData.lat.toFixed(4)}° N • {selectedPortData.lon.toFixed(4)}° E — {selectedPortData.name}
            </div>
          )}
        </div>

        <div className="topbar-right">
          <div className={`live-badge ${!tracking ? 'offline' : ''}`}>
            {tracking ? 'LIVE FEED' : 'STANDBY'}
          </div>
          <Clock />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="main-grid">

        {/* LEFT PANEL */}
        <div className="left-panel">

          {/* SEARCH */}
          <div className="panel-section">
            <div className="section-label">Search Parameters</div>

            <select
              className="port-select"
              value={selectedPort}
              onChange={e => setSelectedPort(e.target.value)}
            >
              <option value="" disabled hidden>Select Port</option>
              {ports.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>

            <div className="range-row">
              <label>Detection radius</label>
              <span className="range-val">{range} km</span>
            </div>

            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={range}
              onChange={e => setRange(Number(e.target.value))}
            />

            <div className="btn-row">
              <button className="btn btn-start" onClick={startTracking} disabled={!selectedPort}>
                Start Tracking
              </button>
              <button className="btn btn-stop" onClick={stopTracking} disabled={!tracking}>
                Stop
              </button>
            </div>
          </div>

          {/* STATUS */}
          <div className="status-bar">
            <div className={`status-dot ${tracking ? 'live' : ''}`}></div>
            {status}
          </div>

          {/* LIVE OVERVIEW */}
          <div className="panel-section">
            <div className="section-label">Live Overview</div>

            <div className="stat-grid">

              <div className="stat-card blue">
                <div className="stat-label">Vessels</div>
                <div className="stat-value">{ships.length}</div>
                <div className="stat-sub">within {range} km</div>
              </div>

              <div className="stat-card green">
                <div className="stat-label">Closest</div>
                <div className="stat-value">
                  {ships.length > 0
                    ? Math.min(...ships.map(s => s.distanceKm || 0)).toFixed(2) + ' km'
                    : '--'}
                </div>
              </div>

              <div className="stat-card amber">
                <div className="stat-label">Avg Speed</div>
                <div className="stat-value">{getAvgSpeed(ships)}</div>
              </div>

              <div className="stat-card neutral">
                <div className="stat-label">Avg Distance</div>
                <div className="stat-value">{getAvgDistance(ships)}</div>
              </div>

            </div>
          </div>

          {/* RISK OVERVIEW */}
          <div className="panel-section">
            <div className="section-label">Risk Overview</div>

            <div className="stat-grid">

              <div className="stat-card" style={{ borderTop: '2px solid #ff4d6a' }}>
                <div className="stat-label">High Risk</div>
                <div className="stat-value" style={{ color: '#ff4d6a' }}>
                  {highRiskCount}
                </div>
                <div className="stat-sub">score ≥ 70</div>
              </div>

              <div className="stat-card" style={{ borderTop: '2px solid #ffb340' }}>
                <div className="stat-label">Medium Risk</div>
                <div className="stat-value" style={{ color: '#ffb340' }}>
                  {medRiskCount}
                </div>
                <div className="stat-sub">score 40–69</div>
              </div>

            </div>
          </div>

        </div>

        {/* MAP */}
        <div className="map-area">
          <div className="map-canvas">
            <MapView
              ships={ships}
              selectedPort={selectedPort}
              ports={ports}
              range={range}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
