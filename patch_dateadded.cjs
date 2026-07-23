const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/number: createdClient\.numero_cliente\?\.replace\('\#', ''\) \|\| c\.number/g, `number: createdClient.numero_cliente?.replace('#', '') || c.number,
                            dateAdded: createdClient.fecha_creacion?.split('T')[0] || c.dateAdded`);

fs.writeFileSync('src/App.tsx', code);
