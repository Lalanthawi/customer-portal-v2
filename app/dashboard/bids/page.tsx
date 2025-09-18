'use client'

import { useState } from 'react'
import { CleanStatCard } from '@/components/ui/stat-card-clean'
import { BidCard } from '@/components/ui/bid-card'
import { PremiumTabs } from '@/components/ui/premium-tabs'
import { mockAuctionBids, type AuctionBid } from '@/services/api/mock-data'
import type { BidStatistics } from './types'

// Using centralized mock data
const mockBids = mockAuctionBids

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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 py-6">
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
        <CleanStatCard
          title="Total Bids"
          value={statistics.totalBids.toString()}
          subtitle="All time"
          variant={0}
        />

        {/* Vehicles Won Card */}
        <CleanStatCard
          title="Vehicles Won"
          value={statistics.wonAuctions.toString()}
          subtitle={`${statistics.inTransitVehicles} in transit`}
          trend={{ value: 12.5, isPositive: true }}
          variant={1}
        />

        {/* Active Auctions Card */}
        <CleanStatCard
          title="Active Auctions"
          value={(statistics.activeBids + statistics.outbidCount).toString()}
          subtitle={`${statistics.activeBids} leading • ${statistics.outbidCount} outbid`}
          trend={{ value: 8, isPositive: true }}
          variant={2}
        />

        {/* Average Bid Card */}
        <CleanStatCard
          title="Avg Bid Amount"
          value={formatCurrency(statistics.avgBidAmount)}
          subtitle={statistics.pendingPayments > 0 ? `${statistics.pendingPayments} pending` : 'Per vehicle'}
          trend={{ value: 5.2, isPositive: false }}
          variant={3}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100/50 p-5 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabs using PremiumTabs component */}
          <PremiumTabs
            tabs={[
              {
                id: 'active',
                label: 'Active',
                count: mockBids.filter(b => b.status === 'active' || b.status === 'outbid').length
              },
              {
                id: 'previous',
                label: 'Previous',
                count: mockBids.filter(b => b.status === 'lost').length
              },
              {
                id: 'won',
                label: 'Won',
                count: mockBids.filter(b => b.status === 'won').length
              }
            ]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as 'active' | 'previous' | 'won')}
          />

          {/* Search and Sort */}
          <div className="flex gap-3 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921]/50 focus:bg-white transition-all duration-300 text-sm"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921]/50 focus:bg-white transition-all duration-300 text-sm text-gray-700 cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bids List */}
      <div className="space-y-6">
        {filteredBids.map((bid) => (
          <BidCard
            key={bid.id}
            title={bid.vehicleTitle}
            image={bid.vehicleImage}
            status={bid.status}
            currentBid={bid.winningBid || bid.currentHighestBid}
            yourBid={bid.yourBid}
            endTime={bid.auctionEndDate}
            mileage={bid.vehicleSpecs.mileage}
            year={bid.vehicleSpecs.year.toString()}
            transmission={bid.vehicleSpecs.transmission}
            location={bid.location}
            bidsCount={bid.numberOfBids}
            onIncreaseBid={() => {
              if (bid.status === 'outbid') {
                const increments = getSmartIncrement(bid.currentHighestBid)
                const newAmount = bid.currentHighestBid + (increments[0] || 10000)
                setNewBidAmount(newAmount.toString())
                handleChangeBid(bid)
              }
            }}
            onViewDetails={() => {
              if (bid.status === 'active') {
                window.location.href = `/dashboard/vehicle/${bid.id}`
              } else {
                window.location.href = `/dashboard/auctions/${bid.auctionId}`
              }
            }}
            onCancelBid={() => handleCancelBid(bid)}
          />
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
    </div>
  )
}