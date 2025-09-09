'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Search, 
  Grid3x3, 
  List, 
  Clock,
  MapPin,
  Gauge,
  Fuel,
  X,
  Eye,
  ChevronRight,
  Activity
} from 'lucide-react'

interface FavoriteList {
  id: string
  name: string
  vehicleCount: number
  maxVehicles: number
}

interface FavoriteVehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
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
  auctionHouse: string
  lotNumber: string
  listId: string
}

// Predefined lists
const lists: FavoriteList[] = [
  { id: 'all', name: 'All', vehicleCount: 6, maxVehicles: 100 },
  { id: 'A', name: 'List A', vehicleCount: 3, maxVehicles: 20 },
  { id: 'B', name: 'List B', vehicleCount: 2, maxVehicles: 20 },
  { id: 'C', name: 'List C', vehicleCount: 1, maxVehicles: 20 },
  { id: 'D', name: 'List D', vehicleCount: 0, maxVehicles: 20 },
  { id: 'E', name: 'List E', vehicleCount: 0, maxVehicles: 20 },
]

// Mock data
const mockFavorites: FavoriteVehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Land Cruiser 250 VX',
    year: 2024,
    price: 5600000,
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
    engineSize: '2.8L',
    auctionHouse: 'HAA Kobe',
    lotNumber: 'LOT-4521',
    listId: 'A'
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
    engineSize: '1.5L',
    auctionHouse: 'USS Nagoya',
    lotNumber: 'LOT-8923',
    listId: 'A'
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'CX-5 Premium',
    year: 2023,
    price: 3200000,
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
    auctionHouse: 'JAA',
    lotNumber: 'LOT-3421',
    listId: 'A'
  },
  {
    id: '4',
    make: 'Nissan',
    model: 'X-Trail',
    year: 2023,
    price: 3400000,
    mileage: 12000,
    transmission: 'CVT',
    fuel: 'Hybrid',
    location: 'Yokohama',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    currentBid: 3400000,
    bids: 7,
    chassisNumber: 'T33-2345678',
    grade: '4.0',
    engineSize: '1.5L',
    auctionHouse: 'USS Tokyo',
    lotNumber: 'LOT-6789',
    listId: 'B'
  },
  {
    id: '5',
    make: 'Subaru',
    model: 'Outback',
    year: 2022,
    price: 2900000,
    mileage: 22000,
    transmission: 'CVT',
    fuel: 'Petrol',
    location: 'Sendai',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 4),
    currentBid: 2900000,
    bids: 5,
    chassisNumber: 'BS9-3456789',
    grade: '3.5',
    engineSize: '2.5L',
    auctionHouse: 'JAA',
    lotNumber: 'LOT-4567',
    listId: 'B'
  },
  {
    id: '6',
    make: 'Mercedes-Benz',
    model: 'GLC 300',
    year: 2023,
    price: 6200000,
    mileage: 8000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 6),
    currentBid: 6200000,
    bids: 10,
    chassisNumber: 'WDC253-456789',
    grade: '4.5',
    engineSize: '2.0L',
    auctionHouse: 'HAA Kobe',
    lotNumber: 'LOT-7890',
    listId: 'C'
  }
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>(mockFavorites)
  const [selectedList, setSelectedList] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const getTimeUntilAuction = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  const filteredFavorites = favorites.filter(vehicle => {
    const matchesList = selectedList === 'all' || vehicle.listId === selectedList
    const matchesSearch = vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesList && matchesSearch
  })

  const handleRemoveFromList = (vehicleId: string) => {
    setFavorites(favorites.filter(v => v.id !== vehicleId))
  }

  // Update list counts
  const getListCount = (listId: string) => {
    return favorites.filter(v => v.listId === listId).length
  }

  // Calculate stats
  const totalFavorites = favorites.length
  const endingSoon = favorites.filter(v => {
    const diff = v.auctionEndTime.getTime() - new Date().getTime()
    return diff < 86400000 // 24 hours
  }).length

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
          <p className="text-gray-600 mt-1">Manage your favorite vehicles across different lists</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#FA7921]" />
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-lg font-bold text-gray-900">{totalFavorites}</span>
            </div>
          </div>
          {endingSoon > 0 && (
            <div className="px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Ending Soon</span>
                <span className="text-lg font-bold text-amber-900">{endingSoon}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lists Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Favorite Lists</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedList === list.id
                  ? 'border-[#FA7921] bg-[#FA7921]/5'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">{list.id === 'all' ? 'All' : list.id}</div>
              <div className="text-sm text-gray-600">{list.name}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Vehicles</span>
                <span className="text-sm font-semibold text-gray-900">
                  {getListCount(list.id)}/{list.maxVehicles}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-[#FA7921] h-1.5 rounded-full transition-all"
                  style={{ width: `${(getListCount(list.id) / list.maxVehicles) * 100}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
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
          <div className="flex gap-2">
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

      {/* Vehicles Display */}
      {filteredFavorites.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }>
          {filteredFavorites.map((vehicle) => (
            viewMode === 'grid' ? (
              /* Grid View */
              <Card key={vehicle.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* List Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg font-semibold text-gray-900">
                    List {vehicle.listId}
                  </div>

                  {/* Auction Timer */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {getTimeUntilAuction(vehicle.auctionEndTime)}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromList(vehicle.id)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-[#FA7921] transition-colors">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {vehicle.chassisNumber} • Grade {vehicle.grade}
                    </p>
                  </div>

                  <div className="text-2xl font-bold text-[#FA7921] mb-3">
                    ¥{vehicle.price.toLocaleString()}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
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
                      <Activity className="w-3.5 h-3.5 text-gray-400" />
                      <span>{vehicle.bids} bids</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600">{vehicle.auctionHouse}</span>
                    <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                      <Button variant="primary" size="sm">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* List View */
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex">
                  <div className="relative w-64 h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={vehicle.imageUrl}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      width={256}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-sm font-semibold">
                      List {vehicle.listId}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-[#FA7921] transition-colors">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {vehicle.chassisNumber} • Grade {vehicle.grade} • {vehicle.engineSize}
                        </p>
                        
                        <div className="text-2xl font-bold text-[#FA7921] mt-3">
                          ¥{vehicle.price.toLocaleString()}
                        </div>
                        
                        <div className="flex gap-6 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Gauge className="w-4 h-4 text-gray-400" />
                            <span>{vehicle.mileage.toLocaleString()} km</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{vehicle.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{getTimeUntilAuction(vehicle.auctionEndTime)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-gray-400" />
                            <span>{vehicle.bids} bids</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <Badge variant="outline">{vehicle.auctionHouse}</Badge>
                          <Badge variant="outline">{vehicle.lotNumber}</Badge>
                          <Badge variant="outline">{vehicle.transmission}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-6">
                        <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                          <Button variant="primary" size="sm">
                            <Eye className="w-4 h-4" />
                            View Details
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFromList(vehicle.id)}
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="p-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedList === 'all' ? 'No favorites yet' : `No vehicles in List ${selectedList}`}
            </h3>
            <p className="text-gray-600 mb-6">
              Start browsing vehicles and add them to your favorite lists to track auction progress
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/vehicles">
                <Button variant="primary">
                  Browse Vehicles
                </Button>
              </Link>
              <Link href="/dashboard/auctions">
                <Button variant="outline">
                  View Auctions
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}