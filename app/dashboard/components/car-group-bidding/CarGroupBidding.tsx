'use client'

import { memo } from 'react'
import GroupInfoCard from './GroupInfoCard'
import InlineBidForm from './InlineBidForm'
import BidStatusBadge from './BidStatusBadge'
import { useCarGroupBid } from './useCarGroupBid'

interface CarGroupBiddingProps {
  carId: string
  groupId: string
}

const CarGroupBidding = memo(function CarGroupBidding({ 
  carId, 
  groupId 
}: CarGroupBiddingProps) {
  const {
    groupInfo,
    isLoading,
    isSubmitting,
    bidStatus,
    submitBid,
    refreshGroupInfo
  } = useCarGroupBid(carId, groupId)

  if (!groupId) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Group Details</h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Manage your Group {groupId} bids
          </p>
        </div>
        {bidStatus !== 'none' && groupInfo?.userBid?.bidAmount && (
          <BidStatusBadge 
            status={bidStatus} 
            amount={groupInfo.userBid.bidAmount}
            compact 
          />
        )}
      </div>

      {/* Group Info Card */}
      {groupInfo && (
        <GroupInfoCard 
          groupInfo={groupInfo} 
          isLoading={isLoading}
        />
      )}

      {/* Status Badge */}
      {bidStatus !== 'none' && groupInfo?.userBid && (
        <BidStatusBadge 
          status={bidStatus} 
          amount={groupInfo.userBid.bidAmount}
        />
      )}

      {/* Bid Form */}
      {groupInfo && groupInfo.currentWinningBid !== undefined && (
        <InlineBidForm
          groupId={groupId}
          currentHighestBid={groupInfo.currentWinningBid}
          minBidIncrement={groupInfo.minBidIncrement}
          onSubmit={submitBid}
          isSubmitting={isSubmitting}
          userHasExistingBid={!!groupInfo.userBid}
        />
      )}

      {/* Refresh Button */}
      <button
        onClick={refreshGroupInfo}
        className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Bid Status
      </button>

      {/* Additional Information */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">About Group Bidding</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div className="text-xs text-blue-700">
                <span className="font-medium">• Shared Pool:</span> All Group {groupId} vehicles share bids
              </div>
              <div className="text-xs text-blue-700">
                <span className="font-medium">• Winner Selection:</span> Based on bid ranking
              </div>
              <div className="text-xs text-blue-700">
                <span className="font-medium">• Quantity Bidding:</span> Secure multiple vehicles
              </div>
              <div className="text-xs text-blue-700">
                <span className="font-medium">• Binding Bids:</span> Final once auction ends
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CarGroupBidding