import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { PAISES, Country } from '../data/paises';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  placeholder = 'Seleccionar país...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredPaises = PAISES.filter(p => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      (p.gentilicio && p.gentilicio.toLowerCase().includes(q))
    );
  });

  const displayLabel = value || '';

  const handleSelect = (country: Country) => {
    onChange(country.name);
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#488fcc] focus-within:border-transparent bg-white text-sm cursor-pointer flex items-center justify-between transition-colors hover:border-gray-400"
      >
        <div className="flex items-center gap-2 truncate">
          <span className={displayLabel ? 'text-gray-900 font-medium' : 'text-gray-400'}>
            {displayLabel || placeholder}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden text-sm animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2 border-b border-gray-100 bg-gray-50/80 sticky top-0 backdrop-blur-sm">
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-2.5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar país o gentilicio..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#488fcc] focus:border-transparent"
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
            {filteredPaises.length > 0 ? (
              filteredPaises.map((country) => {
                const isSelected = value?.toLowerCase() === country.name.toLowerCase();
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-blue-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50 text-[#488fcc] font-medium' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{country.name}</span>
                      {country.gentilicio && (
                        <span className="text-xs text-gray-400 font-normal">({country.gentilicio})</span>
                      )}
                    </div>
                    {isSelected && <Check size={15} className="text-[#488fcc] shrink-0" />}
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-gray-400 text-xs">
                No se encontraron países.
                {search.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange(search.trim());
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className="block mx-auto mt-2 text-[#488fcc] font-semibold hover:underline"
                  >
                    Usar "{search.trim()}"
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
