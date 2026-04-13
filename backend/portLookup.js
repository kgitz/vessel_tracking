const axios = require('axios');

async function getPortCoordinates(portName) {
  const res = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: { q: `${portName} port`, format: 'json', limit: 1 },
    headers: { 'User-Agent': 'VesselTracker/1.0' }
  });

  if (!res.data || res.data.length === 0) {
    throw new Error(`Port "${portName}" not found`);
  }

  return {
    lat: parseFloat(res.data[0].lat),
    lon: parseFloat(res.data[0].lon),
    name: res.data[0].display_name
  };
}

module.exports = { getPortCoordinates };