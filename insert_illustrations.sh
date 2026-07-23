#!/bin/bash
sed -i '/\/\/ --- ESTILOS GLOBALES DE ANIMACIÓN ---/i \
\/\/ --- ILUSTRACIONES DE ESTADO VACÍO ---\
const EmptySearchIllustration = () => (\
    <div className="flex flex-col items-center justify-center py-12 text-center animate-stagger">\
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">\
            <circle cx="100" cy="95" r="75" fill="#F0F4FF" />\
            <circle cx="35" cy="130" r="12" fill="#F0F4FF" />\
            <circle cx="160" cy="140" r="16" fill="#F0F4FF" />\
            <circle cx="150" cy="40" r="8" fill="#F0F4FF" />\
            <path d="M55 40 L57 48 L65 50 L57 52 L55 60 L53 52 L45 50 L53 48 Z" fill="#C7D2FE" />\
            <path d="M150 70 L151 74 L155 75 L151 76 L150 80 L149 76 L145 75 L149 74 Z" fill="#C7D2FE" />\
            <path d="M40 100 L41 106 L47 107 L41 108 L40 114 L39 108 L33 107 L39 106 Z" fill="#C7D2FE" />\
            <circle cx="95" cy="75" r="45" stroke="#A5B4FC" strokeWidth="6" fill="#F8FAFC" />\
            <circle cx="95" cy="75" r="34" stroke="#E0E7FF" strokeWidth="3" fill="none" />\
            <path d="M60 110 L35 155 C30 162 33 172 40 176 L48 181 C55 186 64 183 69 176 L95 130" fill="#E0E7FF" stroke="#A5B4FC" strokeWidth="6" strokeLinejoin="round" />\
            <path d="M57 116 L85 132" stroke="#A5B4FC" strokeWidth="6" strokeLinecap="round" />\
        </svg>\
        <h3 className="text-[20px] font-bold text-gray-800 mb-2">Sin Resultados</h3>\
        <p className="text-[14px] text-gray-500 max-w-[250px]">No se encontraron resultados. Por favor, intenta de nuevo.</p>\
    </div>\
);\
\
const EmptyImageIllustration = () => (\
    <div className="flex flex-col items-center justify-center py-12 text-center animate-stagger">\
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">\
            <path d="M30 100 C 30 60, 60 40, 100 40 C 140 40, 170 60, 170 100 C 170 140, 140 160, 100 160 C 60 160, 30 140, 30 100 Z" fill="#F3F4F6" />\
            <circle cx="40" cy="130" r="10" fill="#F3F4F6" />\
            <circle cx="160" cy="80" r="14" fill="#F3F4F6" />\
            <path d="M50 50 L50 60 M45 55 L55 55" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />\
            <path d="M140 60 L140 66 M137 63 L143 63" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />\
            <path d="M150 140 L150 146 M147 143 L153 143" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />\
            <path d="M55 150 L55 156 M52 153 L58 153" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />\
            <circle cx="100" cy="30" r="2" fill="#9CA3AF" />\
            <circle cx="150" cy="40" r="2" fill="#9CA3AF" />\
            <circle cx="105" cy="180" r="2" fill="#9CA3AF" />\
            <rect x="65" y="45" width="80" height="90" rx="10" fill="#E5E7EB" transform="rotate(-10 65 45)" />\
            <rect x="65" y="55" width="85" height="100" rx="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="3" />\
            <path d="M70 135 L95 95 L115 120 L135 105 L145 125" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />\
            <circle cx="105" cy="85" r="6" stroke="#9CA3AF" strokeWidth="2" fill="none" />\
            <ellipse cx="105" cy="170" rx="40" ry="4" fill="#E5E7EB" />\
        </svg>\
        <h3 className="text-[20px] font-bold text-gray-500 mb-2">Sin Imagen</h3>\
        <p className="text-[14px] text-gray-400 max-w-[250px]">Aún no tienes fotos</p>\
    </div>\
);\
' src/App.tsx
