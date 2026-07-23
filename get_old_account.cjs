const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
const replacement = `                                {/* Email field */}
                                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end py-10 border-b border-gray-200">
                                    <div className="w-full">
                                        <label className="block text-[14px] font-medium text-gray-900 mb-2">Correo Electrónico</label>
                                        <input 
                                            type="email" 
                                            value={email} 
                                            readOnly 
                                            className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[14px] text-gray-600 focus:outline-none transition-all cursor-not-allowed" 
                                        />
                                        <div className="text-[13px] text-gray-400 mt-2">Usado para iniciar sesión en tu cuenta</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handlePasswordReset}
                                        className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[14px] font-medium rounded-xl transition-colors shadow-sm"
                                    >
                                        Cambiar contraseña
                                    </button>
                                </div>`;

code = code.replace(/\{\/\* Email field \*\/\}\s*<div className="grid grid-cols-1 sm:grid-cols-\[1fr_auto\] gap-4 items-end py-10 border-b border-gray-200">\s*<div className="w-full">\s*<label className="block text-\[14px\] font-medium text-gray-900 mb-2">Correo Electrónico<\/label>\s*<input\s*type="email"\s*value=\{email\}\s*readOnly\s*className="w-full px-4 py-2\.5 bg-\[#FAFAFA\] border border-gray-200 rounded-xl text-\[14px\] text-gray-600 focus:outline-none transition-all cursor-not-allowed"\s*\/>\s*<div className="text-\[13px\] text-gray-400 mt-2">Usado para iniciar sesión en tu cuenta<\/div>\s*<\/div>\s*<\/div>/, replacement);
fs.writeFileSync('src/App.tsx', code);
