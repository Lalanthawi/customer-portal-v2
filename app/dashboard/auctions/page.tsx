'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { manufacturerLogos } from './ManufacturerLogos'
import AdvancedSearchStatic from '../components/search/AdvancedSearchStatic'
import { TermsOfServiceModal, useTOSAcceptance } from '../components/TermsOfService'
// Removed unused import: vehicleIcons

interface Manufacturer {
  id: string
  name: string
  vehicleCount: number
  popular?: boolean
}

interface FilterState {
  manufacturers: string[]
  priceRange: [number, number]
  yearRange: [number, number]
  bodyTypes: string[]
  fuelTypes: string[]
  transmission: string[]
  mileageMax: number
  colors: string[]
  driveType: string[]
  seats: string[]
  doors: string[]
  engineSize: [number, number]
  condition: string[]
  features: string[]
  location: string
  sortBy: string
}

const manufacturers: Manufacturer[] = [
  // Japanese
  { id: 'toyota', name: 'Toyota', vehicleCount: 245, popular: true },
  { id: 'lexus', name: 'Lexus', vehicleCount: 156, popular: true },
  { id: 'honda', name: 'Honda', vehicleCount: 198, popular: true },
  { id: 'nissan', name: 'Nissan', vehicleCount: 167, popular: true },
  { id: 'mazda', name: 'Mazda', vehicleCount: 145, popular: true },
  { id: 'subaru', name: 'Subaru', vehicleCount: 134 },
  { id: 'suzuki', name: 'Suzuki', vehicleCount: 156 },
  { id: 'mitsubishi', name: 'Mitsubishi', vehicleCount: 98 },
  { id: 'daihatsu', name: 'Daihatsu', vehicleCount: 67 },
  { id: 'infiniti', name: 'Infiniti', vehicleCount: 54 },
  { id: 'acura', name: 'Acura', vehicleCount: 43 },
  { id: 'isuzu', name: 'Isuzu', vehicleCount: 38 },
  
  // German
  { id: 'mercedes', name: 'Mercedes-Benz', vehicleCount: 134 },
  { id: 'bmw', name: 'BMW', vehicleCount: 145, popular: true },
  { id: 'audi', name: 'Audi', vehicleCount: 123 },
  { id: 'volkswagen', name: 'Volkswagen', vehicleCount: 112 },
  { id: 'porsche', name: 'Porsche', vehicleCount: 89, popular: true },
  { id: 'mini', name: 'MINI', vehicleCount: 56 },
  { id: 'smart', name: 'Smart', vehicleCount: 23 },
  { id: 'opel', name: 'Opel', vehicleCount: 31 },
  
  // American
  { id: 'tesla', name: 'Tesla', vehicleCount: 45, popular: true },
  { id: 'ford', name: 'Ford', vehicleCount: 178 },
  { id: 'chevrolet', name: 'Chevrolet', vehicleCount: 134 },
  { id: 'jeep', name: 'Jeep', vehicleCount: 92 },
  { id: 'dodge', name: 'Dodge', vehicleCount: 78 },
  { id: 'cadillac', name: 'Cadillac', vehicleCount: 34 },
  { id: 'gmc', name: 'GMC', vehicleCount: 67 },
  { id: 'chrysler', name: 'Chrysler', vehicleCount: 29 },
  { id: 'lincoln', name: 'Lincoln', vehicleCount: 21 },
  { id: 'ram', name: 'RAM', vehicleCount: 45 },
  { id: 'hummer', name: 'Hummer', vehicleCount: 12 },
  
  // British
  { id: 'jaguar', name: 'Jaguar', vehicleCount: 67 },
  { id: 'land-rover', name: 'Land Rover', vehicleCount: 78 },
  { id: 'bentley', name: 'Bentley', vehicleCount: 7 },
  { id: 'rolls-royce', name: 'Rolls-Royce', vehicleCount: 5 },
  { id: 'aston-martin', name: 'Aston Martin', vehicleCount: 9 },
  { id: 'mclaren', name: 'McLaren', vehicleCount: 6 },
  { id: 'lotus', name: 'Lotus', vehicleCount: 11 },
  { id: 'mg', name: 'MG', vehicleCount: 24 },
  
  // Korean
  { id: 'hyundai', name: 'Hyundai', vehicleCount: 189 },
  { id: 'kia', name: 'Kia', vehicleCount: 145 },
  { id: 'genesis', name: 'Genesis', vehicleCount: 23 },
  { id: 'ssangyong', name: 'SsangYong', vehicleCount: 18 },
  
  // Italian
  { id: 'ferrari', name: 'Ferrari', vehicleCount: 12 },
  { id: 'lamborghini', name: 'Lamborghini', vehicleCount: 8 },
  { id: 'maserati', name: 'Maserati', vehicleCount: 15 },
  { id: 'alfa-romeo', name: 'Alfa Romeo', vehicleCount: 19 },
  { id: 'fiat', name: 'Fiat', vehicleCount: 28 },
  { id: 'lancia', name: 'Lancia', vehicleCount: 14 },
  
  // French
  { id: 'peugeot', name: 'Peugeot', vehicleCount: 67 },
  { id: 'renault', name: 'Renault', vehicleCount: 54 },
  { id: 'citroen', name: 'Citroen', vehicleCount: 41 },
  { id: 'bugatti', name: 'Bugatti', vehicleCount: 3 },
  { id: 'ds', name: 'DS', vehicleCount: 18 },
  
  // Swedish
  { id: 'volvo', name: 'Volvo', vehicleCount: 87 },
  { id: 'saab', name: 'Saab', vehicleCount: 22 },
  { id: 'polestar', name: 'Polestar', vehicleCount: 14 },
  { id: 'koenigsegg', name: 'Koenigsegg', vehicleCount: 2 },
  
  // Chinese
  { id: 'byd', name: 'BYD', vehicleCount: 34 },
  { id: 'geely', name: 'Geely', vehicleCount: 28 },
  { id: 'nio', name: 'NIO', vehicleCount: 19 },
  { id: 'xpeng', name: 'Xpeng', vehicleCount: 15 },
  { id: 'li-auto', name: 'Li Auto', vehicleCount: 12 },
]

