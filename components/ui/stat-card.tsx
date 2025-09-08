import React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'amber'
  badge?: {
    label: string
    variant?: 'success' | 'warning' | 'error' | 'info'
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
    animated?: boolean
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
  variant = 'blue',
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

  const getIconBg = () => {
    switch(variant) {
      case 'orange': return "bg-gradient-to-br from-[#FA7921]/20 to-orange-500/10 group-hover:from-[#FA7921]/30 group-hover:to-orange-500/20"
      case 'purple': return "bg-gradient-to-br from-indigo-500/20 to-purple-500/10 group-hover:from-indigo-500/30 group-hover:to-purple-500/20"
      case 'amber': return "bg-gradient-to-br from-amber-500/20 to-yellow-500/10 group-hover:from-amber-500/30 group-hover:to-yellow-500/20"
      case 'green': return "bg-gradient-to-br from-emerald-500/20 to-green-500/10 group-hover:from-emerald-500/30 group-hover:to-green-500/20"
      case 'red': return "bg-gradient-to-br from-red-500/20 to-pink-500/10 group-hover:from-red-500/30 group-hover:to-pink-500/20"
      case 'blue': return "bg-gradient-to-br from-blue-500/20 to-cyan-500/10 group-hover:from-blue-500/30 group-hover:to-cyan-500/20"
      case 'yellow': return "bg-gradient-to-br from-yellow-500/20 to-amber-500/10 group-hover:from-yellow-500/30 group-hover:to-amber-500/20"
      default: return "bg-gradient-to-br from-gray-500/20 to-gray-400/10 group-hover:from-gray-500/30 group-hover:to-gray-400/20"
    }
  }

  const getIconColor = () => {
    switch(variant) {
      case 'orange': return "text-[#FA7921]"
      case 'purple': return "text-indigo-500"
      case 'amber': return "text-amber-500"
      case 'green': return "text-emerald-500"
      case 'red': return "text-red-500"
      case 'blue': return "text-blue-500"
      case 'yellow': return "text-yellow-500"
      default: return "text-gray-500"
    }
  }

  const getProgressColor = () => {
    switch(variant) {
      case 'orange': return "bg-gradient-to-r from-[#FA7921] to-orange-500"
      case 'purple': return "bg-gradient-to-r from-indigo-500 to-purple-500"
      case 'amber': return "bg-gradient-to-r from-amber-500 to-yellow-500"
      case 'green': return "bg-gradient-to-r from-emerald-500 to-green-500"
      case 'red': return "bg-gradient-to-r from-red-500 to-pink-500"
      case 'blue': return "bg-gradient-to-r from-blue-500 to-cyan-500"
      case 'yellow': return "bg-gradient-to-r from-yellow-500 to-amber-500"
      default: return "bg-gradient-to-r from-gray-500 to-gray-400"
    }
  }

  return (
    <Card className={cn(
      "group bg-white rounded-2xl p-6 border-2",
      variant === 'orange' && "border-orange-100 hover:border-orange-300 bg-gradient-to-br from-white via-white to-orange-50/30",
      variant === 'purple' && "border-indigo-100 hover:border-indigo-300 bg-gradient-to-br from-white via-white to-indigo-50/30",
      variant === 'amber' && "border-amber-100 hover:border-amber-300 bg-gradient-to-br from-white via-white to-amber-50/30",
      variant === 'green' && "border-emerald-100 hover:border-emerald-300 bg-gradient-to-br from-white via-white to-emerald-50/30",
      variant === 'red' && "border-red-100 hover:border-red-300 bg-gradient-to-br from-white via-white to-red-50/30",
      variant === 'blue' && "border-blue-100 hover:border-blue-300 bg-gradient-to-br from-white via-white to-blue-50/30",
      variant === 'yellow' && "border-yellow-100 hover:border-yellow-300 bg-gradient-to-br from-white via-white to-yellow-50/30",
      "hover:shadow-xl transition-all duration-500",
      "relative overflow-hidden h-full flex flex-col",
      className
    )}>
      {/* Enhanced gradient accent */}
      <div className={cn(
        "absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20",
        "bg-gradient-to-br to-transparent group-hover:scale-150 transition-transform duration-700",
        variant === 'orange' && "from-[#FA7921]/10",
        variant === 'purple' && "from-indigo-500/10",
        variant === 'amber' && "from-amber-500/10",
        variant === 'green' && "from-emerald-500/10",
        variant === 'red' && "from-red-500/10",
        variant === 'blue' && "from-blue-500/10",
        variant === 'yellow' && "from-yellow-500/10"
      )} />

      <div className="relative flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          {icon && (
            <div className={cn(
              "p-2.5 rounded-xl transition-all duration-300 shadow-sm group-hover:shadow-md",
              getIconBg()
            )}>
              {React.cloneElement(icon as React.ReactElement<any>, {
                className: cn('w-5 h-5', getIconColor())
              })}
            </div>
          )}
          
          {status && (
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                status.type === 'active' && "bg-green-500",
                status.type === 'warning' && "bg-amber-500 animate-pulse",
                status.type === 'error' && "bg-red-500 animate-pulse"
              )} />
              <span className="text-xs text-gray-500">{status.label}</span>
            </div>
          )}

          {badge && (
            <span className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm",
              badge.variant === 'success' && "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200",
              badge.variant === 'warning' && "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200",
              badge.variant === 'error' && "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200",
              badge.variant === 'info' && "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200"
            )}>
              {badge.label}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            {title}
          </h3>
          <p className={cn(
            "text-3xl font-bold mb-1",
            variant === 'orange' && "text-gray-900",
            variant === 'purple' && "text-gray-900",
            variant === 'amber' && "text-gray-900",
            variant === 'green' && "text-gray-900",
            variant === 'red' && "text-gray-900",
            variant === 'blue' && "text-gray-900",
            variant === 'yellow' && "text-gray-900",
            valueClassName
          )}>
            {value}
          </p>
          {subtitle && (
            <div className="flex items-center gap-2">
              {trend && (
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
              )}
              <span className="text-xs text-gray-400">{subtitle}</span>
            </div>
          )}
        </div>

        {(progress || action || (trend && !subtitle)) && (
          <div className="mt-6 pt-4 border-t border-gray-50">
            {progress && (
              <>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-500">{progress.label || 'Progress'}</span>
                  <span className="font-medium text-gray-700">
                    {progress.showPercentage ? `${percentage}%` : `${progress.value}/${progress.max || 100}`}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      getProgressColor()
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </>
            )}
            
            {(trend && !subtitle) && (
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? '+' : ''}{trend.value}% {trend.label}
                </span>
                {action && (
                  <button
                    onClick={action.onClick}
                    className={cn(
                      "text-xs font-medium transition-colors",
                      getIconColor(),
                      "hover:underline"
                    )}
                  >
                    {action.label}
                  </button>
                )}
              </div>
            )}
            
            {action && !progress && !trend && (
              <button
                onClick={action.onClick}
                className={cn(
                  "text-xs font-medium transition-colors",
                  getIconColor(),
                  "hover:underline"
                )}
              >
                {action.label} →
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </Card>
  )
}