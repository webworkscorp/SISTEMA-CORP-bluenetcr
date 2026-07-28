export interface Country {
  name: string;
  code: string;
  flag: string;
  gentilicio?: string;
}

export const PAISES: Country[] = [
  { name: 'Costa Rica', code: 'CR', flag: '🇨🇷', gentilicio: 'Costarricense' },
  { name: 'Panamá', code: 'PA', flag: '🇵🇦', gentilicio: 'Panameño/a' },
  { name: 'Nicaragua', code: 'NI', flag: '🇳🇮', gentilicio: 'Nicaragüense' },
  { name: 'México', code: 'MX', flag: '🇲🇽', gentilicio: 'Mexicano/a' },
  { name: 'Colombia', code: 'CO', flag: '🇨🇴', gentilicio: 'Colombiano/a' },
  { name: 'España', code: 'ES', flag: '🇪🇸', gentilicio: 'Español/a' },
  { name: 'Estados Unidos', code: 'US', flag: '🇺🇸', gentilicio: 'Estadounidense' },
  { name: 'Guatemala', code: 'GT', flag: '🇬🇹', gentilicio: 'Guatemalteco/a' },
  { name: 'El Salvador', code: 'SV', flag: '🇸🇻', gentilicio: 'Salvadoreño/a' },
  { name: 'Honduras', code: 'HN', flag: '🇭🇳', gentilicio: 'Hondureño/a' },
  { name: 'Venezuela', code: 'VE', flag: '🇻🇪', gentilicio: 'Venezolano/a' },
  { name: 'Ecuador', code: 'EC', flag: '🇪🇨', gentilicio: 'Ecuatoriano/a' },
  { name: 'Perú', code: 'PE', flag: '🇵🇪', gentilicio: 'Peruano/a' },
  { name: 'Chile', code: 'CL', flag: '🇨🇱', gentilicio: 'Chileno/a' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷', gentilicio: 'Argentino/a' },
  { name: 'República Dominicana', code: 'DO', flag: '🇩🇴', gentilicio: 'Dominicano/a' },
  { name: 'Uruguay', code: 'UY', flag: '🇺🇾', gentilicio: 'Uruguayo/a' },
  { name: 'Paraguay', code: 'PY', flag: '🇵🇾', gentilicio: 'Paraguayo/a' },
  { name: 'Bolivia', code: 'BO', flag: '🇧🇴', gentilicio: 'Boliviano/a' },
  { name: 'Brasil', code: 'BR', flag: '🇧🇷', gentilicio: 'Brasileño/a' },
  { name: 'Cuba', code: 'CU', flag: '🇨🇺', gentilicio: 'Cubano/a' },
  { name: 'Puerto Rico', code: 'PR', flag: '🇵🇷', gentilicio: 'Puertorriqueño/a' },
  { name: 'Canadá', code: 'CA', flag: '🇨🇦', gentilicio: 'Canadiense' },
  { name: 'Alemania', code: 'DE', flag: '🇩🇪', gentilicio: 'Alemán/a' },
  { name: 'Francia', code: 'FR', flag: '🇫🇷', gentilicio: 'Francés/a' },
  { name: 'Italia', code: 'IT', flag: '🇮🇹', gentilicio: 'Italiano/a' },
  { name: 'Reino Unido', code: 'GB', flag: '🇬🇧', gentilicio: 'Británico/a' },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹', gentilicio: 'Portugués/a' },
  { name: 'Suiza', code: 'CH', flag: '🇨🇭', gentilicio: 'Suizo/a' },
  { name: 'Países Bajos', code: 'NL', flag: '🇳🇱', gentilicio: 'Holandés/a' },
  { name: 'Bélgica', code: 'BE', flag: '🇧🇪', gentilicio: 'Belga' },
  { name: 'Austria', code: 'AT', flag: '🇦🇹', gentilicio: 'Austríaco/a' },
  { name: 'Suecia', code: 'SE', flag: '🇸🇪', gentilicio: 'Sueco/a' },
  { name: 'Noruega', code: 'NO', flag: '🇳🇴', gentilicio: 'Noruego/a' },
  { name: 'Dinamarca', code: 'DK', flag: '🇩🇰', gentilicio: 'Danés/a' },
  { name: 'Finlandia', code: 'FI', flag: '🇫🇮', gentilicio: 'Finlandés/a' },
  { name: 'Irlanda', code: 'IE', flag: '🇮🇪', gentilicio: 'Irlandés/a' },
  { name: 'Grecia', code: 'GR', flag: '🇬🇷', gentilicio: 'Griego/a' },
  { name: 'Polonia', code: 'PL', flag: '🇵🇱', gentilicio: 'Polaco/a' },
  { name: 'Rusia', code: 'RU', flag: '🇷🇺', gentilicio: 'Ruso/a' },
  { name: 'China', code: 'CN', flag: '🇨🇳', gentilicio: 'Chino/a' },
  { name: 'Japón', code: 'JP', flag: '🇯🇵', gentilicio: 'Japonés/a' },
  { name: 'Corea del Sur', code: 'KR', flag: '🇰🇷', gentilicio: 'Surcoreano/a' },
  { name: 'India', code: 'IN', flag: '🇮🇳', gentilicio: 'Indio/a' },
  { name: 'Israel', code: 'IL', flag: '🇮🇱', gentilicio: 'Israelí' },
  { name: 'Turquía', code: 'TR', flag: '🇹🇷', gentilicio: 'Turco/a' },
  { name: 'Egipto', code: 'EG', flag: '🇪🇬', gentilicio: 'Egipcio/a' },
  { name: 'Sudáfrica', code: 'ZA', flag: '🇿🇦', gentilicio: 'Sudafricano/a' },
  { name: 'Marruecos', code: 'MA', flag: '🇲🇦', gentilicio: 'Marroquí' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', gentilicio: 'Australiano/a' },
  { name: 'Nueva Zelanda', code: 'NZ', flag: '🇳🇿', gentilicio: 'Neozelandés/a' },

  // Resto del mundo
  { name: 'Afganistán', code: 'AF', flag: '🇦🇫' },
  { name: 'Albania', code: 'AL', flag: '🇦🇱' },
  { name: 'Andorra', code: 'AD', flag: '🇦🇩' },
  { name: 'Angola', code: 'AO', flag: '🇦🇴' },
  { name: 'Antigua y Barbuda', code: 'AG', flag: '🇦🇬' },
  { name: 'Arabia Saudita', code: 'SA', flag: '🇸🇦' },
  { name: 'Argelia', code: 'DZ', flag: '🇩🇿' },
  { name: 'Armenia', code: 'AM', flag: '🇦🇲' },
  { name: 'Bahamas', code: 'BS', flag: '🇧🇸' },
  { name: 'Bangladés', code: 'BD', flag: '🇧🇩' },
  { name: 'Barbados', code: 'BB', flag: '🇧🇧' },
  { name: 'Baréin', code: 'BH', flag: '🇧🇭' },
  { name: 'Belice', code: 'BZ', flag: '🇧🇿' },
  { name: 'Benín', code: 'BJ', flag: '🇧🇯' },
  { name: 'Bielorrusia', code: 'BY', flag: '🇧🇾' },
  { name: 'Bosnia y Herzegovina', code: 'BA', flag: '🇧🇦' },
  { name: 'Botsuana', code: 'BW', flag: '🇧🇼' },
  { name: 'Brunéi', code: 'BN', flag: '🇧🇳' },
  { name: 'Bulgaria', code: 'BG', flag: '🇧🇬' },
  { name: 'Burkina Faso', code: 'BF', flag: '🇧🇫' },
  { name: 'Burundi', code: 'BI', flag: '🇧🇮' },
  { name: 'Bután', code: 'BT', flag: '🇧🇹' },
  { name: 'Cabo Verde', code: 'CV', flag: '🇨🇻' },
  { name: 'Camboya', code: 'KH', flag: '🇰🇭' },
  { name: 'Camerún', code: 'CM', flag: '🇨🇲' },
  { name: 'Catar', code: 'QA', flag: '🇶🇦' },
  { name: 'Chad', code: 'TD', flag: '🇹🇩' },
  { name: 'Chipre', code: 'CY', flag: '🇨🇾' },
  { name: 'Comoras', code: 'KM', flag: '🇰🇲' },
  { name: 'Congo', code: 'CG', flag: '🇨🇬' },
  { name: 'Corea del Norte', code: 'KP', flag: '🇰🇵' },
  { name: 'Costa de Marfil', code: 'CI', flag: '🇨🇮' },
  { name: 'Croacia', code: 'HR', flag: '🇭🇷' },
  { name: 'Dominica', code: 'DM', flag: '🇩🇲' },
  { name: 'Emiratos Árabes Unidos', code: 'AE', flag: '🇦🇪' },
  { name: 'Eritrea', code: 'ER', flag: '🇪🇷' },
  { name: 'Eslovaquia', code: 'SK', flag: '🇸🇰' },
  { name: 'Eslovenia', code: 'SI', flag: '🇸🇮' },
  { name: 'Estonia', code: 'EE', flag: '🇪🇪' },
  { name: 'Etiopía', code: 'ET', flag: '🇪🇹' },
  { name: 'Filipinas', code: 'PH', flag: '🇵🇭' },
  { name: 'Gabón', code: 'GA', flag: '🇬🇦' },
  { name: 'Gambia', code: 'GM', flag: '🇬🇲' },
  { name: 'Georgia', code: 'GE', flag: '🇬🇪' },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
  { name: 'Granada', code: 'GD', flag: '🇬🇩' },
  { name: 'Guinea', code: 'GN', flag: '🇬🇳' },
  { name: 'Guinea Ecuatorial', code: 'GQ', flag: '🇬🇶' },
  { name: 'Guyana', code: 'GY', flag: '🇬🇾' },
  { name: 'Haití', code: 'HT', flag: '🇭🇹' },
  { name: 'Hungría', code: 'HU', flag: '🇭🇺' },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩' },
  { name: 'Irak', code: 'IQ', flag: '🇮🇶' },
  { name: 'Irán', code: 'IR', flag: '🇮🇷' },
  { name: 'Islandia', code: 'IS', flag: '🇮🇸' },
  { name: 'Jamaica', code: 'JM', flag: '🇯🇲' },
  { name: 'Jordania', code: 'JO', flag: '🇯🇴' },
  { name: 'Kazajistán', code: 'KZ', flag: '🇰🇿' },
  { name: 'Kenia', code: 'KE', flag: '🇰🇪' },
  { name: 'Kirguistán', code: 'KG', flag: '🇰🇬' },
  { name: 'Kiribati', code: 'KI', flag: '🇰🇮' },
  { name: 'Kuwait', code: 'KW', flag: '🇰🇼' },
  { name: 'Laos', code: 'LA', flag: '🇱🇦' },
  { name: 'Lesoto', code: 'LS', flag: '🇱🇸' },
  { name: 'Letonia', code: 'LV', flag: '🇱🇻' },
  { name: 'Líbano', code: 'LB', flag: '🇱🇧' },
  { name: 'Liberia', code: 'LR', flag: '🇱🇷' },
  { name: 'Libia', code: 'LY', flag: '🇱🇾' },
  { name: 'Liechtenstein', code: 'LI', flag: '🇱🇮' },
  { name: 'Lituania', code: 'LT', flag: '🇱🇹' },
  { name: 'Luxemburgo', code: 'LU', flag: '🇱🇺' },
  { name: 'Macedonia del Norte', code: 'MK', flag: '🇲🇰' },
  { name: 'Madagascar', code: 'MG', flag: '🇲🇬' },
  { name: 'Malasia', code: 'MY', flag: '🇲🇾' },
  { name: 'Malaui', code: 'MW', flag: '🇲🇼' },
  { name: 'Maldivas', code: 'MV', flag: '🇲🇻' },
  { name: 'Malí', code: 'ML', flag: '🇲🇱' },
  { name: 'Malta', code: 'MT', flag: '🇲🇹' },
  { name: 'Mauricio', code: 'MU', flag: '🇲🇺' },
  { name: 'Mauritania', code: 'MR', flag: '🇲🇷' },
  { name: 'Moldavia', code: 'MD', flag: '🇲🇩' },
  { name: 'Mónaco', code: 'MC', flag: '🇲🇨' },
  { name: 'Mongolia', code: 'MN', flag: '🇲🇳' },
  { name: 'Montenegro', code: 'ME', flag: '🇲🇪' },
  { name: 'Mozambique', code: 'MZ', flag: '🇲🇿' },
  { name: 'Namibia', code: 'NA', flag: '🇳🇦' },
  { name: 'Nepal', code: 'NP', flag: '🇳🇵' },
  { name: 'Níger', code: 'NE', flag: '🇳🇪' },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'Omán', code: 'OM', flag: '🇴🇲' },
  { name: 'Pakistán', code: 'PK', flag: '🇵🇰' },
  { name: 'Palaos', code: 'PW', flag: '🇵🇼' },
  { name: 'Palestina', code: 'PS', flag: '🇵🇸' },
  { name: 'Papúa Nueva Guinea', code: 'PG', flag: '🇵🇬' },
  { name: 'República Checa', code: 'CZ', flag: '🇨🇿' },
  { name: 'Ruanda', code: 'RW', flag: '🇷🇼' },
  { name: 'Rumanía', code: 'RO', flag: '🇷🇴' },
  { name: 'Samoa', code: 'WS', flag: '🇼🇸' },
  { name: 'San Cristóbal y Nieves', code: 'KN', flag: '🇰🇳' },
  { name: 'San Marino', code: 'SM', flag: '🇸🇲' },
  { name: 'San Vicente y las Granadinas', code: 'VC', flag: '🇻🇨' },
  { name: 'Santa Lucía', code: 'LC', flag: '🇱🇨' },
  { name: 'Santo Tomé y Príncipe', code: 'ST', flag: '🇸🇹' },
  { name: 'Senegal', code: 'SN', flag: '🇸🇳' },
  { name: 'Serbia', code: 'RS', flag: '🇷🇸' },
  { name: 'Seychelles', code: 'SC', flag: '🇸🇨' },
  { name: 'Sierra Leona', code: 'SL', flag: '🇸🇱' },
  { name: 'Singapur', code: 'SG', flag: '🇸🇬' },
  { name: 'Siria', code: 'SY', flag: '🇸🇾' },
  { name: 'Somalia', code: 'SO', flag: '🇸🇴' },
  { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰' },
  { name: 'Sudán', code: 'SD', flag: '🇸🇩' },
  { name: 'Surinam', code: 'SR', flag: '🇸🇷' },
  { name: 'Tailandia', code: 'TH', flag: '🇹🇭' },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿' },
  { name: 'Tayikistán', code: 'TJ', flag: '🇹🇯' },
  { name: 'Timor Oriental', code: 'TL', flag: '🇹🇱' },
  { name: 'Togo', code: 'TG', flag: '🇹🇬' },
  { name: 'Tonga', code: 'TO', flag: '🇹🇴' },
  { name: 'Trinidad y Tobago', code: 'TT', flag: '🇹🇹' },
  { name: 'Túnez', code: 'TN', flag: '🇹🇳' },
  { name: 'Turkmenistán', code: 'TM', flag: '🇹🇲' },
  { name: 'Ucranía', code: 'UA', flag: '🇺🇦' },
  { name: 'Uganda', code: 'UG', flag: '🇺🇬' },
  { name: 'Uzbekistán', code: 'UZ', flag: '🇺🇿' },
  { name: 'Vanuatu', code: 'VU', flag: '🇻🇺' },
  { name: 'Vaticano', code: 'VA', flag: '🇻🇦' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳' },
  { name: 'Yemen', code: 'YE', flag: '🇾🇪' },
  { name: 'Yibuti', code: 'DJ', flag: '🇩🇯' },
  { name: 'Zambia', code: 'ZM', flag: '🇿🇲' },
  { name: 'Zimbabue', code: 'ZW', flag: '🇿🇼' }
];

/**
 * Searches for a country by string (name, gentilicio, code, or existing string with flag)
 */
export function findCountry(query?: string | null): Country | undefined {
  if (!query) return undefined;
  const clean = query.trim().toLowerCase();
  
  // Direct match
  return PAISES.find(p => 
    p.name.toLowerCase() === clean ||
    p.code.toLowerCase() === clean ||
    (p.gentilicio && p.gentilicio.toLowerCase().includes(clean)) ||
    clean.includes(p.name.toLowerCase()) ||
    clean.includes(p.flag)
  );
}

/**
 * Returns country flag emoji if available, or empty string
 */
export function getCountryFlag(query?: string | null): string {
  if (!query) return '';
  
  // If string already contains regional indicator symbols (flag emoji), extract it
  const flagMatch = query.match(/[\uD83C][\uDDE6-\uDDFF]{2}/);
  if (flagMatch) return flagMatch[0];

  const found = findCountry(query);
  return found ? found.flag : '🌐';
}

/**
 * Formats country display string with flag
 */
export function formatCountryWithFlag(query?: string | null): string {
  if (!query || query.trim() === '') return '—';
  
  // If it already has a flag emoji in it
  const flagMatch = query.match(/[\uD83C][\uDDE6-\uDDFF]{2}/);
  if (flagMatch) {
    return query;
  }

  const found = findCountry(query);
  if (found) {
    return `${found.flag} ${query}`;
  }
  
  return query;
}
