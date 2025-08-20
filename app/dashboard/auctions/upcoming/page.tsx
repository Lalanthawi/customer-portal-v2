'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Auction {
  id: string
  title: string
  make: string
  model: string
  year: number
  image: string
  startingPrice: number
  currentBid: number
  endTime: Date
  bidsCount: number
  watching: number
  location: string
  mileage: number
  transmission: string
  verified: boolean
  featured: boolean
  status: 'upcoming' | 'live' | 'ending-soon'
}

// Mock data for upcoming auctions
const upcomingAuctions: Auction[] = [
  {
    id: '1',
    title: '1995 Toyota Supra RZ Twin Turbo',
    make: 'Toyota',
    model: 'Supra RZ',
    year: 1995,
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop',
    startingPrice: 4500000,
    currentBid: 0,
    endTime: new Date('2024-01-25T14:00:00'),
    bidsCount: 0,
    watching: 45,
    location: 'Tokyo',
    mileage: 67000,
    transmission: 'Manual',
    verified: true,
    featured: true,
    status: 'upcoming'
  },
  {
    id: '2',
    title: '1999 Nissan Skyline GT-R V-Spec',
    make: 'Nissan',
    model: 'Skyline GT-R',
    year: 1999,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    startingPrice: 5200000,
    currentBid: 0,
    endTime: new Date('2024-01-26T10:00:00'),
    bidsCount: 0,
    watching: 72,
    location: 'Yokohama',
    mileage: 45000,
    transmission: 'Manual',
    verified: true,
    featured: true,
    status: 'upcoming'
  },
  {
    id: '3',
    title: '2002 Honda NSX Type R',
    make: 'Honda',
    model: 'NSX Type R',
    year: 2002,
    image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&h=600&fit=crop',
    startingPrice: 8500000,
    currentBid: 0,
    endTime: new Date('2024-01-27T15:00:00'),
    bidsCount: 0,
    watching: 89,
    location: 'Osaka',
    mileage: 32000,
    transmission: 'Manual',
    verified: true,
    featured: false,
    status: 'upcoming'
  },
  {
    id: '4',
    title: '1993 Mazda RX-7 Type R',
    make: 'Mazda',
    model: 'RX-7 FD',
    year: 1993,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop',
    startingPrice: 3200000,
    currentBid: 0,
    endTime: new Date('2024-01-28T11:00:00'),
    bidsCount: 0,
    watching: 56,
    location: 'Nagoya',
    mileage: 78000,
    transmission: 'Manual',
    verified: true,
    featured: false,
    status: 'upcoming'
  },
  {
    id: '5',
    title: '2004 Subaru Impreza WRX STI',
    make: 'Subaru',
    model: 'Impreza WRX STI',
    year: 2004,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba0be0?w=800&h=600&fit=crop',
    startingPrice: 2800000,
    currentBid: 0,
    endTime: new Date('2024-01-29T13:00:00'),
    bidsCount: 0,
    watching: 34,
    location: 'Sapporo',
    mileage: 92000,
    transmission: 'Manual',
    verified: false,
    featured: false,
    status: 'upcoming'
  },
  {
    id: '6',
    title: '1997 Mitsubishi Lancer Evolution IV',
    make: 'Mitsubishi',
    model: 'Lancer Evolution',
    year: 1997,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop',
    startingPrice: 2400000,
    currentBid: 0,
    endTime: new Date('2024-01-30T09:00:00'),
    bidsCount: 0,
    watching: 41,
    location: 'Kyoto',
    mileage: 105000,
    transmission: 'Manual',
    verified: true,
    featured: false,
    status: 'upcoming'
  }
]

export default function UpcomingAuctionsPage() {
  const [filter, setFilter] = useState<'all' | 'featured' | 'verified'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'watching'>('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getTimeUntilStart = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `Starts in ${days}d ${hours}h`
    if (hours > 0) return `Starts in ${hours}h`
    return 'Starting soon'
  }

  // Filter auctions
  let filteredAuctions = [...upcomingAuctions]
  if (filter === 'featured') {
    filteredAuctions = filteredAuctions.filter(a => a.featured)
  } else if (filter === 'verified') {
    filteredAuctions = filteredAuctions.filter(a => a.verified)
  }

  // Sort auctions
  filteredAuctions.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.startingPrice - a.startingPrice
      case 'watching':
        return b.watching - a.watching
      case 'date':
      default:
        return a.endTime.getTime() - b.endTime.getTime()
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002233] to-[#003344] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Upcoming Auctions</h1>
              <p className="text-gray-300 mt-2">Get ready to bid on these amazing vehicles</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FA7921]">{upcomingAuctions.length}</p>
              <p className="text-sm text-gray-500">Total Auctions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {upcomingAuctions.filter(a => a.featured).length}
              </p>
              <p className="text-sm text-gray-500">Featured</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {upcomingAuctions.filter(a => a.verified).length}
              </p>
              <p className="text-sm text-gray-500">Verified Sellers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {upcomingAuctions.reduce((sum, a) => sum + a.watching, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Watchers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Auctions
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'featured'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Featured Only
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'verified'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Verified Sellers
              </button>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-sm"
              >
                <option value="date">Sort by Start Date</option>
                <option value="price">Sort by Price</option>
                <option value="watching">Sort by Popularity</option>
              </select>

              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Auctions Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <div key={auction.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {auction.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white text-xs font-semibold rounded-full">
                      FEATURED
                    </div>
                  )}
                  {auction.verified && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="px-3 py-2 bg-black/70 backdrop-blur-sm text-white rounded-lg">
                      <p className="text-sm font-semibold">{getTimeUntilStart(auction.endTime)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{auction.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {auction.location}
                    </span>
                    <span>{auction.mileage.toLocaleString()} km</span>
                    <span>{auction.transmission}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Starting Price</p>
                        <p className="text-lg font-bold text-gray-900">{formatPrice(auction.startingPrice)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Watching</p>
                        <p className="text-sm font-semibold text-gray-700">{auction.watching} users</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Watch
                      </button>
                      <button className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAuctions.map((auction) => (
              <div key={auction.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
                <div className="flex gap-6">
                  <div className="relative w-48 h-32 flex-shrink-0">
                    <Image
                      src={auction.image}
                      alt={auction.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{auction.title}</h3>
                        <div className="flex items-center gap-3 mb-2">
                          {auction.featured && (
                            <span className="px-2 py-1 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white text-xs font-semibold rounded">
                              FEATURED
                            </span>
                          )}
                          {auction.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {auction.location} • {auction.mileage.toLocaleString()} km • {auction.transmission}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FA7921]">{formatPrice(auction.startingPrice)}</p>
                        <p className="text-sm text-gray-500">Starting price</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          <strong>{auction.watching}</strong> watching
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {getTimeUntilStart(auction.endTime)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Watch
                        </button>
                        <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium">
                          Set Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}