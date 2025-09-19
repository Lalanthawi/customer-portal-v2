'use client'

import { memo } from 'react'
import { BidStatus } from './types'

interface BidStatusBadgeProps {
  status: BidStatus
  amount?: number
  compact?: boolean
}

const BidStatusBadge = memo(function BidStatusBadge({ 
  status, 
  amount, 
  compact = false 
}: BidStatusBadgeProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const getStatusConfig = () => {
    switch (status) {
      case 'winning':
        return {
          bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
          textColor: 'text-white',
          borderColor: 'border-green-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Winning Bid',
          pulse: true
        }
      case 'outbid':
        return {
          bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
          textColor: 'text-white',
          borderColor: 'border-red-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Outbid',
          pulse: true
        }
      case 'pending':
        return {
          bgColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
          textColor: 'text-white',
          borderColor: 'border-amber-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Pending',
          pulse: false
        }
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          icon: null,
          label: 'No Bid',
          pulse: false
        }
    }
  }

  const config = getStatusConfig()

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor} border ${config.borderColor} ${config.pulse ? 'animate-pulse' : ''}`}>
        {config.icon}
        <span>{config.label}</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${config.bgColor} ${config.textColor} border ${config.borderColor} ${config.pulse ? 'animate-pulse' : ''}`}>
      <div className="flex items-center gap-2">
        {config.icon}
        <div>
          <p className="text-sm font-semibold">{config.label}</p>
          {amount && (
            <p className="text-xs opacity-90">Your bid: {formatCurrency(amount)}</p>
          )}
        </div>
      </div>
      {status === 'outbid' && (
        <button className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors">
          Update Bid
        </button>
      )}
    </div>
  )
})

export default BidStatusBadge