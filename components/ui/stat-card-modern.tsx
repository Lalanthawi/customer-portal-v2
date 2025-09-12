'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useCountUp } from '@/hooks/use-count-up'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  status?: {
    label: string
    type: 'active' | 'error' | 'warning' | 'success'
  }
  trend?: {
    value: number
    label?: string
    isPositive: boolean
    customColor?: string
    sparkline?: number[]
  }
  variant?: 'orange' | 'purple' | 'blue' | 'green' | 'red' | 'gray'
  valueClassName?: string
  className?: string
  children?: React.ReactNode
  animate?: boolean
  href?: string
  loading?: boolean
  // Count-up animation props
  countUpOptions?: {
    start?: number
    duration?: number
    delay?: number
    prefix?: string
    suffix?: string
    decimals?: number
    separator?: string
    enableScrollSpy?: boolean
    scrollSpyDelay?: number
    formatAsCurrency?: boolean
  }
  onClick?: () => void
}

const variantStyles = {
  orange: {
    gradient: 'from-orange-500/10 via-amber-500/5 to-yellow-500/10',
    border: 'border-orange-200/50',
    shadow: 'hover:shadow-orange-200/25',
    icon: 'text-[#FA7921]',
    iconBg: 'bg-gradient-to-br from-orange-100 to-amber-50',
    glow: 'group-hover:shadow-orange-400/20',
    accent: '#FA7921'
  },
  purple: {
    gradient: 'from-purple-500/10 via-indigo-500/5 to-blue-500/10',
    border: 'border-purple-200/50',
    shadow: 'hover:shadow-purple-200/25',
    icon: 'text-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-100 to-indigo-50',
    glow: 'group-hover:shadow-purple-400/20',
    accent: '#9333ea'
  },
  blue: {
    gradient: 'from-blue-500/10 via-cyan-500/5 to-sky-500/10',
    border: 'border-blue-200/50',
    shadow: 'hover:shadow-blue-200/25',
    icon: 'text-blue-600',
    iconBg: 'bg-gradient-to-br from-blue-100 to-cyan-50',
    glow: 'group-hover:shadow-blue-400/20',
    accent: '#3b82f6'
  },
  green: {
    gradient: 'from-green-500/10 via-emerald-500/5 to-teal-500/10',
    border: 'border-green-200/50',
    shadow: 'hover:shadow-green-200/25',
    icon: 'text-green-600',
    iconBg: 'bg-gradient-to-br from-green-100 to-emerald-50',
    glow: 'group-hover:shadow-green-400/20',
    accent: '#10b981'
  },
  red: {
    gradient: 'from-red-500/10 via-rose-500/5 to-pink-500/10',
    border: 'border-red-200/50',
    shadow: 'hover:shadow-red-200/25',
    icon: 'text-red-600',
    iconBg: 'bg-gradient-to-br from-red-100 to-pink-50',
    glow: 'group-hover:shadow-red-400/20',
    accent: '#ef4444'
  },
  gray: {
    gradient: 'from-gray-500/10 via-slate-500/5 to-zinc-500/10',
    border: 'border-gray-200/50',
    shadow: 'hover:shadow-gray-200/25',
    icon: 'text-gray-600',
    iconBg: 'bg-gradient-to-br from-gray-100 to-slate-50',
    glow: 'group-hover:shadow-gray-400/20',
    accent: '#6b7280'
  }
}

const statusStyles = {
  active: {
    bg: 'bg-gradient-to-r from-green-400/20 to-emerald-400/20',
    text: 'text-green-700',
    dot: 'bg-green-500'
  },
  error: {
    bg: 'bg-gradient-to-r from-red-400/20 to-rose-400/20',
    text: 'text-red-700',
    dot: 'bg-red-500'
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-400/20 to-yellow-400/20',
    text: 'text-amber-700',
    dot: 'bg-amber-500'
  },
  success: {
    bg: 'bg-gradient-to-r from-emerald-400/20 to-teal-400/20',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500'
  }
}

