'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AdvancedSearchStatic from '../components/search/AdvancedSearchStatic'
import { SearchFilters, initialFilters } from '../components/search/types'

interface Manufacturer {
  id: string
  name: string
  vehicleCount: number
  popular?: boolean
  brandColor: string
  country: string
  logo?: string
}

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
  status: 'available' | 'sold' | 'negotiating'
  featured?: boolean
}

const manufacturers: Manufacturer[] = [
  // Japanese Brands (Most Popular) - Sophisticated, muted colors
  { id: 'toyota', name: 'Toyota', vehicleCount: 2847, popular: true, brandColor: '#2C3E50', country: 'Japan' },
  { id: 'honda', name: 'Honda', vehicleCount: 2134, popular: true, brandColor: '#34495E', country: 'Japan' },
  { id: 'nissan', name: 'Nissan', vehicleCount: 1956, popular: true, brandColor: '#2C3E50', country: 'Japan' },
  { id: 'mazda', name: 'Mazda', vehicleCount: 1523, popular: true, brandColor: '#34495E', country: 'Japan' },
  { id: 'subaru', name: 'Subaru', vehicleCount: 1287, popular: true, brandColor: '#2980B9', country: 'Japan' },
  { id: 'lexus', name: 'Lexus', vehicleCount: 1134, popular: true, brandColor: '#1C2833', country: 'Japan' },
  { id: 'mitsubishi', name: 'Mitsubishi', vehicleCount: 987, brandColor: '#8B0000', country: 'Japan' },
  { id: 'suzuki', name: 'Suzuki', vehicleCount: 856, brandColor: '#B71C1C', country: 'Japan' },
  { id: 'infiniti', name: 'Infiniti', vehicleCount: 623, brandColor: '#212121', country: 'Japan' },
  { id: 'acura', name: 'Acura', vehicleCount: 567, brandColor: '#263238', country: 'Japan' },
  
  // German Luxury (Premium) - Professional, elegant colors
  { id: 'bmw', name: 'BMW', vehicleCount: 2345, popular: true, brandColor: '#1565C0', country: 'Germany' },
  { id: 'mercedes', name: 'Mercedes-Benz', vehicleCount: 2234, popular: true, brandColor: '#37474F', country: 'Germany' },
  { id: 'audi', name: 'Audi', vehicleCount: 1876, popular: true, brandColor: '#424242', country: 'Germany' },
  { id: 'volkswagen', name: 'Volkswagen', vehicleCount: 1456, popular: true, brandColor: '#1E3A8A', country: 'Germany' },
  { id: 'porsche', name: 'Porsche', vehicleCount: 789, popular: true, brandColor: '#B8860B', country: 'Germany' },
  { id: 'mini', name: 'MINI', vehicleCount: 656, brandColor: '#212121', country: 'Germany' },
  { id: 'opel', name: 'Opel', vehicleCount: 478, brandColor: '#F57C00', country: 'Germany' },
  { id: 'smart', name: 'Smart', vehicleCount: 245, brandColor: '#388E3C', country: 'Germany' },
  
  // American Icons - Bold but refined
  { id: 'tesla', name: 'Tesla', vehicleCount: 1567, popular: true, brandColor: '#D32F2F', country: 'USA' },
  { id: 'ford', name: 'Ford', vehicleCount: 1278, popular: true, brandColor: '#1565C0', country: 'USA' },
  { id: 'chevrolet', name: 'Chevrolet', vehicleCount: 1034, popular: true, brandColor: '#F57C00', country: 'USA' },
  { id: 'jeep', name: 'Jeep', vehicleCount: 892, popular: true, brandColor: '#2E3440', country: 'USA' },
  { id: 'cadillac', name: 'Cadillac', vehicleCount: 587, brandColor: '#795548', country: 'USA' },
  { id: 'dodge', name: 'Dodge', vehicleCount: 523, brandColor: '#C62828', country: 'USA' },
  { id: 'lincoln', name: 'Lincoln', vehicleCount: 356, brandColor: '#1A237E', country: 'USA' },
  { id: 'gmc', name: 'GMC', vehicleCount: 412, brandColor: '#C62828', country: 'USA' },
  { id: 'ram', name: 'RAM', vehicleCount: 343, brandColor: '#B71C1C', country: 'USA' },
  { id: 'buick', name: 'Buick', vehicleCount: 245, brandColor: '#8BC34A', country: 'USA' },
  
  // Korean Innovation - Modern, sophisticated
  { id: 'hyundai', name: 'Hyundai', vehicleCount: 1689, popular: true, brandColor: '#1A237E', country: 'Korea' },
  { id: 'kia', name: 'Kia', vehicleCount: 1445, popular: true, brandColor: '#212121', country: 'Korea' },
  { id: 'genesis', name: 'Genesis', vehicleCount: 367, brandColor: '#37474F', country: 'Korea' },
  
  // European Luxury - Refined and elegant
  { id: 'volvo', name: 'Volvo', vehicleCount: 987, popular: true, brandColor: '#1565C0', country: 'Sweden' },
  { id: 'land-rover', name: 'Land Rover', vehicleCount: 778, popular: true, brandColor: '#2E7D32', country: 'UK' },
  { id: 'jaguar', name: 'Jaguar', vehicleCount: 367, brandColor: '#1B5E20', country: 'UK' },
  { id: 'bentley', name: 'Bentley', vehicleCount: 123, brandColor: '#1C2833', country: 'UK' },
  { id: 'rolls-royce', name: 'Rolls-Royce', vehicleCount: 67, brandColor: '#4A148C', country: 'UK' },
  { id: 'aston-martin', name: 'Aston Martin', vehicleCount: 89, brandColor: '#1B5E20', country: 'UK' },
  { id: 'mclaren', name: 'McLaren', vehicleCount: 45, brandColor: '#FF6F00', country: 'UK' },
  
  // Italian Exotics - Passionate but refined
  { id: 'ferrari', name: 'Ferrari', vehicleCount: 89, popular: true, brandColor: '#C62828', country: 'Italy' },
  { id: 'lamborghini', name: 'Lamborghini', vehicleCount: 67, popular: true, brandColor: '#F9A825', country: 'Italy' },
  { id: 'maserati', name: 'Maserati', vehicleCount: 123, brandColor: '#1565C0', country: 'Italy' },
  { id: 'alfa-romeo', name: 'Alfa Romeo', vehicleCount: 245, brandColor: '#B71C1C', country: 'Italy' },
  { id: 'fiat', name: 'Fiat', vehicleCount: 567, brandColor: '#B71C1C', country: 'Italy' },
  
  // French Heritage - Elegant and sophisticated
  { id: 'peugeot', name: 'Peugeot', vehicleCount: 634, brandColor: '#1565C0', country: 'France' },
  { id: 'renault', name: 'Renault', vehicleCount: 756, brandColor: '#F9A825', country: 'France' },
  { id: 'citroen', name: 'Citroën', vehicleCount: 423, brandColor: '#D32F2F', country: 'France' },
  { id: 'bugatti', name: 'Bugatti', vehicleCount: 12, brandColor: '#1A237E', country: 'France' },
  
  // Chinese Electric Future - Modern and tech-forward
  { id: 'byd', name: 'BYD', vehicleCount: 834, popular: true, brandColor: '#1976D2', country: 'China' },
  { id: 'nio', name: 'NIO', vehicleCount: 478, popular: true, brandColor: '#1565C0', country: 'China' },
  { id: 'xpeng', name: 'XPeng', vehicleCount: 356, brandColor: '#E65100', country: 'China' },
  { id: 'geely', name: 'Geely', vehicleCount: 645, brandColor: '#1E3A8A', country: 'China' },
  { id: 'great-wall', name: 'Great Wall', vehicleCount: 398, brandColor: '#424242', country: 'China' },
]

