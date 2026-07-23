const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

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

code = code.replace(/<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" className="mb-4">[\s\S]*?<\/svg>/, emptyImageSvg);

fs.writeFileSync('src/App.tsx', code);
