'use client'

import { useState, memo } from 'react'
import { InlineBidData } from './types'

interface InlineBidFormProps {
  groupId: string
  currentHighestBid?: number
  minBidIncrement: number
  onSubmit: (data: InlineBidData) => Promise<void>
  isSubmitting?: boolean
  userHasExistingBid?: boolean
}

const InlineBidForm = memo(function InlineBidForm({
  groupId: _groupId,
  currentHighestBid = 0,
  minBidIncrement = 10000,
  onSubmit,
  isSubmitting = false,
  userHasExistingBid = false
}: InlineBidFormProps) {
  const [bidData, setBidData] = useState<InlineBidData>({
    amount: currentHighestBid + minBidIncrement,
    quantity: 1
  })
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleQuickBid = (multiplier: number) => {
    setBidData(prev => ({
      ...prev,
      amount: currentHighestBid + (minBidIncrement * multiplier)
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (bidData.amount <= currentHighestBid) {
      setError(`Bid must be higher than current winning bid of ${formatCurrency(currentHighestBid)}`)
      return
    }

    if ((bidData.amount - currentHighestBid) < minBidIncrement) {
      setError(`Minimum bid increment is ${formatCurrency(minBidIncrement)}`)
      return
    }

    try {
      await onSubmit(bidData)
    } catch {
      setError('Failed to place bid. Please try again.')
    }
  }

  const totalAmount = bidData.amount * bidData.quantity

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">
          {userHasExistingBid ? 'Update Group Bid' : 'Advanced Bidding'}
        </h4>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
          Leader: {formatCurrency(currentHighestBid)}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick bid buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickBid(1)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors font-medium"
          >
            +{formatCurrency(minBidIncrement)}
          </button>
          <button
            type="button"
            onClick={() => handleQuickBid(2)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors font-medium"
          >
            +{formatCurrency(minBidIncrement * 2)}
          </button>
          <button
            type="button"
            onClick={() => handleQuickBid(5)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors font-medium"
          >
            +{formatCurrency(minBidIncrement * 5)}
          </button>
        </div>

        {/* Amount and Quantity inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Bid Amount (¥)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">¥</span>
              <input
                type="number"
                value={bidData.amount}
                onChange={(e) => {
                  setBidData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))
                  setError(null)
                }}
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-sm placeholder:text-gray-400"
                placeholder="Enter bid"
                min={currentHighestBid + minBidIncrement}
                step={minBidIncrement}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBidData(prev => ({ 
                  ...prev, 
                  quantity: Math.max(1, prev.quantity - 1) 
                }))}
                className="w-8 h-8 rounded-lg border border-gray-200 hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors flex items-center justify-center"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <input
                type="number"
                value={bidData.quantity}
                onChange={(e) => setBidData(prev => ({ 
                  ...prev, 
                  quantity: Math.max(1, parseInt(e.target.value) || 1) 
                }))}
                className="w-16 px-2 py-1.5 text-center border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-sm font-medium placeholder:text-gray-400"
                placeholder="1"
                min={1}
                max={10}
              />
              
              <button
                type="button"
                onClick={() => setBidData(prev => ({ 
                  ...prev, 
                  quantity: Math.min(10, prev.quantity + 1) 
                }))}
                className="w-8 h-8 rounded-lg border border-gray-200 hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors flex items-center justify-center"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Total display */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#FA7921]/10 to-[#FF9A56]/10 rounded-lg border border-[#FA7921]/20">
          <span className="text-sm font-medium text-gray-700">Total Amount</span>
          <span className="text-xl font-bold text-[#FA7921]">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            isSubmitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Placing Bid...
            </span>
          ) : (
            userHasExistingBid ? 'Update Bid' : 'Place Bid'
          )}
        </button>
      </form>
    </div>
  )
})

export default InlineBidForm