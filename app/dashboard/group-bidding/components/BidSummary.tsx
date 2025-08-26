'use client'

import { memo, useMemo } from 'react'
import { VehicleBid as GroupBid, BidStatus } from '../types'

interface BidSummaryProps {
  bids: GroupBid[]
  onCancelBid?: (bidId: string) => void
  onUpdateBid?: (bidId: string) => void
}

const BidSummary = memo(function BidSummary({
  bids,
  onCancelBid,
  onUpdateBid
}: BidSummaryProps) {
  const sortedBids = useMemo(() => {
    return [...bids].sort((a, b) => b.placedAt.getTime() - a.placedAt.getTime())
  }, [bids])

  const totalInvestment = useMemo(() => {
    return bids.reduce((sum, bid) => sum + bid.bidAmount, 0)
  }, [bids])

  const winningBids = useMemo(() => {
    return bids.filter(bid => bid.status === 'winning').length
  }, [bids])

  const outbidCount = useMemo(() => {
    return bids.filter(bid => bid.status === 'outbid').length
  }, [bids])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatTime = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  const getStatusBadge = (status: BidStatus) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      winning: 'bg-green-100 text-green-700 border-green-200',
      outbid: 'bg-red-100 text-red-700 border-red-200 animate-pulse',
      won: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500',
      lost: 'bg-gray-100 text-gray-500 border-gray-200',
      'partial-win': 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
    
    const labels = {
      pending: 'Pending',
      winning: 'Winning',
      outbid: 'Outbid',
      won: 'Won',
      lost: 'Lost',
      'partial-win': 'Partial Win'
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  if (bids.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Bids</h3>
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500">No active bids yet</p>
          <p className="text-sm text-gray-400 mt-1">Select a group and place your first bid</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Bids</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Total:</span>
              <span className="font-bold text-gray-900">{formatCurrency(totalInvestment)}</span>
            </div>
          </div>
        </div>
        
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{bids.length}</p>
            <p className="text-xs text-gray-600">Total Bids</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{winningBids}</p>
            <p className="text-xs text-gray-600">Winning</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{outbidCount}</p>
            <p className="text-xs text-gray-600">Outbid</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bid Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedBids.map((bid) => (
              <tr key={bid.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#FA7921]/10 text-[#FA7921] rounded-lg font-bold">
                    {bid.groupId}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(bid.bidAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  1
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(bid.bidAmount)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(bid.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTime(bid.placedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  {bid.status === 'outbid' && onUpdateBid && (
                    <button
                      onClick={() => onUpdateBid(bid.id)}
                      className="text-[#FA7921] hover:text-[#FA7921]/80 font-medium mr-3"
                    >
                      Update
                    </button>
                  )}
                  {(bid.status === 'pending' || bid.status === 'winning') && onCancelBid && (
                    <button
                      onClick={() => onCancelBid(bid.id)}
                      className="text-red-600 hover:text-red-500 font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default BidSummary