const fs = require('fs');
const lines = fs.readFileSync('src/App.tsx', 'utf-8').split('\n');
console.log(lines.slice(3100, 3200).join('\n'));