const vehicleCategories = [
  {
    name: 'Sedan',
    count: 15420,
    icon: '🚗',
    description: 'Classic comfort and elegance',
    gradient: 'from-slate-600 to-slate-700',
    bgPattern: 'bg-gradient-to-br from-slate-50 to-gray-100'
  },
  {
    name: 'SUV',
    count: 12840,
    icon: '🚙',
    description: 'Adventure-ready vehicles',
    gradient: 'from-stone-600 to-stone-700',
    bgPattern: 'bg-gradient-to-br from-stone-50 to-stone-100'
  },
  {
    name: 'Sports',
    count: 8750,
    icon: '🏎️',
    description: 'High-performance cars',
    gradient: 'from-red-600 to-red-700',
    bgPattern: 'bg-gradient-to-br from-red-50 to-red-100'
  },
  {
    name: 'Electric',
    count: 9630,
    icon: '⚡',
    description: 'Zero-emission future',
    gradient: 'from-blue-600 to-blue-700',
    bgPattern: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    name: 'Luxury',
    count: 11250,
    icon: '👑',
    description: 'Premium luxury vehicles',
    gradient: 'from-amber-600 to-amber-700',
    bgPattern: 'bg-gradient-to-br from-amber-50 to-amber-100'
  },
  {
    name: 'Hybrid',
    count: 7890,
    icon: '🌱',
    description: 'Eco-efficient technology',
    gradient: 'from-emerald-600 to-emerald-700',
    bgPattern: 'bg-gradient-to-br from-emerald-50 to-emerald-100'
  }
]

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    title: '2024 Toyota Crown',
    maker: 'Toyota',
    model: 'Crown',
    year: 2024,
    price: 7500000,
    mileage: 1000,
    transmission: 'Auto',
    fuel: 'Hybrid',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    lotNumber: 'LOT-001',
    status: 'available',
    featured: true
  },
  {
    id: '2',
    title: '2024 Nissan Ariya',
    maker: 'Nissan',
    model: 'Ariya',
    year: 2024,
    price: 8900000,
    mileage: 500,
    transmission: 'Auto',
    fuel: 'Electric',
    location: 'Yokohama',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    lotNumber: 'LOT-002',
    status: 'available',
    featured: true
  },
  {
    id: '3',
    title: '2024 BMW iX',
    maker: 'BMW',
    model: 'iX',
    year: 2024,
    price: 15000000,
    mileage: 1500,
    transmission: 'Auto',
    fuel: 'Electric',
    location: 'Kobe',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    lotNumber: 'LOT-003',
    status: 'available',
    featured: true
  }
]

