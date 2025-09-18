'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { StatCard } from '@/components/ui/stat-card'
import type { AuctionBid, BidStatus, BidStatistics } from './types'

// Mock data for demonstration
const mockBids: AuctionBid[] = [
  {
    id: '1',
    auctionId: 'AUC-2024-0892',
    vehicleTitle: '2018 Toyota Corolla Axio',
    vehicleImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    vehicleSpecs: {
      year: 2018,
      mileage: '42,360 km',
      transmission: 'Automatic',
      engine: '1.5L'
    },
    startingPrice: 5200000,
    yourBid: 7350000,
    currentHighestBid: 7350000,
    numberOfBids: 23,
    status: 'won',
    bidDate: new Date('2024-01-10'),
    auctionEndDate: new Date('2024-01-10'),
    winningBid: 7350000,
    paymentStatus: 'completed',
    shippingStatus: 'pending',
    location: 'Tokyo, Japan',
    auctionHouse: {
      name: 'Tokyo Motors',
      rating: 4.8,
      verified: true
    },
    groupInfo: {
      groupId: 'A',
      groupName: 'Group A - Premium Sedans',
      requiredWins: 2,
      totalVehicles: 3,
      currentWins: 1
    }
  },
  {
    id: '2',
    auctionId: 'AUC002',
    vehicleTitle: 'Honda Civic 2021',
    vehicleImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    vehicleSpecs: {
      year: 2021,
      mileage: '28,000 km',
      transmission: 'Manual',
      engine: '1.8L V4'
    },
    startingPrice: 1800000,
    yourBid: 1950000,
    currentHighestBid: 2100000,
    numberOfBids: 31,
    status: 'lost',
    bidDate: new Date('2024-01-08'),
    auctionEndDate: new Date('2024-01-12'),
    winningBid: 2100000,
    location: 'Osaka, Japan',
    auctionHouse: {
      name: 'Osaka Auto Hub',
      rating: 4.5,
      verified: true
    }
  },
  {
    id: '3',
    auctionId: 'AUC003',
    vehicleTitle: 'BMW 3 Series 2023',
    vehicleImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    vehicleSpecs: {
      year: 2023,
      mileage: '8,000 km',
      transmission: 'Automatic',
      engine: '2.0L Turbo'
    },
    startingPrice: 4500000,
    yourBid: 4750000,
    currentHighestBid: 4750000,
    numberOfBids: 18,
    status: 'active',
    bidDate: new Date('2024-01-18'),
    auctionEndDate: new Date('2024-01-25'),
    location: 'Yokohama, Japan',
    auctionHouse: {
      name: 'Premium Cars Japan',
      rating: 4.9,
      verified: true
    },
    groupInfo: {
      groupId: 'B',
      groupName: 'Group B - Economy Selection',
      requiredWins: 3,
      totalVehicles: 6,
      currentWins: 0
    }
  },
  {
    id: '4',
    auctionId: 'AUC004',
    vehicleTitle: 'Mercedes-Benz C-Class 2023',
    vehicleImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    vehicleSpecs: {
      year: 2023,
      mileage: '5,000 km',
      transmission: 'Automatic',
      engine: '2.0L Turbo'
    },
    startingPrice: 5200000,
    yourBid: 5350000,
    currentHighestBid: 5450000,
    numberOfBids: 27,
    status: 'outbid',
    bidDate: new Date('2024-01-17'),
    auctionEndDate: new Date('2024-01-24'),
    location: 'Nagoya, Japan',
    auctionHouse: {
      name: 'Luxury Motors',
      rating: 4.7,
      verified: true
    }
  },
  {
    id: '5',
    auctionId: 'AUC005',
    vehicleTitle: 'Mazda CX-5 2022',
    vehicleImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    vehicleSpecs: {
      year: 2022,
      mileage: '20,000 km',
      transmission: 'Automatic',
      engine: '2.5L V4'
    },
    startingPrice: 3200000,
    yourBid: 3350000,
    currentHighestBid: 3350000,
    numberOfBids: 15,
    status: 'won',
    bidDate: new Date('2024-01-05'),
    auctionEndDate: new Date('2024-01-09'),
    winningBid: 3350000,
    paymentStatus: 'pending',
    shippingStatus: 'pending',
    location: 'Kobe, Japan',
    auctionHouse: {
      name: 'Kobe Cars',
      rating: 4.6,
      verified: true
    },
    groupInfo: {
      groupId: 'A',
      groupName: 'Group A - Premium Sedans',
      requiredWins: 2,
      totalVehicles: 3,
      currentWins: 2
    }
  }
]

