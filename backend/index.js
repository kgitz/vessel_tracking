
// const WebSocket = require('ws');
// const ports = require('./ports');
// const { connectToAISStream, clearVesselNames } = require('./aisClient');
// const { haversineDistance, calculateETA } = require('./geoUtils');

// const PORT = 8080;
// const wss = new WebSocket.Server({ port: PORT });

// console.log(`Backend WebSocket server running on ws://localhost:${PORT}`);

// wss.on('connection', (client) => {
//   console.log('Frontend connected');

//   let aisSocket = null;

//   client.send(JSON.stringify({ type: "ports", data: ports }));

//   client.on('message', (msg) => {
//     try {
//       const data = JSON.parse(msg);

//       if (data.stop) {
//         console.log("🛑 Stopping AIS stream...");

//         if (aisSocket) {
//           aisSocket.close();
//           aisSocket = null;
//         }

//         clearVesselNames();
//         return;
//       }

//       const { port, rangeKm } = data;

//       console.log(`Selected port: ${port}, range: ${rangeKm}`);

//       const coords = ports.find(p => p.name === port);

//       if (!coords) {
//         client.send(JSON.stringify({ error: "Invalid port" }));
//         return;
//       }

//       if (aisSocket) {
//         aisSocket.close();
//         aisSocket = null;
//       }

//       aisSocket = connectToAISStream(coords.lat, coords.lon, rangeKm, (ship) => {

//         const distance = haversineDistance(
//           coords.lat,
//           coords.lon,
//           ship.lat,
//           ship.lon
//         );

//         if (distance > rangeKm) return;

//         const eta = calculateETA(distance, ship.sog);

//         const enriched = {
//           ...ship,
//           distanceKm: parseFloat(distance.toFixed(2)),
//           eta
//         };

//         if (client.readyState === WebSocket.OPEN) {
//           client.send(JSON.stringify(enriched));
//         }
//       });

//     } catch (err) {
//       console.error(err.message);
//     }
//   });

//   client.on('close', () => {
//     console.log('Frontend disconnected');

//     if (aisSocket) {
//       aisSocket.close();
//       aisSocket = null;
//     }

//     clearVesselNames();
//   });
// });


const WebSocket = require('ws');
const ports = require('./ports');
const { connectToAISStream, clearVesselNames } = require('./aisClient');
const { haversineDistance, calculateETA, calculateRiskScore } = require('./geoUtils');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`Backend WebSocket server running on ws://localhost:${PORT}`);

wss.on('connection', (client) => {
  console.log('Frontend connected');

  let aisSocket = null;

  client.send(JSON.stringify({ type: "ports", data: ports }));

  client.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.stop) {
        console.log("🛑 Stopping AIS stream...");
        if (aisSocket) {
          aisSocket.close();
          aisSocket = null;
        }
        clearVesselNames();
        return;
      }

      const { port, rangeKm } = data;

      console.log(`Selected port: ${port}, range: ${rangeKm}`);

      const coords = ports.find(p => p.name === port);

      if (!coords) {
        client.send(JSON.stringify({ error: "Invalid port" }));
        return;
      }

      if (aisSocket) {
        aisSocket.close();
        aisSocket = null;
      }

      aisSocket = connectToAISStream(coords.lat, coords.lon, rangeKm, (ship) => {

        const distance = haversineDistance(
          coords.lat,
          coords.lon,
          ship.lat,
          ship.lon
        );

        if (distance > rangeKm) return;

        const eta = calculateETA(distance, ship.sog);

        const { score, breakdown } = calculateRiskScore(
          distance,
          ship.sog,
          eta,
          ship.lat,
          ship.lon,
          coords.lat,
          coords.lon,
          ship.cog
        );

        const enriched = {
          ...ship,
          distanceKm: parseFloat(distance.toFixed(2)),
          eta,
          riskScore: score,
          riskBreakdown: breakdown
        };

        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(enriched));
        }
      });

    } catch (err) {
      console.error(err.message);
    }
  });

  client.on('close', () => {
    console.log('Frontend disconnected');
    if (aisSocket) {
      aisSocket.close();
      aisSocket = null;
    }
    clearVesselNames();
  });
});