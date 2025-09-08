import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Fuel, Users, Gauge } from 'lucide-react'

interface VehicleCardProps {
  id: string
  title: string
  image: string
  price: number | string
  specs?: {
    year?: number
    mileage?: string | number
    transmission?: string
    fuel?: string
    location?: string
    seats?: number
    engine?: string
  }
  status?: React.ReactNode
  badges?: React.ReactNode[]
  auction?: {
    timeLeft?: string
    bids?: number
  }
  actions?: {
    primary?: {
      label: string
      onClick?: () => void
      href?: string
    }
    secondary?: {
      label: string
      onClick?: () => void
      href?: string
    }
  }
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children?: React.ReactNode
}

export function VehicleCard({
  title,
  image,
  price,
  specs = {},
  status,
  badges = [],
  auction,
  actions,
  orientation = 'horizontal',
  className,
  children
}: VehicleCardProps) {
  const formatPrice = (value: number | string) => {
    if (typeof value === 'string') return value
    return `¥${value.toLocaleString()}`
  }

  const CardWrapper = orientation === 'horizontal' ? 'div' : 'div'

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300",
      className
    )}>
      <CardWrapper className={cn(
        orientation === 'horizontal' 
          ? "flex flex-col sm:flex-row"
          : "flex flex-col"
      )}>
        {/* Image Section */}
        <div className={cn(
          "relative",
          orientation === 'horizontal' 
            ? "w-full sm:w-64 h-48"
            : "w-full h-56"
        )}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {badges}
            </div>
          )}
          {auction?.timeLeft && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {auction.timeLeft}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 hover:text-[#FA7921] transition-colors">
                {title}
              </h3>
              {status && <div className="mt-1">{status}</div>}
            </div>
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-[#FA7921]">
                {formatPrice(price)}
              </p>
              {auction?.bids !== undefined && (
                <p className="text-xs text-gray-500">{auction.bids} bids</p>
              )}
            </div>
          </div>

          {/* Specs Grid */}
          {Object.keys(specs).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {specs.year && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{specs.year}</span>
                </div>
              )}
              {specs.mileage && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Gauge className="h-4 w-4" />
                  <span>{specs.mileage} km</span>
                </div>
              )}
              {specs.fuel && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Fuel className="h-4 w-4" />
                  <span>{specs.fuel}</span>
                </div>
              )}
              {specs.location && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{specs.location}</span>
                </div>
              )}
              {specs.seats && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{specs.seats} seats</span>
                </div>
              )}
            </div>
          )}

          {children}

          {/* Actions */}
          {actions && (
            <div className="flex gap-2 mt-4">
              {actions.secondary && (
                actions.secondary.href ? (
                  <Link href={actions.secondary.href} className="flex-1">
                    <Button variant="outline" className="w-full">
                      {actions.secondary.label}
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={actions.secondary.onClick}
                    className="flex-1"
                  >
                    {actions.secondary.label}
                  </Button>
                )
              )}
              {actions.primary && (
                actions.primary.href ? (
                  <Link href={actions.primary.href} className="flex-1">
                    <Button className="w-full bg-[#FA7921] hover:bg-[#FA7921]/90">
                      {actions.primary.label}
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={actions.primary.onClick}
                    className="flex-1 bg-[#FA7921] hover:bg-[#FA7921]/90"
                  >
                    {actions.primary.label}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </CardWrapper>
    </div>
  )
}