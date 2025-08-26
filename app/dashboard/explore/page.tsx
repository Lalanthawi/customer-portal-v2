'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

export default function ExplorePage() {
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
        
        <div className="relative px-8 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA7921] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA7921]"></span>
                </span>
                <span className="text-sm text-white/90">2,456 Active Auctions</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
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
            
            <p className="text-gray-200 text-lg md:text-xl text-center mb-10 max-w-2xl mx-auto">
              Browse thousands of premium vehicles from Japan&apos;s most trusted dealers
            </p>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FA7921] to-[#FFB956] rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-200"></div>
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
                      className="flex-1 py-3 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="relative px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FA7921] text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                  >
                    <span>Search</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            {/* Recent Searches - Modern Pills */}
            <div className="flex flex-wrap items-center gap-2 justify-center mt-8">
              <span className="text-white/60 text-sm font-medium mr-1">
                Trending {userCountry !== 'default' && `in ${userCountry}`}:
              </span>
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="group px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 text-sm rounded-full hover:bg-white/20 transition-all border border-white/10 hover:border-white/30 flex items-center gap-2"
                >
                  <svg className="w-3 h-3 text-white/60 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 animate-in slide-in-from-top duration-300 overflow-hidden">
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
      )}

      {/* Quick Actions Bar - Sticky when scrolling */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-y border-gray-100 px-6 py-3 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="mileage-low">Mileage: Lowest First</option>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Manufacturer</h2>
          <button className="text-[#FA7921] hover:text-[#e86f1e] font-medium text-sm">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {manufacturers.filter(m => m.popular).map((manufacturer) => (
            <button
              key={manufacturer.id}
              onClick={() => toggleManufacturer(manufacturer.id)}
              className={`group relative bg-white rounded-xl p-4 border-2 transition-all ${
                filters.manufacturers.includes(manufacturer.id)
                  ? 'border-[#FA7921] shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {filters.manufacturers.includes(manufacturer.id) && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FA7921] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  {manufacturerLogos[manufacturer.id] || (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-400">
                        {manufacturer.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{manufacturer.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{manufacturer.vehicleCount} cars</p>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['SUV', 'Sedan', 'Truck', 'Sports', 'Electric', 'Hybrid'].map((category) => (
            <button
              key={category}
              className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#FA7921] transition-all hover:shadow-lg"
            >
              <div className="mb-3 flex justify-center">
                {category === 'SUV' && (
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17h6l1 1v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-2l1-1zm-4-7h14l-1.5-4.5A1 1 0 0016.5 5h-9a1 1 0 00-.95.68L5 10zm0 0v5a1 1 0 001 1h12a1 1 0 001-1v-5m-14 0h14" />
                  </svg>
                )}
                {category === 'Sedan' && (
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11h14l-1-3H6l-1 3zm0 0v4a1 1 0 001 1h1m-2-5v4a1 1 0 001 1h1m-2-5h14m0 0v4a1 1 0 01-1 1h-1m2-5v4a1 1 0 01-1 1h-1m0 0v2m-10-2v2m2-7h6" />
                  </svg>
                )}
                {category === 'Truck' && (
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h6m-6 0v2a1 1 0 001 1h1m-2-3v2a1 1 0 001 1h1m4-3v2a1 1 0 001 1h1a1 1 0 001-1v-7.5L16.5 9m0 0H13m3.5 0L19 11.5M7 16a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                )}
                {category === 'Sports' && (
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-2-4h-5l-2 4m9 0h2a1 1 0 011 1v3m-4-4l-2-4m0 0L9 9m5-4v4m-5 0H3a1 1 0 00-1 1v3m7-4l2-4M6 17a2 2 0 100 4 2 2 0 000-4zm0 0h12m0 0a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                )}
                {category === 'Electric' && (
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {category === 'Hybrid' && (
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-[#FA7921] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h6m-6 4h6m-6 4h6M5 3v18l7-3 7 3V3l-7 3-7-3z" />
                  </svg>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#FA7921] transition-colors">{category}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}