
const WebSocket = require("ws");
require("dotenv").config();

let ws = null;
let pingInterval = null;
const vesselNames = {}

function connectToAISStream(portLat, portLon, rangeKm, onShipData) {

  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log("AIS already connected");
    return ws;
  }

  console.log("API KEY:", process.env.AISSTREAM_KEY);

  const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
  ws = socket;

  socket.on("open", () => {
    console.log("Connected to AISStream");

    const delta = 1;

    const payload = {
      APIKey: process.env.AISSTREAM_KEY,
      BoundingBoxes: [
        [
          [portLat - delta, portLon - delta],
          [portLat + delta, portLon + delta]
        ]
      ],
      FilterMessageTypes: ["PositionReport", "ShipStaticData"]
    };

    console.log("📡 Subscription Payload:", JSON.stringify(payload, null, 2));

    socket.send(JSON.stringify(payload));

    pingInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.ping();
      }
    }, 30000);
  });

  socket.on("message", (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.Message?.ShipStaticData) {
        const staticInfo = parsed.Message.ShipStaticData;
        const mmsi = staticInfo.UserID;
        const name = staticInfo.Name?.trim();

        if (mmsi && name && name !== '') {
          vesselNames[mmsi] = name;
          console.log(`📛 Name stored: ${mmsi} → ${name}`);
        }
        return;
      }

      if (parsed.Message?.PositionReport) {
        const ship = parsed.Message.PositionReport;

        const formatted = {
          mmsi: ship.UserID,
          lat: ship.Latitude,
          lon: ship.Longitude,
          sog: ship.Sog,
          cog: ship.Cog,
          heading: ship.TrueHeading,
          name: vesselNames[ship.UserID] || null
        };

        console.log("Ship:", formatted);
        onShipData(formatted);
      }

    } catch (err) {
      console.error("❌ Parse error:", err.message);
    }
  });

  socket.on("error", (err) => {
    console.error("❌ AIS error:", err.message);
  });

  socket.on("close", () => {
    console.log("AIS connection closed");

    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
    }

    if (ws === socket) {
      ws = null;
    }
  });

  return socket;
}

function clearVesselNames() {
  Object.keys(vesselNames).forEach(k => delete vesselNames[k]);
}

module.exports = { connectToAISStream, clearVesselNames };
