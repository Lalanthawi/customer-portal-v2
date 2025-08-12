'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { manufacturerLogos } from './ManufacturerLogos'
import { vehicleIcons } from './VehicleIcons'

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

const bodyTypes = [
  { id: 'sedan', name: 'Sedan', count: 456 },
  { id: 'suv', name: 'SUV', count: 389 },
  { id: 'sports', name: 'Sports', count: 123 },
  { id: 'coupe', name: 'Coupe', count: 234 },
  { id: 'hatchback', name: 'Hatchback', count: 167 },
  { id: 'convertible', name: 'Convertible', count: 45 },
  { id: 'wagon', name: 'Wagon', count: 78 },
  { id: 'van', name: 'Van', count: 56 },
  { id: 'truck', name: 'Truck', count: 112 },
  { id: 'electric', name: 'Electric', count: 89 },
  { id: 'hybrid', name: 'Hybrid', count: 234 },
  { id: 'luxury', name: 'Luxury', count: 156 },
]

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
    priceRange: [0, 10000000],
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

  const toggleBodyType = (bodyTypeId: string) => {
    setFilters(prev => ({
      ...prev,
      bodyTypes: prev.bodyTypes.includes(bodyTypeId)
        ? prev.bodyTypes.filter(id => id !== bodyTypeId)
        : [...prev.bodyTypes, bodyTypeId]
    }))
  }

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
      priceRange: [0, 10000000],
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
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000 ? 1 : 0) +
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

      {/* Advanced Filters Panel - Expanded */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Main Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>¥{(filters.priceRange[0] / 1000000).toFixed(1)}M</span>
                    <span>¥{(filters.priceRange[1] / 1000000).toFixed(1)}M</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                    }))}
                    className="w-full accent-[#FA7921]"
                  />
                </div>
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Year</label>
              <div className="flex gap-2">
                <select
                  value={filters.yearRange[0]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    yearRange: [parseInt(e.target.value), prev.yearRange[1]] 
                  }))}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  {Array.from({ length: 10 }, (_, i) => 2015 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <span className="text-gray-400">to</span>
                <select
                  value={filters.yearRange[1]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    yearRange: [prev.yearRange[0], parseInt(e.target.value)] 
                  }))}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  {Array.from({ length: 10 }, (_, i) => 2015 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Transmission</label>
              <div className="space-y-2">
                {['Automatic', 'Manual', 'CVT', 'Semi-Auto'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
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

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Max Mileage: {filters.mileageMax.toLocaleString()} km
              </label>
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
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>0 km</span>
                <span>200,000 km</span>
              </div>
            </div>

            {/* Drive Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Drive Type</label>
              <div className="space-y-2">
                {['FWD', 'RWD', 'AWD', '4WD'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.driveType.includes(type)}
                      onChange={() => setFilters(prev => ({
                        ...prev,
                        driveType: prev.driveType.includes(type)
                          ? prev.driveType.filter(t => t !== type)
                          : [...prev.driveType, type]
                      }))}
                      className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Number of Seats</label>
              <div className="grid grid-cols-2 gap-2">
                {['2', '4', '5', '7', '8+'].map(seats => (
                  <button
                    key={seats}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      seats: prev.seats.includes(seats)
                        ? prev.seats.filter(s => s !== seats)
                        : [...prev.seats, seats]
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
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

            {/* Number of Doors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Number of Doors</label>
              <div className="grid grid-cols-2 gap-2">
                {['2', '3', '4', '5'].map(doors => (
                  <button
                    key={doors}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      doors: prev.doors.includes(doors)
                        ? prev.doors.filter(d => d !== doors)
                        : [...prev.doors, doors]
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.doors.includes(doors)
                        ? 'bg-[#FA7921] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {doors}
                  </button>
                ))}
              </div>
            </div>

            {/* Engine Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Engine Size: {filters.engineSize[0]}cc - {filters.engineSize[1]}cc
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.engineSize[1]}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  engineSize: [prev.engineSize[0], parseInt(e.target.value)] 
                }))}
                className="w-full accent-[#FA7921]"
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>0cc</span>
                <span>5000cc</span>
              </div>
            </div>
          </div>

          {/* Additional Filter Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Fuel Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Fuel Type</label>
              <div className="flex flex-wrap gap-2">
                {fuelTypes.map(fuel => (
                  <button
                    key={fuel.id}
                    onClick={() => toggleFuelType(fuel.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.fuelTypes.includes(fuel.id)
                        ? 'bg-[#FA7921] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {fuel.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
              <div className="flex flex-wrap gap-2">
                {['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold'].map(color => (
                  <button
                    key={color}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      colors: prev.colors.includes(color)
                        ? prev.colors.filter(c => c !== color)
                        : [...prev.colors, color]
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.colors.includes(color)
                        ? 'bg-[#FA7921] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Condition</label>
              <div className="flex flex-wrap gap-2">
                {['New', 'Like New', 'Excellent', 'Good', 'Fair'].map(condition => (
                  <button
                    key={condition}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      condition: prev.condition.includes(condition)
                        ? prev.condition.filter(c => c !== condition)
                        : [...prev.condition, condition]
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.condition.includes(condition)
                        ? 'bg-[#FA7921] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Navigation System', 'Leather Seats', 'Sunroof', 'Backup Camera', 
                'Bluetooth', 'Heated Seats', 'Keyless Entry', 'Cruise Control',
                'Apple CarPlay', 'Android Auto', 'Parking Sensors', 'Blind Spot Monitor',
                'Lane Departure', 'Adaptive Cruise', '360 Camera', 'Premium Audio'
              ].map(feature => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      features: prev.features.includes(feature)
                        ? prev.features.filter(f => f !== feature)
                        : [...prev.features, feature]
                    }))}
                    className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                  <span className="text-xs text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">All Locations</option>
                <option value="tokyo">Tokyo</option>
                <option value="osaka">Osaka</option>
                <option value="nagoya">Nagoya</option>
                <option value="yokohama">Yokohama</option>
                <option value="kobe">Kobe</option>
                <option value="kyoto">Kyoto</option>
                <option value="fukuoka">Fukuoka</option>
                <option value="sapporo">Sapporo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="mileage-low">Mileage: Low to High</option>
                <option value="ending-soon">Auction Ending Soon</option>
              </select>
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

      {/* Body Types Section - Modern Cards */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vehicle Types</h2>
            <p className="text-sm text-gray-500 mt-1">Filter by body style and category</p>
          </div>
          {filters.bodyTypes.length > 0 && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, bodyTypes: [] }))}
              className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
            >
              Clear ({filters.bodyTypes.length})
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
          {bodyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleBodyType(type.id)}
              className={`group relative bg-white rounded-2xl p-3 transition-all duration-200 ${
                filters.bodyTypes.includes(type.id)
                  ? 'bg-gradient-to-br from-[#FA7921]/10 to-[#FFB956]/10 border-2 border-[#FA7921] shadow-lg scale-105'
                  : 'border-2 border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-105'
              }`}
            >
              <div className={`w-10 h-10 mx-auto mb-2 transition-colors ${
                filters.bodyTypes.includes(type.id) 
                  ? 'text-[#FA7921]' 
                  : 'text-gray-600 group-hover:text-[#FA7921]'
              }`}>
                {vehicleIcons[type.id] || (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🚗</span>
                  </div>
                )}
              </div>
              <h3 className="text-xs font-semibold text-gray-900 text-center">
                {type.name}
              </h3>
              <p className="text-xs text-gray-500 text-center mt-0.5">
                {type.count}
              </p>
              {filters.bodyTypes.includes(type.id) && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FA7921] rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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