'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { manufacturerLogos } from './ManufacturerLogos'
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
  { id: 'toyota', name: 'Toyota', vehicleCount: 245, popular: true },
  { id: 'lexus', name: 'Lexus', vehicleCount: 156, popular: true },
  { id: 'honda', name: 'Honda', vehicleCount: 198, popular: true },
  { id: 'nissan', name: 'Nissan', vehicleCount: 167, popular: true },
  { id: 'mercedes', name: 'Mercedes', vehicleCount: 134 },
  { id: 'bmw', name: 'BMW', vehicleCount: 145, popular: true },
  { id: 'audi', name: 'Audi', vehicleCount: 123 },
  { id: 'volkswagen', name: 'Volkswagen', vehicleCount: 112 },
  { id: 'porsche', name: 'Porsche', vehicleCount: 89 },
  { id: 'jaguar', name: 'Jaguar', vehicleCount: 67 },
  { id: 'land-rover', name: 'Land Rover', vehicleCount: 78 },
  { id: 'mazda', name: 'Mazda', vehicleCount: 145, popular: true },
  { id: 'subaru', name: 'Subaru', vehicleCount: 134 },
  { id: 'suzuki', name: 'Suzuki', vehicleCount: 156 },
  { id: 'mitsubishi', name: 'Mitsubishi', vehicleCount: 98 },
  { id: 'tesla', name: 'Tesla', vehicleCount: 45, popular: true },
  { id: 'ford', name: 'Ford', vehicleCount: 178 },
  { id: 'chevrolet', name: 'Chevrolet', vehicleCount: 134 },
  { id: 'hyundai', name: 'Hyundai', vehicleCount: 189 },
  { id: 'kia', name: 'Kia', vehicleCount: 145 },
  { id: 'volvo', name: 'Volvo', vehicleCount: 87 },
  { id: 'mini', name: 'MINI', vehicleCount: 56 },
  { id: 'jeep', name: 'Jeep', vehicleCount: 92 },
  { id: 'ferrari', name: 'Ferrari', vehicleCount: 12 },
]

// Removed unused bodyTypes array

const fuelTypes = [
  { id: 'petrol', name: 'Petrol', count: 1234 },
  { id: 'diesel', name: 'Diesel', count: 567 },
  { id: 'hybrid', name: 'Hybrid', count: 345 },
  { id: 'electric', name: 'Electric', count: 89 },
  { id: 'plug-in-hybrid', name: 'Plug-in Hybrid', count: 123 },
]

const recentSearches = [
  'Toyota Camry 2022',
  'Under ¥3,000,000',
  'Low Mileage',
  'Hybrid',
  'SUV',
  'Electric',
]

