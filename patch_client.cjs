const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add isDeleteClientModalOpen state to ClientProfileView
code = code.replace(/const \[taskToDelete, setTaskToDelete\] = useState<any>\(null\);/, `const [taskToDelete, setTaskToDelete] = useState<any>(null);
    const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);`);

// 2. Change the Eliminar button's onClick to open the modal
const regexEliminarBtn = /<Button variant="outline" className="text-red-500 hover:bg-red-50 hover:border-red-200" icon=\{<Trash2 size=\{16\} \/>\} onClick=\{\(\) => \{[\s\S]*?if \(window\.confirm\("¿Estás seguro de que deseas eliminar este cliente\?"\)\) \{[\s\S]*?setClients\(clients\.filter\(\(c: any\) => c\.id !== selectedClientId\)\);[\s\S]*?navigateTo\('clients'\);[\s\S]*?\}[\s\S]*?\}\}>Eliminar<\/Button>/;

const replaceEliminarBtn = `<Button variant="outline" className="text-red-500 hover:bg-red-50 hover:border-red-200" icon={<Trash2 size={16} />} onClick={() => setIsDeleteClientModalOpen(true)}>Eliminar</Button>`;

code = code.replace(regexEliminarBtn, replaceEliminarBtn);

// 3. Add ConfirmDeleteModal for client
const modalHtml = `
            <ConfirmDeleteModal 
                isOpen={isDeleteClientModalOpen}
                onClose={() => setIsDeleteClientModalOpen(false)}
                onConfirm={() => {
                    setClients(clients.filter((c: any) => c.id !== selectedClientId));
                    setIsDeleteClientModalOpen(false);
                    navigateTo('clients');
                }}
                itemName={client.name}
                title="¿Eliminar Cliente?"
                description="¿Estás seguro de que deseas eliminar permanentemente a este cliente? Se borrarán sus tareas y documentos."
            />
`;
code = code.replace(/<ConfirmDeleteModal [\s\S]*?isOpen=\{\!\!taskToDelete\}/, modalHtml + '\n            <ConfirmDeleteModal \n                isOpen={!!taskToDelete}');

// 4. Update the Client Profile Header to show dateAdded
const regexProfileHeader = /<p className="text-gray-500 flex items-center gap-2 mt-1">[\s\S]*?<Building size=\{16\} \/> \{client\.company\}[\s\S]*?<\/p>/;
const replaceProfileHeader = `<div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><Building size={16} /> {client.company || 'Sin empresa'}</span>
                        <span className="flex items-center gap-1"><Calendar size={16} /> Registrado: {client.dateAdded ? new Date(client.dateAdded).toLocaleDateString() : 'Sin fecha'}</span>
                    </div>`;

code = code.replace(regexProfileHeader, replaceProfileHeader);

// 5. Update the Clients list view to also show dateAdded 
const regexClientCard = /<p className="text-sm text-gray-500 flex items-center gap-2 mb-4">[\s\S]*?<Building size=\{14\} \/> \{client\.company\}[\s\S]*?<\/p>/;
const replaceClientCard = `<div className="flex flex-col gap-1 mb-4">
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <Building size={14} /> {client.company || 'Sin empresa'}
                                </p>
                                <p className="text-xs text-gray-400 flex items-center gap-2">
                                    <Calendar size={14} /> {client.dateAdded ? new Date(client.dateAdded).toLocaleDateString() : 'Sin fecha'}
                                </p>
                            </div>`;
code = code.replace(regexClientCard, replaceClientCard);

fs.writeFileSync('src/App.tsx', code);
