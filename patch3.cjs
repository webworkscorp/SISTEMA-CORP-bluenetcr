const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /<tbody className="divide-y divide-gray-50">\s*\{data\.map\(\(row: any, i: number\) => \(/;

const replacement = `<tbody className="divide-y divide-gray-50">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + (hideActions ? 0 : 1)} className="py-12">
                                        <EmptySearchIllustration title="Sin Registros" description="No se encontraron registros." />
                                    </td>
                                </tr>
                            ) : data.map((row: any, i: number) => (`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
