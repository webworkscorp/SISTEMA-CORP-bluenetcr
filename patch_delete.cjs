const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `            } else if (newClients.length < clients.length) {
                // Deleted client
                const deleted = clients.filter((c: any) => !newClients.some((item: any) => item.id === c.id));
                for (const item of deleted) {
                    try {
                        // Delete relations first in case there is no ON DELETE CASCADE
                        await supabase.from('cliente_servicios').delete().eq('cliente_id', item.id);
                        await supabase.from('tareas').delete().eq('cliente_id', item.id);
                        await supabase.from('documentos').delete().eq('cliente_id', item.id);
                        
                        const { error } = await supabase.from('clientes').delete().eq('id', item.id);
                        if (error) {
                            console.error('Error deleting client from Supabase:', error);
                            alert('No se pudo eliminar el cliente en la base de datos: ' + error.message);
                        }
                    } catch (e) {
                        console.error('Exception deleting client:', e);
                    }
                }
            }`;

code = code.replace(/\} else if \(newClients\.length < clients\.length\) \{[\s\S]*?\/\/ Deleted client[\s\S]*?const deleted = clients\.filter\(\(c: any\) => !newClients\.some\(\(item: any\) => item\.id === c\.id\)\);[\s\S]*?for \(const item of deleted\) \{[\s\S]*?await supabase\.from\('clientes'\)\.delete\(\)\.eq\('id', item\.id\);[\s\S]*?\}[\s\S]*?\}/, replacement);
fs.writeFileSync('src/App.tsx', code);
