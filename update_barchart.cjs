const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /<RechartsTooltip[\s\S]*?\/>\s*<Bar dataKey="ingresos" fill="#203e71" radius=\{\[4, 4, 0, 0\]\} barSize=\{12\} \/>\s*<Bar dataKey="gastos" fill="#488fcc" radius=\{\[4, 4, 0, 0\]\} barSize=\{12\} \/>/g;

const customTooltip = `
<RechartsTooltip 
    animationDuration={300}
    isAnimationActive={true}
    content={({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] border-none">
                    <p className="text-[13px] font-semibold text-gray-800 mb-1">{payload[0].payload.name}</p>
                    <p className="text-[13px] font-semibold text-[#8B5CF6]">
                        $ {payload[0].value?.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    }}
    cursor={{
        fill: '#f3f4f6', 
        radius: 8,
        transition: 'all 0.2s ease'
    }}
/>
<Bar dataKey="total" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={12} />
`;

code = code.replace(regex, customTooltip);

fs.writeFileSync('src/App.tsx', code);