const statistics: BidStatistics = {
  totalBids: 124,
  wonAuctions: 12,
  lostAuctions: 8,
  activeBids: 5,
  totalSpent: 28500000,
  savedAmount: 1200000,
  outbidCount: 18,
  avgBidAmount: 2375000,
  pendingPayments: 2,
  inTransitVehicles: 3
}

export default function MyBidsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'previous' | 'won'>('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'status'>('date')
  const [showBidModal, setShowBidModal] = useState(false)
  const [modalType, setModalType] = useState<'change' | 'cancel'>('change')
  const [selectedBid, setSelectedBid] = useState<AuctionBid | null>(null)
  const [newBidAmount, setNewBidAmount] = useState('')

  // Format currency with proper Japanese formatting
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `¥${(amount / 1000000).toFixed(2)}M`
    } else if (amount >= 100000) {
      return `¥${(amount / 1000).toFixed(0)}K`
    }
    return `¥${amount.toLocaleString('ja-JP')}`
  }

  // Calculate smart bid increment based on current price
  const getSmartIncrement = (currentBid: number): number[] => {
    if (currentBid < 500000) {
      return [10000, 20000, 50000] // Under ¥500K: +10K, +20K, +50K
    } else if (currentBid < 1000000) {
      return [10000, 50000, 100000] // ¥500K-1M: +10K, +50K, +100K
    } else if (currentBid < 5000000) {
      return [50000, 100000, 200000] // ¥1M-5M: +50K, +100K, +200K
    } else {
      return [100000, 200000, 500000] // Over ¥5M: +100K, +200K, +500K
    }
  }

  // Format increment button text
  const formatIncrement = (amount: number): string => {
    if (amount >= 1000000) {
      return `+¥${amount / 1000000}M`
    } else if (amount >= 1000) {
      return `+¥${amount / 1000}K`
    }
    return `+¥${amount}`
  }

  // Filter bids based on active tab
  const filteredBids = mockBids.filter(bid => {
    if (activeTab === 'active') return bid.status === 'active' || bid.status === 'outbid'
    if (activeTab === 'previous') return bid.status === 'lost'
    if (activeTab === 'won') return bid.status === 'won'
    return true
  }).filter(bid => 
    bid.vehicleTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: BidStatus) => {
    switch (status) {
      case 'won':
        return <StatusBadge status="won" />
      case 'lost':
        return <StatusBadge status="lost" />
      case 'active':
        return <StatusBadge status="active" />
      case 'outbid':
        return <StatusBadge status="outbid" />
      default:
        return null
    }
  }

  const handleChangeBid = (bid: AuctionBid) => {
    setSelectedBid(bid)
    setNewBidAmount(bid.yourBid.toString())
    setModalType('change')
    setShowBidModal(true)
  }

  const handleCancelBid = (bid: AuctionBid) => {
    setSelectedBid(bid)
    setModalType('cancel')
    setShowBidModal(true)
  }

  const checkIfUrgent = (auctionEndDate: Date) => {
    const hoursUntilAuction = (auctionEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60)
    return hoursUntilAuction <= 3
  }

  const handleConfirmAction = () => {
    // Simulate API call
    if (modalType === 'cancel') {
      // Cancelling bid
      // Show success message
      alert('Bid cancellation request submitted. You will receive a notification once it has been reviewed by staff.')
    } else {
      // Changing bid amount
      // Show success message
      alert('Bid change request submitted. You will receive a notification once it has been processed.')
    }
    setShowBidModal(false)
    setSelectedBid(null)
    setNewBidAmount('')
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
            <p className="text-sm text-gray-500">Track and manage your auction bids</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Bids Card */}
        <StatCard
          title="Total Bids"
          value={statistics.totalBids.toString()}
          subtitle="All time"
          className="min-h-[140px]"
        />

        {/* Vehicles Won Card */}
        <StatCard
          title="Vehicles Won"
          value={statistics.wonAuctions.toString()}
          subtitle={`Successfully won • ${statistics.inTransitVehicles} in transit`}
          trend={{ value: 12.5, isPositive: true }}
          className="min-h-[140px]"
        />

        {/* Active Auctions Card */}
        <StatCard
          title="Active Auctions"
          value={(statistics.activeBids + statistics.outbidCount).toString()}
          subtitle={`${statistics.activeBids} leading • ${statistics.outbidCount} outbid`}
          className="min-h-[140px]"
        />

        {/* Average Bid Card */}
        <StatCard
          title="Avg Bid Amount"
          value={formatCurrency(statistics.avgBidAmount)}
          subtitle={statistics.pendingPayments > 0 ? `Per vehicle • ${statistics.pendingPayments} pending` : 'Per vehicle'}
          className="min-h-[140px]"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {(['active', 'previous', 'won'] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? 'primary' : 'secondary'}
                size="sm"
                className={activeTab === tab ? 'shadow-md' : ''}
              >
                {tab === 'previous' ? 'Previous' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'active' && <span className="ml-1.5">({mockBids.filter(b => b.status === 'active' || b.status === 'outbid').length})</span>}
                {tab === 'previous' && <span className="ml-1.5">({mockBids.filter(b => b.status === 'lost').length})</span>}
                {tab === 'won' && <span className="ml-1.5">({mockBids.filter(b => b.status === 'won').length})</span>}
              </Button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex gap-3 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-gray-700"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {filteredBids.map((bid) => (
          <div 
            key={bid.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Vehicle Image */}
                <div className="relative w-full lg:w-56 h-40 lg:h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={bid.vehicleImage}
                    alt={bid.vehicleTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(bid.status)}
                  </div>
                  {bid.status === 'active' && checkIfUrgent(bid.auctionEndDate) && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-md animate-pulse">
                      ⚡ LIVE SOON
                    </div>
                  )}
                </div>

                {/* Vehicle Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <div className="flex items-start gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{bid.vehicleTitle}</h3>
                        {bid.groupInfo && (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-[#FA7921] text-white text-xs font-bold rounded">
                              {bid.groupInfo.groupId}
                            </span>
                            <span className="text-xs text-gray-600">
                              {bid.groupInfo.currentWins}/{bid.groupInfo.requiredWins} wins needed
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Auction ID: {bid.auctionId}</p>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {bid.vehicleSpecs.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {bid.vehicleSpecs.mileage}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          {bid.vehicleSpecs.transmission}
                        </span>
                        {bid.vehicleSpecs.engine && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            {bid.vehicleSpecs.engine}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {bid.location}
                        </span>
                        {bid.auctionHouse && (
                          <span className="flex items-center gap-1">
                            <span className="text-gray-500">Auction House:</span>
                            <span className="font-medium text-gray-700">{bid.auctionHouse.name}</span>
                            {bid.auctionHouse.verified && (
                              <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bid Information */}
                    <div className="text-right">
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Your Bid</p>
                        <p className="text-xl font-bold text-[#FA7921]">{formatCurrency(bid.yourBid)}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">
                          {bid.status === 'won' ? 'Winning Bid' : 'Current Highest'}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(bid.winningBid || bid.currentHighestBid)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {bid.numberOfBids} bids • Ends {bid.auctionEndDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons and Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      {(bid.status === 'active' || bid.status === 'outbid') && (
                        <>
                          <button
                            onClick={() => {
                              if (bid.status === 'outbid') {
                                // Smart increment based on current bid amount
                                const increments = getSmartIncrement(bid.currentHighestBid)
                                const newAmount = bid.currentHighestBid + (increments[0] || 10000)
                                setNewBidAmount(newAmount.toString())
                                handleChangeBid(bid)
                              } else {
                                window.location.href = `/dashboard/vehicle/${bid.id}`
                              }
                            }}
                            className="relative px-5 py-2.5 bg-gradient-to-r from-[#FA7921] to-[#FF6B35] text-white text-sm font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FA7921] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="relative z-10">
                              {bid.status === 'outbid' ? 'Increase Bid' : 'View Live Auction'}
                            </span>
                          </button>
                          <button
                            onClick={() => window.location.href = `/dashboard/auctions/${bid.auctionId}`}
                            className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-sm font-medium rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Auction Details
                          </button>
                          <button
                            onClick={() => handleCancelBid(bid)}
                            className="px-4 py-2.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 text-sm font-medium rounded-lg hover:from-red-100 hover:to-pink-100 border border-red-200 hover:border-red-300 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Cancel Bid
                          </button>
                        </>
                      )}
                      {bid.status === 'won' && (
                        <>
                          {bid.paymentStatus === 'completed' ? (
                            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-semibold border border-green-300">
                              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Payment Completed
                            </span>
                          ) : (
                            <button
                              onClick={() => window.location.href = `/dashboard/payments/${bid.id}`}
                              className="relative px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                              <span className="relative z-10">Complete Payment</span>
                            </button>
                          )}
                          {bid.shippingStatus && (
                            <button
                              onClick={() => window.location.href = `/dashboard/shipment/${bid.id}`}
                              className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-sm font-semibold border border-blue-200 rounded-lg hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                              </svg>
                              {bid.shippingStatus === 'delivered' ? 'Delivered' : 
                               bid.shippingStatus === 'in_transit' ? 'Track Shipment' : 
                               'Pending Shipment'}
                            </button>
                          )}
                        </>
                      )}
                      {bid.status === 'lost' && (
                        <button 
                          onClick={() => window.location.href = `/dashboard/vehicles?similar=${encodeURIComponent(bid.vehicleTitle)}`}
                          className="px-4 py-2.5 bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 rounded-lg text-sm font-semibold hover:from-gray-200 hover:to-slate-200 border border-gray-200 hover:border-gray-300 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          View Similar Vehicles
                        </button>
                      )}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => window.location.href = `/dashboard/vehicle/${bid.id}`}
                        className="p-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 hover:from-gray-100 hover:to-gray-200 rounded-lg transition-all duration-200 group" 
                        title="View Vehicle Details"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {bid.status === 'won' && bid.paymentStatus === 'completed' && (
                        <button 
                          onClick={() => window.location.href = `/dashboard/documents/${bid.id}`}
                          className="p-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 rounded-lg transition-all duration-200 group" 
                          title="View Documents"
                        >
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBids.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bids found</h3>
          <p className="text-sm text-gray-500">Start bidding on vehicles to see them here</p>
        </div>
      )}

      {/* Bid Change/Cancel Modal */}
      {showBidModal && selectedBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {modalType === 'cancel' ? 'Cancel Bid' : 'Change Bid'}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedBid.vehicleTitle} - {selectedBid.auctionId}
              </p>
            </div>

            {/* Urgent Warning */}
            {checkIfUrgent(selectedBid.auctionEndDate) && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-amber-800 mb-1">Urgent: Auction Starting Soon</p>
                    <p className="text-sm text-amber-700">
                      This auction is starting in less than 3 hours. The staff in charge of bidding might not see your {modalType === 'cancel' ? 'cancellation' : 'change'} in time.
                    </p>
                    <p className="text-sm text-amber-700 mt-2 font-medium">
                      Please contact your sales person immediately:
                    </p>
                    <div className="mt-2 space-y-1">
                      <a href="tel:+81312345678" className="text-sm text-amber-900 underline block">📞 Call: +81-3-1234-5678</a>
                      <a href="https://wa.me/81312345678" className="text-sm text-amber-900 underline block">💬 WhatsApp: +81-3-1234-5678</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Change Bid Amount */}
            {modalType === 'change' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Bid Amount
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                    <input
                      type="number"
                      value={newBidAmount}
                      onChange={(e) => setNewBidAmount(e.target.value)}
                      step="10000"
                      min={selectedBid.currentHighestBid + 10000}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                      placeholder="Enter new bid amount"
                    />
                  </div>
                  <div className="flex gap-2">
                    {getSmartIncrement(selectedBid.currentHighestBid).map((increment, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          const current = parseInt(newBidAmount) || selectedBid.currentHighestBid
                          setNewBidAmount((current + increment).toString())
                        }}
                        className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {formatIncrement(increment)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-500">
                    Current highest bid: {formatCurrency(selectedBid.currentHighestBid)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Your current bid: {formatCurrency(selectedBid.yourBid)}
                  </p>
                  <p className="text-xs text-[#FA7921] font-medium">
                    Minimum increment: {formatCurrency(getSmartIncrement(selectedBid.currentHighestBid)[0] || 10000)}
                  </p>
                </div>
              </div>
            )}

            {/* Cancel Bid Confirmation */}
            {modalType === 'cancel' && (
              <div className="mb-6">
                <p className="text-gray-700">
                  Are you sure you want to cancel your bid of <span className="font-semibold">{formatCurrency(selectedBid.yourBid)}</span> for this vehicle?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This action requires staff approval and cannot be undone once processed.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBidModal(false)
                  setSelectedBid(null)
                  setNewBidAmount('')
                }}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors ${
                  modalType === 'cancel' 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-[#FA7921] text-white hover:bg-[#FA7921]/90'
                }`}
              >
                {modalType === 'cancel' ? 'Confirm Cancellation' : 'Submit Change'}
              </button>
            </div>

            {/* Additional Information */}
            <p className="text-xs text-gray-500 text-center mt-4">
              You will receive a notification once your request has been {modalType === 'cancel' ? 'reviewed and accepted' : 'processed'} by our staff.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}