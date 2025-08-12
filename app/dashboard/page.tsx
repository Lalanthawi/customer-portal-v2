'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { StatsCardData, AuctionItem, ActivityItem, BalanceData } from './types'

// Skeleton component for loading states
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}

// Countdown Timer Hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

// Stats Card Component - Redesigned
function StatsCard({ data, loading, index }: { data: StatsCardData; loading?: boolean; index?: number }) {
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl p-6 h-full bg-white shadow-sm">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-10 w-32 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    )
  }

  // Brand-aligned gradient backgrounds for each card
  const gradients = [
    'from-[#002233] to-[#003355]',  // Deep navy gradient
    'from-[#FA7921] to-[#FF9A56]',  // Orange gradient
    'from-[#003355] to-[#004466]', // Mid navy gradient
  ]

  const bgGradient = index !== undefined ? gradients[index % gradients.length] : gradients[0]
  
  // Special handling for Account Status card
  const isStatusCard = data.title === 'Account Status'
  
  if (isStatusCard) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#002233] to-[#002233]/80 p-6 h-full text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA7921]/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FA7921]/10 rounded-full -ml-12 -mb-12 group-hover:scale-110 transition-transform" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-[#FA7921]/20 backdrop-blur rounded-xl">
              {data.icon}
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FA7921]/20 text-[#FFB77F] backdrop-blur">
              <span className="w-2 h-2 bg-[#FA7921] rounded-full mr-1.5 animate-pulse"></span>
              Active
            </span>
          </div>
          
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">{data.title}</p>
            <p className="text-3xl font-bold flex items-center gap-2">
              {data.value}
              <svg className="w-6 h-6 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </p>
            <p className="text-sm text-white/60 mt-2">Full marketplace access</p>
          </div>
        </div>
      </div>
    )
  }

  // Regular stats cards with gradients
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} p-6 h-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 group-hover:scale-110 transition-transform" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
            {data.icon}
          </div>
          {data.change && (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
              data.change.startsWith('+') ? 'text-white/90' : 'text-red-200'
            }`}>
              {data.change.startsWith('+') ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              {data.change.split(' ')[0]}
            </span>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-white/80 mb-1">{data.title}</p>
          <p className="text-3xl font-bold">{data.value.toLocaleString()}</p>
          {data.change && (
            <p className="text-xs text-white/60 mt-2">
              {data.change.split(' ').slice(1).join(' ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Balance Card Component - Redesigned
function BalanceCard({ data, loading }: { data: BalanceData; loading?: boolean }) {
  const usdBalance = (data.jpyBalance * data.usdRate).toFixed(2)
  const percentChange = 12.5 // Mock percentage change

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl p-6 h-full bg-white shadow-sm">
        <Skeleton className="h-4 w-32 mb-4 bg-gray-200" />
        <Skeleton className="h-10 w-48 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-36 mb-6 bg-gray-200" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-24 bg-gray-200" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FA7921] via-[#FF9A56] to-[#FFB77F] p-6 h-full text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#002233]/10 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform" />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full group-hover:translate-x-2 transition-transform" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-white/80">Available Balance</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +{percentChange}%
          </span>
        </div>
        
        <div className="mb-6">
          <p className="text-4xl font-bold mb-2">¥{data.jpyBalance.toLocaleString()}</p>
          <p className="text-sm text-white/70 flex items-center gap-2">
            ≈ ${usdBalance} USD
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#002233]/20 text-white/90">
              1 USD = ¥{(1/data.usdRate).toFixed(2)}
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-2.5 bg-white text-[#FA7921] rounded-lg font-medium hover:bg-white/90 transition-all transform hover:scale-[1.02] shadow-lg">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Deposit
            </span>
          </button>
          <button className="px-4 py-2.5 bg-[#002233]/20 backdrop-blur text-white rounded-lg font-medium hover:bg-[#002233]/30 transition-all border border-white/20">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Auction Card Component  
function AuctionCard({ auction, loading }: { auction: AuctionItem; loading?: boolean }) {
  const timeLeft = useCountdown(auction.endDate)

  if (loading) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
        <Skeleton className="h-48 w-full" />
        <div className="p-5 flex-1 flex flex-col">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <Skeleton className="h-10 w-full mt-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group h-full flex flex-col">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={auction.image}
          alt={auction.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
          Live Auction
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-3">{auction.title}</h3>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {auction.specs.year}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {auction.specs.mileage}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {auction.specs.transmission}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting Price</p>
            <p className="text-sm font-semibold text-gray-900">¥{auction.startingPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Bid</p>
            <p className="text-sm font-semibold text-green-600">¥{auction.currentBid.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 mb-2 font-medium">Auction Ends In</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-gray-900">{String(timeLeft.days).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Days</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Hours</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Min</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{String(timeLeft.seconds).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Sec</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {auction.bidsCount || 12} bids
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {auction.watching || 45} watching
          </span>
        </div>

        <button className="w-full bg-[#FA7921] text-white py-2.5 rounded-lg font-medium hover:bg-[#FA7921]/90 transition-colors mt-4">
          Place Bid
        </button>
      </div>
    </div>
  )
}

// Activity Item Component - Redesigned with better styling
function ActivityItem({ activity }: { activity: ActivityItem }) {
  const iconConfigs = {
    bid: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    win: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    outbid: {
      bg: 'bg-amber-50',
      icon: 'text-amber-600',
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    listing: {
      bg: 'bg-[#002233]/5',
      icon: 'text-[#002233]',
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    payment: {
      bg: 'bg-[#FA7921]/10',
      icon: 'text-[#FA7921]',
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
  }

  const config = iconConfigs[activity.type]

  return (
    <div className="relative flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors group">
      <div className={`flex-shrink-0 w-9 h-9 rounded-full ${config.bg} flex items-center justify-center ${config.icon}`}>
        {config.svg}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 leading-snug">{activity.title}</p>
            {activity.description && (
              <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1.5">{activity.time}</p>
          </div>
          {activity.amount && (
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-gray-900">¥{activity.amount}</p>
              {activity.status && (
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mt-1 ${
                  activity.status === 'success' ? 'bg-green-100 text-green-700' :
                  activity.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {activity.status === 'success' ? '✓' : activity.status === 'pending' ? '○' : '✗'} {activity.status}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const username = "John"

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Stats data with better icons and values
  const statsData: StatsCardData[] = [
    {
      title: 'Active Auctions',
      value: '821,343',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      trend: 'neutral',
    },
    {
      title: 'New Listings',
      value: '1,435',
      change: '+12.5% from last month',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      trend: 'up',
    },
    {
      title: 'Account Status',
      value: 'Verified',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      trend: 'neutral',
    },
  ]

  const balanceData: BalanceData = {
    jpyBalance: 1250000,
    usdRate: 0.0067,
  }

  // Auction data with real stock images
  const upcomingAuctions: AuctionItem[] = [
    {
      id: 1,
      title: 'Toyota Camry 2022',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
      specs: { year: 2022, mileage: '15,000 km', transmission: 'Automatic' },
      startingPrice: 2500000,
      currentBid: 2750000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      bidsCount: 23,
      watching: 67,
    },
    {
      id: 2,
      title: 'Honda Civic 2021',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
      specs: { year: 2021, mileage: '28,000 km', transmission: 'Manual' },
      startingPrice: 1800000,
      currentBid: 1950000,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      bidsCount: 15,
      watching: 42,
    },
    {
      id: 3,
      title: 'Mazda CX-5 2023',
      image: 'https://images.unsplash.com/photo-1606611013016-969c19ba1595?w=800&q=80',
      specs: { year: 2023, mileage: '8,000 km', transmission: 'Automatic' },
      startingPrice: 3200000,
      currentBid: 3350000,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      bidsCount: 31,
      watching: 89,
    },
    {
      id: 4,
      title: 'BMW 3 Series 2022',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      specs: { year: 2022, mileage: '12,000 km', transmission: 'Automatic' },
      startingPrice: 4500000,
      currentBid: 4650000,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      bidsCount: 18,
      watching: 54,
    },
    {
      id: 5,
      title: 'Mercedes-Benz C-Class 2023',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      specs: { year: 2023, mileage: '5,000 km', transmission: 'Automatic' },
      startingPrice: 5200000,
      currentBid: 5350000,
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      bidsCount: 27,
      watching: 93,
    },
    {
      id: 6,
      title: 'Audi A4 2022',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      specs: { year: 2022, mileage: '18,000 km', transmission: 'Automatic' },
      startingPrice: 3800000,
      currentBid: 3950000,
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      bidsCount: 34,
      watching: 78,
    },
  ]

  const activities: ActivityItem[] = [
    { 
      id: '1',
      type: 'bid',
      title: 'You placed a bid on Toyota Camry',
      description: 'Your bid is currently the highest',
      time: '2 hours ago',
      amount: '2,750,000',
      status: 'success'
    },
    { 
      id: '2',
      type: 'outbid',
      title: 'You were outbid on Honda Accord',
      description: 'Another bidder placed a higher bid',
      time: '5 hours ago',
      status: 'pending'
    },
    { 
      id: '3',
      type: 'win',
      title: 'You won the auction for Nissan Altima',
      description: 'Payment due within 48 hours',
      time: '1 day ago',
      amount: '2,100,000',
      status: 'success'
    },
    { 
      id: '4',
      type: 'listing',
      title: 'New listing: BMW 3 Series 2022',
      description: 'Matches your saved search criteria',
      time: '2 days ago'
    },
    { 
      id: '5',
      type: 'payment',
      title: 'Payment received for Mazda 6',
      description: 'Funds have been credited to your account',
      time: '3 days ago',
      amount: '1,850,000',
      status: 'success'
    },
  ]

  return (
    <div className="w-full">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {username}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your auctions today.
        </p>
      </div>

      {/* Stats Grid - Responsive 4 columns with better spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, index) => (
          <StatsCard key={index} data={stat} loading={loading} index={index} />
        ))}
        <BalanceCard data={balanceData} loading={loading} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Upcoming Auctions - Takes 3 columns */}
        <div className="xl:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Auctions</h2>
            <button className="text-[#FA7921] hover:text-[#FA7921]/80 text-sm font-medium transition-colors">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {upcomingAuctions.slice(0, 2).map((auction) => (
              <AuctionCard key={auction.id} auction={auction} loading={loading} />
            ))}
          </div>
        </div>

        {/* Activity Timeline - Takes 1 column */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-[#FA7921] hover:text-[#FA7921]/80 text-xs font-medium transition-colors flex items-center gap-1">
                  <span>View All</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            {loading ? (
              <div className="p-5 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Auctions Section */}
      <div className="mt-12 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Auctions</h2>
          <button className="text-[#FA7921] hover:text-[#FA7921]/80 text-sm font-medium transition-colors">
            Browse All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {upcomingAuctions.slice(0, 4).map((auction) => (
            <AuctionCard key={auction.id} auction={auction} loading={loading} />
          ))}
        </div>
      </div>
    </div>
  )
}