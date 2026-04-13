const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('World_Port_Index.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.PORT_NAME && row.LATITUDE && row.LONGITUDE) {
      results.push({
        name: row.PORT_NAME.trim(),
        lat: parseFloat(row.LATITUDE),
        lon: parseFloat(row.LONGITUDE)
      });
    }
  })
  .on('end', () => {
    const output = `const ports = ${JSON.stringify(results, null, 2)};\n\nmodule.exports = ports;`;
    
    fs.writeFileSync('ports.js', output);
    console.log('✅ ports.js generated with', results.length, 'ports');
  });