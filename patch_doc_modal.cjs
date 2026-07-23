const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const missingModalHtml = `
            <ConfirmDeleteModal 
                isOpen={!!docToDelete}
                onClose={() => setDocToDelete(null)}
                onConfirm={() => {
                    if (docToDelete) {
                        setDocuments(documents.filter((d: any) => d.id !== docToDelete.id));
                        setDocToDelete(null);
                    }
                }}
                itemName={docToDelete?.name || ''}
                title="¿Eliminar Archivo?"
                description="¿Estás seguro de que deseas eliminar el archivo"
            />
`;

code = code.replace(/<ConfirmDeleteModal [\s\S]*?isOpen=\{isDeleteClientModalOpen\}/, missingModalHtml + '\n            <ConfirmDeleteModal \n                isOpen={isDeleteClientModalOpen}');

fs.writeFileSync('src/App.tsx', code);
