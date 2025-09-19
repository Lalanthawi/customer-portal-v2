"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"

interface BidCardProps {
  title: string
  image: string
  status: 'active' | 'outbid' | 'won' | 'lost'
  currentBid: number
  yourBid: number
  endTime: Date
  mileage: string
  year: string
  transmission: string
  location: string
  bidsCount: number
  onIncreaseBid?: () => void
  onViewDetails?: () => void
  onCancelBid?: () => void
  className?: string
}

export function BidCard({
  title,
  image,
  status,
  currentBid,
  yourBid,
  endTime,
  mileage,
  year,
  transmission,
  location,
  bidsCount,
  onIncreaseBid,
  onViewDetails,
  onCancelBid,
  className
}: BidCardProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getTimeRemaining = (date: Date): string => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ${hours % 24}h`
    if (hours > 0) return `${hours}h ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}m`
    return 'Ending soon'
  }

  const statusColors = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    outbid: 'bg-amber-50 text-amber-700 border-amber-200',
    won: 'bg-blue-50 text-blue-700 border-blue-200',
    lost: 'bg-gray-50 text-gray-600 border-gray-200'
  }

  const statusLabels = {
    active: 'Leading',
    outbid: 'Outbid',
    won: 'Won',
    lost: 'Lost'
  }

  return (
    <div className={cn(
      "group relative bg-white rounded-2xl overflow-hidden",
      "border border-gray-100/80 hover:border-gray-200",
      "shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.03)]",
      "hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.04)]",
      "transition-all duration-500 hover:-translate-y-0.5",
      className
    )}>
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-80 h-52 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1 mb-1">
                    {title}
                  </h3>
                  {/* Time Remaining */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Ends in <span className="font-semibold text-gray-900">{getTimeRemaining(endTime)}</span></span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {/* Status Badge */}
                  <span className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border",
                    statusColors[status]
                  )}>
                    {status === 'active' && (
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                    )}
                    {statusLabels[status]}
                  </span>
                </div>
              </div>

              {/* Vehicle specs */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {year}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {mileage}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  {transmission}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </span>
              </div>
            </div>

            {/* Bid Information */}
            <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex gap-8">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Your Bid</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-[#FA7921] to-[#FF9A56] bg-clip-text text-transparent">
                    {formatCurrency(yourBid)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Current Highest</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(currentBid)}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{bidsCount}</span> total bids
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
              {status === 'active' && (
                <>
                  <Button
                    onClick={onViewDetails}
                    variant="primary"
                    size="default"
                  >
                    View Live Auction
                  </Button>
                  <Button
                    onClick={onCancelBid}
                    variant="outline"
                    size="default"
                  >
                    Cancel Bid
                  </Button>
                </>
              )}

              {status === 'outbid' && (
                <>
                  <Button
                    onClick={onIncreaseBid}
                    variant="destructive"
                    size="default"
                    className="animate-pulse bg-amber-500 hover:bg-amber-600"
                  >
                    Increase Bid Now
                  </Button>
                  <Button
                    onClick={onViewDetails}
                    variant="secondary"
                    size="default"
                  >
                    View Details
                  </Button>
                </>
              )}

              {status === 'won' && (
                <Button
                  onClick={onViewDetails}
                  variant="success"
                  size="default"
                >
                  View Won Vehicle
                </Button>
              )}

              {status === 'lost' && (
                <Button
                  onClick={onViewDetails}
                  variant="secondary"
                  size="default"
                >
                  View Auction History
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}