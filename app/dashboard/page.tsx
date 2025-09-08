'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { AuctionItem, ActivityItem } from './types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ClaimRequiredModal, useClaimStatus } from './components/ClaimRequired'
import { getRandomAuctionHouse } from '@/src/data/auctionHouses'
import { StatCard } from '@/components/ui/stat-card'

// Skeleton component for loading states
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}

// Countdown Timer Hook - Shows bidding deadline (1 hour before auction)
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
      // Bidding closes 1 hour before the actual auction time
      const biddingDeadline = targetDate.getTime() - (60 * 60 * 1000)
      const distance = biddingDeadline - now

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



// Auction Card Component  
function AuctionCard({ auction, loading }: { auction: AuctionItem; loading?: boolean }) {
  const timeLeft = useCountdown(auction.endDate)
  const { isClaimedBySales } = useClaimStatus()
  const [showClaimModal, setShowClaimModal] = useState(false)

  if (loading) {
    return (
      <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
        <Skeleton className="h-48 w-full" />
        <div className="p-5 flex-1 flex flex-col">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <Skeleton className="h-10 w-full mt-auto" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group h-full flex flex-col"> {/* spacing fix */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={auction.image}
          alt={auction.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {auction.auctionHouse}
        </Badge>
      </div>
      
      <CardContent className="p-5 md:p-6 flex-1 flex flex-col"> {/* spacing fix */}
        <div className="flex items-start justify-between gap-3 mb-3"> {/* spacing fix */}
          <CardTitle className="font-semibold text-lg text-gray-900">{auction.title}</CardTitle>
          <span className="text-xs text-gray-500 font-medium flex-shrink-0">Lot #{auction.lotNumber}</span>
        </div>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4 space-y-2"> {/* spacing fix */}
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
        
        <div className="grid grid-cols-2 gap-3 mb-4 mt-3"> {/* spacing fix */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting Price</p>
            <p className="text-sm font-semibold text-gray-900">¥{auction.startingPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Your Bid</p>
            <p className="text-sm font-semibold text-green-600">
              {auction.yourBid ? `¥${auction.yourBid.toLocaleString()}` : 'No bid yet'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"> {/* spacing fix */}
          <p className="text-xs text-gray-700 mb-2 font-medium leading-tight">Bidding Closes In</p> {/* spacing fix */}
          <div className="grid grid-cols-4 gap-3 text-center"> {/* spacing fix */}
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.days).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Days</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Hours</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Min</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{String(timeLeft.seconds).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">Sec</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => {
            if (!isClaimedBySales) {
              setShowClaimModal(true)
            } else {
              // Proceed with normal bid placement
              // Placing bid on vehicle
            }
          }}
          className="w-full bg-[#FA7921] text-white py-2.5 rounded-lg font-medium hover:bg-[#FA7921]/90 transition-colors mt-auto"
        >
          Place Bid
        </Button>
        <ClaimRequiredModal 
          isOpen={showClaimModal} 
          onClose={() => setShowClaimModal(false)}
          vehicleTitle={auction.title}
        />
      </CardContent>
    </Card>
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
              <p className={`text-xs mt-0.5 line-clamp-1 ${
                activity.description.includes('Change your bid') ? 'text-orange-600 font-medium' :
                activity.description.includes('Sold out price') ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {activity.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-gray-400">{activity.time}</span>
              {activity.status && !activity.title.includes('outbid') && (
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  activity.status === 'success' ? 'bg-green-100 text-green-600' :
                  activity.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {activity.status}
                </span>
              )}
              {activity.title.includes('Another ZervTek') && (
                <button className="text-[10px] text-[#FA7921] font-medium hover:text-[#FA7921]/80">
                  Change Bid →
                </button>
              )}
            </div>
          </div>
          {activity.amount && (
            <div className="text-right flex-shrink-0">
              <p className={`text-sm font-semibold ${
                activity.description?.includes('Sold out price') ? 'text-red-600' : 'text-[#FA7921]'
              }`}>¥{activity.amount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const { isClaimedBySales } = useClaimStatus()
  const username = "Avishka"

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])


  // Auction data with working stock images
  const upcomingAuctions: AuctionItem[] = [
    {
      id: 1,
      title: 'Toyota Camry 2022',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      specs: { year: 2022, mileage: '15,000 km', transmission: 'Automatic' },
      startingPrice: 2500000,
      currentBid: 2750000,
      yourBid: 2750000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '42315',
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
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '78921',
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
      yourBid: 3350000,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '15643',
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
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '89234',
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
      yourBid: 5350000,
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '34521',
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
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '67892',
      bidsCount: 34,
      watching: 78,
    },
  ]

  const activities: ActivityItem[] = [
    { 
      id: '1',
      type: 'bid',
      title: 'You placed a bid on Toyota Camry',
      description: `${getRandomAuctionHouse()} • Lot #42315`,
      time: '2 hours ago',
      amount: '2,750,000',
      status: 'success'
    },
    { 
      id: '2',
      type: 'outbid',
      title: 'You were outbid on Honda Accord',
      description: 'Sold out price: ¥3,450,000',
      time: '5 hours ago',
      status: 'pending',
      amount: '3,450,000'
    },
    { 
      id: '3',
      type: 'outbid',
      title: 'Another ZervTek customer outbid you',
      description: `${getRandomAuctionHouse()} • Lot #78234 - Change your bid`,
      time: '6 hours ago',
      status: 'pending'
    },
    { 
      id: '4',
      type: 'win',
      title: 'You won the auction for Nissan Altima',
      description: `${getRandomAuctionHouse()} • Lot #15643 - Payment due`,
      time: '1 day ago',
      amount: '2,100,000',
      status: 'success'
    },
    { 
      id: '5',
      type: 'listing',
      title: 'New match: BMW 3 Series 2022',
      description: `${getRandomAuctionHouse()} • Lot #89234 - Matches your criteria`,
      time: '2 days ago'
    },
    { 
      id: '6',
      type: 'payment',
      title: 'Payment confirmed for Mazda CX-5',
      description: `${getRandomAuctionHouse()} • Lot #34521 - Preparing for shipment`,
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

      {/* Stats Cards Row - Using Reusable Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/dashboard/bids">
          <StatCard
            title="Active Bids"
            value="12"
            subtitle="from last week"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            status={{ label: 'Active', type: 'active' }}
            trend={{ value: 25, label: '', isPositive: true }}
            progress={{ value: 12, max: 20, label: 'Limit usage', showPercentage: false }}
            variant="orange"
          />
        </Link>

        <Link href="/dashboard/profile?tab=status">
          <StatCard
            title="Account Status"
            value={isClaimedBySales ? "Premium" : "Verify Now"}
            subtitle={isClaimedBySales ? "Full access enabled" : "Limited access"}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isClaimedBySales ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
            }
            status={{ label: isClaimedBySales ? 'Verified' : 'Action needed', type: isClaimedBySales ? 'active' : 'error' }}
            variant={isClaimedBySales ? "purple" : "red"}
            valueClassName={!isClaimedBySales ? "text-2xl text-red-600" : "text-2xl"}
          >
            {!isClaimedBySales && (
              <div className="mt-6 pt-4 border-t border-gray-50">
                <p className="text-xs text-red-600 font-medium">Cannot place bids until verified</p>
              </div>
            )}
          </StatCard>
        </Link>

        <Link href="/dashboard/notifications">
          <StatCard
            title="Requires Action"
            value="5"
            subtitle="Pending tasks"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            badge={{ label: 'Urgent', variant: 'warning' }}
            variant="amber"
          >
            <div className="mt-6 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-600 font-medium">2 urgent</span>
                <span className="text-xs text-gray-400">3 regular</span>
              </div>
            </div>
          </StatCard>
        </Link>

        <Link href="/dashboard/wallet">
          <StatCard
            title="Total Balance"
            value="¥1.25M"
            subtitle="≈ $8,333 USD"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            status={{ label: 'Available', type: 'active' }}
            trend={{ value: 8.5, label: '', isPositive: true }}
            progress={{ value: 75, max: 100, label: 'Utilization', showPercentage: true }}
            action={{ label: 'View Wallet', onClick: () => {} }}
            variant="green"
          />
        </Link>
      </div>

      {/* Main Content Section with Consistent Containers */}
      <div className="space-y-8">
        {/* Upcoming Auctions and Recent Activity Row */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
          {/* Upcoming Auctions Container */}
          <div className="xl:col-span-3">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <CardHeader className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Recommended for You</CardTitle>
                    <CardDescription className="text-xs text-gray-500 mt-0.5">Based on your recent searches • Bidding deadlines approaching</CardDescription>
                  </div>
                  <Link href="/dashboard/auctions/upcoming" className="text-[#FA7921] hover:text-[#FA7921]/80 text-sm font-medium transition-colors flex items-center gap-1">
                    View All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {upcomingAuctions.slice(0, 3).map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} loading={loading} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Container */}
          <div className="xl:col-span-1 self-stretch">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
              <CardHeader className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                    <CardDescription className="text-xs text-gray-500 mt-0.5">Your latest updates</CardDescription>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1 flex flex-col justify-between">
                {loading ? (
                  <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-3 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="divide-y divide-gray-50">
                        {activities.slice(0, 5).map((activity) => (
                          <ActivityItem key={activity.id} activity={activity} />
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <Link href="/dashboard/activity" className="block w-full text-center text-xs text-[#FA7921] hover:text-[#FA7921]/80 font-medium transition-colors">
                        View All Activity →
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Auctions Container */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Featured Auctions</CardTitle>
                <CardDescription className="text-xs text-gray-500 mt-0.5">Similar to your interests • Submit bids before deadline</CardDescription>
              </div>
              <Link href="/dashboard/auctions" className="text-[#FA7921] hover:text-[#FA7921]/80 text-sm font-medium transition-colors flex items-center gap-1">
                Browse All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingAuctions.slice(0, 4).map((auction) => (
                <AuctionCard key={auction.id} auction={auction} loading={loading} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}