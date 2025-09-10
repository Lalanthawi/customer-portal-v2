'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SidebarFilters from '../components/search/SidebarFilters'
import { SearchFilters } from '../components/search/types'

interface Vehicle {
  id: string
  title: string
  maker: string
  model: string
  modelCode?: string
  year: number
  price: number
  mileage: number
  transmission: string
  grade?: string
  fuel: string
  location: string
  image: string
  lotNumber: string
  engine?: number
  auctionDate?: Date
  status: 'available' | 'sold' | 'negotiating'
  featured?: boolean
}

// Mock vehicles data - in production, this would come from an API
const allVehicles: Vehicle[] = [
  {
    id: '1',
    title: '2022 Toyota Camry Hybrid',
    maker: 'Toyota',
    model: 'Camry',
    modelCode: 'AXVH70',
    year: 2022,
    price: 3500000,
    mileage: 15000,
    transmission: 'Automatic',
    grade: 'G Package',
    fuel: 'Hybrid',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    lotNumber: 'LOT-2024-001',
    engine: 2500,
    auctionDate: new Date('2024-01-25'),
    status: 'available',
    featured: true
  },
  {
    id: '2',
    title: '2021 Honda Civic Type R',
    maker: 'Honda',
    model: 'Civic',
    modelCode: 'FK8',
    year: 2021,
    price: 4200000,
    mileage: 8000,
    transmission: 'Manual',
    grade: 'Type R',
    fuel: 'Petrol',
    location: 'Osaka',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    lotNumber: 'LOT-2024-002',
    engine: 2000,
    auctionDate: new Date('2024-01-26'),
    status: 'available'
  },
  {
    id: '3',
    title: '2023 Nissan Leaf Electric',
    maker: 'Nissan',
    model: 'Leaf',
    modelCode: 'ZE1',
    year: 2023,
    price: 2800000,
    mileage: 5000,
    transmission: 'Automatic',
    grade: 'X',
    fuel: 'Electric',
    location: 'Yokohama',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    lotNumber: 'LOT-2024-003',
    engine: 0,
    auctionDate: new Date('2024-01-27'),
    status: 'negotiating'
  },
  {
    id: '4',
    title: '2020 Mazda CX-5 AWD',
    maker: 'Mazda',
    model: 'CX-5',
    modelCode: 'KF5P',
    year: 2020,
    price: 2900000,
    mileage: 35000,
    transmission: 'Automatic',
    grade: 'XD Exclusive',
    fuel: 'Petrol',
    location: 'Nagoya',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    lotNumber: 'LOT-2024-004',
    engine: 2500,
    auctionDate: new Date('2024-01-28'),
    status: 'available'
  },
  {
    id: '5',
    title: '2019 BMW 3 Series',
    maker: 'BMW',
    model: '3 Series',
    modelCode: 'G20',
    year: 2019,
    price: 4500000,
    mileage: 28000,
    transmission: 'Automatic',
    grade: '320i M Sport',
    fuel: 'Petrol',
    location: 'Kobe',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    lotNumber: 'LOT-2024-005',
    engine: 2000,
    auctionDate: new Date('2024-01-29'),
    status: 'sold'
  },
  {
    id: '6',
    title: '2022 Mercedes-Benz C-Class',
    maker: 'Mercedes',
    model: 'C-Class',
    modelCode: 'W206',
    year: 2022,
    price: 5200000,
    mileage: 12000,
    transmission: 'Automatic',
    grade: 'C200 AMG Line',
    fuel: 'Petrol',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    lotNumber: 'LOT-2024-006',
    engine: 2000,
    auctionDate: new Date('2024-01-30'),
    status: 'available'
  },
  {
    id: '7',
    title: '2021 Subaru WRX STI',
    maker: 'Subaru',
    model: 'WRX STI',
    modelCode: 'VAB',
    year: 2021,
    price: 3800000,
    mileage: 18000,
    transmission: 'Manual',
    grade: 'STI Type S',
    fuel: 'Petrol',
    location: 'Saitama',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    lotNumber: 'LOT-2024-007',
    engine: 2500,
    auctionDate: new Date('2024-01-31'),
    status: 'available'
  },
  {
    id: '8',
    title: '2023 Lexus RX 350h',
    maker: 'Lexus',
    model: 'RX',
    modelCode: 'TALA10',
    year: 2023,
    price: 6500000,
    mileage: 3000,
    transmission: 'Automatic',
    grade: 'Version L',
    fuel: 'Hybrid',
    location: 'Osaka',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba1be8?w=800',
    lotNumber: 'LOT-2024-008',
    engine: 2500,
    auctionDate: new Date('2024-02-01'),
    status: 'available',
    featured: true
  }
]

function SearchResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(allVehicles)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc'>('year-desc')
  const [showFilters, setShowFilters] = useState(true)
  
  // Parse search query from URL
  const searchQuery = searchParams.get('q') || ''
  const maker = searchParams.get('maker') || ''
  const category = searchParams.get('category') || ''

  // Apply filters from URL parameters
  useEffect(() => {
    let results = [...allVehicles]
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.maker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.lotNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by maker
    if (maker) {
      results = results.filter(v => v.maker.toLowerCase() === maker.toLowerCase())
    }
    
    // Filter by category
    if (category) {
      // Simple category mapping - in production this would be more sophisticated
      if (category === 'Electric') {
        results = results.filter(v => v.fuel === 'Electric')
      } else if (category === 'SUV') {
        results = results.filter(v => v.title.includes('CX-5') || v.title.includes('RX'))
      }
    }
    
    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'year-desc':
          return b.year - a.year
        case 'mileage-asc':
          return a.mileage - b.mileage
        default:
          return 0
      }
    })
    
    setFilteredVehicles(results)
  }, [searchQuery, maker, category, sortBy])

  const handleAdvancedSearch = (filters: SearchFilters) => {
    setIsLoading(true)
    
    setTimeout(() => {
      let results = [...allVehicles]
      
      // Apply all advanced filters
      if (filters.basic.maker) {
        results = results.filter(v => v.maker.toLowerCase() === filters.basic.maker.toLowerCase())
      }
      
      if (filters.basic.year.min) {
        results = results.filter(v => v.year >= filters.basic.year.min!)
      }
      if (filters.basic.year.max) {
        results = results.filter(v => v.year <= filters.basic.year.max!)
      }
      
      if (filters.basic.price.min) {
        results = results.filter(v => v.price >= filters.basic.price.min! * 1000)
      }
      if (filters.basic.price.max) {
        results = results.filter(v => v.price <= filters.basic.price.max! * 1000)
      }
      
      if (filters.basic.mileage.max) {
        results = results.filter(v => v.mileage <= filters.basic.mileage.max! * 1000)
      }
      
      if (filters.basic.lotNumbers && filters.basic.lotNumbers.length > 0) {
        results = results.filter(v => 
          filters.basic.lotNumbers.some(lotNum => 
            v.lotNumber.toLowerCase().includes(lotNum.toLowerCase())
          )
        )
      }
      
      // Color and equipment filters removed as these properties don't exist on Vehicle type
      // These filters can be re-enabled when the properties are added to the Vehicle interface
      
      setFilteredVehicles(results)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/explore" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
                <p className="text-sm text-gray-500">
                  {filteredVehicles.length} vehicles found
                  {searchQuery && ` for "${searchQuery}"`}
                  {maker && ` from ${maker}`}
                  {category && ` in ${category}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 lg:hidden ${
                  showFilters
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-[#FA7921]"
              >
                <option value="year-desc">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="mileage-asc">Lowest Mileage</option>
              </select>
              
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
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
                  className={`p-2 rounded-md transition-colors ${
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-96 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px] left-0`}>
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarFilters 
              onSearch={handleAdvancedSearch}
              onReset={() => setFilteredVehicles(allVehicles)}
              className="border-0 shadow-none rounded-2xl"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">Total Results</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredVehicles.length}</p>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div>
                  <p className="text-sm text-gray-500">Available Now</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredVehicles.filter(v => v.status === 'available').length}
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-500">Avg. Price</p>
                  <p className="text-2xl font-bold text-[#FA7921]">
                    ¥{(filteredVehicles.reduce((acc, v) => acc + v.price, 0) / filteredVehicles.length / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
              
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-[#FA7921] rounded-full animate-spin"></div>
                  Searching...
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => router.push(`/dashboard/vehicle/${vehicle.id}`)}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Vehicle Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-72 h-48' : 'h-56'} bg-gray-100 overflow-hidden`}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {vehicle.featured && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
                <span className={`absolute top-3 right-3 px-3 py-1 text-white text-xs font-medium rounded-full ${
                  vehicle.status === 'sold' ? 'bg-red-500' :
                  vehicle.status === 'negotiating' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {vehicle.status === 'sold' ? 'Sold' :
                   vehicle.status === 'negotiating' ? 'Negotiating' : 'Available'}
                </span>
                
                {/* Quick Actions */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add to favorites logic
                    }}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      // Compare logic
                    }}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#FA7921] transition-colors">
                      {vehicle.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Lot: {vehicle.lotNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#FA7921]">
                    ¥{(vehicle.price / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-sm text-gray-500">JPY</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="text-gray-500">Registration Year:</span>
                    <span className="font-medium text-gray-900">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="text-gray-500">Mileage:</span>
                    <span className="font-medium text-gray-900">{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  {vehicle.modelCode && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="text-gray-500">Model Code:</span>
                      <span className="font-medium text-gray-900">{vehicle.modelCode}</span>
                    </div>
                  )}
                  {vehicle.engine && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="text-gray-500">Engine:</span>
                      <span className="font-medium text-gray-900">{vehicle.engine}cc</span>
                    </div>
                  )}
                  {vehicle.grade && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="text-gray-500">Grade:</span>
                      <span className="font-medium text-gray-900">{vehicle.grade}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="text-gray-500">Transmission:</span>
                    <span className="font-medium text-gray-900">{vehicle.transmission}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button className="text-sm text-[#FA7921] font-medium hover:text-[#FA7921]/80">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && !isLoading && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <Link
              href="/dashboard/explore"
              className="inline-block px-6 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors"
            >
              Back to Explore
            </Link>
          </div>
        )}

          {/* Pagination */}
          {filteredVehicles.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-[#FA7921] text-white rounded-lg">1</button>
              <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
              <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
              <span className="px-3 py-2 text-gray-400">...</span>
              <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">10</button>
              <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA7921] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  )
}