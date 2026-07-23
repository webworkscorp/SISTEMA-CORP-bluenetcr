const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
    /\{formData\.services\.length === 0 && \(\s*<div className="text-center py-6 text-sm text-gray-500 italic">No hay servicios asignados\.<\/div>\s*\)\}/g,
    `{formData.services.length === 0 && (
                                <div className="py-2">
                                    <EmptySearchIllustration title="Sin servicios" description="No hay servicios asignados aún." />
                                </div>
                            )}`
);

code = code.replace(
    /\{pieChartData\.length === 0 \? \(\s*<div className="flex flex-col items-center justify-center h-52 text-gray-400 text-sm">\s*<Package size=\{36\} strokeWidth=\{1\.5\} className="mb-2 text-gray-300" \/>\s*No hay servicios contratados aún\s*<\/div>\s*\) : \(/g,
    `{pieChartData.length === 0 ? (
                        <EmptySearchIllustration title="Sin datos" description="No hay servicios contratados aún" />
                    ) : (`
);

code = code.replace(
    /\{clients\.length === 0 \? \(\s*<div className="flex flex-col items-center justify-center py-16 text-gray-400 text-sm">\s*<Users size=\{36\} strokeWidth=\{1\.5\} className="mb-2 text-gray-300" \/>\s*No hay clientes registrados aún\s*<\/div>\s*\) : \(/g,
    `{clients.length === 0 ? (
                        <EmptySearchIllustration title="Sin clientes" description="No hay clientes registrados aún" />
                    ) : (`
);

code = code.replace(
    /\) : \(\s*<div className="text-sm text-gray-500 italic py-2">No hay servicios asignados\.<\/div>\s*\)/g,
    `) : (
                                    <div className="py-2 border border-gray-100 rounded-2xl bg-white mt-4">
                                        <EmptySearchIllustration title="Sin servicios" description="Este cliente no tiene servicios asignados." />
                                    </div>
                                )`
);

code = code.replace(
    /\{clientTasks\.filter\(\(t: any\) => t\.status !== 'Finalizada'\)\.length === 0 && \(\s*<div className="text-center py-6 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 text-sm animate-stagger" style=\{\{ animationDelay: '400ms' \}\}>\s*No hay tareas pendientes\.\s*<\/div>\s*\)\}/g,
    `{clientTasks.filter((t: any) => t.status !== 'Finalizada').length === 0 && (
                                        <div className="bg-white rounded-2xl border border-gray-100 mt-4">
                                            <EmptySearchIllustration title="Sin tareas pendientes" description="No hay tareas pendientes." />
                                        </div>
                                    )}`
);

fs.writeFileSync('src/App.tsx', code);
