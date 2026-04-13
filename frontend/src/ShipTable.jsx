// export default function ShipTable({ ships }) {
//     if (ships.length === 0) return (
//       <p style={{ color: '#888', fontSize: '14px' }}>No ships detected yet...</p>
//     )
  
//     return (
//       <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
//         <thead>
//           <tr style={{ background: '#f1f5f9' }}>
//             <th style={th}>Ship Name</th>
//             <th style={th}>MMSI</th>
//             <th style={th}>Distance (km)</th>
//             <th style={th}>Speed (knots)</th>
//             <th style={th}>ETA</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ships.map(ship => (
//             <tr key={ship.mmsi} style={{ borderBottom: '1px solid #e2e8f0' }}>
//               <td style={td}>{ship.name}</td>
//               <td style={td}>{ship.mmsi}</td>
//               <td style={td}>{ship.distanceKm}</td>
//               <td style={td}>{ship.sog}</td>
//               <td style={td}>{ship.eta ?? '—'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )
//   }
  
//   const th = { padding: '10px 12px', textAlign: 'left', fontWeight: '600' }
//   const td = { padding: '9px 12px', color: '#334155' }

export default function ShipTable({ ships }) {
  return null
}
