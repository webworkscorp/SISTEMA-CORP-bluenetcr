const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/\/\/ Deleted client[\s\S]*?const deleted = clients\.filter/, `// Deleted client
                const deleted = clients.filter`);

code = code.replace(/\} else if \(newClients\.length < clients\.length\) \{[\s\S]*?\/\/ Deleted client[\s\S]*?const deleted = clients\.filter\(\(c: any\) => !newClients\.some\(\(item: any\) => item\.id === c\.id\)\);/, `} else if (newClients.length < clients.length) {
                // Deleted client
                console.log('DELETING CLIENTS. old:', clients.length, 'new:', newClients.length);
                const deleted = clients.filter((c: any) => !newClients.some((item: any) => item.id === c.id));
                console.log('Deleted items:', deleted);`);

fs.writeFileSync('src/App.tsx', code);
