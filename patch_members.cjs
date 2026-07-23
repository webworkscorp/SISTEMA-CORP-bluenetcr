const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/    \/\/ Predefined team members[\s\S]*?const defaultMembers = \[[\s\S]*?\];/, '');

code = code.replace(/        if \(systemUsers && systemUsers\.length > 0\) \{[\s\S]*?        return defaultMembers;/, `        if (systemUsers) {
            return systemUsers.map((u: any, index: number) => {
                const colors = [
                    'bg-blue-500 text-white',
                    'bg-emerald-500 text-white',
                    'bg-amber-500 text-white',
                    'bg-rose-500 text-white',
                    'bg-purple-500 text-white',
                    'bg-teal-500 text-white'
                ];
                return {
                    id: u.id || \`u-\${index}\`,
                    name: u.name || u.nombre || 'Integrante',
                    role: u.role || 'Usuario',
                    photo: u.photo || u.foto_perfil_url || '',
                    color: colors[index % colors.length]
                };
            });
        }
        return [];`);

fs.writeFileSync('src/App.tsx', code);
