const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// The handleOpenDocument definition:
const handleCode = `    const handleOpenDocument = async (doc: any) => {
        try {
            let filePath = doc.url;
            if (filePath && filePath.startsWith('http')) {
                // If it's a full URL (legacy data), try to extract the file path
                const parts = filePath.split('/storage/v1/object/public/documents/');
                if (parts.length > 1) {
                    filePath = parts[1];
                }
            }
            
            if (!filePath) {
                alert('La ruta del archivo no está disponible.');
                return;
            }
            
            const { data, error } = await supabase.storage.from('documents').createSignedUrl(filePath, 60);
            
            if (error) {
                console.error('Error creating signed URL:', error);
                alert('No se pudo generar el enlace para abrir el documento: ' + error.message);
                return;
            }
            
            if (data?.signedUrl) {
                window.open(data.signedUrl, '_blank');
            }
        } catch (e) {
            console.error('Exception opening document:', e);
            alert('Ocurrió un error al intentar abrir el documento.');
        }
    };`;

code = code.replace(handleCode, ''); // Remove from ClientsView

// Insert it in ClientProfileView
code = code.replace(/    const handleFileUpload = \(e: React.ChangeEvent<HTMLInputElement>\) => \{/, handleCode + '\n\n    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {');

fs.writeFileSync('src/App.tsx', code);
