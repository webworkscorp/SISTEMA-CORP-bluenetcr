const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regexCustomBtn = /\s*\{\/\* Custom Option button \*\/\}[^{]*?<button[\s\S]*?<p className="text-\[9px\] text-gray-400 font-medium leading-none">Escribir nombre<\/p>\s*<\/div>\s*<\/button>/;

code = code.replace(regexCustomBtn, '');

// Also remove the custom input field that might appear
const regexCustomInput = /\s*\{isCustomAssignee && \([\s\S]*?\}\)\}/;
code = code.replace(regexCustomInput, '');

// Also remove the isCustomAssignee state references from the onClick above
code = code.replace(/!isCustomAssignee && /g, '');
code = code.replace(/setIsCustomAssignee\(false\);\s*/g, '');

fs.writeFileSync('src/App.tsx', code);
