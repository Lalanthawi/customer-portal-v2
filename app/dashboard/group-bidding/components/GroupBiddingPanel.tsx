'use client'

import { memo } from 'react'
import GroupSelector from './GroupSelector'
import BidForm from './BidForm'
import BidSummary from './BidSummary'
import { useGroupBids } from '../hooks/useGroupBids'

const GroupBiddingPanel = memo(function GroupBiddingPanel() {
  const {
    groups,
    bids,
    selectedGroup,
    isConnected,
    isSubmitting,
    selectGroup,
    submitBid,
    cancelBid,
    updateBid
  } = useGroupBids()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Group Bidding</h1>
              <p className="text-sm text-gray-600 mt-1">
                Select a group and place your bid for vehicle auctions
              </p>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Group Selector */}
          <div className="lg:col-span-2 space-y-6">
            <GroupSelector
              groups={groups}
              selectedGroup={selectedGroup}
              onGroupSelect={selectGroup}
              disabled={isSubmitting}
            />
            
            {/* Active Bids Summary */}
            <BidSummary
              bids={bids}
              onCancelBid={cancelBid}
              onUpdateBid={updateBid}
            />
          </div>
          
          {/* Right Column - Bid Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BidForm
                selectedGroup={selectedGroup}
                onSubmit={submitBid}
                isSubmitting={isSubmitting}
              />
              
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Groups</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {Array.from(groups.values()).filter(g => g.status !== 'available').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Bids</span>
                    <span className="text-sm font-semibold text-gray-900">{bids.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Winning Bids</span>
                    <span className="text-sm font-semibold text-green-600">
                      {bids.filter(b => b.status === 'winning').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Outbid</span>
                    <span className="text-sm font-semibold text-red-600">
                      {bids.filter(b => b.status === 'outbid').length}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Help Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">How it works</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Select a group (A-Z) from the grid</li>
                      <li>• Enter your bid amount and quantity</li>
                      <li>• Monitor your bid status in real-time</li>
                      <li>• Update outbid amounts to stay competitive</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GroupBiddingPanel