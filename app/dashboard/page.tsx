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

// Stats Card Component - Brand Aligned Beautiful Design
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

  // Brand-aligned card designs with #002233 and #FA7921
  const cardStyles = [
    {
      gradient: 'from-[#002233] via-[#003344] to-[#004455]',
      iconBg: 'bg-[#FA7921]/20',
      iconColor: 'text-[#FA7921]',
      accentColor: 'from-[#FA7921] to-[#FF9A56]',
      pulseColor: 'bg-[#FA7921]',
      shadowColor: 'shadow-[#FA7921]/50',
      borderColor: 'border-[#FA7921]/20',
      statColor: 'text-[#FA7921]'
    },
    {
      gradient: 'from-[#FA7921] via-[#FF8C39] to-[#FF9A56]',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
      accentColor: 'from-white to-orange-100',
      pulseColor: 'bg-white',
      shadowColor: 'shadow-white/50',
      borderColor: 'border-white/20',
      statColor: 'text-white'
    },
    {
      gradient: 'from-[#002233] via-[#003344] to-[#002233]',
      iconBg: 'bg-green-400/20',
      iconColor: 'text-green-400',
      accentColor: 'from-green-400 to-emerald-400',
      pulseColor: 'bg-green-400',
      shadowColor: 'shadow-green-400/50',
      borderColor: 'border-green-400/20',
      statColor: 'text-green-400'
    },
  ]

  const style = index !== undefined ? cardStyles[index % cardStyles.length] : cardStyles[0]
  
  // Special handling for Account Status card
  const isStatusCard = data.title === 'Account Status'
  
  if (isStatusCard) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#002233] via-[#003344] to-[#002233] p-6 h-full text-white shadow-2xl hover:shadow-3xl transition-all duration-500 group border border-green-400/20 hover:scale-[1.03] hover:-translate-y-1">
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-green-400/10 via-transparent to-emerald-400/10" />
        
        {/* Animated geometric patterns */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-400/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 group-hover:bg-green-400/20 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl -ml-20 -mb-20 group-hover:scale-150 transition-all duration-700" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")"}} />
        
        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-400/20 backdrop-blur-xl rounded-2xl border border-green-400/30 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{data.title}</span>
                <p className="text-[10px] text-green-400 font-medium mt-0.5">{data.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-400/20 backdrop-blur-xl text-[10px] font-bold border border-green-400/30 text-green-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                VERIFIED
              </span>
            </div>
          </div>
          
          {/* Value Section */}
          <div className="mb-4">
            <p className="text-4xl font-black tracking-tight text-white mb-1">
              {data.value}
            </p>
            <p className="text-xs text-white/60">{data.details}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Access Level</span>
              <span className="text-green-400 font-bold">{data.percentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg shadow-green-400/50 transition-all duration-1000"
                style={{ width: `${data.percentage}%` }}
              />
            </div>
          </div>

          {/* Benefits List */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] text-white/70">Unlimited Bids</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] text-white/70">Priority Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Active Auctions Card
  if (data.title === 'Active Auctions') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} p-6 h-full text-white shadow-2xl hover:shadow-3xl transition-all duration-500 group ${style.borderColor} border hover:scale-[1.03] hover:-translate-y-1`}>
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FA7921]/10 via-transparent to-[#FF9A56]/10" />
        
        {/* Animated patterns */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FA7921]/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FF9A56]/10 rounded-full blur-2xl -ml-20 -mb-20 group-hover:scale-150 transition-all duration-700" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${style.iconBg} backdrop-blur-xl rounded-2xl border border-[#FA7921]/30 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-6 h-6 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{data.title}</span>
                <p className="text-[10px] text-[#FA7921] font-medium mt-0.5">{data.subtitle}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FA7921]/20 backdrop-blur text-[10px] font-bold text-[#FA7921]">
                <div className="w-1.5 h-1.5 bg-[#FA7921] rounded-full animate-pulse" />
                LIVE
              </div>
            </div>
          </div>
          
          {/* Main Value */}
          <div className="mb-4">
            <p className="text-4xl font-black tracking-tight text-white mb-1">
              {data.value.toLocaleString()}
            </p>
            <p className="text-xs text-[#FA7921]">{data.details}</p>
          </div>

          {/* Activity Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Activity Level</span>
              <span className="text-[#FA7921] font-bold">{data.percentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FA7921] to-[#FF9A56] rounded-full shadow-lg shadow-[#FA7921]/50 transition-all duration-1000 animate-pulse"
                style={{ width: `${data.percentage}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
            <div>
              <p className="text-[10px] text-white/50 uppercase">High Value</p>
              <p className="text-sm font-bold text-[#FA7921]">45</p>
            </div>
            <div>
              <p className="text-[10px] text-white/50 uppercase">Ending Soon</p>
              <p className="text-sm font-bold text-[#FA7921]">234</p>
            </div>
            <div>
              <p className="text-[10px] text-white/50 uppercase">New Today</p>
              <p className="text-sm font-bold text-[#FA7921]">89</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // New Listings Card
  if (data.title === 'New Listings') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} p-6 h-full text-white shadow-2xl hover:shadow-3xl transition-all duration-500 group ${style.borderColor} border hover:scale-[1.03] hover:-translate-y-1`}>
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-orange-100/10" />
        
        {/* Animated patterns */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-100/10 rounded-full blur-2xl -ml-20 -mb-20 group-hover:scale-150 transition-all duration-700" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${style.iconBg} backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">{data.title}</span>
                <p className="text-[10px] text-white/70 font-medium mt-0.5">{data.subtitle}</p>
              </div>
            </div>
            {data.change && (
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur text-[10px] font-bold text-white">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  {data.change.split(' ')[0]}
                </span>
              </div>
            )}
          </div>
          
          {/* Main Value */}
          <div className="mb-4">
            <p className="text-4xl font-black tracking-tight text-white mb-1">
              {data.value.toLocaleString()}
            </p>
            <p className="text-xs text-white/80">{data.details}</p>
          </div>

          {/* Growth Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Growth Rate</span>
              <span className="text-white font-bold">{data.percentage}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white/80 to-white rounded-full shadow-lg shadow-white/30 transition-all duration-1000"
                style={{ width: `${data.percentage}%` }}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-wrap gap-1">
              {['Luxury', 'Sports', 'Electric', 'SUV'].map((cat) => (
                <span key={cat} className="px-2 py-0.5 bg-white/15 backdrop-blur rounded-full text-[10px] text-white/90">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default card style (shouldn't reach here but just in case)
  return null
}

// Balance Card Component - Premium Beautiful Design
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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 h-full text-white shadow-2xl hover:shadow-3xl transition-all duration-500 group border border-amber-400/20 hover:scale-[1.03] hover:-translate-y-1">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/30 via-transparent to-orange-400/30" />
      
      {/* Animated geometric patterns */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 group-hover:bg-white/30 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-300/20 rounded-full blur-2xl -ml-20 -mb-20 group-hover:scale-150 transition-all duration-700" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-orange-300/15 rounded-full blur-2xl group-hover:translate-x-4 group-hover:scale-125 transition-all duration-700" />
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-30" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='white' stroke-width='0.5' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")"}} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/25 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-white/90 uppercase tracking-wider">Available Balance</span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-[10px] text-white/70 font-medium">LIVE</span>
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-xl text-xs font-bold border border-white/30 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            +{percentChange}%
          </span>
        </div>
        
        <div className="mb-6">
          <p className="text-5xl font-black mb-3 tracking-tight bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent drop-shadow-lg">
            ¥{data.jpyBalance.toLocaleString()}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-sm text-white/80 font-medium">
              ≈ ${usdBalance} USD
            </p>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-white/20 backdrop-blur-xl text-white font-bold border border-white/25">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              1 USD = ¥{(1/data.usdRate).toFixed(2)}
            </span>
          </div>
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="group/btn px-4 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-white/95 transition-all transform hover:scale-[1.05] shadow-xl hover:shadow-2xl">
            <span className="flex items-center justify-center gap-2">
              <div className="p-1.5 bg-orange-100 rounded-lg group-hover/btn:bg-orange-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm">Deposit</span>
            </span>
          </button>
          <button className="group/btn px-4 py-3 bg-white/20 backdrop-blur-xl text-white rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30 hover:border-white/40 shadow-lg">
            <span className="flex items-center justify-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg group-hover/btn:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm">History</span>
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
        <div className="absolute top-3 right-3 bg-[#FA7921] text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse shadow-lg">
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

        <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
          <p className="text-xs text-red-700 mb-2 font-medium">Auction Ends In</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.days).padStart(2, '0')}</p>
              <p className="text-xs text-red-500">Days</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-xs text-red-500">Hours</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-xs text-red-500">Min</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.seconds).padStart(2, '0')}</p>
              <p className="text-xs text-red-500">Sec</p>
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

// Activity Item Component - Completely Redesigned
function ActivityItem({ activity }: { activity: ActivityItem }) {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'bid':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'win':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'outbid':
        return (
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )
      case 'listing':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        )
      case 'payment':
        return (
          <div className="w-8 h-8 bg-[#FA7921]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50/70 transition-all duration-150 group cursor-pointer">
      {getActivityIcon()}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 leading-tight group-hover:text-[#FA7921] transition-colors">
              {activity.title}
            </p>
            {activity.description && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{activity.description}</p>
            )}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-gray-400">{activity.time}</span>
              {activity.status && (
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  activity.status === 'success' ? 'bg-green-100 text-green-600' :
                  activity.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {activity.status}
                </span>
              )}
            </div>
          </div>
          {activity.amount && (
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-[#FA7921]">¥{activity.amount}</p>
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

  // Stats data with better icons and values - Enhanced with more info
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
      subtitle: 'Live Bidding',
      details: '234 ending today',
      percentage: 78,
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
      subtitle: 'This Week',
      details: '89 premium vehicles',
      percentage: 92,
    },
    {
      title: 'Account Status',
      value: 'Premium',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      trend: 'neutral',
      subtitle: 'Tier Status',
      details: 'All features unlocked',
      percentage: 100,
    },
  ]

  const balanceData: BalanceData = {
    jpyBalance: 1250000,
    usdRate: 0.0067,
  }

  // Auction data with working stock images
  const upcomingAuctions: AuctionItem[] = [
    {
      id: 1,
      title: 'Toyota Camry 2022',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
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
          Here&apos;s what&apos;s happening with your auctions today.
        </p>
      </div>

      {/* Stats Grid - Responsive 4 columns with better spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, index) => (
          <StatsCard key={index} data={stat} loading={loading} index={index} />
        ))}
        <BalanceCard data={balanceData} loading={loading} />
      </div>

      {/* Main Content Section with Consistent Containers */}
      <div className="space-y-8">
        {/* Upcoming Auctions and Recent Activity Row */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Upcoming Auctions Container */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Auctions</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Live auctions ending soon</p>
                  </div>
                  <button className="text-[#FA7921] hover:text-[#FA7921]/80 text-sm font-medium transition-colors flex items-center gap-1">
                    View All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {upcomingAuctions.slice(0, 3).map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} loading={loading} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Container */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Your latest updates</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                </div>
              </div>
              {loading ? (
                <div className="p-3 space-y-3 flex-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-3 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="divide-y divide-gray-50">
                    {activities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              )}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                <button className="w-full text-center text-xs text-[#FA7921] hover:text-[#FA7921]/80 font-medium transition-colors">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Auctions Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Featured Auctions</h2>
                <p className="text-xs text-gray-500 mt-0.5">Hand-picked vehicles for you</p>
              </div>
              <button className="text-[#FA7921] hover:text-[#FA7921]/80 text-sm font-medium transition-colors flex items-center gap-1">
                Browse All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingAuctions.slice(0, 4).map((auction) => (
                <AuctionCard key={auction.id} auction={auction} loading={loading} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}