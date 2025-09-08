import React from 'react'
import { cn } from '@/lib/utils'

export type StatusType = 
  | 'active' | 'won' | 'lost' | 'pending' | 'completed' | 'processing' 
  | 'cancelled' | 'expired' | 'outbid' | 'delivered' | 'in_transit'
  | 'paid' | 'unpaid' | 'partial' | 'requested' | 'translating' | 'translated'
  | 'inspected' | 'not_available' | 'available' | 'shared'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  showPulse?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const statusConfig: Record<StatusType, {
  label: string
  color: string
  bgColor: string
  dotColor: string
  pulse?: boolean
}> = {
  active: {
    label: 'Active',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    dotColor: 'bg-blue-400',
    pulse: true
  },
  won: {
    label: 'Won',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  lost: {
    label: 'Lost',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    dotColor: 'bg-red-400'
  },
  pending: {
    label: 'Pending',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
    dotColor: 'bg-yellow-400'
  },
  completed: {
    label: 'Completed',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  processing: {
    label: 'Processing',
    color: 'text-purple-800',
    bgColor: 'bg-purple-100',
    dotColor: 'bg-purple-400',
    pulse: true
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-gray-800',
    bgColor: 'bg-gray-100',
    dotColor: 'bg-gray-400'
  },
  expired: {
    label: 'Expired',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    dotColor: 'bg-gray-400'
  },
  outbid: {
    label: 'Outbid',
    color: 'text-orange-800',
    bgColor: 'bg-orange-100',
    dotColor: 'bg-orange-400'
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  in_transit: {
    label: 'In Transit',
    color: 'text-purple-800',
    bgColor: 'bg-purple-100',
    dotColor: 'bg-purple-400',
    pulse: true
  },
  paid: {
    label: 'Paid',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  unpaid: {
    label: 'Unpaid',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    dotColor: 'bg-red-400'
  },
  partial: {
    label: 'Partial',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
    dotColor: 'bg-yellow-400'
  },
  requested: {
    label: 'Requested',
    color: 'text-amber-800',
    bgColor: 'bg-amber-100',
    dotColor: 'bg-amber-400'
  },
  translating: {
    label: 'Translating',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    dotColor: 'bg-blue-400',
    pulse: true
  },
  translated: {
    label: 'Translated',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  inspected: {
    label: 'Inspected',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  not_available: {
    label: 'Not Available',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    dotColor: 'bg-gray-400'
  },
  available: {
    label: 'Available',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    dotColor: 'bg-green-400'
  },
  shared: {
    label: 'Shared',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    dotColor: 'bg-blue-400'
  }
}

const sizeClasses = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
}

export function StatusBadge({ 
  status, 
  label, 
  showPulse, 
  size = 'sm',
  className 
}: StatusBadgeProps) {
  const config = statusConfig[status]
  if (!config) return null

  const displayLabel = label || config.label
  const shouldPulse = showPulse !== undefined ? showPulse : config.pulse

  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-medium",
      sizeClasses[size],
      config.bgColor,
      config.color,
      className
    )}>
      <span className={cn(
        "w-2 h-2 rounded-full mr-1.5",
        config.dotColor,
        shouldPulse && "animate-pulse"
      )} />
      {displayLabel}
    </span>
  )
}