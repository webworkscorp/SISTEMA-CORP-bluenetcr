const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regexModal = /\{previewDoc && \([\s\S]*?\}\)\n\s*\{\/\* Header \/ Breadcrumb \*\/\}/;
code = code.replace(regexModal, '{/* Header / Breadcrumb */}');

fs.writeFileSync('src/App.tsx', code);
