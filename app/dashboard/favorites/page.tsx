'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Search, 
  Grid3x3, 
  List, 
  Clock,
  MapPin,
  Gauge,
  Fuel,
  Filter,
  Settings2
} from 'lucide-react'

interface FavoriteVehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  previousPrice?: number
  mileage: number
  transmission: string
  fuel: string
  location: string
  imageUrl: string
  auctionEndTime: Date
  currentBid: number
  bids: number
  chassisNumber: string
  grade: string
  engineSize: string
  watchedSince: Date
  priceChange?: number
  views: number
  isHot?: boolean
  hasInspection?: boolean
  auctionHouse: string
  lotNumber: string
}

// Mock data
const mockFavorites: FavoriteVehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Land Cruiser 250 VX',
    year: 2024,
    price: 5600000,
    previousPrice: 5800000,
    mileage: 13000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    location: 'Tokyo',
    imageUrl: '/images/singlecar/0.jpeg',
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    currentBid: 5600000,
    bids: 18,
    chassisNumber: 'GDJ250W-9876543',
    grade: '4.5',
    engineSize: '2.8L Turbo',
    watchedSince: new Date(Date.now() - 86400000 * 7),
    priceChange: -3.4,
    views: 234,
    isHot: true,
    hasInspection: true,
    auctionHouse: 'HAA Kobe',
    lotNumber: 'LOT-4521'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: 2800000,
    mileage: 28000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Osaka',
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 5),
    currentBid: 2850000,
    bids: 8,
    chassisNumber: 'RW1-4567890',
    grade: '4.0',
    engineSize: '1.5L Turbo',
    watchedSince: new Date(Date.now() - 86400000 * 3),
    views: 156,
    hasInspection: false,
    auctionHouse: 'USS Nagoya',
    lotNumber: 'LOT-8923'
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'CX-5 Premium',
    year: 2023,
    price: 3200000,
    previousPrice: 3400000,
    mileage: 8900,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Nagoya',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 1),
    currentBid: 3200000,
    bids: 12,
    chassisNumber: 'KF5P-1234567',
    grade: '4.5',
    engineSize: '2.5L',
    watchedSince: new Date(Date.now() - 86400000 * 10),
    priceChange: -5.9,
    views: 89,
    isHot: true,
    hasInspection: true,
    auctionHouse: 'JAA',
    lotNumber: 'LOT-3421'
  }
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>(mockFavorites)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('recent')
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange] = useState({ min: 0, max: 10000000 })

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  const getTimeUntilAuction = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  const filteredFavorites = favorites.filter(vehicle => 
    (vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
     vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
     vehicle.auctionHouse.toLowerCase().includes(searchQuery.toLowerCase())) &&
    vehicle.price >= priceRange.min &&
    vehicle.price <= priceRange.max
  )

  // Calculate stats
  const endingSoon = favorites.filter(v => {
    const diff = v.auctionEndTime.getTime() - new Date().getTime()
    return diff < 86400000 // 24 hours
  }).length

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
          <p className="text-gray-600 mt-1">Track and manage your favorite vehicles</p>
        </div>
        <div className="flex gap-3">
          <span className="inline-flex items-center px-4 py-2 bg-[#FA7921]/10 text-[#FA7921] rounded-lg text-sm font-medium">
            <Heart className="w-4 h-4 mr-2 fill-current" />
            {favorites.length} Vehicles
          </span>
          {endingSoon > 0 && (
            <span className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">
              <Clock className="w-4 h-4 mr-2" />
              {endingSoon} Ending Soon
            </span>
          )}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 hover:border-[#FA7921] hover:text-[#FA7921]"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all cursor-pointer"
            >
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="ending-soon">Ending Soon</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-[#FA7921] text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'list' 
                    ? 'bg-[#FA7921] text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Grid/List */}
      {filteredFavorites.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }>
          {filteredFavorites.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#FA7921]/20 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={vehicle.imageUrl}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Auction Timer */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FA7921]" />
                  <span className="text-gray-900">{getTimeUntilAuction(vehicle.auctionEndTime)}</span>
                </div>

                {/* Remove from Favorites */}
                <button
                  onClick={() => handleRemoveFavorite(vehicle.id)}
                  className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Title */}
                <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-[#FA7921] transition-colors line-clamp-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                </Link>
                
                {/* Price */}
                <div className="mt-2 mb-3">
                  <p className="text-2xl font-bold text-[#FA7921]">
                    ¥{vehicle.price.toLocaleString()}
                  </p>
                </div>

                {/* Vehicle Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-gray-400" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Fuel className="w-3.5 h-3.5 text-gray-400" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{vehicle.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>

                {/* Auction Info */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-600">{vehicle.auctionHouse}</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.bids} bids
                  </span>
                </div>

                {/* Action Button */}
                <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                  <Button className="w-full bg-[#FA7921] hover:bg-[#FA7921]/90 text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#FA7921]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#FA7921]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Start adding vehicles to your favorites to track and manage them easily
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/vehicles">
                <Button className="bg-[#FA7921] hover:bg-[#FA7921]/90 text-white">
                  Browse Vehicles
                </Button>
              </Link>
              <Link href="/dashboard/auctions">
                <Button variant="outline" className="border-gray-300 hover:border-[#FA7921] hover:text-[#FA7921]">
                  View Auctions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}