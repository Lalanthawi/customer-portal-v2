'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, MapPin, Calendar, Fuel, 
  X, Trash2
} from 'lucide-react'

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
  listIds: string[]
}

// Mock data for favorite vehicles
const mockFavorites: FavoriteVehicle[] = [
  {
    id: '4',
    make: 'Toyota',
    model: 'Land Cruiser 250 VX',
    year: 2024,
    price: 5600000,
    mileage: 13000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    location: 'Osaka',
    imageUrl: '/images/singlecar/0.jpeg',
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    currentBid: 5600000,
    bids: 18,
    listIds: ['A', 'B']
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
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    currentBid: 2850000,
    bids: 8,
    listIds: ['A']
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'MX-5',
    year: 2021,
    price: 2500000,
    mileage: 12000,
    transmission: 'Manual',
    fuel: 'Petrol',
    location: 'Yokohama',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 1),
    currentBid: 2550000,
    bids: 15,
    listIds: ['B', 'C']
  },
  {
    id: '5',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2022,
    price: 5800000,
    mileage: 18000,
    transmission: 'Automatic',
    fuel: 'Petrol',
    location: 'Nagoya',
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 4),
    currentBid: 5900000,
    bids: 10,
    listIds: ['C']
  },
  {
    id: '6',
    make: 'BMW',
    model: 'X3',
    year: 2021,
    price: 4200000,
    mileage: 32000,
    transmission: 'Automatic',
    fuel: 'Diesel',
    location: 'Kobe',
    imageUrl: 'https://images.unsplash.com/photo-1555215858-9dc53c228bec?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    currentBid: 4250000,
    bids: 7,
    listIds: ['D']
  },
  {
    id: '7',
    make: 'Lexus',
    model: 'RX 450h',
    year: 2023,
    price: 6500000,
    mileage: 8000,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    currentBid: 6600000,
    bids: 14,
    listIds: ['E']
  }
]

export default function FavoritesPage() {
  const [activeList, setActiveList] = useState('all')
  const [favorites, setFavorites] = useState(mockFavorites)

  const lists = [
    { id: 'all', name: 'All Favorites', count: favorites.length },
    { id: 'A', name: 'List A', count: favorites.filter(f => f.listIds.includes('A')).length },
    { id: 'B', name: 'List B', count: favorites.filter(f => f.listIds.includes('B')).length },
    { id: 'C', name: 'List C', count: favorites.filter(f => f.listIds.includes('C')).length },
    { id: 'D', name: 'List D', count: favorites.filter(f => f.listIds.includes('D')).length },
    { id: 'E', name: 'List E', count: favorites.filter(f => f.listIds.includes('E')).length }
  ]

  const filteredFavorites = activeList === 'all' 
    ? favorites 
    : favorites.filter(f => f.listIds.includes(activeList))

  const formatPrice = (price: number) => {
    return `¥${(price / 1000000).toFixed(1)}M`
  }

  const getTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  const removeFromFavorites = (vehicleId: string, listId?: string) => {
    if (listId) {
      setFavorites(prev => prev.map(f => 
        f.id === vehicleId 
          ? { ...f, listIds: f.listIds.filter(id => id !== listId) }
          : f
      ).filter(f => f.listIds.length > 0))
    } else {
      setFavorites(prev => prev.filter(f => f.id !== vehicleId))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002233] to-[#003344] text-white rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Favorites</h1>
            <p className="text-gray-300">
              Manage your saved vehicles across different lists
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-bold">{favorites.length}</p>
              <p className="text-sm text-gray-300">Total Saved</p>
            </div>
            <Heart className="h-12 w-12 text-[#FA7921]" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* List Tabs */}
      <Tabs value={activeList} onValueChange={setActiveList} className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-6">
          {lists.map((list) => (
            <TabsTrigger 
              key={list.id} 
              value={list.id}
              className="relative"
            >
              <span>{list.name}</span>
              {list.count > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 h-5 px-1.5 bg-[#FA7921]/10 text-[#FA7921] border-none"
                >
                  {list.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeList} className="mt-0">
          {filteredFavorites.length === 0 ? (
            <Card className="bg-white border border-gray-200">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Heart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No favorites in {activeList === 'all' ? 'any list' : `List ${activeList}`}
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  Start adding vehicles to your favorites to see them here
                </p>
                <Link href="/dashboard/vehicles">
                  <Button className="bg-[#FA7921] hover:bg-[#FA7921]/90">
                    Browse Vehicles
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((vehicle) => (
                <Card key={vehicle.id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={vehicle.imageUrl}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {vehicle.listIds.map(listId => (
                        <Badge 
                          key={listId}
                          className="bg-white/90 backdrop-blur-sm text-gray-900"
                        >
                          List {listId}
                        </Badge>
                      ))}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-md text-red-500 text-sm rounded-full font-semibold">
                      {getTimeRemaining(vehicle.auctionEndTime)} left
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      onClick={() => removeFromFavorites(vehicle.id)}
                      size="icon"
                      variant="ghost"
                      className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <CardContent className="p-5">
                    <div className="mb-3">
                      <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-[#FA7921] transition-colors cursor-pointer">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                      </Link>
                    </div>

                    {/* Price and Bids */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-[#FA7921]">{formatPrice(vehicle.currentBid)}</p>
                        <p className="text-xs text-gray-500">{vehicle.bids} bids</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{vehicle.mileage.toLocaleString()} km</p>
                        <p className="text-xs text-gray-500">{vehicle.transmission}</p>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {vehicle.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Fuel className="h-3 w-3" />
                        {vehicle.fuel}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {vehicle.year}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/dashboard/vehicle/${vehicle.id}`} className="flex-1">
                        <Button className="w-full bg-[#FA7921] hover:bg-[#FA7921]/90">
                          View Details
                        </Button>
                      </Link>
                      {activeList !== 'all' && (
                        <Button
                          onClick={() => removeFromFavorites(vehicle.id, activeList)}
                          size="icon"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      {filteredFavorites.length > 0 && (
        <Card className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(filteredFavorites.reduce((sum, v) => sum + v.currentBid, 0))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(filteredFavorites.reduce((sum, v) => sum + v.currentBid, 0) / filteredFavorites.length)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ending Soon</p>
                <p className="text-xl font-bold text-orange-600">
                  {filteredFavorites.filter(v => 
                    (v.auctionEndTime.getTime() - Date.now()) < 86400000
                  ).length} vehicles
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Bids</p>
                <p className="text-xl font-bold text-green-600">
                  {filteredFavorites.reduce((sum, v) => sum + v.bids, 0)} total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}