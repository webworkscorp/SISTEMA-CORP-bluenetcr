const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const emptySearchSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <circle cx="100" cy="95" r="75" fill="#F0F5FF" />
            
            {/* Stars */}
            <path d="M55 40 Q57 48 65 50 Q57 52 55 60 Q53 52 45 50 Q53 48 55 40 Z" fill="#D2D6FC" />
            <path d="M150 70 Q151 74 155 75 Q151 76 150 80 Q149 76 145 75 Q149 74 150 70 Z" fill="#D2D6FC" />
            <path d="M40 100 Q41 106 47 107 Q41 108 40 114 Q39 108 33 107 Q39 106 40 100 Z" fill="#D2D6FC" />
            
            {/* Bubbles */}
            <circle cx="130" cy="40" r="4" fill="#E0E7FF" />
            <circle cx="140" cy="100" r="8" fill="#E0E7FF" />
            <circle cx="150" cy="115" r="5" fill="#E0E7FF" />
            <circle cx="45" cy="130" r="6" fill="#E0E7FF" />
            <circle cx="55" cy="145" r="9" fill="#E0E7FF" />
            
            {/* Magnifying Glass */}
            {/* Handle */}
            <rect x="73" y="118" width="22" height="55" rx="10" transform="rotate(-35 73 118)" fill="#DCE2FE" stroke="#A5B4FC" strokeWidth="4" />
            {/* Handle details */}
            <path d="M72 135 L87 145" stroke="#A5B4FC" strokeWidth="4" strokeLinecap="round" />
            
            {/* Lens Rim */}
            <circle cx="95" cy="75" r="45" stroke="#A5B4FC" strokeWidth="6" fill="#F4F6FF" />
            
            {/* Lens Reflection */}
            <circle cx="95" cy="75" r="34" stroke="#E0E7FF" strokeWidth="4" fill="none" opacity="0.6" />
        </svg>`;

const emptyImageSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            {/* Background Blob */}
            <path d="M40 100 C 40 50, 70 30, 110 50 C 150 70, 170 100, 150 140 C 130 180, 50 160, 40 100 Z" fill="#F3F4F6" />
            
            {/* Stars/Plus */}
            <path d="M50 50 L50 60 M45 55 L55 55" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <path d="M140 60 L140 66 M137 63 L143 63" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <path d="M150 140 L150 146 M147 143 L153 143" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <path d="M55 150 L55 156 M52 153 L58 153" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            
            {/* Dots */}
            <circle cx="85" cy="35" r="2" fill="#D1D5DB" />
            <circle cx="150" cy="40" r="2" fill="#D1D5DB" />
            <circle cx="95" cy="170" r="2" fill="#D1D5DB" />
            
            {/* Back Frame */}
            <rect x="65" y="45" width="80" height="90" rx="12" fill="#E5E7EB" transform="rotate(-10 65 45)" />
            
            {/* Front Frame */}
            <rect x="60" y="50" width="85" height="100" rx="12" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="3" />
            
            {/* Landscape */}
            <path d="M65 130 L90 95 L110 120 L125 105 L140 120" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="100" cy="80" r="6" stroke="#9CA3AF" strokeWidth="3" fill="none" />
            
            {/* Shadow */}
            <ellipse cx="100" cy="180" rx="40" ry="4" fill="#F3F4F6" />
        </svg>`;

code = code.replace(/const EmptySearchIllustration = \(\{.*?\}\) => \([\s\S]*?<div.*?>\s*<svg[\s\S]*?<\/svg>/, 
    `const EmptySearchIllustration = ({ title = "Sin Resultados", description = "No se encontraron resultados. Por favor, intenta de nuevo." }: { title?: string, description?: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-stagger">
        ${emptySearchSvg}`);

code = code.replace(/const EmptyImageIllustration = \(\{.*?\}\) => \([\s\S]*?<div.*?>\s*<svg[\s\S]*?<\/svg>/, 
    `const EmptyImageIllustration = ({ title = "Sin Imagen", description = "Aún no tienes fotos" }: { title?: string, description?: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-stagger">
        ${emptyImageSvg}`);

fs.writeFileSync('src/App.tsx', code);
