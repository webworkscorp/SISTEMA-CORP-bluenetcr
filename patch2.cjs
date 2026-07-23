const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
    /\{totalSales === 0 \? \(\s*<div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm">\s*<DollarSign size=\{36\} strokeWidth=\{1\.5\} className="mb-2 text-gray-300" \/>\s*No hay datos de flujo financiero aún\s*<\/div>\s*\) : \(/g,
    `{totalSales === 0 ? (
                        <EmptySearchIllustration title="Sin datos" description="No hay datos de flujo financiero aún" />
                    ) : (`
);

fs.writeFileSync('src/App.tsx', code);