export default function ExplorePage() {
  // Add custom CSS for animation delays
  const customStyles = `
    .animation-delay-500 { animation-delay: 0.5s; }
    .animation-delay-1000 { animation-delay: 1s; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-3000 { animation-delay: 3s; }
  `
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [recentSearches] = useState(['Tesla Model Y', 'BMW iX', 'Toyota Crown', 'Mercedes EQS', 'Audi e-tron'])

  const handleAdvancedSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams()
    
    if (filters.basic.maker) params.append('maker', filters.basic.maker)
    if (filters.basic.year.min) params.append('yearMin', filters.basic.year.min.toString())
    if (filters.basic.year.max) params.append('yearMax', filters.basic.year.max.toString())
    if (filters.basic.price.min) params.append('priceMin', filters.basic.price.min.toString())
    if (filters.basic.price.max) params.append('priceMax', filters.basic.price.max.toString())
    if (filters.colors.length > 0) params.append('colors', filters.colors.join(','))
    if (filters.equipment.length > 0) params.append('equipment', filters.equipment.join(','))
    if (filters.basic.lotNumbers.length > 0) params.append('lotNumbers', filters.basic.lotNumbers.join(','))
    
    router.push(`/dashboard/search-results?${params.toString()}`)
  }

  const handleQuickSearch = () => {
    if (searchQuery && searchQuery.trim() !== '') {
      router.push(`/dashboard/search-results?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const getBrandSVG = (name: string) => {
    switch(name.toLowerCase()) {
      case 'toyota':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      case 'bmw':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2v10h10c0-5.52-4.48-10-10-10z" fill="white"/>
            <path d="M2 12h10V2C6.48 2 2 6.48 2 12z" fill="white"/>
          </svg>
        )
      case 'mercedes-benz':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 4l3.5 6.5h-7L12 4zm0 16l-3.5-6.5h7L12 20z" fill="white"/>
          </svg>
        )
      case 'audi':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'tesla':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v3h20V7l-10-5zm-8 8v11h4V10H4zm6 0v11h4V10h-4zm6 0v11h4V10h-4z"/>
          </svg>
        )
      case 'honda':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M8 12h8v4H8z"/>
          </svg>
        )
      case 'nissan':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.5L19.5 8.5v7L12 19.5 4.5 15.5v-7L12 4.5z"/>
          </svg>
        )
      case 'volkswagen':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 8h8l-2 4h-4l-2-4zm0 8h8l-2-4h-4l-2 4z" fill="white"/>
          </svg>
        )
      case 'ford':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="12" rx="10" ry="6"/>
            <rect x="8" y="9" width="8" height="6" rx="2" fill="white"/>
          </svg>
        )
      case 'hyundai':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M8 8h8v8H8z" transform="rotate(45 12 12)" fill="white"/>
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
    }
  }

  return (
    <>
      <style jsx>{customStyles}</style>
      <div className="min-h-screen bg-gray-50">
      {/* Compact Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-br from-[#FA7921] via-[#FF9A56] to-[#FFA366] overflow-hidden">
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-16 left-20 w-24 h-24 bg-white/8 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/6 rounded-full blur-md animate-pulse animation-delay-3000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/3 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        </div>
        
        {/* Elegant overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0L0 15v30l15-15z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 py-12 text-center">
          {/* Compact Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-lg text-white/90 max-w-xl mx-auto">
              Premium vehicles from trusted auction houses worldwide
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Toyota, BMW, Mercedes, Tesla..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
                className="w-full px-5 py-3 pr-20 text-base border-0 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
              />
              <button
                onClick={handleQuickSearch}
                className="absolute right-2 top-2 bottom-2 px-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Advanced Search Toggle */}
            <button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Advanced Filters
            </button>

            {/* Recent Searches */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/80 font-medium">Recent:</span>
              {recentSearches.slice(0, 3).map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search)
                    router.push(`/dashboard/search-results?q=${encodeURIComponent(search)}`)
                  }}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Search Pop-out */}
      {showAdvancedSearch && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setShowAdvancedSearch(false)}
          ></div>
          
          {/* Pop-out Panel */}
          <div className="fixed inset-x-0 top-0 z-50 max-h-screen overflow-y-auto">
            <div className="min-h-screen flex items-start justify-center p-4 pt-20">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-6xl transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Advanced Search Filters</h2>
                  <button
                    onClick={() => setShowAdvancedSearch(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <AdvancedSearchStatic 
                    onSearch={(filters) => {
                      handleAdvancedSearch(filters)
                      setShowAdvancedSearch(false)
                    }}
                    onReset={() => setShowAdvancedSearch(false)}
                    className="border-0 shadow-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Popular Manufacturers */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Manufacturer</h2>
            <p className="text-lg text-gray-600">
              Explore vehicles from the world's leading automotive brands
            </p>
          </div>
          
          {/* Manufacturer Grid with SVGs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {manufacturers.filter(m => m.popular).map((manufacturer) => (
              <button
                key={manufacturer.id}
                onClick={() => router.push(`/dashboard/search-results?maker=${encodeURIComponent(manufacturer.name)}`)}
                className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-[#FA7921] hover:shadow-lg transition-all duration-200"
              >
                <div className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: manufacturer.brandColor }}
                  >
                    {getBrandSVG(manufacturer.name)}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{manufacturer.name}</h3>
                  <p className="text-xs text-gray-500">{manufacturer.vehicleCount.toLocaleString()} vehicles</p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => router.push('/dashboard/search-results')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FA7921] text-white rounded-lg font-semibold hover:bg-[#e86f1e] transition-colors"
            >
              View All {manufacturers.length} Brands
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Vehicle Categories */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">
              Find your ideal vehicle type from our popular categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => router.push(`/dashboard/search-results?category=${encodeURIComponent(category.name)}`)}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FA7921] hover:shadow-lg transition-all duration-200 text-left hover:bg-gradient-to-br hover:from-[#FA7921]/5 hover:to-[#FF9A56]/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FA7921] to-[#FF9A56] flex items-center justify-center text-xl text-white shadow-lg group-hover:scale-105 transition-transform">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <span className="text-sm font-medium text-gray-500">{category.count.toLocaleString()} vehicles</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Vehicles */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-lg text-gray-600">
              Handpicked premium vehicles from our latest auctions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVehicles.map((vehicle) => {
              const brandColor = manufacturers.find(m => m.name === vehicle.maker)?.brandColor || '#FA7921'
              return (
                <div
                  key={vehicle.id}
                  onClick={() => router.push(`/dashboard/vehicle/${vehicle.id}`)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#FA7921] hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      <div className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-md">
                        AVAILABLE
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FA7921] transition-colors mb-1">
                        {vehicle.title}
                      </h3>
                      <p className="text-sm text-gray-500">{vehicle.lotNumber}</p>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-[#FA7921]">
                        ¥{(vehicle.price / 1000000).toFixed(1)}M
                      </span>
                      <span className="text-gray-500 ml-1">JPY</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                      <div>{vehicle.year}</div>
                      <div>{vehicle.mileage.toLocaleString()} km</div>
                      <div>{vehicle.transmission}</div>
                      <div>{vehicle.location}</div>
                    </div>
                    
                    <button className="w-full py-2 bg-[#FA7921] text-white rounded-lg font-semibold hover:bg-[#e86f1e] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => router.push('/dashboard/search-results')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              View All Vehicles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

      </div>
      </div>
    </>
  )
}