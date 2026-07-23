const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regexCustomBtn = /\s*\{\/\* Custom Option button \*\/\}[^{]*?<button[\s\S]*?<p className="text-\[9px\] text-gray-400 font-medium leading-none">Ingresar nombre<\/p>\s*<\/div>\s*<\/button>/;

code = code.replace(regexCustomBtn, '');

fs.writeFileSync('src/App.tsx', code);