export default function ExplorePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
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

  const toggleFuelType = (fuelTypeId: string) => {
    setFilters(prev => ({
      ...prev,
      fuelTypes: prev.fuelTypes.includes(fuelTypeId)
        ? prev.fuelTypes.filter(id => id !== fuelTypeId)
        : [...prev.fuelTypes, fuelTypeId]
    }))
  }

  const toggleTransmission = (type: string) => {
    setFilters(prev => ({
      ...prev,
      transmission: prev.transmission.includes(type)
        ? prev.transmission.filter(t => t !== type)
        : [...prev.transmission, type]
    }))
  }

  const clearAllFilters = () => {
    setFilters({
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
  }

  const activeFiltersCount = 
    filters.manufacturers.length + 
    filters.bodyTypes.length + 
    filters.fuelTypes.length + 
    filters.transmission.length +
    (filters.priceRange[0] > 100000 || filters.priceRange[1] < 10000000 ? 1 : 0) +
    (filters.yearRange[0] > 2015 || filters.yearRange[1] < 2024 ? 1 : 0) +
    (filters.mileageMax < 200000 ? 1 : 0)

  return (
    <div className="w-full -mt-6">
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
                      className="flex-1 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none bg-transparent"
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
            <div className="flex flex-wrap gap-2 justify-center mt-8">
              <span className="text-white/60 text-sm">Trending:</span>
              {recentSearches.map((search, index) => (
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

      {/* Advanced Filters Panel - Redesigned */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 animate-in slide-in-from-top duration-300 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
                  <p className="text-xs text-gray-500">Refine your search results</p>
                </div>
              </div>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Primary Filters Section */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#FA7921] rounded-full"></div>
                Primary Filters
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Price Range - Enhanced */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Min</label>
                        <input
                          type="text"
                          value={`¥${(filters.priceRange[0] / 1000000).toFixed(1)}M`}
                          readOnly
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                        />
                      </div>
                      <div className="flex items-end pb-2">
                        <span className="text-gray-400">—</span>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Max</label>
                        <input
                          type="text"
                          value={`¥${(filters.priceRange[1] / 1000000).toFixed(1)}M`}
                          readOnly
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="100000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                      }))}
                      className="w-full accent-[#FA7921]"
                    />
                    <div className="flex gap-2">
                      {[1000000, 3000000, 5000000, 10000000].map(price => (
                        <button
                          key={price}
                          onClick={() => setFilters(prev => ({ ...prev, priceRange: [100000, price] }))}
                          className="flex-1 px-2 py-1 text-xs bg-white hover:bg-[#FA7921] hover:text-white border border-gray-200 rounded transition-colors"
                        >
                          ¥{(price / 1000000)}M
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Year Range - Enhanced */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Model Year</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">From</label>
                        <select
                          value={filters.yearRange[0]}
                          onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            yearRange: [parseInt(e.target.value), prev.yearRange[1]] 
                          }))}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        >
                          {Array.from({ length: 10 }, (_, i) => 2015 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">To</label>
                        <select
                          value={filters.yearRange[1]}
                          onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            yearRange: [prev.yearRange[0], parseInt(e.target.value)] 
                          }))}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        >
                          {Array.from({ length: 10 }, (_, i) => 2015 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, yearRange: [2023, 2024] }))}
                        className="flex-1 px-2 py-1 text-xs bg-white hover:bg-[#FA7921] hover:text-white border border-gray-200 rounded transition-colors"
                      >
                        Latest
                      </button>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, yearRange: [2020, 2024] }))}
                        className="flex-1 px-2 py-1 text-xs bg-white hover:bg-[#FA7921] hover:text-white border border-gray-200 rounded transition-colors"
                      >
                        Recent
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mileage - Enhanced */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Maximum Mileage
                  </label>
                  <div className="space-y-3">
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                      <span className="text-lg font-bold text-[#FA7921]">{filters.mileageMax.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 ml-1">km</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={filters.mileageMax}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        mileageMax: parseInt(e.target.value) 
                      }))}
                      className="w-full accent-[#FA7921]"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {[50000, 100000, 200000].map(km => (
                        <button
                          key={km}
                          onClick={() => setFilters(prev => ({ ...prev, mileageMax: km }))}
                          className="px-2 py-1 text-xs bg-white hover:bg-[#FA7921] hover:text-white border border-gray-200 rounded transition-colors"
                        >
                          {km/1000}k km
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location - Enhanced */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                  <div className="space-y-3">
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    >
                      <option value="">All Japan</option>
                      <option value="tokyo">Tokyo</option>
                      <option value="osaka">Osaka</option>
                      <option value="nagoya">Nagoya</option>
                      <option value="yokohama">Yokohama</option>
                      <option value="kobe">Kobe</option>
                      <option value="kyoto">Kyoto</option>
                      <option value="fukuoka">Fukuoka</option>
                      <option value="sapporo">Sapporo</option>
                    </select>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-blue-700">Nationwide shipping available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Specifications */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                Vehicle Specifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Transmission */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Transmission</label>
                  <div className="space-y-2">
                    {['Automatic', 'Manual', 'CVT'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={filters.transmission.includes(type)}
                          onChange={() => toggleTransmission(type)}
                          className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Fuel Type</label>
                  <div className="space-y-2">
                    {fuelTypes.slice(0, 3).map(fuel => (
                      <label key={fuel.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={filters.fuelTypes.includes(fuel.id)}
                          onChange={() => toggleFuelType(fuel.id)}
                          className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                        />
                        <span className="text-sm text-gray-700">{fuel.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Drive Type */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Drive Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['FWD', 'RWD', 'AWD', '4WD'].map(type => (
                      <button
                        key={type}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          driveType: prev.driveType.includes(type)
                            ? prev.driveType.filter(t => t !== type)
                            : [...prev.driveType, type]
                        }))}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          filters.driveType.includes(type)
                            ? 'bg-[#FA7921] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seats */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Seats</label>
                  <div className="flex flex-wrap gap-2">
                    {['2', '5', '7', '8+'].map(seats => (
                      <button
                        key={seats}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          seats: prev.seats.includes(seats)
                            ? prev.seats.filter(s => s !== seats)
                            : [...prev.seats, seats]
                        }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          filters.seats.includes(seats)
                            ? 'bg-[#FA7921] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {seats}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engine Size */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Engine Size</label>
                  <div className="space-y-2">
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium">{filters.engineSize[0]} - {filters.engineSize[1]}cc</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="500"
                      value={filters.engineSize[1]}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        engineSize: [prev.engineSize[0], parseInt(e.target.value)] 
                      }))}
                      className="w-full accent-[#FA7921] h-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Options - Redesigned */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-green-500 rounded-full"></div>
                Additional Options
              </h4>
              
              {/* Tabbed Interface for Additional Options */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Color Selection - Visual Palette */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a6 6 0 00-2-4l-3-3m-5 14v-3m0-4V5m0 7l-3-3m3 3l3-3" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900">Exterior Color</h5>
                        <p className="text-xs text-gray-500">Select preferred colors</p>
                      </div>
                    </div>
                    {filters.colors.length > 0 && (
                      <span className="text-xs bg-[#FA7921]/10 text-[#FA7921] px-2 py-1 rounded-full font-medium">
                        {filters.colors.length} selected
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                    {[
                      { name: 'Black', hex: '#000000', gradient: false },
                      { name: 'White', hex: '#FFFFFF', gradient: false },
                      { name: 'Silver', hex: '#C0C0C0', gradient: false },
                      { name: 'Gray', hex: '#808080', gradient: false },
                      { name: 'Red', hex: '#DC2626', gradient: false },
                      { name: 'Blue', hex: '#2563EB', gradient: false },
                      { name: 'Navy', hex: '#1E3A8A', gradient: false },
                      { name: 'Green', hex: '#16A34A', gradient: false },
                      { name: 'Yellow', hex: '#FCD34D', gradient: false },
                      { name: 'Orange', hex: '#FB923C', gradient: false },
                      { name: 'Brown', hex: '#92400E', gradient: false },
                      { name: 'Beige', hex: '#D4A574', gradient: false },
                      { name: 'Gold', hex: '#F59E0B', gradient: false },
                      { name: 'Pearl', hex: '#FAF6F0', gradient: true },
                      { name: 'Custom', hex: 'rainbow', gradient: true }
                    ].map(colorOption => (
                      <div key={colorOption.name} className="relative">
                        <button
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            colors: prev.colors.includes(colorOption.name)
                              ? prev.colors.filter(c => c !== colorOption.name)
                              : [...prev.colors, colorOption.name]
                          }))}
                          className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-110 ${
                            filters.colors.includes(colorOption.name) 
                              ? 'border-[#FA7921] shadow-lg shadow-[#FA7921]/30' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          title={colorOption.name}
                        >
                          {colorOption.hex === 'rainbow' ? (
                            <div className="w-full h-full bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400" />
                          ) : colorOption.gradient ? (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-white relative">
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent" />
                            </div>
                          ) : (
                            <div 
                              className="w-full h-full" 
                              style={{ backgroundColor: colorOption.hex }}
                            />
                          )}
                          {filters.colors.includes(colorOption.name) && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                        <span className="text-[10px] text-gray-600 text-center block mt-1 truncate">{colorOption.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition Selection - Card Style */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900">Vehicle Condition</h5>
                        <p className="text-xs text-gray-500">Filter by quality rating</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { name: 'New', icon: 'sparkle', color: 'from-emerald-500 to-green-600', description: 'Brand new' },
                      { name: 'Like New', icon: 'star', color: 'from-blue-500 to-indigo-600', description: 'Pristine' },
                      { name: 'Excellent', icon: 'badge', color: 'from-purple-500 to-pink-600', description: 'Very good' },
                      { name: 'Good', icon: 'thumb', color: 'from-orange-500 to-amber-600', description: 'Reliable' },
                      { name: 'Fair', icon: 'check', color: 'from-gray-500 to-gray-600', description: 'Average' },
                      { name: 'For Parts', icon: 'wrench', color: 'from-red-500 to-red-600', description: 'Salvage' }
                    ].map(condition => (
                      <button
                        key={condition.name}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          condition: prev.condition.includes(condition.name)
                            ? prev.condition.filter(c => c !== condition.name)
                            : [...prev.condition, condition.name]
                        }))}
                        className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          filters.condition.includes(condition.name)
                            ? 'border-[#FA7921] bg-orange-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${condition.color} flex items-center justify-center text-white`}>
                            {condition.icon === 'sparkle' ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ) : condition.icon === 'star' ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ) : condition.icon === 'badge' ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : condition.icon === 'thumb' ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                            ) : condition.icon === 'check' ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                          </div>
                          <p className={`text-xs font-semibold ${filters.condition.includes(condition.name) ? 'text-[#FA7921]' : 'text-gray-700'}`}>
                            {condition.name}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{condition.description}</p>
                        </div>
                        {filters.condition.includes(condition.name) && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FA7921] rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features - Completely Redesigned */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-purple-500 rounded-full"></div>
                Premium Features
              </h4>
              
              {/* Feature Categories with Icons */}
              <div className="space-y-4">
                {/* Safety Features */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-900">Safety & Security</h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'Backup Camera', icon: '📸' },
                      { name: 'Blind Spot', icon: '👁️' },
                      { name: 'Lane Departure', icon: '🛣️' },
                      { name: 'Parking Sensors', icon: '🚨' },
                      { name: 'Adaptive Cruise', icon: '🚙' },
                      { name: '360 Camera', icon: '🎥' },
                      { name: 'Collision Alert', icon: '⚠️' },
                      { name: 'ABS', icon: '🛑' }
                    ].map(feature => (
                      <button
                        key={feature.name}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          features: prev.features.includes(feature.name)
                            ? prev.features.filter(f => f !== feature.name)
                            : [...prev.features, feature.name]
                        }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filters.features.includes(feature.name)
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white hover:bg-blue-100 text-gray-700 border border-blue-200'
                        }`}
                      >
                        <span className="text-sm">{feature.icon}</span>
                        <span className="truncate">{feature.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comfort Features */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-900">Comfort & Luxury</h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'Leather Seats', icon: '🪑' },
                      { name: 'Heated Seats', icon: '🔥' },
                      { name: 'Cooled Seats', icon: '❄️' },
                      { name: 'Sunroof', icon: '☀️' },
                      { name: 'Power Seats', icon: '⚡' },
                      { name: 'Memory Seats', icon: '💾' },
                      { name: 'Massage Seats', icon: '💆' },
                      { name: 'Ambient Light', icon: '💡' }
                    ].map(feature => (
                      <button
                        key={feature.name}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          features: prev.features.includes(feature.name)
                            ? prev.features.filter(f => f !== feature.name)
                            : [...prev.features, feature.name]
                        }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filters.features.includes(feature.name)
                            ? 'bg-[#FA7921] text-white shadow-md'
                            : 'bg-white hover:bg-orange-100 text-gray-700 border border-orange-200'
                        }`}
                      >
                        <span className="text-sm">{feature.icon}</span>
                        <span className="truncate">{feature.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technology Features */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-900">Technology & Entertainment</h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'Navigation', icon: '🗺️' },
                      { name: 'Apple CarPlay', icon: '🍎' },
                      { name: 'Android Auto', icon: '🤖' },
                      { name: 'Bluetooth', icon: '📱' },
                      { name: 'Premium Audio', icon: '🎵' },
                      { name: 'Wireless Charge', icon: '🔋' },
                      { name: 'HUD Display', icon: '📊' },
                      { name: 'WiFi Hotspot', icon: '📶' }
                    ].map(feature => (
                      <button
                        key={feature.name}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          features: prev.features.includes(feature.name)
                            ? prev.features.filter(f => f !== feature.name)
                            : [...prev.features, feature.name]
                        }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filters.features.includes(feature.name)
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-white hover:bg-purple-100 text-gray-700 border border-purple-200'
                        }`}
                      >
                        <span className="text-sm">{feature.icon}</span>
                        <span className="truncate">{feature.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance Features */}
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-900">Performance & Handling</h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'Sport Mode', icon: '🏁' },
                      { name: 'Turbo', icon: '💨' },
                      { name: 'Air Suspension', icon: '🛞' },
                      { name: 'Launch Control', icon: '🚀' },
                      { name: 'Paddle Shifters', icon: '🎮' },
                      { name: 'Limited Slip', icon: '⚙️' },
                      { name: 'Sport Exhaust', icon: '🔊' },
                      { name: 'Track Mode', icon: '🏎️' }
                    ].map(feature => (
                      <button
                        key={feature.name}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          features: prev.features.includes(feature.name)
                            ? prev.features.filter(f => f !== feature.name)
                            : [...prev.features, feature.name]
                        }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filters.features.includes(feature.name)
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-white hover:bg-red-100 text-gray-700 border border-red-200'
                        }`}
                      >
                        <span className="text-sm">{feature.icon}</span>
                        <span className="truncate">{feature.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Convenience Features */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-900">Convenience</h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'Keyless Entry', icon: '🔑' },
                      { name: 'Push Start', icon: '🔘' },
                      { name: 'Auto Park', icon: '🅿️' },
                      { name: 'Remote Start', icon: '📡' },
                      { name: 'Power Tailgate', icon: '🚪' },
                      { name: 'Auto Hold', icon: '✋' },
                      { name: 'Rain Sensor', icon: '🌧️' },
                      { name: 'Auto Lights', icon: '💡' }
                    ].map(feature => (
                      <button
                        key={feature.name}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          features: prev.features.includes(feature.name)
                            ? prev.features.filter(f => f !== feature.name)
                            : [...prev.features, feature.name]
                        }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filters.features.includes(feature.name)
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-white hover:bg-green-100 text-gray-700 border border-green-200'
                        }`}
                      >
                        <span className="text-sm">{feature.icon}</span>
                        <span className="truncate">{feature.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{activeFiltersCount}</span> filters applied
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const mockEvent = { preventDefault: () => {} } as React.FormEvent
                    handleSearch(mockEvent)
                    setShowFilters(false)
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Manufacturer Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Browse by Manufacturer</h2>
            <p className="text-sm text-gray-500 mt-1">Select brands to filter results</p>
          </div>
          {filters.manufacturers.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{filters.manufacturers.length} selected</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, manufacturers: [] }))}
                className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {manufacturers.map((manufacturer) => (
            <button
              key={manufacturer.id}
              onClick={() => toggleManufacturer(manufacturer.id)}
              className={`group relative bg-white rounded-2xl border-2 p-5 transition-all duration-200 ${
                filters.manufacturers.includes(manufacturer.id)
                  ? 'border-[#FA7921] shadow-lg bg-gradient-to-br from-orange-50 to-white scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-105'
              }`}
            >
              {manufacturer.popular && !filters.manufacturers.includes(manufacturer.id) && (
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA7921] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA7921]"></span>
                  </span>
                </div>
              )}
              
              {/* Logo Container */}
              <div className="w-12 h-12 mx-auto mb-3 text-gray-600 group-hover:text-[#FA7921] transition-colors">
                {manufacturerLogos[manufacturer.id] || (
                  <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚗</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xs font-semibold text-gray-900 text-center truncate">
                {manufacturer.name}
              </h3>
              <p className="text-xs text-gray-500 text-center mt-1">
                {manufacturer.vehicleCount}
              </p>
              
              {filters.manufacturers.includes(manufacturer.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-[#FA7921] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>


      {/* Modern Stats Grid - Redesigned */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: 'Active Auctions', 
              value: '2,456', 
              change: '+12%',
              subtitle: 'Ending this week',
              gradient: 'from-[#002233] to-[#003344]',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            { 
              title: 'New Arrivals', 
              value: '156', 
              change: '+23%',
              subtitle: 'Added today',
              gradient: 'from-[#FA7921] to-[#FFB956]',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )
            },
            { 
              title: 'Verified Dealers', 
              value: '89', 
              change: '+5%',
              subtitle: 'Trusted partners',
              gradient: 'from-[#003344] to-[#004455]',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )
            },
            { 
              title: 'Avg. Sale Price', 
              value: '¥3.2M', 
              change: '-3%',
              subtitle: 'This month',
              gradient: 'from-[#FA7921]/80 to-[#FA7921]',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            }
          ].map((stat, index) => (
            <div key={index} className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-700">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                
                {/* Subtle background pattern */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full opacity-5 group-hover:scale-125 transition-transform duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}