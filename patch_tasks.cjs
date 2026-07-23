const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update the ID display in ClientProfileView (remove it)
code = code.replace(/<span className="text-gray-400 font-mono text-xs font-normal">\{task\.id\}<\/span>/g, '');
code = code.replace(/<span className="text-gray-400 font-mono text-xs font-normal no-underline">\{task\.id\}<\/span>/g, '');

// 2. Update the columns in GlobalTasksView to remove the ID column
code = code.replace(/\{\s*header:\s*'ID',\s*accessor:\s*'id',\s*render:[\s\S]*?\},/g, '');

// 3. Update task insertion
code = code.replace(/descripcion: item\.description \|\| item\.name,/g, 'descripcion: item.description ? `${item.name}---SPLIT---${item.description}` : item.name,');

// 4. Update task updating
code = code.replace(/descripcion: item\.description \|\| item\.name/g, 'descripcion: item.description ? `${item.name}---SPLIT---${item.description}` : item.name');

// 5. Update task fetching
const regexFetch = /setTasks\(tasksData\.map\(t => \(\{\s*id: t\.id,\s*name: t\.descripcion,\s*description: t\.descripcion,/;
const replacementFetch = `setTasks(tasksData.map(t => {
                    const parts = (t.descripcion || '').split('---SPLIT---');
                    const name = parts[0];
                    const description = parts.length > 1 ? parts[1] : '';
                    return {
                        id: t.id,
                        name: name,
                        description: description,`;

code = code.replace(regexFetch, replacementFetch);
fs.writeFileSync('src/App.tsx', code);
