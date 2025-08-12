import React from 'react'

export const vehicleIcons: { [key: string]: React.JSX.Element } = {
  sedan: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 L25 35 L40 30 L60 30 L75 35 L80 50 L80 60 L75 65 L25 65 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 35 L35 40 L65 40 L70 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="40" y="42" width="20" height="8" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  suv: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M15 55 L20 35 L35 25 L65 25 L80 35 L85 55 L85 65 L80 70 L20 70 L15 65 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M25 35 L30 40 L70 40 L75 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="28" cy="65" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="72" cy="65" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="35" y="42" width="30" height="10" fill="currentColor" opacity="0.3"/>
      <path d="M15 55 L85 55" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M15 55 L25 45 L30 35 L70 35 L75 45 L85 55 L85 60 L80 65 L20 65 L15 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 40 Q50 35, 70 40" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="25" cy="60" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="75" cy="60" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 45 L65 45 L60 50 L40 50 Z" fill="currentColor" opacity="0.3"/>
      <path d="M20 55 L30 52 L70 52 L80 55" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  coupe: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 55 L25 40 L40 35 L60 35 L75 40 L80 55 L80 60 L75 65 L25 65 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 40 Q50 37, 65 40" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 42 L60 42 L58 48 L42 48 Z" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  hatchback: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 L25 35 L40 30 L55 30 L70 35 L75 50 L75 60 L70 65 L25 65 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 35 L35 40 L60 40 L65 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="65" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="38" y="42" width="20" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M70 35 L75 50" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  convertible: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 55 L25 45 L40 40 L60 40 L75 45 L80 55 L80 60 L75 65 L25 65 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 40 Q40 30, 50 35 Q60 30, 70 40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
      <circle cx="30" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 47 L65 47 L63 52 L37 52 Z" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  wagon: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M15 50 L20 35 L35 30 L70 30 L80 35 L85 50 L85 60 L80 65 L20 65 L15 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M25 35 L30 40 L75 40 L80 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="28" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="72" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="35" y="42" width="35" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M70 30 L80 35" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  van: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="15" y="25" width="70" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 45 L85 45" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="28" cy="65" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="72" cy="65" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="25" y="30" width="15" height="12" fill="currentColor" opacity="0.3"/>
      <rect x="45" y="30" width="15" height="12" fill="currentColor" opacity="0.3"/>
      <rect x="65" y="30" width="15" height="12" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M15 35 L15 60 L25 60 L25 35 L60 35 L60 60 L70 60 L70 45 L85 45 L85 60 L75 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M70 45 L75 35 L85 35 L85 45 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="65" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="75" cy="65" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="20" y="40" width="35" height="15" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  electric: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 L25 35 L40 30 L60 30 L75 35 L80 50 L80 60 L75 65 L25 65 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M45 25 L40 45 L50 45 L45 70 L60 40 L48 40 L55 20 Z" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1"/>
      <circle cx="30" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  hybrid: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 50 L25 35 L40 30 L60 30 L75 35 L80 50 L80 60 L75 65 L25 65 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 Q45 35, 50 40 T60 40" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="50" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
    </svg>
  ),
  luxury: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M18 52 L22 35 L38 28 L62 28 L78 35 L82 52 L82 62 L77 67 L23 67 L18 62 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 35 L35 40 L65 40 L70 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 42 L60 42 L58 48 L42 48 Z" fill="currentColor" opacity="0.3"/>
      <path d="M45 32 L50 28 L55 32" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  compact: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M25 50 L30 38 L40 35 L60 35 L70 38 L75 50 L75 58 L70 63 L30 63 L25 58 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 40 L40 43 L60 43 L65 40" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="33" cy="58" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="67" cy="58" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="42" y="45" width="16" height="6" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  crossover: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M18 53 L23 38 L38 32 L62 32 L77 38 L82 53 L82 62 L77 67 L23 67 L18 62 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M28 38 L33 43 L67 43 L72 38" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="70" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="37" y="45" width="26" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M18 53 L82 53" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  minivan: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M15 45 L20 30 L35 25 L70 25 L80 30 L85 45 L85 60 L80 65 L20 65 L15 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="25" y="32" width="12" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="40" y="32" width="12" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="55" y="32" width="12" height="10" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="72" cy="60" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M70 45 L75 45 L75 55 L70 55" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}