// Mini sparkline component
function Sparkline({ data, color }: { data: number[], color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        fill={`url(#gradient-${color})`}
        stroke="none"
        points={`0,100 ${points} 100,100`}
      />
    </svg>
  )
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  status,
  trend,
  variant = 'gray',
  valueClassName,
  className,
  children,
  animate = true,
  href,
  loading = false,
  countUpOptions,
  onClick
}: StatCardProps) {
  const styles = variantStyles[variant] || variantStyles.gray
  const statusStyle = status ? statusStyles[status.type] : null
  const cardRef = useRef<HTMLDivElement>(null)
  const [, setIsHovered] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({})
  
  // Parse numeric value for animation
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
    : value
  
  // Determine if we should format as currency (can be overridden by countUpOptions)
  const shouldFormatAsCurrency = countUpOptions?.formatAsCurrency ?? 
    (typeof value === 'number' && numericValue >= 1000000)
  
  // Extract prefix and suffix from string value if present
  const extractedPrefix = typeof value === 'string' ? 
    (value.match(/^[^0-9.-]+/) || [''])[0] : ''
  const extractedSuffix = typeof value === 'string' ? 
    (value.match(/[^0-9.-]+$/) || [''])[0] : ''
  
  // Prepare count-up configuration with smart defaults
  const countUpConfig = {
    end: shouldFormatAsCurrency && numericValue >= 1000000 ? 
      numericValue / 1000000 : numericValue,
    start: countUpOptions?.start ?? 0,
    duration: animate ? (countUpOptions?.duration ?? 2000) : 0,
    delay: countUpOptions?.delay ?? 200,
    prefix: countUpOptions?.prefix ?? 
      (shouldFormatAsCurrency ? '¥' : extractedPrefix),
    suffix: countUpOptions?.suffix ?? 
      (shouldFormatAsCurrency ? 'M' : extractedSuffix),
    decimals: countUpOptions?.decimals ?? 
      (shouldFormatAsCurrency ? 2 : 0),
    enableScrollSpy: countUpOptions?.enableScrollSpy ?? false,
    scrollSpyDelay: countUpOptions?.scrollSpyDelay ?? 0
  }
  
  const { displayValue, hasAnimated } = useCountUp(countUpConfig)

  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.3s ease-out'
    })
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className={cn(
        "relative bg-white rounded-2xl overflow-hidden",
        "border h-full min-h-[280px] flex flex-col",
        styles?.border || 'border-gray-200/50',
        className
      )}>
        <div className="p-6 flex flex-col h-full animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gray-200" />
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-16" />
              </div>
            </div>
          </div>
          <div className="mb-3 flex-grow">
            <div className="h-8 bg-gray-200 rounded w-32 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-20" />
          </div>
          {trend && (
            <div className="space-y-2">
              <div className="h-8 bg-gray-100 rounded" />
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-100 rounded w-24" />
              </div>
            </div>
          )}
          {children && (
            <div className="mt-6 pt-4 border-t border-gray-50">
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const CardContent = (
    <div
      ref={cardRef}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden transition-all duration-300",
        "hover:shadow-2xl hover:-translate-y-1 cursor-pointer",
        "border backdrop-blur-sm h-full min-h-[280px] flex flex-col",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100",
        styles?.border || 'border-gray-200/50',
        styles?.shadow || 'hover:shadow-gray-200/25',
        className
      )}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-count-up
    >
      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-all duration-500",
        styles?.gradient || 'from-gray-500/10 via-slate-500/5 to-zinc-500/10'
      )} />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Animated gradient border */}
      <div className={cn(
        "absolute inset-[0] rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
        `from-${variant}-400/20 via-${variant}-500/20 to-${variant}-600/20`
      )} />
      
      {/* Content */}
      <div className="relative p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={cn(
                "p-3 rounded-xl backdrop-blur-md transition-all duration-300",
                "group-hover:scale-110 group-hover:rotate-3",
                styles?.iconBg || 'bg-gradient-to-br from-gray-100 to-slate-50',
                styles?.glow || 'group-hover:shadow-gray-400/20',
                "shadow-lg"
              )}>
                <Icon className={cn("h-5 w-5 transition-transform", styles?.icon || 'text-gray-600')} />
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              {status && (
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-1.5",
                  "backdrop-blur-md",
                  statusStyle?.bg,
                  statusStyle?.text
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", statusStyle?.dot)} />
                  {status.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Value with animation */}
        <div className="mb-3 flex-grow">
          <div className={cn(
            "text-3xl font-bold text-gray-900 transition-all duration-300",
            "group-hover:scale-105 origin-left",
            valueClassName
          )}>
            <span className="animate-count-up" data-animated={hasAnimated}>
              {animate && (typeof value === 'number' || 
                (typeof value === 'string' && /\d/.test(value))) ? 
                displayValue : value}
            </span>
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Trend with sparkline */}
        {trend && (
          <div className="space-y-2">
            {trend.sparkline && (
              <div className="h-8 opacity-60 group-hover:opacity-100 transition-opacity">
                <Sparkline data={trend.sparkline} color={styles.accent} />
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span 
                className={cn(
                  "inline-flex items-center font-medium transition-all",
                  "group-hover:scale-105",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
                style={trend.customColor ? { color: trend.customColor } : undefined}
              >
                <svg 
                  className={cn(
                    "w-4 h-4 mr-1 transition-transform",
                    trend.isPositive ? "animate-bounce-subtle" : "rotate-180 animate-bounce-subtle"
                  )}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                  />
                </svg>
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-gray-500">{trend.label}</span>
              )}
            </div>
          </div>
        )}

        {/* Additional Content */}
        <div className="mt-auto">
          {children}
        </div>

        {/* Live indicator */}
        {status?.type === 'active' && (
          <div className="absolute top-4 right-4">
            <span className="relative flex h-3 w-3">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                `bg-${variant}-400`
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                `bg-${variant}-500`
              )} />
            </span>
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block h-full">
        {CardContent}
      </a>
    )
  }

  return CardContent
}