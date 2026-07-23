const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `                            </div>
                            {/* Calendar Picker (Custom simple implementation) */}
                            <div className="pt-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Fecha Límite</label>
                                <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <button type="button" onClick={() => {
                                            const prev = new Date(currentMonth);
                                            prev.setMonth(prev.getMonth() - 1);
                                            setCurrentMonth(prev);
                                        }} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><ChevronLeft size={14} /></button>
                                        <span className="text-[11px] font-bold text-gray-800 capitalize">
                                            {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button type="button" onClick={() => {
                                            const next = new Date(currentMonth);
                                            next.setMonth(next.getMonth() + 1);
                                            setCurrentMonth(next);
                                        }} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><ChevronRight size={14} /></button>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 mb-1">
                                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                                            <div key={d} className="text-center text-[9px] font-bold text-gray-400">{d}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {(() => {
                                            const year = currentMonth.getFullYear();
                                            const month = currentMonth.getMonth();
                                            const firstDay = new Date(year, month, 1).getDay();
                                            const daysInMonth = new Date(year, month + 1, 0).getDate();
                                            const days = [];
                                            const startPadding = firstDay === 0 ? 6 : firstDay - 1;
                                            for (let i = 0; i < startPadding; i++) {
                                                days.push({ day: '', isCurrentMonth: false });
                                            }
                                            for (let i = 1; i <= daysInMonth; i++) {
                                                days.push({ day: i, isCurrentMonth: true });
                                            }
                                            return days.map((cell, idx) => {
                                                if (!cell.day) return <div key={idx} className="h-6.5 w-6.5"></div>;
                                                const cellDateStr = \`\${year}-\${String(month + 1).padStart(2, '0')}-\${String(cell.day).padStart(2, '0')}\`;
                                                const isSelected = formData.date === cellDateStr;
                                                const isToday = new Date().toISOString().split('T')[0] === cellDateStr;
                                                return (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, date: cellDateStr })}`;

code = code.replace(/                                \<\/div\>\s*\{\/\* Input field if Custom is active \*\/\}\s*className=\{\`/g, replacement + '\n                                                        className={`');

fs.writeFileSync('src/App.tsx', code);
