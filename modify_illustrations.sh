#!/bin/bash
sed -i 's/const EmptySearchIllustration = () => (/const EmptySearchIllustration = ({ title = "Sin Resultados", description = "No se encontraron resultados. Por favor, intenta de nuevo." }: { title?: string, description?: string }) => (/' src/App.tsx
sed -i 's/<h3 className="text-\[20px\] font-bold text-gray-800 mb-2">Sin Resultados<\/h3>/<h3 className="text-[20px] font-bold text-gray-800 mb-2">{title}<\/h3>/' src/App.tsx
sed -i 's/<p className="text-\[14px\] text-gray-500 max-w-\[250px\]">No se encontraron resultados. Por favor, intenta de nuevo.<\/p>/<p className="text-[14px] text-gray-500 max-w-[250px]">{description}<\/p>/' src/App.tsx

sed -i 's/const EmptyImageIllustration = () => (/const EmptyImageIllustration = ({ title = "Sin Imagen", description = "Aún no tienes fotos" }: { title?: string, description?: string }) => (/' src/App.tsx
sed -i 's/<h3 className="text-\[20px\] font-bold text-gray-500 mb-2">Sin Imagen<\/h3>/<h3 className="text-[20px] font-bold text-gray-800 mb-2">{title}<\/h3>/' src/App.tsx
sed -i 's/<p className="text-\[14px\] text-gray-400 max-w-\[250px\]">Aún no tienes fotos<\/p>/<p className="text-[14px] text-gray-500 max-w-[250px]">{description}<\/p>/' src/App.tsx
