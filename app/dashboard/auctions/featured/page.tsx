'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface FeaturedAuction {
  id: string
  title: string
  make: string
  model: string
  year: number
  images: string[]
  currentBid: number
  buyNowPrice?: number
  endTime: Date
  bidsCount: number
  watching: number
  location: string
  mileage: number
  transmission: string
  engine: string
  condition: 'excellent' | 'very-good' | 'good' | 'fair'
  description: string
  auctionHouseRating: number
  verified: boolean
  premium: boolean
}

const featuredAuctions: FeaturedAuction[] = [
  {
    id: '1',
    title: '1994 Toyota Supra RZ Twin Turbo - Pristine Condition',
    make: 'Toyota',
    model: 'Supra RZ',
    year: 1994,
    images: ['https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop'],
    currentBid: 7200000,
    buyNowPrice: 9500000,
    endTime: new Date('2024-01-22T18:00:00'),
    bidsCount: 42,
    watching: 156,
    location: 'Tokyo',
    mileage: 34000,
    transmission: '6-Speed Manual',
    engine: '2JZ-GTE Twin Turbo',
    condition: 'excellent',
    description: 'Immaculate example with full service history',
    auctionHouseRating: 4.9,
    verified: true,
    premium: true
  },
  {
    id: '2',
    title: '2002 Nissan Skyline GT-R V-Spec II Nür',
    make: 'Nissan',
    model: 'Skyline GT-R',
    year: 2002,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'],
    currentBid: 12500000,
    buyNowPrice: 15000000,
    endTime: new Date('2024-01-23T20:00:00'),
    bidsCount: 67,
    watching: 234,
    location: 'Yokohama',
    mileage: 28000,
    transmission: '6-Speed Manual',
    engine: 'RB26DETT Twin Turbo',
    condition: 'excellent',
    description: 'Final edition R34, one of only 1000 made',
    auctionHouseRating: 5.0,
    verified: true,
    premium: true
  },
  {
    id: '3',
    title: '1992 Honda NSX Type R Championship White',
    make: 'Honda',
    model: 'NSX Type R',
    year: 1992,
    images: ['https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&h=600&fit=crop'],
    currentBid: 9800000,
    endTime: new Date('2024-01-24T16:00:00'),
    bidsCount: 38,
    watching: 189,
    location: 'Osaka',
    mileage: 42000,
    transmission: '5-Speed Manual',
    engine: 'C30A VTEC',
    condition: 'excellent',
    description: 'Rare Type R in original Championship White',
    auctionHouseRating: 4.8,
    verified: true,
    premium: true
  },
  {
    id: '4',
    title: '1993 Mazda RX-7 Type RS - Spirit R Edition',
    make: 'Mazda',
    model: 'RX-7 FD',
    year: 1993,
    images: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop'],
    currentBid: 4500000,
    buyNowPrice: 5800000,
    endTime: new Date('2024-01-25T14:00:00'),
    bidsCount: 29,
    watching: 98,
    location: 'Nagoya',
    mileage: 56000,
    transmission: '5-Speed Manual',
    engine: '13B-REW Twin Turbo Rotary',
    condition: 'very-good',
    description: 'Limited Spirit R edition, meticulously maintained',
    auctionHouseRating: 4.7,
    verified: true,
    premium: false
  }
]

export default function FeaturedAuctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ending-soon' | 'most-watched' | 'highest-bid'>('all')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getTimeRemaining = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }
    return `${hours}h ${minutes}m`
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-700'
      case 'very-good': return 'bg-blue-100 text-blue-700'
      case 'good': return 'bg-yellow-100 text-yellow-700'
      case 'fair': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Sort auctions based on category
  const sortedAuctions = [...featuredAuctions].sort((a, b) => {
    switch (selectedCategory) {
      case 'ending-soon':
        return a.endTime.getTime() - b.endTime.getTime()
      case 'most-watched':
        return b.watching - a.watching
      case 'highest-bid':
        return b.currentBid - a.currentBid
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-[#002233] via-[#003344] to-[#002233] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FA7921]/10 via-transparent to-[#FF9A56]/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA7921]/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF9A56]/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1 bg-[#FA7921] rounded-full text-xs font-bold tracking-wider">
                  PREMIUM COLLECTION
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-3">Featured Auctions</h1>
              <p className="text-gray-300 text-lg">Handpicked premium vehicles from verified auction houses</p>
            </div>
            <Link
              href="/dashboard"
              className="px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-4">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'ending-soon', label: 'Ending Soon' },
              { id: 'most-watched', label: 'Most Watched' },
              { id: 'highest-bid', label: 'Highest Bids' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as 'all' | 'ending-soon' | 'most-watched' | 'highest-bid')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.id === 'all' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
                {cat.id === 'ending-soon' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {cat.id === 'most-watched' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                {cat.id === 'highest-bid' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {sortedAuctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Premium Badge */}
              {auction.premium && (
                <div className="bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white text-center py-2 text-sm font-bold tracking-wider">
                  PREMIUM LISTING
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-64">
                <Image
                  src={auction.images[0] || '/placeholder.svg'}
                  alt={auction.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Overlay Info */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <div className="flex gap-2">
                    {auction.verified && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getConditionColor(auction.condition)}`}>
                      {auction.condition.toUpperCase()}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold animate-pulse">
                    {getTimeRemaining(auction.endTime)}
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">{auction.title}</h3>
                  <p className="text-white/90 text-sm">{auction.description}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6">
                {/* Specs */}
                <div className="grid grid-cols-4 gap-3 mb-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Year</p>
                    <p className="text-sm font-bold">{auction.year}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Mileage</p>
                    <p className="text-sm font-bold">{(auction.mileage/1000).toFixed(0)}k km</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Trans</p>
                    <p className="text-sm font-bold">{auction.transmission.split(' ')[0]}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-bold">{auction.location}</p>
                  </div>
                </div>

                {/* Engine Info */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Engine</p>
                  <p className="text-sm font-bold text-gray-800">{auction.engine}</p>
                </div>

                {/* Bidding Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Current Bid</p>
                    <p className="text-2xl font-bold text-[#FA7921]">{formatPrice(auction.currentBid)}</p>
                    <p className="text-xs text-gray-500 mt-1">{auction.bidsCount} bids</p>
                  </div>
                  {auction.buyNowPrice && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Buy Now Price</p>
                      <p className="text-xl font-bold text-green-600">{formatPrice(auction.buyNowPrice)}</p>
                      <p className="text-xs text-gray-500 mt-1">Instant purchase</p>
                    </div>
                  )}
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm text-gray-600">{auction.watching} watching</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Auction House Rating:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(auction.auctionHouseRating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({auction.auctionHouseRating})</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/dashboard/vehicle/${auction.id}`}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all text-center"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-[1.02]">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#002233] to-[#003344] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Want to Feature Your Vehicle?</h2>
          <p className="text-gray-300 mb-6">Get premium placement and reach more buyers with our featured listings</p>
          <button className="px-6 py-3 bg-[#FA7921] text-white rounded-xl font-bold hover:bg-[#FA7921]/90 transition-all">
            Learn More About Featured Listings
          </button>
        </div>
      </div>
    </div>
  )
}