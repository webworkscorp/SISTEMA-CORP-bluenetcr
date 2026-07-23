const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /\{clients\.map\(\(client: any, i: number\) => \{[\s\S]*?const clientProducts = \(client\.services \|\| \[\]\)\.map\(\(s: any\) => products\.find\(\(p: any\) => p\.id === s\.productId\)\?\.name\)\.filter\(Boolean\);[\s\S]*?const productsLabel = clientProducts\.length > 0 \? clientProducts\.join\(', '\) : 'Ninguno';[\s\S]*?return \([\s\S]*?<tr key=\{client\.id\} className="border-b border-gray-50 last:border-0 hover:bg-gray-50\/50 transition-colors animate-stagger" style=\{\{ animationDelay: \`\$\{800 \+ i \* 50\}ms\` \}\}>[\s\S]*?<td className="px-4 py-3">[\s\S]*?<div className="font-medium text-gray-900">\{client\.name\}<\/div>[\s\S]*?<div className="text-gray-500 text-xs">\{client\.email\}<\/div>[\s\S]*?<\/td>[\s\S]*?<td className="px-4 py-3 text-gray-600">\{client\.company\}<\/td>[\s\S]*?<td className="px-4 py-3 text-gray-600 truncate max-w-xs" title=\{productsLabel\}>\{productsLabel\}<\/td>[\s\S]*?<td className="px-4 py-3">[\s\S]*?<Badge type="success">\{client\.status\}<\/Badge>[\s\S]*?<\/td>[\s\S]*?<\/tr>[\s\S]*?\);[\s\S]*?\}\)\}/;

const replacement = "{clients.slice(0, 5).map((client: any, i: number) => {" +
"                                        const clientProducts = (client.services || []).map((s: any) => products.find((p: any) => p.id === s.productId)?.name).filter(Boolean);" +
"                                        const productsLabel = clientProducts.length > 0 ? clientProducts.join(', ') : 'Ninguno';" +
"                                        return (" +
"                                            <tr key={client.id} className=\"border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors animate-stagger\" style={{ animationDelay: `${800 + i * 50}ms` }}>" +
"                                                <td className=\"px-4 py-3\">" +
"                                                    <div className=\"font-medium text-gray-900\">{client.name}</div>" +
"                                                    <div className=\"text-gray-500 text-xs\">{client.email || 'Sin correo'}</div>" +
"                                                </td>" +
"                                                <td className=\"px-4 py-3 text-gray-600\">{client.company || '-'}</td>" +
"                                                <td className=\"px-4 py-3 text-gray-600 truncate max-w-xs\" title={productsLabel}>{productsLabel}</td>" +
"                                                <td className=\"px-4 py-3\">" +
"                                                    <Badge type=\"success\">{client.status || 'Activo'}</Badge>" +
"                                                </td>" +
"                                            </tr>" +
"                                        );" +
"                                    })}";

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
