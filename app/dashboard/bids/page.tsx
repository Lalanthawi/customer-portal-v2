'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    seller: {
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
    seller: {
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
    seller: {
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
    seller: {
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
    seller: {
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
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'won' | 'lost'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'status'>('date')

  // Filter bids based on active tab
  const filteredBids = mockBids.filter(bid => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return bid.status === 'active' || bid.status === 'outbid'
    if (activeTab === 'won') return bid.status === 'won'
    if (activeTab === 'lost') return bid.status === 'lost'
    return true
  }).filter(bid => 
    bid.vehicleTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: BidStatus) => {
    switch (status) {
      case 'won':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Won
          </span>
        )
      case 'lost':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Lost
          </span>
        )
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5 animate-pulse"></span>
            Active
          </span>
        )
      case 'outbid':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Outbid
          </span>
        )
      default:
        return null
    }
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statistics.totalBids}</p>
          <p className="text-xs text-gray-500 mt-1">Total Bids Placed</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-green-700 font-medium">{statistics.inTransitVehicles} In Transit</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statistics.wonAuctions}</p>
          <p className="text-xs text-gray-600 mt-1">Vehicles Won</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-sm border border-amber-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-amber-700">{statistics.activeBids} Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statistics.activeBids + statistics.outbidCount}</p>
          <p className="text-xs text-gray-600 mt-1">Active Auctions</p>
        </div>

        <div className="bg-gradient-to-br from-[#FA7921]/10 to-[#FF9A56]/10 rounded-xl shadow-sm border border-[#FA7921]/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#FA7921]/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-xs text-[#FA7921] font-medium">{statistics.pendingPayments} Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">¥{(statistics.avgBidAmount / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-600 mt-1">Avg Bid Amount</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {(['all', 'active', 'won', 'lost'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'all' && <span className="ml-1.5">({mockBids.length})</span>}
                {tab === 'active' && <span className="ml-1.5">({mockBids.filter(b => b.status === 'active' || b.status === 'outbid').length})</span>}
                {tab === 'won' && <span className="ml-1.5">({mockBids.filter(b => b.status === 'won').length})</span>}
                {tab === 'lost' && <span className="ml-1.5">({mockBids.filter(b => b.status === 'lost').length})</span>}
              </button>
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
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-500"
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
          <Link 
            key={bid.id} 
            href={`/dashboard/bids/${bid.id}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Vehicle Image */}
                <div className="relative w-full lg:w-48 h-32 lg:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={bid.vehicleImage}
                    alt={bid.vehicleTitle}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(bid.status)}
                  </div>
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
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {bid.vehicleSpecs.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {bid.vehicleSpecs.mileage}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          {bid.vehicleSpecs.transmission}
                        </span>
                        {bid.vehicleSpecs.engine && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            {bid.vehicleSpecs.engine}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {bid.location}
                        </span>
                        {bid.seller && (
                          <span className="flex items-center gap-1">
                            <span className="text-gray-500">Seller:</span>
                            <span className="font-medium text-gray-700">{bid.seller.name}</span>
                            {bid.seller.verified && (
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
                        <p className="text-xl font-bold text-[#FA7921]">¥{bid.yourBid.toLocaleString()}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">
                          {bid.status === 'won' ? 'Winning Bid' : 'Current Highest'}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          ¥{(bid.winningBid || bid.currentHighestBid).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {bid.numberOfBids} bids • Ends {bid.auctionEndDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons and Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                      {bid.status === 'won' && (
                      <>
                        {bid.paymentStatus === 'completed' ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Payment Completed
                          </span>
                        ) : (
                          <button className="px-4 py-2 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                            Complete Payment
                          </button>
                        )}
                        {bid.shippingStatus && (
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            {bid.shippingStatus === 'delivered' ? 'Delivered' : 
                             bid.shippingStatus === 'in_transit' ? 'In Transit' : 
                             'Pending Shipment'}
                          </span>
                        )}
                      </>
                    )}
                      {(bid.status === 'active' || bid.status === 'outbid') && (
                      <>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                          {bid.status === 'outbid' ? 'Increase Bid' : 'View Auction'}
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          Auction Details
                        </button>
                      </>
                    )}
                      {bid.status === 'lost' && (
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        View Similar Vehicles
                      </button>
                    )}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      {bid.status === 'won' && bid.paymentStatus === 'completed' && (
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/dashboard/bids/${bid.id}`;
                          }}
                          className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center gap-2" 
                          title="Track Shipment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Track Shipment
                        </button>
                      )}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/dashboard/bids/${bid.id}`;
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
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
    </div>
  )
}