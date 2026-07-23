const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `
    // Calculate dynamic client chart data
    const chartData = useMemo(() => {
        return clients.map((c: any) => {
            const clientTotal = (c.services || []).reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);
            return {
                name: c.name,
                total: clientTotal
            };
        }).filter((c: any) => c.total > 0)
          .sort((a: any, b: any) => b.total - a.total);
    }, [clients]);
`;

code = code.replace(/\s*\/\/\s*Calculate dynamic weekday chart data[\s\S]*?const chartData = useMemo\(\(\) => \{[\s\S]*?return days\.map\(day => \(\{[\s\S]*?gastos: dailyGastos\[day\][\s\S]*?\}\)\);[\s\S]*?\}, \[clients\]\);/, replacement);
fs.writeFileSync('src/App.tsx', code);
