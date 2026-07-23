const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/clientId: t\.cliente_id,[\s\S]*?status: t\.estado === 'finalizada' \? 'Finalizada' : 'Pendiente',[\s\S]*?date: t\.fecha_limite[\s\S]*?\}\)\)\);/m, `clientId: t.cliente_id,
                    status: t.estado === 'finalizada' ? 'Finalizada' : 'Pendiente',
                    date: t.fecha_limite
                };
            }));`);
fs.writeFileSync('src/App.tsx', code);
