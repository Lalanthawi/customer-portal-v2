import React from 'react'
import Image from 'next/image'

export const manufacturerLogos: { [key: string]: React.JSX.Element } = {
  toyota: (
    <Image 
      src="/images/logos/toyota.svg" 
      alt="Toyota" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  lexus: (
    <Image 
      src="/images/logos/lexus.svg" 
      alt="Lexus" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  honda: (
    <Image 
      src="/images/logos/honda.svg" 
      alt="Honda" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  nissan: (
    <Image 
      src="/images/logos/nissan.svg" 
      alt="Nissan" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  mazda: (
    <Image 
      src="/images/logos/mazda.svg" 
      alt="Mazda" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  subaru: (
    <Image 
      src="/images/logos/subaru.svg" 
      alt="Subaru" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  suzuki: (
    <Image 
      src="/images/logos/suzuki.svg" 
      alt="Suzuki" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  mitsubishi: (
    <Image 
      src="/images/logos/mitsubishi.svg" 
      alt="Mitsubishi" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  daihatsu: (
    <Image 
      src="/images/logos/daihatsu.png" 
      alt="Daihatsu" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  infiniti: (
    <Image 
      src="/images/logos/infiniti.svg" 
      alt="Infiniti" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  acura: (
    <Image 
      src="/images/logos/acura.svg" 
      alt="Acura" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  isuzu: (
    <Image 
      src="/images/logos/isuzu.svg" 
      alt="Isuzu" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  mercedes: (
    <Image 
      src="/images/logos/mercedes.svg" 
      alt="Mercedes-Benz" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  bmw: (
    <Image 
      src="/images/logos/bmw.svg" 
      alt="BMW" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  audi: (
    <Image 
      src="/images/logos/audi.svg" 
      alt="Audi" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  volkswagen: (
    <Image 
      src="/images/logos/volkswagen.svg" 
      alt="Volkswagen" 
      width={48} 
      height={48} 
      className="w-12 h-12 object-contain"
    />
  ),
  porsche: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L70 30 L75 50 L70 70 L30 70 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L60 40 L60 45 L55 50 L45 50 L40 45 Z" fill="currentColor"/>
      <path d="M42 55 L58 55 L58 60 L42 60 Z" fill="currentColor"/>
    </svg>
  ),
  mini: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 40 L35 60 L40 55 L45 60 L45 40 M55 40 L55 60 M65 40 L65 60 L70 40 L70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  smart: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 45 Q40 40, 50 40 T65 45" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 55 Q40 60, 50 60 T65 55" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  opel: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M25 50 L75 50 M50 50 L30 30 M50 50 L70 30" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  tesla: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L50 70 M35 25 Q35 20, 40 20 L60 20 Q65 20, 65 25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 25 L40 30 M65 25 L60 30" stroke="currentColor" strokeWidth="2"/>
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
  jeep: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="25" y="35" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 35 L30 30 M40 35 L40 30 M50 35 L50 30 M60 35 L60 30 M70 35 L70 30" stroke="currentColor" strokeWidth="2"/>
      <circle cx="35" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="65" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  dodge: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L70 30 L75 50 L70 70 L30 70 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 45 L60 45 L60 55 L40 55 Z" fill="currentColor"/>
    </svg>
  ),
  cadillac: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L50 20 L70 30 L70 70 L50 80 L30 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 50 L60 50" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  gmc: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="25" y="35" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="16" fill="currentColor" fontWeight="bold">GMC</text>
    </svg>
  ),
  chrysler: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 L50 20 L70 40 M30 60 L50 80 L70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>
  ),
  lincoln: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  ram: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 Q30 30, 40 30 L60 30 Q70 30, 70 40 L70 60 L50 70 L30 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="45" r="3" fill="currentColor"/>
      <circle cx="60" cy="45" r="3" fill="currentColor"/>
    </svg>
  ),
  hummer: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="25" y="35" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="3"/>
      <path d="M25 45 L20 45 M75 45 L80 45 M25 55 L20 55 M75 55 L80 55" stroke="currentColor" strokeWidth="3"/>
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
  lotus: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 30 Q40 40, 40 50 T50 70 Q60 60, 60 50 T50 30" fill="currentColor"/>
    </svg>
  ),
  mg: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M25 30 L40 30 L40 70 L25 70 Z M60 30 L75 30 L75 70 L60 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 50 L60 50" stroke="currentColor" strokeWidth="2"/>
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
  genesis: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 L70 40 M25 50 L75 50 M30 60 L70 60" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 35 L35 65 M65 35 L65 65" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  ssangyong: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="35" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="65" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
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
  'alfa-romeo': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 50 L50 30 M65 50 L50 30 M35 50 L50 70 M65 50 L50 70" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  fiat: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="18" fill="currentColor" fontWeight="bold">FIAT</text>
    </svg>
  ),
  lancia: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L50 50 L30 70 M50 30 L70 50 L50 70" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  peugeot: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L35 40 L35 60 L50 80 L65 60 L65 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>
  ),
  renault: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L50 20 L70 30 L70 70 L50 80 L30 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 50 L50 40 L70 50 L50 60 Z" fill="currentColor"/>
    </svg>
  ),
  citroen: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M35 40 L50 30 L65 40 M35 50 L50 40 L65 50" fill="none" stroke="currentColor" strokeWidth="3"/>
      <path d="M35 60 L50 50 L65 60 M35 70 L50 60 L65 70" fill="none" stroke="currentColor" strokeWidth="3"/>
    </svg>
  ),
  bugatti: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="35" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="40" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="45" y="45" width="10" height="10" fill="white"/>
    </svg>
  ),
  ds: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 L40 30 L60 30 L70 40 L70 60 L60 70 L40 70 L30 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="20" fill="currentColor" fontWeight="bold">DS</text>
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
  saab: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 25 Q40 35, 40 50 T50 75 Q60 65, 60 50 T50 25" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  polestar: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 20 L40 50 L50 45 L60 50 Z M50 80 L40 50 L50 55 L60 50 Z" fill="currentColor"/>
    </svg>
  ),
  koenigsegg: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 30 L50 20 L70 30 L70 70 L50 80 L30 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 40 L50 30 L60 40 M40 60 L50 70 L60 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>
  ),
  byd: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="25" y="40" width="50" height="20" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="16" fill="currentColor" fontWeight="bold">BYD</text>
    </svg>
  ),
  geely: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 40 Q50 30, 65 40 L65 60 Q50 70, 35 60 Z" fill="currentColor"/>
    </svg>
  ),
  nio: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M35 50 L50 35 L65 50 L50 65 Z" fill="currentColor"/>
    </svg>
  ),
  xpeng: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 40 L50 20 L70 40 M30 60 L50 80 L70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="10" fill="currentColor"/>
    </svg>
  ),
  'li-auto': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="30" y="40" width="40" height="20" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="14" fill="currentColor" fontWeight="bold">Li</text>
    </svg>
  )
}