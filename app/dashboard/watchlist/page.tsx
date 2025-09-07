'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface WatchlistItem {
  id: number
  title: string
  image: string
  currentBid: number
  startingPrice: number
  endDate: Date
  bidsCount: number
  watching: number
  status: 'live' | 'ending_soon' | 'new'
  highestBidder: boolean
  specs: {
    year: number
    mileage: string
    transmission: string
    fuel: string
  }
}

export default function WatchlistPage() {
  const [filter, setFilter] = useState<'all' | 'live' | 'ending_soon' | 'outbid'>('all')
  const [sortBy, setSortBy] = useState<'date_added' | 'ending_soon' | 'price'>('date_added')

  // Mock data for watchlist items
  const watchlistItems: WatchlistItem[] = [
    {
      id: 1,
      title: 'Toyota Camry 2022',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      currentBid: 2750000,
      startingPrice: 2500000,
      endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      bidsCount: 45,
      watching: 128,
      status: 'ending_soon',
      highestBidder: true,
      specs: {
        year: 2022,
        mileage: '15,000 km',
        transmission: 'Automatic',
        fuel: 'Hybrid'
      }
    },
    {
      id: 2,
      title: 'Honda Civic Type R 2023',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
      currentBid: 3950000,
      startingPrice: 3500000,
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      bidsCount: 67,
      watching: 234,
      status: 'live',
      highestBidder: false,
      specs: {
        year: 2023,
        mileage: '8,000 km',
        transmission: 'Manual',
        fuel: 'Petrol'
      }
    },
    {
      id: 3,
      title: 'Mazda CX-5 2023',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      currentBid: 3350000,
      startingPrice: 3200000,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      bidsCount: 31,
      watching: 89,
      status: 'live',
      highestBidder: true,
      specs: {
        year: 2023,
        mileage: '12,000 km',
        transmission: 'Automatic',
        fuel: 'Diesel'
      }
    },
    {
      id: 4,
      title: 'BMW 3 Series 2022',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      currentBid: 4650000,
      startingPrice: 4500000,
      endDate: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours
      bidsCount: 52,
      watching: 156,
      status: 'ending_soon',
      highestBidder: false,
      specs: {
        year: 2022,
        mileage: '20,000 km',
        transmission: 'Automatic',
        fuel: 'Petrol'
      }
    },
    {
      id: 5,
      title: 'Tesla Model 3 2023',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
      currentBid: 5200000,
      startingPrice: 5000000,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      bidsCount: 89,
      watching: 342,
      status: 'new',
      highestBidder: false,
      specs: {
        year: 2023,
        mileage: '5,000 km',
        transmission: 'Automatic',
        fuel: 'Electric'
      }
    },
    {
      id: 6,
      title: 'Mercedes-Benz C-Class 2023',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
      currentBid: 5350000,
      startingPrice: 5200000,
      endDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
      bidsCount: 73,
      watching: 198,
      status: 'live',
      highestBidder: true,
      specs: {
        year: 2023,
        mileage: '10,000 km',
        transmission: 'Automatic',
        fuel: 'Petrol'
      }
    }
  ]

  // Filter items based on selected filter
  const filteredItems = watchlistItems.filter(item => {
    if (filter === 'all') return true
    if (filter === 'live') return item.status === 'live'
    if (filter === 'ending_soon') return item.status === 'ending_soon'
    if (filter === 'outbid') return !item.highestBidder
    return true
  })

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'ending_soon') {
      return a.endDate.getTime() - b.endDate.getTime()
    }
    if (sortBy === 'price') {
      return b.currentBid - a.currentBid
    }
    return 0 // date_added default
  })

  const formatTimeLeft = (endDate: Date) => {
    const now = new Date().getTime()
    const distance = endDate.getTime() - now
    
    if (distance < 0) return 'Ended'
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
              <p className="text-sm text-gray-600 mt-1">Track your favorite auctions</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Watching Card */}
          <Card className="group relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-indigo-500/5"></div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/20 via-gray-200/30 to-indigo-500/20">
              <div className="h-full w-full rounded-2xl bg-white/50 backdrop-blur-xl"></div>
            </div>
            
            {/* Animated glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
            
            <CardContent className="relative z-10 flex flex-col justify-center h-full p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-lg backdrop-blur-sm border border-blue-500/10">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div>
                <p className="text-xs font-semibold font-heading text-gray-600 uppercase tracking-wider mb-0.5">Total Watching</p>
                <p className="text-2xl font-bold font-stats bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{watchlistItems.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Active items</p>
              </div>
            </CardContent>
          </Card>

          {/* Ending Soon Card */}
          <Card className="group relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-rose-500/5"></div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-red-500/20 via-gray-200/30 to-rose-500/20">
              <div className="h-full w-full rounded-2xl bg-white/50 backdrop-blur-xl"></div>
            </div>
            
            {/* Animated glow effect */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl group-hover:bg-red-500/30 transition-all duration-700"></div>
            
            <CardContent className="relative z-10 flex flex-col justify-center h-full p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-gradient-to-br from-red-500/20 to-rose-500/10 rounded-lg backdrop-blur-sm border border-red-500/10">
                  <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="px-2 py-1 bg-gradient-to-r from-red-500/20 to-rose-500/20 backdrop-blur-sm rounded-full text-xs font-semibold text-red-700 flex items-center gap-1 border border-red-500/20">
                  <span className="w-2 h-2 bg-gradient-to-r from-red-400 to-rose-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
                  Urgent
                </span>
              </div>
              
              {/* Content */}
              <div>
                <p className="text-xs font-semibold font-heading text-gray-600 uppercase tracking-wider mb-0.5">Ending Soon</p>
                <p className="text-2xl font-bold font-stats bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {watchlistItems.filter(item => item.status === 'ending_soon').length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Next 24 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Highest Bidder Card */}
          <Card className="group relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 via-transparent to-emerald-500/5"></div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-green-500/20 via-gray-200/30 to-emerald-500/20">
              <div className="h-full w-full rounded-2xl bg-white/50 backdrop-blur-xl"></div>
            </div>
            
            {/* Animated glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all duration-700"></div>
            
            <CardContent className="relative z-10 flex flex-col justify-center h-full p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-lg backdrop-blur-sm border border-green-500/10">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div>
                <p className="text-xs font-semibold font-heading text-gray-600 uppercase tracking-wider mb-0.5">Highest Bidder</p>
                <p className="text-2xl font-bold font-stats bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {watchlistItems.filter(item => item.highestBidder).length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Winning bids</p>
              </div>
            </CardContent>
          </Card>

          {/* Outbid Card */}
          <Card className="group relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-yellow-500/5"></div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-amber-500/20 via-gray-200/30 to-yellow-500/20">
              <div className="h-full w-full rounded-2xl bg-white/50 backdrop-blur-xl"></div>
            </div>
            
            {/* Animated glow effect */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all duration-700"></div>
            
            <CardContent className="relative z-10 flex flex-col justify-center h-full p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg backdrop-blur-sm border border-amber-500/10">
                  <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div>
                <p className="text-xs font-semibold font-heading text-gray-600 uppercase tracking-wider mb-0.5">Outbid</p>
                <p className="text-2xl font-bold font-stats bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {watchlistItems.filter(item => !item.highestBidder).length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Action needed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({watchlistItems.length})
              </button>
              <button
                onClick={() => setFilter('live')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'live'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Live Auctions
              </button>
              <button
                onClick={() => setFilter('ending_soon')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'ending_soon'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ending Soon
              </button>
              <button
                onClick={() => setFilter('outbid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'outbid'
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Outbid
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date_added' | 'ending_soon' | 'price')}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="date_added">Date Added</option>
                <option value="ending_soon">Ending Soon</option>
                <option value="price">Current Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {item.status === 'ending_soon' && (
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full animate-pulse">
                      Ending Soon
                    </span>
                  )}
                  {item.status === 'new' && (
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                      New
                    </span>
                  )}
                  {item.status === 'live' && (
                    <span className="px-3 py-1 bg-[#FA7921] text-white text-xs font-semibold rounded-full">
                      Live
                    </span>
                  )}
                </div>
                {/* Remove from Watchlist */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group/btn">
                  <svg className="w-5 h-5 text-red-600 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                
                {/* Specs */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.specs.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {item.specs.mileage}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    {item.specs.fuel}
                  </span>
                </div>

                {/* Bid Status */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Bid</span>
                    <span className="text-lg font-bold text-gray-900">¥{item.currentBid.toLocaleString()}</span>
                  </div>
                  
                  {item.highestBidder ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-green-700">You&apos;re the highest bidder</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-sm font-medium text-amber-700">You&apos;ve been outbid</span>
                    </div>
                  )}
                </div>

                {/* Time and Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTimeLeft(item.endDate)} left
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {item.bidsCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {item.watching}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/vehicle/${item.id}`}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center text-sm"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 px-4 py-2.5 bg-[#FA7921] text-white rounded-lg font-medium hover:bg-[#FA7921]/90 transition-colors text-sm">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items in your watchlist</h3>
            <p className="text-gray-600 mb-6">Start adding auctions to track them here</p>
            <Link
              href="/dashboard/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FA7921] text-white rounded-lg font-medium hover:bg-[#FA7921]/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Auctions
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}