import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
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
        return '#FF6900'
      case 'success':
      case 'green':
        return '#34C759'
      case 'warning':
      case 'amber':
      case 'yellow':
        return '#FF9500'
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
      'relative h-full min-h-[140px] overflow-hidden',
      'bg-white',
      'border-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
      'hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out',
      'group',
      className
    )}>
      <CardContent className="p-6 relative">
        {/* Title and Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[12px] font-medium text-gray-600 uppercase tracking-wider">
              {title}
            </h3>
            {badge && (
              <span 
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ 
                  color: color,
                  backgroundColor: `${color}12`
                }}
              >
                {badge.label}
              </span>
            )}
          </div>
          
          {status && (
            <div className="flex items-center gap-1.5">
              <div 
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  status.type === 'active' && "bg-green-500",
                  status.type === 'warning' && "bg-yellow-500",
                  status.type === 'error' && "bg-red-500"
                )}
              />
              <span className="text-[11px] text-gray-600 font-medium">{status.label}</span>
            </div>
          )}
        </div>

        {/* Value Section */}
        <div className="mb-5">
          <div className="flex items-end justify-between">
            <div>
              <p className={cn(
                "text-[32px] font-semibold leading-none tracking-[-0.02em]",
                valueClassName || "text-gray-900"
              )}>
                {value}
              </p>
              {subtitle && (
                <p className="text-[13px] text-gray-600 mt-1 font-medium">{subtitle}</p>
              )}
            </div>
            
            {trend && (
              <div className="flex items-center gap-1 pb-1">
                <span className={cn(
                  "text-[13px] font-semibold",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                {trend.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-600" strokeWidth={2} />
                )}
              </div>
            )}
          </div>
          
          {trend?.label && (
            <p className="text-[11px] text-gray-500 mt-1 font-medium">{trend.label}</p>
          )}
        </div>

        {/* Progress Bar - Apple Style */}
        {progress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-600 font-medium">
                {progress.label || 'Progress'}
              </span>
              <span className="text-[11px] text-gray-900 font-semibold">
                {progress.showPercentage ? `${percentage}%` : `${progress.value} of ${progress.max || 100}`}
              </span>
            </div>
            <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
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

        {/* Action Link - Apple Style */}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-4 flex items-center gap-1 group/action"
          >
            <span 
              className="text-[13px] font-medium transition-colors duration-200"
              style={{ color }}
            >
              {action.label}
            </span>
            <ChevronRight 
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/action:translate-x-0.5"
              style={{ color }}
            />
          </button>
        )}

        {children}
      </CardContent>
    </Card>
  )
}