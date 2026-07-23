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

code = code.replace(/<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" className="mb-4">[\s\S]*?<\/svg>/, emptySearchSvg);

fs.writeFileSync('src/App.tsx', code);
