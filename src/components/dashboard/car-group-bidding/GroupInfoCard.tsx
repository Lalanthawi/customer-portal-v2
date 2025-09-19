'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GroupInfo } from './types'

interface GroupInfoCardProps {
  groupInfo: GroupInfo
  isLoading?: boolean
}

const GroupInfoCard = memo(function GroupInfoCard({ 
  groupInfo, 
  isLoading = false 
}: GroupInfoCardProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatTimeRemaining = (endTime: Date): string => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    
    if (diff <= 0) return 'Ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">{groupInfo.totalVehicles} vehicles in pool</p>
            </div>
          </div>
          <Link 
            href={`/dashboard/group-bidding?group=${groupInfo.groupId}`}
            className="text-xs font-medium text-[#FA7921] hover:text-[#FA7921]/80 transition-colors"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-2.5">
            <p className="text-xs text-gray-600">Group Leader</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">
              {groupInfo.currentWinningBid 
                ? formatCurrency(groupInfo.currentWinningBid)
                : 'No bids'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-2.5">
            <p className="text-xs text-gray-600">Active Bidders</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{groupInfo.totalBidders}</p>
          </div>
        </div>

        {/* Time remaining */}
        <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-amber-900">
              {formatTimeRemaining(groupInfo.endTime)}
            </span>
          </div>
          <span className="text-xs text-amber-700">
            Min increment: {formatCurrency(groupInfo.minBidIncrement)}
          </span>
        </div>

        {/* Sample vehicles */}
        {groupInfo.sampleVehicles.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Other vehicles in this group:</p>
            <div className="grid grid-cols-3 gap-2">
              {groupInfo.sampleVehicles.slice(0, 3).map((vehicle) => (
                <Link
                  key={vehicle.id}
                  href={`/dashboard/vehicle/${vehicle.id}`}
                  className="group relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#FA7921] transition-all"
                >
                  <Image
                    src={vehicle.image}
                    alt={vehicle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-xs text-white font-medium truncate">{vehicle.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            {groupInfo.totalVehicles > 3 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                +{groupInfo.totalVehicles - 3} more vehicles
              </p>
            )}
          </div>
        )}

        {/* User's bid info */}
        {groupInfo.userBid && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">Your current bid</p>
                <p className="text-lg font-bold text-blue-900">
                  {formatCurrency(groupInfo.userBid.bidAmount)} × {groupInfo.userBid.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600">Total</p>
                <p className="text-lg font-bold text-blue-900">
                  {formatCurrency(groupInfo.userBid.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default GroupInfoCard