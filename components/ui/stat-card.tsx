import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  iconColor?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-gray-600',
  trend,
  className
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-lg bg-gray-50",
            iconColor
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  )
}