// Removed unused bodyTypes array
// Removed unused fuelTypes array

// Country-specific trending searches based on import regulations
const trendingSearchesByCountry: { [key: string]: string[] } = {
  // Sri Lanka - Can only import cars within 3 years old, prefer specific models
  'LK': [
    'Toyota Prius 2023',
    'Honda Vezel 2024',
    'Nissan X-Trail 2023',
    'Toyota Aqua 2024',
    'Suzuki Swift 2023',
    'Honda Fit 2024',
  ],
  // United States - Only imports 25+ year old cars (JDM classics)
  'US': [
    'Nissan Skyline R32',
    'Toyota Supra MK4',
    'Mazda RX-7 FD',
    'Honda NSX 1991',
    'Mitsubishi Lancer Evo III',
    'Subaru Impreza WRX STI 1999',
  ],
  // United Kingdom - Imports both new and classic cars
  'GB': [
    'Toyota GR Yaris 2023',
    'Nissan GTR R35',
    'Classic Mini Cooper',
    'Toyota Land Cruiser 2024',
    'Mazda MX-5 2023',
    'JDM Classics',
  ],
  // Australia - Similar to UK, both ends of spectrum
  'AU': [
    'Toyota HiLux 2023',
    'Nissan Patrol 2024',
    'Toyota Land Cruiser 70',
    'Mitsubishi Pajero 2023',
    'Mazda BT-50 2024',
    'JDM Sports Cars',
  ],
  // Canada - Similar to US but slightly more flexible (15+ years)
  'CA': [
    'Nissan Skyline R33',
    'Toyota Aristo V300',
    'Honda Integra Type R',
    'Subaru Legacy GT',
    'Mitsubishi Delica',
    'Toyota Century 2008',
  ],
  // New Zealand - Popular JDM imports
  'NZ': [
    'Toyota Aqua Hybrid',
    'Nissan Leaf 2023',
    'Honda Fit Hybrid',
    'Mazda Demio 2023',
    'Suzuki Swift Sport',
    'Toyota Vitz 2023',
  ],
  // Ireland - Mix of UK and EU preferences
  'IE': [
    'Toyota Corolla 2023',
    'Honda Civic Type R',
    'Nissan Qashqai 2024',
    'Toyota C-HR 2023',
    'Mazda CX-5 2024',
    'Hybrid vehicles',
  ],
  // Kenya/East Africa - Prefer specific reliable models
  'KE': [
    'Toyota Probox',
    'Nissan Note 2020',
    'Toyota Fielder',
    'Mazda Demio 2019',
    'Honda Fit 2020',
    'Toyota Succeed',
  ],
  // Russia - Cold weather suitable vehicles
  'RU': [
    'Toyota Land Cruiser',
    'Nissan Patrol',
    'Mitsubishi Pajero',
    'Toyota RAV4 2023',
    'Subaru Forester',
    'Toyota Camry 2023',
  ],
  // Default/Random for other countries
  'default': [
    'Toyota Camry 2022',
    'Under ¥3,000,000',
    'Low Mileage',
    'Hybrid',
    'SUV',
    'Electric',
  ],
}

