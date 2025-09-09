import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string | React.ReactNode
  icon?: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'orange' | 'purple' | 'amber' | 'green' | 'red' | 'blue' | 'yellow'
  badge?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'error' | 'info'
  }
  status?: {
    label: string
    type?: 'active' | 'warning' | 'error'
  }
  trend?: {
    value: number
    label: string
    isPositive: boolean
    customColor?: string
  }
  action?: {
    label: string
    onClick: () => void
  }
  progress?: {
    value: number
    max?: number
    label?: string
    showPercentage?: boolean
  }
  className?: string
  valueClassName?: string
  children?: React.ReactNode
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
  badge,
  status,
  trend,
  action,
  progress,
  className,
  valueClassName,
  children
}: StatCardProps) {
  const percentage = progress ? Math.round((progress.value / (progress.max || 100)) * 100) : 0

  const getVariantColor = () => {
    switch(variant) {
      case 'primary':
      case 'orange':
        return '#FA7921'
      case 'success':
      case 'green':
        return '#34C759'
      case 'warning':
      case 'amber':
      case 'yellow':
        return '#6B5010'
      case 'danger':
      case 'red':
        return '#FF3B30'
      case 'info':
      case 'blue':
        return '#007AFF'
      case 'purple':
        return '#AF52DE'
      default:
        return '#8E8E93'
    }
  }

  const color = getVariantColor()

  return (
    <Card className={cn(
      'group relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1',
      className
    )}>
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl"></div>
      <div 
        className="absolute inset-0 bg-gradient-to-tr via-transparent"
        style={{
          background: `linear-gradient(to top right, ${color}08, transparent, ${color}08)`
        }}
      ></div>
      
      {/* Border gradient */}
      <div 
        className="absolute inset-0 rounded-2xl p-[1px]"
        style={{
          background: `linear-gradient(to bottom right, ${color}33, rgba(229, 231, 235, 0.3), ${color}33)`
        }}
      >
        <div className="h-full w-full rounded-2xl bg-white/50 backdrop-blur-xl"></div>
      </div>
      
      {/* Animated glow effect */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-all duration-700"
        style={{
          backgroundColor: `${color}33`,
        }}
      ></div>
      
      <CardContent className="relative z-10 flex flex-col h-full p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {icon && (
            <div 
              className="p-2.5 rounded-xl backdrop-blur-sm border"
              style={{
                backgroundColor: `${color}14`,
                borderColor: `${color}1A`,
                color: color
              }}
            >
              {icon}
            </div>
          )}
          {badge && (
            <span 
              className="px-2 py-1 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1 border"
              style={{
                backgroundColor: trend?.isPositive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                borderColor: trend?.isPositive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: trend?.isPositive ? '#16a34a' : '#dc2626'
              }}
            >
              {trend && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
              {badge.label}
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">{title}</p>
          <p className={cn(
            "text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent",
            valueClassName
          )}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-1.5 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">
                {progress.label || 'Progress'}
              </span>
              <span className="text-xs text-gray-900 font-semibold">
                {progress.showPercentage ? `${percentage}%` : `${progress.value} of ${progress.max || 100}`}
              </span>
            </div>
            <div className="relative h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: color
                }}
              />
            </div>
          </div>
        )}
        
        {/* Footer */}
        {(status || action) && (
          <div className="mt-auto pt-3 border-t border-gray-200/30">
            <div className="flex items-center justify-between">
              {status && (
                <span className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                  <span 
                    className={cn(
                      "w-2 h-2 rounded-full animate-pulse shadow-lg",
                      status.type === 'active' && "bg-gradient-to-r from-green-400 to-emerald-500 shadow-green-500/50",
                      status.type === 'warning' && "bg-gradient-to-r from-yellow-400 to-amber-500 shadow-yellow-500/50",
                      status.type === 'error' && "bg-gradient-to-r from-red-400 to-rose-500 shadow-red-500/50"
                    )}
                  />
                  {status.label}
                </span>
              )}
              {action && (
                <button
                  onClick={action.onClick}
                  className="flex items-center gap-1 group/action"
                >
                  <span 
                    className="text-xs font-medium transition-colors duration-200"
                    style={{ color }}
                  >
                    {action.label}
                  </span>
                  <ChevronRight 
                    className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-all"
                    style={{ color: color }}
                  />
                </button>
              )}
              {!action && (
                <svg 
                  className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-all" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: status ? undefined : color }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  )
}