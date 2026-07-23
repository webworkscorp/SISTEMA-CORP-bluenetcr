const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
    /<th className="py-3.5 px-5 text-\[12px\] font-medium text-gray-500 text-right">Acciones<\/th>/g,
    ''
);

code = code.replace(
    /<td className="py-4 px-5 text-right">[\s\S]*?<\/td>/g,
    ''
);

code = code.replace(
    /\{isMe \? u\.email : 'Oculto'\}/g,
    "{isMe ? u.email : ''}"
);

fs.writeFileSync('src/App.tsx', code);