// Function to detect user's country (in production, this would come from user profile or IP geolocation)
const getUserCountry = (): string => {
  // This would normally come from user profile or geolocation API
  // For now, we'll check browser language or return default
  if (typeof window !== 'undefined') {
    const lang = navigator.language || navigator.languages[0]
    const countryCode = lang?.split('-')[1] || 'default'
    return countryCode.toUpperCase()
  }
  return 'default'
}

export default function AuctionsPage() {
  const router = useRouter()
  const { hasAcceptedTOS, acceptTOS } = useTOSAcceptance()
  const [showTOS, setShowTOS] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [trendingSearches, setTrendingSearches] = useState<string[]>([])
  const [userCountry, setUserCountry] = useState<string>('default')
  const [filters, setFilters] = useState<FilterState>({
    manufacturers: [],
    priceRange: [100000, 10000000],
    yearRange: [2015, 2024],
    bodyTypes: [],
    fuelTypes: [],
    transmission: [],
    mileageMax: 200000,
    colors: [],
    driveType: [],
    seats: [],
    doors: [],
    engineSize: [0, 5000],
    condition: [],
    features: [],
    location: '',
    sortBy: 'relevance',
  })

  // Check TOS acceptance on mount
  useEffect(() => {
    if (hasAcceptedTOS === false) {
      setShowTOS(true)
    }
  }, [hasAcceptedTOS])

  // Lock body scroll when filters sidebar is open
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [showFilters])

  // Load country-specific trending searches on component mount
  useEffect(() => {
    const country = getUserCountry()
    setUserCountry(country)
    
    // Get trending searches for the user's country
    const searches = trendingSearchesByCountry[country] || trendingSearchesByCountry['default']
    
    // If country is unknown, randomly select from different regions for variety
    if (country === 'default' || !trendingSearchesByCountry[country]) {
      const regions = ['LK', 'US', 'GB', 'AU', 'CA', 'NZ', 'KE']
      const randomRegion = regions[Math.floor(Math.random() * regions.length)]
      setTrendingSearches(trendingSearchesByCountry[randomRegion || 'default'] || [])
    } else {
      setTrendingSearches(searches || [])
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('q', searchQuery)
    if (filters.manufacturers.length) params.append('manufacturers', filters.manufacturers.join(','))
    if (filters.bodyTypes.length) params.append('bodyTypes', filters.bodyTypes.join(','))
    if (filters.fuelTypes.length) params.append('fuelTypes', filters.fuelTypes.join(','))
    router.push(`/dashboard/search?${params.toString()}`)
  }

  const toggleManufacturer = (manufacturerId: string) => {
    setFilters(prev => ({
      ...prev,
      manufacturers: prev.manufacturers.includes(manufacturerId)
        ? prev.manufacturers.filter(id => id !== manufacturerId)
        : [...prev.manufacturers, manufacturerId]
    }))
  }

  // Removed unused toggleBodyType function
  // Removed unused toggleFuelType function
  // Removed unused toggleTransmission function
  // Removed unused clearAllFilters function

  const activeFiltersCount = 
    filters.manufacturers.length + 
    filters.bodyTypes.length + 
    filters.fuelTypes.length + 
    filters.transmission.length +
    (filters.priceRange[0] > 100000 || filters.priceRange[1] < 10000000 ? 1 : 0) +
    (filters.yearRange[0] > 2015 || filters.yearRange[1] < 2024 ? 1 : 0) +
    (filters.mileageMax < 200000 ? 1 : 0)

  const handleTOSAccept = () => {
    acceptTOS()
    setShowTOS(false)
  }

  const handleTOSDecline = () => {
    // Redirect to dashboard if user declines
    router.push('/dashboard')
  }

  return (
    <div className="w-full -mt-6">
      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={showTOS}
        onAccept={handleTOSAccept}
        onDecline={handleTOSDecline}
      />
      {/* Modern Hero Section with Glassmorphism */}
      <div className="relative overflow-hidden rounded-3xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002233] via-[#003344] to-[#FA7921]/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA7921] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA7921]"></span>
                </span>
                <span className="text-xs sm:text-sm text-white/90">2,456 Active Auctions</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 sm:mb-4">
              Find Your Perfect{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA7921] to-[#FFB956]">
                  Ride
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                  <path d="M0,4 Q50,0 100,4 T200,4" stroke="#FA7921" strokeWidth="2" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
                  </path>
                </svg>
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 text-center mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
              Browse thousands of premium vehicles from Japan&apos;s most trusted dealers
            </p>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FA7921] to-[#FFB956] rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-200 hidden sm:block"></div>
                
                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 space-y-3">
                    <div className="flex items-center px-3 py-2 bg-gray-50 rounded-xl">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search vehicles..."
                        className="flex-1 text-sm text-gray-900 placeholder-gray-600 focus:outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex-1 px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                          activeFiltersCount > 0 
                            ? 'bg-[#FA7921]/10 text-[#FA7921] border border-[#FA7921]/30' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="font-medium">
                          Filters{activeFiltersCount > 0 && ` (${activeFiltersCount})`}
                        </span>
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium text-sm"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="relative flex gap-2 bg-white/95 backdrop-blur-xl rounded-2xl p-2">
                    <div className="flex-1 flex items-center px-4">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search make, model, or keyword..."
                        className="flex-1 py-3 text-gray-900 placeholder-black/70 focus:outline-none bg-transparent"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setShowFilters(!showFilters)}
                      className={`relative px-3 lg:px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
                        activeFiltersCount > 0 
                          ? 'bg-[#FA7921]/10 text-[#FA7921] hover:bg-[#FA7921]/20 border-2 border-[#FA7921]/30' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className={`w-5 h-5 ${activeFiltersCount > 0 ? 'text-[#FA7921]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span className="font-medium hidden md:inline">
                        {activeFiltersCount > 0 ? `Filters (${activeFiltersCount})` : 'Filters'}
                      </span>
                      {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FA7921] text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                          {activeFiltersCount}
                        </span>
                      )}
                    </button>
                    
                    <button
                      type="submit"
                      className="px-4 lg:px-8 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                    >
                      <span className="hidden sm:inline">Search</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Recent Searches - Modern Pills */}
            <div className="mt-6 sm:mt-8">
              <div className="text-center mb-3">
                <span className="text-white/60 text-xs sm:text-sm font-medium">
                  Trending {userCountry !== 'default' && `in ${userCountry}`}:
                </span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {trendingSearches.slice(0, 4).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="group px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md text-white/90 text-xs sm:text-sm rounded-full hover:bg-white/20 transition-all border border-white/10 hover:border-white/30 flex items-center gap-1 sm:gap-2"
                  >
                    <svg className="w-3 h-3 text-white/60 group-hover:text-[#FA7921] transition-colors hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="truncate max-w-[120px] sm:max-w-none">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Sidebar */}
      <>
        {/* Backdrop */}
        {showFilters && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out animate-in fade-in"
            onClick={() => setShowFilters(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          showFilters ? 'translate-x-0' : 'translate-x-full'
        }`}>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
                  <p className="text-sm text-gray-500 mt-1">Refine your search criteria</p>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Filters Content */}
            <div className="h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="py-6">
                <AdvancedSearchStatic 
                  onSearch={(filters) => {
                    // Handle the search with new filters
                    console.log('Searching with filters:', filters)
                    setShowFilters(false)
                  }}
                  onReset={() => setShowFilters(false)}
                  className="border-0"
                />
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Apply filters logic here
                    setShowFilters(false)
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
      </>

      {/* Quick Actions Bar - Mobile Responsive */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-y border-gray-100 px-4 sm:px-6 py-3 mb-8">
        {/* Mobile Layout */}
        <div className="sm:hidden">
          <div className="flex flex-col gap-3">
            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 font-medium focus:ring-2 focus:ring-[#FA7921] focus:border-transparent [&>option]:text-gray-900"
              style={{ color: '#111827', opacity: 1 }}
            >
              <option value="relevance" className="text-gray-900">Sort by: Relevance</option>
              <option value="price-low" className="text-gray-900">Price: Low to High</option>
              <option value="price-high" className="text-gray-900">Price: High to Low</option>
              <option value="year-new" className="text-gray-900">Year: Newest First</option>
              <option value="mileage-low" className="text-gray-900">Mileage: Lowest First</option>
            </select>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Save Search
              </button>
              <button className="px-3 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#e86f1e] transition-colors text-sm font-medium">
                Create Alert
              </button>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 font-medium focus:ring-2 focus:ring-[#FA7921] focus:border-transparent [&>option]:text-gray-900"
              style={{ color: '#111827', opacity: 1 }}
            >
              <option value="relevance" className="text-gray-900">Relevance</option>
              <option value="price-low" className="text-gray-900">Price: Low to High</option>
              <option value="price-high" className="text-gray-900">Price: High to Low</option>
              <option value="year-new" className="text-gray-900">Year: Newest First</option>
              <option value="mileage-low" className="text-gray-900">Mileage: Lowest First</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Save Search
            </button>
            <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#e86f1e] transition-colors text-sm font-medium">
              Create Alert
            </button>
          </div>
        </div>
      </div>

      {/* Manufacturers Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Browse by Manufacturer</h2>
          <button className="text-[#FA7921] hover:text-[#e86f1e] font-medium text-xs sm:text-sm">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 px-4 sm:px-0">
          {manufacturers.slice(0, 16).map((manufacturer) => (
            <button
              key={manufacturer.id}
              onClick={() => toggleManufacturer(manufacturer.id)}
              className={`group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 transition-all ${
                filters.manufacturers.includes(manufacturer.id)
                  ? 'border-[#FA7921] shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {filters.manufacturers.includes(manufacturer.id) && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#FA7921] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2 flex items-center justify-center">
                  {manufacturerLogos[manufacturer.id] || (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm sm:text-lg font-bold text-gray-400">
                        {manufacturer.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-xs sm:text-sm truncate max-w-full">{manufacturer.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                  <span className="hidden sm:inline">{manufacturer.vehicleCount} cars</span>
                  <span className="sm:hidden">{manufacturer.vehicleCount}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Manufacturers Expandable Section */}
      <details className="mb-12 group">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <h3 className="font-medium text-gray-700">All Manufacturers</h3>
            <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 p-4">
          {manufacturers.map((manufacturer) => (
            <button
              key={manufacturer.id}
              onClick={() => toggleManufacturer(manufacturer.id)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                filters.manufacturers.includes(manufacturer.id)
                  ? 'bg-[#FA7921] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#FA7921]'
              }`}
            >
              <span className="font-medium">{manufacturer.name}</span>
              <span className="block text-xs opacity-80">({manufacturer.vehicleCount})</span>
            </button>
          ))}
        </div>
      </details>

      {/* Popular Categories */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Popular Categories</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Browse vehicles by type</p>
          </div>
          <button className="text-[#FA7921] hover:text-[#e86f1e] font-medium text-xs sm:text-sm flex items-center gap-1">
            <span className="hidden sm:inline">All Categories</span>
            <span className="sm:hidden">View All</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 px-4 sm:px-0">
          {[
            { name: 'SUV', image: '/images/popular/suv.svg', count: '1,234', color: 'from-blue-500 to-blue-600' },
            { name: 'Sedan', image: '/images/popular/sedan.svg', count: '987', color: 'from-purple-500 to-purple-600' },
            { name: 'Truck', image: '/images/popular/truck.svg', count: '456', color: 'from-green-500 to-green-600' },
            { name: 'Sports', image: '/images/popular/sports.svg', count: '234', color: 'from-red-500 to-red-600' },
            { name: 'Electric', image: '/images/popular/electric.svg', count: '567', color: 'from-yellow-500 to-yellow-600' },
            { name: 'Hybrid', image: '/images/popular/hybrid.svg', count: '345', color: 'from-teal-500 to-teal-600' }
          ].map((category) => (
            <button
              key={category.name}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FA7921] transition-all hover:shadow-xl sm:hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-4 sm:p-6">
                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl sm:rounded-2xl group-hover:from-[#FA7921]/10 group-hover:to-[#FF9A56]/10 transition-colors duration-300"></div>
                  <div className="relative flex items-center justify-center h-full">
                    <Image 
                      src={category.image}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                
                {/* Category Name */}
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 group-hover:text-[#FA7921] transition-colors">
                  {category.name}
                </h3>
                
                {/* Vehicle Count */}
                <p className="text-xs text-gray-500 group-hover:text-gray-600">
                  <span className="hidden sm:inline">{category.count} vehicles</span>
                  <span className="sm:hidden">{category.count}</span>
                </p>
                
                {/* Hover Arrow - Desktop Only */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  <div className="w-8 h-8 bg-[#FA7921] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-[#FA7921] transition-all duration-300"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}