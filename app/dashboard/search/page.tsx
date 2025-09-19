'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SearchBar } from '@/src/components/ui/search-bar'
import { VehicleCard } from '@/src/components/ui/vehicle-card-new'
import { demoVehicles, type DemoVehicle } from '@/src/mocks'

// Type alias for compatibility
type Vehicle = DemoVehicle

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const vehicles = demoVehicles
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(demoVehicles)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [yearRange, setYearRange] = useState<[number, number]>([2015, 2024])
  const [mileageMax, setMileageMax] = useState(200000)
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([])
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([])
  const [engineSizeRange, setEngineSizeRange] = useState<[number, number]>([0, 5000])
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  // Get search query from URL
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    // Apply filters
    let filtered = [...vehicles]
    
    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(v => 
        v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price range filter
    filtered = filtered.filter(v => v.price >= priceRange[0] && v.price <= priceRange[1])

    // Year range filter
    filtered = filtered.filter(v => v.year >= yearRange[0] && v.year <= yearRange[1])

    // Mileage filter
    filtered = filtered.filter(v => v.mileage <= mileageMax)

    // Make filter
    if (selectedMakes.length > 0) {
      filtered = filtered.filter(v => selectedMakes.includes(v.make))
    }


    // Fuel type filter
    if (selectedFuelTypes.length > 0) {
      filtered = filtered.filter(v => selectedFuelTypes.includes(v.fuelType))
    }

    // Transmission filter
    if (selectedTransmissions.length > 0) {
      filtered = filtered.filter(v => selectedTransmissions.includes(v.transmission))
    }








    // Engine size filter
    filtered = filtered.filter(v => {
      const engineSizeNum = parseInt(v.engineSize.replace(/[^0-9]/g, '')) * 1000 || 0
      return engineSizeNum >= engineSizeRange[0] && engineSizeNum <= engineSizeRange[1]
    })

    // Verified only filter
    if (verifiedOnly) {
      filtered = filtered.filter(v => v.verified)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage)
        break
      case 'ending-soon':
        filtered.sort((a, b) => a.auctionEndTime.getTime() - b.auctionEndTime.getTime())
        break
    }

    setFilteredVehicles(filtered)
  }, [searchQuery, priceRange, yearRange, mileageMax, selectedMakes, 
      selectedFuelTypes, selectedTransmissions, 
      engineSizeRange, verifiedOnly, sortBy, vehicles])

  const formatPrice = (price: number) => {
    return `¥${(price / 1000000).toFixed(1)}M`
  }

  return (
    <div className="w-full -mt-6">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#002233] to-[#003344] text-white rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Vehicles'}
            </h1>
            <p className="text-gray-300">
              Found {filteredVehicles.length} vehicles matching your criteria
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/explore')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={(value) => router.push(`/dashboard/search?q=${encodeURIComponent(value)}`)}
          placeholder="Refine your search..."
          className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-md rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7921]"
          size="lg"
        />
      </div>

      {/* Quick Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:overflow-x-auto sm:flex-nowrap pb-2">
          <span className="text-sm font-medium text-gray-700 flex-shrink-0">Quick Filters:</span>
          
          {/* Price Range */}
          <select
            value={`${priceRange[0]}-${priceRange[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number)
              setPriceRange([min || 0, max || 10000000])
            }}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent flex-shrink-0"
          >
            <option value="0-10000000">Any Price</option>
            <option value="0-1000000">Under ¥1M</option>
            <option value="1000000-3000000">¥1M - ¥3M</option>
            <option value="3000000-5000000">¥3M - ¥5M</option>
            <option value="5000000-10000000">Above ¥5M</option>
          </select>

          {/* Year Range */}
          <select
            value={`${yearRange[0]}-${yearRange[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number)
              setYearRange([min || 2015, max || 2024])
            }}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent flex-shrink-0"
          >
            <option value="2015-2024">Any Year</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2020-2024">2020 & Newer</option>
            <option value="2015-2019">2015-2019</option>
          </select>

          <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>

          {/* Popular Makes */}
          {['Toyota', 'Honda', 'Nissan', 'Mazda'].map(make => (
            <button
              key={make}
              onClick={() => {
                if (selectedMakes.includes(make)) {
                  setSelectedMakes(selectedMakes.filter(m => m !== make))
                } else {
                  setSelectedMakes([...selectedMakes, make])
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                selectedMakes.includes(make)
                  ? 'bg-[#FA7921] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {make}
            </button>
          ))}


          <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>

          {/* Quick Options */}
          <button
            onClick={() => {
              if (selectedTransmissions.includes('Automatic')) {
                setSelectedTransmissions(selectedTransmissions.filter(t => t !== 'Automatic'))
              } else {
                setSelectedTransmissions([...selectedTransmissions, 'Automatic'])
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
              selectedTransmissions.includes('Automatic')
                ? 'bg-[#FA7921] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Automatic
          </button>

          <button
            onClick={() => {
              if (selectedFuelTypes.includes('Hybrid')) {
                setSelectedFuelTypes(selectedFuelTypes.filter(f => f !== 'Hybrid'))
              } else {
                setSelectedFuelTypes([...selectedFuelTypes, 'Hybrid'])
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
              selectedFuelTypes.includes('Hybrid')
                ? 'bg-[#FA7921] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hybrid
          </button>

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
              verifiedOnly
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Verified Only
          </button>

          {/* Clear All - Shows when filters are active */}
          {(selectedMakes.length > 0 || selectedTransmissions.length > 0 || 
            selectedFuelTypes.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000000 || 
            yearRange[0] > 2015 || yearRange[1] < 2024 || verifiedOnly) && (
            <>
              <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
              <button
                onClick={() => {
                  setSelectedMakes([])
                  setSelectedTransmissions([])
                  setSelectedFuelTypes([])
                  setPriceRange([0, 10000000])
                  setYearRange([2015, 2024])
                  setMileageMax(200000)
                  setEngineSizeRange([0, 5000])
                  setVerifiedOnly(false)
                }}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-all flex-shrink-0 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All
              </button>
            </>
          )}
        </div>
        
        {/* Active Filters Summary */}
        {(selectedMakes.length > 0 || selectedTransmissions.length > 0 || 
          selectedFuelTypes.length > 0) && (
          <div className="pt-3 border-t border-gray-200 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Active:</span>
            {[...selectedMakes, ...selectedTransmissions, ...selectedFuelTypes,
].map((filter, index) => (
              <span key={index} className="px-2 py-1 bg-[#FA7921]/10 text-[#FA7921] rounded text-xs">
                {filter}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#FA7921] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#FA7921] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {showFilters ? 'Hide' : 'Show'} Advanced Filters
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year-new">Year: Newest First</option>
            <option value="mileage-low">Mileage: Low to High</option>
            <option value="ending-soon">Ending Soon</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters - Expanded */}
        {showFilters && (
          <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-6">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <span className="text-xs text-gray-500">{filteredVehicles.length} results</span>
              </div>
            </div>
            
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Verified Only Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                  <span className="text-sm font-medium text-gray-700">Verified Dealers Only</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#FA7921]"
                />
              </div>

              {/* Year Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Year</label>
                <div className="flex gap-2">
                  <select
                    value={yearRange[0]}
                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <span className="text-gray-400 self-center">to</span>
                  <select
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mileage */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Max Mileage: {mileageMax.toLocaleString()} km
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="10000"
                  value={mileageMax}
                  onChange={(e) => setMileageMax(parseInt(e.target.value))}
                  className="w-full accent-[#FA7921]"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>0 km</span>
                  <span>200,000 km</span>
                </div>
              </div>

              {/* Make Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Make</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {Array.from(new Set(vehicles.map(v => v.make))).sort().map(make => (
                    <label key={make} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMakes.includes(make)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMakes([...selectedMakes, make])
                          } else {
                            setSelectedMakes(selectedMakes.filter(m => m !== make))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">{make}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Transmission</label>
                <div className="space-y-2">
                  {['Automatic', 'Manual', 'CVT', 'Semi-Auto'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTransmissions.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTransmissions([...selectedTransmissions, type])
                          } else {
                            setSelectedTransmissions(selectedTransmissions.filter(t => t !== type))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Fuel Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from(new Set(vehicles.map(v => v.fuelType))).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (selectedFuelTypes.includes(type)) {
                          setSelectedFuelTypes(selectedFuelTypes.filter(t => t !== type))
                        } else {
                          setSelectedFuelTypes([...selectedFuelTypes, type])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedFuelTypes.includes(type)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engine Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Engine Size: {engineSizeRange[0]}cc - {engineSizeRange[1]}cc
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={engineSizeRange[1]}
                  onChange={(e) => setEngineSizeRange([engineSizeRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#FA7921]"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>0cc</span>
                  <span>5000cc</span>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, 10000000])
                  setYearRange([2015, 2024])
                  setMileageMax(200000)
                  setSelectedMakes([])
                  setSelectedFuelTypes([])
                  setSelectedTransmissions([])
                  setEngineSizeRange([0, 5000])
                  setVerifiedOnly(false)
                }}
                className="w-full px-4 py-2 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Grid/List */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={{
                    ...vehicle,
                    id: vehicle.id,
                    lotNumber: vehicle.lotNumber,
                    make: vehicle.make,
                    model: vehicle.model,
                    modelCode: vehicle.modelCode,
                    year: vehicle.year,
                    price: vehicle.price,
                    currentBid: vehicle.price,
                    startingPrice: vehicle.startingPrice,
                    mileage: vehicle.mileage,
                    transmission: vehicle.transmission,
                    grade: vehicle.grade,
                    engineSize: vehicle.engineSize,
                    imageUrl: vehicle.imageUrl,
                    auctionEndTime: vehicle.auctionEndTime,
                    bids: vehicle.bids,
                    verified: vehicle.verified
                  }}
                  viewMode="grid"
                  showBidButton={false}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={{
                    ...vehicle,
                    id: vehicle.id,
                    lotNumber: vehicle.lotNumber,
                    make: vehicle.make,
                    model: vehicle.model,
                    modelCode: vehicle.modelCode,
                    year: vehicle.year,
                    price: vehicle.price,
                    currentBid: vehicle.price,
                    startingPrice: vehicle.startingPrice,
                    mileage: vehicle.mileage,
                    transmission: vehicle.transmission,
                    grade: vehicle.grade,
                    engineSize: vehicle.engineSize,
                    imageUrl: vehicle.imageUrl,
                    auctionEndTime: vehicle.auctionEndTime,
                    bids: vehicle.bids,
                    verified: vehicle.verified
                  }}
                  viewMode="list"
                  showBidButton={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* No Results */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="text-gray-500">Loading...</div></div>}>
      <SearchResults />
    </Suspense>
  )
}