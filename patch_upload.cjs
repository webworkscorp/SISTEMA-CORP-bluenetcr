const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace publicUrl logic
code = code.replace(
/const \{ data: \{ publicUrl \} \} = supabase\.storage\n\s*\.from\('documents'\)\n\s*\.getPublicUrl\(filePath\);\n\s*fileUrl = publicUrl;/,
`fileUrl = filePath; // Guardamos el filePath en lugar de publicUrl porque el bucket es privado`
);

fs.writeFileSync('src/App.tsx', code);
