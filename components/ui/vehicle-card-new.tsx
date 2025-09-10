'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, MapPin } from 'lucide-react'

export interface VehicleCardData {
  id: number | string
  lotNumber?: string
  make: string
  model: string
  modelCode?: string
  year: number
  price: number
  currentBid?: number
  startingPrice?: number
  yourBid?: number
  mileage: number | string
  transmission: string
  grade?: string
  engineSize?: string
  imageUrl: string
  auctionEndTime?: Date
  bids?: number
  bidsCount?: number
  verified?: boolean
  location?: string
  auctionHouse?: string
  title?: string
}

interface VehicleCardProps {
  vehicle: VehicleCardData
  viewMode?: 'grid' | 'list'
  onPlaceBid?: () => void
  showBidButton?: boolean
}

// Countdown Timer Hook
function useCountdown(targetDate?: Date) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!targetDate) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      // Bidding closes 1 hour before the actual auction time
      const biddingDeadline = targetDate.getTime() - (60 * 60 * 1000)
      const distance = biddingDeadline - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export function VehicleCard({ 
  vehicle, 
  viewMode = 'grid',
  onPlaceBid,
  showBidButton = true
}: VehicleCardProps) {
  const timeLeft = useCountdown(vehicle.auctionEndTime)
  
  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`
  }

  const vehicleTitle = vehicle.title || `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const mileageDisplay = typeof vehicle.mileage === 'string' 
    ? vehicle.mileage 
    : `${vehicle.mileage.toLocaleString()} km`

  if (viewMode === 'list') {
    // List view for search results
    return (
      <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-80 h-56 lg:h-auto">
            <Image
              src={vehicle.imageUrl}
              alt={vehicleTitle}
              fill
              className="object-cover"
            />
            {vehicle.verified && (
              <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                VERIFIED
              </Badge>
            )}
            {vehicle.lotNumber && (
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/70 text-white text-sm font-medium rounded">
                LOT #{vehicle.lotNumber}
              </div>
            )}
          </div>

          <div className="flex-1 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicleTitle}</h3>
                {vehicle.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{vehicle.location}</span>
                  </div>
                )}
              </div>
              {vehicle.auctionEndTime && (
                <div className="text-right">
                  <div className="flex items-center gap-1 text-red-600 font-semibold text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                  </div>
                  {vehicle.bids !== undefined && (
                    <p className="text-xs text-gray-500 mt-1">{vehicle.bids} bids</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Reg Year</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Mileage</p>
                <p className="text-sm font-semibold text-gray-900">{mileageDisplay}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Engine</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.engineSize || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Transmission</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.transmission}</p>
              </div>
              {vehicle.modelCode && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Model Code</p>
                  <p className="text-sm font-semibold text-gray-900">{vehicle.modelCode}</p>
                </div>
              )}
              {vehicle.grade && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Grade</p>
                  <p className="text-sm font-semibold text-gray-900">{vehicle.grade}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                {vehicle.startingPrice && (
                  <p className="text-xs text-gray-500 line-through">{formatPrice(vehicle.startingPrice)}</p>
                )}
                <p className="text-2xl font-bold text-[#FA7921]">{formatPrice(vehicle.currentBid || vehicle.price)}</p>
              </div>
              <Link
                href={`/dashboard/vehicle/${vehicle.id}`}
                className="px-6 py-2.5 bg-[#FA7921] hover:bg-[#FA7921]/90 text-white font-semibold rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Grid view - Original dashboard design
  return (
    <Card className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group h-full flex flex-col">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={vehicle.imageUrl}
          alt={vehicleTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {(vehicle.auctionHouse || vehicle.location) && (
          <Badge className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {vehicle.auctionHouse || vehicle.location}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CardTitle className="font-semibold text-lg text-gray-900">{vehicleTitle}</CardTitle>
          {vehicle.lotNumber && (
            <span className="text-xs text-gray-500 font-medium flex-shrink-0">Lot #{vehicle.lotNumber}</span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {mileageDisplay}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {vehicle.transmission}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 mt-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting Price</p>
            <p className="text-sm font-semibold text-gray-900">{formatPrice(vehicle.startingPrice || vehicle.price)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">
              {vehicle.yourBid !== undefined ? 'Your Bid' : 'Current Bid'}
            </p>
            <p className="text-sm font-semibold text-green-600">
              {vehicle.yourBid !== undefined 
                ? (vehicle.yourBid ? formatPrice(vehicle.yourBid) : 'No bid yet')
                : formatPrice(vehicle.currentBid || vehicle.price)}
            </p>
          </div>
        </div>

        {vehicle.auctionEndTime && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-xs text-gray-700 mb-2 font-medium leading-tight">Bidding Closes In</p>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-red-600">{String(timeLeft.days).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Days</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{String(timeLeft.hours).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Hours</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{String(timeLeft.minutes).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Min</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{String(timeLeft.seconds).padStart(2, '0')}</p>
                <p className="text-xs text-gray-500">Sec</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional specs for search results */}
        {(vehicle.modelCode || vehicle.grade || vehicle.engineSize) && (
          <div className="space-y-1.5 text-sm border-t pt-3 mb-3">
            {vehicle.modelCode && (
              <div className="flex justify-between">
                <span className="text-gray-500">Model Code:</span>
                <span className="font-medium">{vehicle.modelCode}</span>
              </div>
            )}
            {vehicle.grade && (
              <div className="flex justify-between">
                <span className="text-gray-500">Grade:</span>
                <span className="font-medium">{vehicle.grade}</span>
              </div>
            )}
            {vehicle.engineSize && (
              <div className="flex justify-between">
                <span className="text-gray-500">Engine:</span>
                <span className="font-medium">{vehicle.engineSize}</span>
              </div>
            )}
          </div>
        )}

        {showBidButton ? (
          <Button 
            onClick={onPlaceBid || (() => window.location.href = `/dashboard/vehicle/${vehicle.id}`)}
            className="w-full bg-[#FA7921] text-white py-2.5 rounded-lg font-medium hover:bg-[#FA7921]/90 transition-colors mt-auto"
          >
            Place Bid
          </Button>
        ) : (
          <Link
            href={`/dashboard/vehicle/${vehicle.id}`}
            className="block w-full text-center px-4 py-2.5 bg-[#FA7921] hover:bg-[#FA7921]/90 text-white font-semibold rounded-lg transition-colors mt-auto"
          >
            View Details
          </Link>
        )}
      </CardContent>
    </Card>
  )
}