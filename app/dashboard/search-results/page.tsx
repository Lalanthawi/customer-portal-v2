'use client'

import { useState, useEffect } from 'react'
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
  year: number
  price: number
  mileage: number
  transmission: string
  fuel: string
  location: string
  image: string
  lotNumber: string
  score?: string
  equipment?: string[]
  color?: string
  chassisNumber?: string
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
    year: 2022,
    price: 3500000,
    mileage: 15000,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    lotNumber: 'LOT-2024-001',
    score: '4.5',
    equipment: ['AC', 'PW', 'PS'],
    color: 'Silver',
    chassisNumber: 'JT2BG22K0Y0123456',
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
    year: 2021,
    price: 4200000,
    mileage: 8000,
    transmission: 'Manual',
    fuel: 'Petrol',
    location: 'Osaka',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    lotNumber: 'LOT-2024-002',
    score: '5',
    equipment: ['AC', 'AW', 'SR', 'PW'],
    color: 'Blue',
    chassisNumber: 'SHHFK8650MU200123',
    engine: 2000,
    auctionDate: new Date('2024-01-26'),
    status: 'available'
  },
  {
    id: '3',
    title: '2023 Nissan Leaf Electric',
    maker: 'Nissan',
    model: 'Leaf',
    year: 2023,
    price: 2800000,
    mileage: 5000,
    transmission: 'Automatic',
    fuel: 'Electric',
    location: 'Yokohama',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    lotNumber: 'LOT-2024-003',
    score: '4',
    equipment: ['AC', 'PW', 'PS', 'TV'],
    color: 'White',
    chassisNumber: 'JN1AZ0CP9ET123456',
    engine: 0,
    auctionDate: new Date('2024-01-27'),
    status: 'negotiating'
  },
  {
    id: '4',
    title: '2020 Mazda CX-5 AWD',
    maker: 'Mazda',
    model: 'CX-5',
    year: 2020,
    price: 2900000,
    mileage: 35000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Nagoya',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    lotNumber: 'LOT-2024-004',
    score: '3.5',
    equipment: ['AC', 'AW', 'LE', 'PW', 'PS'],
    color: 'Red',
    chassisNumber: 'JM3KFADM0L0123456',
    engine: 2500,
    auctionDate: new Date('2024-01-28'),
    status: 'available'
  },
  {
    id: '5',
    title: '2019 BMW 3 Series',
    maker: 'BMW',
    model: '3 Series',
    year: 2019,
    price: 4500000,
    mileage: 28000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Kobe',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    lotNumber: 'LOT-2024-005',
    score: '4',
    equipment: ['AC', 'AW', 'LE', 'SR', 'PW', 'PS'],
    color: 'Black',
    chassisNumber: 'WBA5A5C50KG123456',
    engine: 2000,
    auctionDate: new Date('2024-01-29'),
    status: 'sold'
  },
  {
    id: '6',
    title: '2022 Mercedes-Benz C-Class',
    maker: 'Mercedes',
    model: 'C-Class',
    year: 2022,
    price: 5200000,
    mileage: 12000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    lotNumber: 'LOT-2024-006',
    score: '4.5',
    equipment: ['AC', 'AW', 'LE', 'SR', 'PW', 'PS', 'TV'],
    color: 'Silver',
    chassisNumber: 'WDD2050351F123456',
    engine: 2000,
    auctionDate: new Date('2024-01-30'),
    status: 'available'
  },
  {
    id: '7',
    title: '2021 Subaru WRX STI',
    maker: 'Subaru',
    model: 'WRX STI',
    year: 2021,
    price: 3800000,
    mileage: 18000,
    transmission: 'Manual',
    fuel: 'Petrol',
    location: 'Saitama',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    lotNumber: 'LOT-2024-007',
    score: '4',
    equipment: ['AC', 'AW', 'SR', 'PW', 'PS'],
    color: 'Blue',
    chassisNumber: 'JF1VA2W68M9123456',
    engine: 2500,
    auctionDate: new Date('2024-01-31'),
    status: 'available'
  },
  {
    id: '8',
    title: '2023 Lexus RX 350h',
    maker: 'Lexus',
    model: 'RX',
    year: 2023,
    price: 6500000,
    mileage: 3000,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    location: 'Osaka',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba1be8?w=800',
    lotNumber: 'LOT-2024-008',
    score: '5',
    equipment: ['AC', 'AW', 'LE', 'SR', 'PW', 'PS', 'TV'],
    color: 'Pearl White',
    chassisNumber: 'JTHBA1D27N5123456',
    engine: 2500,
    auctionDate: new Date('2024-02-01'),
    status: 'available',
    featured: true
  }
]

export default function SearchResultsPage() {
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
      
      if (filters.colors.length > 0) {
        results = results.filter(v => v.color && filters.colors.includes(v.color))
      }
      
      if (filters.equipment.length > 0) {
        results = results.filter(v => 
          v.equipment && filters.equipment.some(eq => v.equipment!.includes(eq))
        )
      }
      
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
                  {vehicle.score && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded ml-2">
                      Score: {vehicle.score}
                    </span>
                  )}
                </div>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#FA7921]">
                    ¥{(vehicle.price / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-sm text-gray-500">JPY</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{vehicle.location}</span>
                  </div>
                </div>

                {vehicle.equipment && vehicle.equipment.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {vehicle.equipment.slice(0, 4).map(eq => (
                        <span key={eq} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {eq}
                        </span>
                      ))}
                      {vehicle.equipment.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{vehicle.equipment.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex items-center justify-between">
                  <button className="text-sm text-[#FA7921] font-medium hover:text-[#FA7921]/80">
                    View Details →
                  </button>
                  <div className="flex items-center gap-1">
                    {vehicle.color && (
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300" 
                        style={{ backgroundColor: vehicle.color === 'Silver' ? '#C0C0C0' : vehicle.color }}
                        title={vehicle.color}
                      />
                    )}
                  </div>
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