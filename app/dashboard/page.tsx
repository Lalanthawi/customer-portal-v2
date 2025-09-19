'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { AuctionItem, ActivityItem } from './types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { ClaimRequiredModal, useClaimStatus } from '@/src/components/dashboard/ClaimRequired'
import { getRandomAuctionHouse } from '@/src/data/auctionHouses'
import { AppleStatCard } from '@/src/components/ui/stat-card-apple'
import { CheckCircle, Award } from 'lucide-react'
import { VehicleCard } from '@/src/components/ui/vehicle-card-new'
import { VerificationBadge } from '@/src/components/ui/verification-badge'

// Skeleton component for loading states
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}




// Auction Card Component  
function AuctionCard({ auction, loading }: { auction: AuctionItem; loading?: boolean }) {
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

  // Transform AuctionItem to VehicleCardData format
  const vehicleData = {
    id: auction.id,
    lotNumber: auction.lotNumber,
    title: auction.title,
    make: auction.title.split(' ')[0] || '',
    model: auction.title.split(' ').slice(1).join(' ') || '',
    year: auction.specs.year,
    price: auction.currentBid,
    currentBid: auction.currentBid,
    startingPrice: auction.startingPrice,
    yourBid: auction.yourBid,
    mileage: auction.specs.mileage,
    transmission: auction.specs.transmission,
    engineSize: 'N/A', // Not available in AuctionItem
    imageUrl: auction.image,
    auctionEndTime: auction.endDate,
    bids: auction.bidsCount || 0,
    verified: false,
    auctionHouse: auction.auctionHouse
  }

  const handlePlaceBid = () => {
    if (!isClaimedBySales) {
      setShowClaimModal(true)
    } else {
      // Proceed with normal bid placement
      window.location.href = `/dashboard/vehicle/${auction.id}`
    }
  }

  return (
    <>
      <VehicleCard
        vehicle={vehicleData}
        viewMode="grid"
        onPlaceBid={handlePlaceBid}
        showBidButton={true}
      />
      <ClaimRequiredModal 
        isOpen={showClaimModal} 
        onClose={() => setShowClaimModal(false)}
        vehicleTitle={auction.title}
      />
    </>
  )
}

// Activity Item Component - Completely Redesigned
function ActivityItem({ activity }: { activity: ActivityItem }) {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'bid':
        return (
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'win':
        return (
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-7.5m-9 7.5v-7.5m-3-4.125a2.25 2.25 0 113.18 0 2.25 2.25 0 01-3.18 0zm9 0a2.25 2.25 0 113.18 0 2.25 2.25 0 01-3.18 0zM12 5.25c-1.24 0-2.25 1.01-2.25 2.25v.57l2.25 2.25 2.25-2.25v-.57c0-1.24-1.01-2.25-2.25-2.25z" />
            </svg>
          </div>
        )
      case 'outbid':
        return (
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c0 1.621 1.484 3.5 3.5 3.5 1.358 0 2.516-.84 3.115-2.077a6 6 0 01.388-6.307 6 6 0 01.388 6.307c.599 1.238 1.757 2.077 3.115 2.077 2.016 0 3.5-1.879 3.5-3.5 0-1.665-3.157-4.534-6.813-6.093a1.5 1.5 0 00-1.09 0C8.843 7.466 5.697 10.335 5.697 12.001zm6.303 8.374h.008v.008H12v-.008z" />
            </svg>
          </div>
        )
      case 'listing':
        return (
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        )
      case 'payment':
        return (
          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#FA7921]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
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
  const username = "Avishka"
  const accountLevel = "verified" as 'basic' | 'verified' | 'premium' // Can be: 'basic', 'verified', 'premium'

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
      {/* Combined Welcome Section with Stats */}
      <div className="mb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[32px] font-semibold text-gray-900 tracking-[-0.02em]">
              Welcome back, {username}
            </h1>
            <Link
              href="/dashboard/profile"
              className="group relative"
              title={`Account Status: ${(() => {
                switch(accountLevel) {
                  case 'premium': return 'Premium';
                  case 'verified': return 'Verified';
                  default: return 'Basic';
                }
              })()}`}
            >
              {accountLevel === 'premium' ? (
                <div className="p-1.5 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 hover:from-purple-200 hover:to-purple-100 transition-all">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
              ) : accountLevel === 'verified' ? (
                <VerificationBadge size="md" />
              ) : (
                <div className="p-1.5 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 hover:from-gray-200 hover:to-gray-100 transition-all">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                </div>
              )}
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                View Account Status
              </span>
            </Link>
          </div>
          <p className="text-[16px] text-gray-600">
            Here's what's happening with your auctions today
          </p>
        </div>

        {/* Apple-Inspired Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppleStatCard
            title="Active Bids"
            value="12"
            subtitle="From yesterday"
            trend={{ value: 8.3 }}
            sparkline={[8, 10, 9, 12, 11, 10, 12]}
            accentColor="#007AFF"
            delay={0}
            details={[
              { label: "Winning", value: "7", color: "text-green-600" },
              { label: "Outbid", value: "3", color: "text-orange-600" },
              { label: "Watching", value: "2", color: "text-blue-600" }
            ]}
          />

          <AppleStatCard
            title="Account Status"
            value={
              <div className="flex items-center gap-2">
                <span className="font-semibold">Verified</span>
                <VerificationBadge size="sm" />
              </div>
            }
            subtitle="Full access granted"
            trend={{ value: 98, label: "Trust Score" }}
            accentColor="#5856D6"
            delay={0.1}
            details={[
              { label: "Member Since", value: "Jan 2024" },
              { label: "Account Tier", value: "Premium", color: "text-purple-600" },
              { label: "Documents", value: "All verified", color: "text-green-600" }
            ]}
          />

          <AppleStatCard
            title="Pending Actions"
            value="5"
            subtitle="Requires attention"
            trend={{ value: -2 }}
            sparkline={[7, 6, 8, 5, 6, 5, 5]}
            accentColor="#FF3B30"
            delay={0.2}
            details={[
              { label: "Payments Due", value: "2", color: "text-red-600" },
              { label: "Documents", value: "1", color: "text-orange-600" },
              { label: "Inspections", value: "1", color: "text-blue-600" }
            ]}
          />

          <AppleStatCard
            title="Available Balance"
            value="485"
            unit="K¥"
            subtitle="Ready to use"
            trend={{ value: 3.2 }}
            sparkline={[450, 460, 455, 470, 480, 475, 485]}
            accentColor="#34C759"
            delay={0.3}
            details={[
              { label: "Total Deposit", value: "¥500,000" },
              { label: "Escrow", value: "¥12,000", color: "text-blue-600" },
              { label: "Processing", value: "¥6,500", color: "text-orange-600" }
            ]}
          />
        </div>
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