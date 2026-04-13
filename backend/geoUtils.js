// function haversineDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(lat1 * Math.PI / 180) *
//       Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) ** 2;
//     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   }
  
//   function calculateETA(distanceKm, sogKnots) {
//     if (!sogKnots || sogKnots <= 0) return null;
//     const speedKmh = sogKnots * 1.852;
//     const hours = distanceKm / speedKmh;
//     const h = Math.floor(hours);
//     const m = Math.round((hours - h) * 60);
//     return `${h}h ${m}m`;
//   }
  
//   module.exports = { haversineDistance, calculateETA };

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calculateETA(distanceKm, sogKnots) {
  if (!sogKnots || sogKnots <= 0) return null;
  const speedKmh = sogKnots * 1.852;
  const hours = distanceKm / speedKmh;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

function calculateBearing(shipLat, shipLon, portLat, portLon) {
  const dLon = (portLon - shipLon) * Math.PI / 180;
  const lat1 = shipLat * Math.PI / 180;
  const lat2 = portLat * Math.PI / 180;

  const x = Math.sin(dLon) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const bearing = Math.atan2(x, y) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

function headingDiff(shipCog, bearingToPort) {
  const diff = Math.abs(shipCog - bearingToPort) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function calculateRiskScore(distanceKm, sog, eta, shipLat, shipLon, portLat, portLon, cog) {
  let score = 0;
  const breakdown = {};

  // 1. Distance factor (30 pts)
  let distScore = 0;
  if (distanceKm < 1)       distScore = 30;
  else if (distanceKm < 5)  distScore = 25;
  else if (distanceKm < 20) distScore = 15;
  else if (distanceKm < 50) distScore = 8;
  score += distScore;
  breakdown.distance = distScore;

  // 2. Speed factor (20 pts)
  let speedScore = 0;
  if (sog > 20)      speedScore = 20;
  else if (sog > 15) speedScore = 16;
  else if (sog > 10) speedScore = 12;
  else if (sog > 5)  speedScore = 7;
  score += speedScore;
  breakdown.speed = speedScore;

  // 3. ETA factor (20 pts)
  let etaScore = 0;
  if (eta !== null) {
    const h = parseFloat(eta);
    if (h < 0.5)     etaScore = 20;
    else if (h < 1)  etaScore = 16;
    else if (h < 2)  etaScore = 10;
    else if (h < 4)  etaScore = 5;
  }
  score += etaScore;
  breakdown.eta = etaScore;

  // 4. Heading alignment factor (25 pts)
  let headingScore = 0;
  if (cog !== null && cog !== undefined && portLat && portLon) {
    const bearing = calculateBearing(shipLat, shipLon, portLat, portLon);
    const diff = headingDiff(cog, bearing);

    if (diff < 30)      headingScore = 25;
    else if (diff < 60) headingScore = 15;
    else if (diff < 90) headingScore = 5;
  }
  score += headingScore;
  breakdown.heading = headingScore;

  // 5. Moving factor (5 pts)
  const movingScore = sog > 0 ? 5 : 0;
  score += movingScore;
  breakdown.moving = movingScore;

  return { score, breakdown };
}

module.exports = { haversineDistance, calculateETA, calculateRiskScore };
