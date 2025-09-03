import React from 'react'

export const manufacturerLogos: { [key: string]: React.JSX.Element } = {
  toyota: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="35" rx="35" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <ellipse cx="50" cy="65" rx="25" ry="15" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  lexus: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M25 50 L50 30 L50 70 Z" fill="currentColor"/>
    </svg>
  ),
  honda: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 40 L20 60 L30 60 L30 50 L40 50 L40 60 L50 60 L50 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 40 L50 60 L60 60 L60 50 L70 50 L70 60 L80 60 L80 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  nissan: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="20" y="45" width="60" height="10" fill="currentColor"/>
      <text x="50" y="52" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">NISSAN</text>
    </svg>
  ),
  mercedes: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 10 L50 50 L20 80 M50 50 L80 80 M50 50 L20 80" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),
  bmw: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 15 A35 35 0 0 1 85 50 L50 50 Z" fill="#0066CC"/>
      <path d="M15 50 A35 35 0 0 1 50 15 L50 50 Z" fill="white"/>
      <path d="M50 85 A35 35 0 0 1 15 50 L50 50 Z" fill="#0066CC"/>
      <path d="M85 50 A35 35 0 0 1 50 85 L50 50 Z" fill="white"/>
    </svg>
  ),
  audi: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="25" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="38" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="51" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="64" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  porsche: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L70 30 L75 50 L70 70 L30 70 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L60 40 L60 45 L55 50 L45 50 L40 45 Z" fill="currentColor"/>
      <path d="M42 55 L58 55 L58 60 L42 60 Z" fill="currentColor"/>
    </svg>
  ),
  jaguar: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 Q30 40, 50 40 T80 50 Q75 55, 50 55 T20 50" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="35" cy="48" r="2" fill="currentColor"/>
      <circle cx="65" cy="48" r="2" fill="currentColor"/>
      <path d="M45 52 Q50 55, 55 52" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'land-rover': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="48" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">LAND</text>
      <text x="50" y="58" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">ROVER</text>
    </svg>
  ),
  mazda: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L30 50 L35 55 L50 40 L65 55 L70 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="65" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 20 L50 50" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  subaru: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 L50 20 L70 40 M35 50 L50 35 L65 50 M40 60 L50 50 L60 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="40" r="3" fill="currentColor"/>
      <circle cx="70" cy="40" r="3" fill="currentColor"/>
      <circle cx="35" cy="50" r="3" fill="currentColor"/>
      <circle cx="65" cy="50" r="3" fill="currentColor"/>
      <circle cx="40" cy="60" r="3" fill="currentColor"/>
      <circle cx="60" cy="60" r="3" fill="currentColor"/>
    </svg>
  ),
  suzuki: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 35 Q35 30, 45 30 L55 30 Q65 30, 70 35 L70 45 Q70 50, 65 55 L55 65 Q50 70, 45 65 L35 55 Q30 50, 30 45 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L60 40 L55 50 L60 60 L40 60 L45 50 L40 40" fill="currentColor"/>
    </svg>
  ),
  volkswagen: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 35 L35 65 L45 50 L50 60 L55 50 L65 65 L65 35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M45 35 L50 45 L55 35" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  ford: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="20" fill="currentColor" fontWeight="bold" fontStyle="italic">Ford</text>
    </svg>
  ),
  chevrolet: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="20" y="40" width="60" height="20" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L50 40 L50 60 L40 60 M60 40 L60 60" fill="currentColor"/>
    </svg>
  ),
  tesla: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L50 70 M35 25 Q35 20, 40 20 L60 20 Q65 20, 65 25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 25 L40 30 M65 25 L60 30" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  hyundai: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="40" ry="20" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(15 50 50)"/>
      <path d="M25 50 L35 40 L35 60 Z M75 50 L65 40 L65 60 Z" fill="currentColor"/>
    </svg>
  ),
  kia: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 50 L35 40 L40 50 L45 40 L45 60 M55 40 L55 60 M65 40 L70 60 M70 40 L65 60" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  volvo: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 35 L65 65 M65 35 L35 65" stroke="currentColor" strokeWidth="3"/>
      <circle cx="70" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M68 28 L72 32" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  mitsubishi: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L35 45 L50 35 L65 45 Z" fill="currentColor"/>
      <path d="M35 55 L50 80 L50 65 L35 55 Z" fill="currentColor"/>
      <path d="M65 55 L50 80 L50 65 L65 55 Z" fill="currentColor"/>
    </svg>
  ),
  infiniti: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 60 Q30 40, 50 40 Q70 40, 70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 60 L30 65 M70 60 L70 65" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="30" r="3" fill="currentColor"/>
    </svg>
  ),
  acura: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L30 70 L40 70 L50 40 L60 70 L70 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M42 55 L58 55" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  genesis: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 L70 40 M25 50 L75 50 M30 60 L70 60" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 35 L35 65 M65 35 L65 65" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  mini: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 40 L35 60 L40 55 L45 60 L45 40 M55 40 L55 60 M65 40 L65 60 L70 40 L70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  jeep: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="25" y="35" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 35 L30 30 M40 35 L40 30 M50 35 L50 30 M60 35 L60 30 M70 35 L70 30" stroke="currentColor" strokeWidth="2"/>
      <circle cx="35" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="65" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  ferrari: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L70 30 L75 50 L70 70 L30 70 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 35 L45 50 L50 45 L55 50 Z" fill="currentColor"/>
      <rect x="45" y="55" width="10" height="10" fill="currentColor"/>
    </svg>
  ),
  lamborghini: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 35 L50 20 L70 35 L70 65 L50 80 L30 65 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 30 L40 50 L50 45 L60 50 Z" fill="currentColor"/>
    </svg>
  ),
  maserati: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 30 L45 40 L50 35 L55 40 Z M50 45 L45 55 L50 50 L55 55 Z M50 60 L45 70 L50 65 L55 70 Z" fill="currentColor"/>
    </svg>
  ),
  bentley: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 50 L40 50 L45 40 L50 50 L55 40 L60 50 L70 50" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="35" cy="50" r="3" fill="currentColor"/>
      <circle cx="65" cy="50" r="3" fill="currentColor"/>
    </svg>
  ),
  'rolls-royce': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M45 40 L45 60 M50 40 L50 50 L55 45 L55 60" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'aston-martin': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 L50 30 L80 50 M30 50 L50 40 L70 50" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="60" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  mclaren: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M25 50 Q30 35, 50 35 T75 50 Q70 65, 50 65 T25 50" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 50 L45 45 L50 50 L55 45 L65 50" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  bugatti: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="35" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="40" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="45" y="45" width="10" height="10" fill="white"/>
    </svg>
  ),
  pagani: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 Q30 30, 40 30 L60 30 Q70 30, 70 40 L70 60 Q70 70, 60 70 L40 70 Q30 70, 30 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L40 60 M50 40 L50 50 L60 40 L60 60" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  koenigsegg: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L50 20 L70 30 L70 70 L50 80 L30 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L50 30 L60 40 M40 60 L50 70 L60 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>
  )
}