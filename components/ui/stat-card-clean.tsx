"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CleanStatCardProps {
  title: string
  value: string | React.ReactNode
  subtitle?: string
  trend?: {
    value: number
    isPositive?: boolean
  }
  className?: string
  variant?: number
}

export function CleanStatCard({
  title,
  value,
  subtitle,
  trend,
  className,
  variant = 0,
}: CleanStatCardProps) {
  const isPositive = trend?.isPositive ?? (trend ? trend.value > 0 : null)

  // Beautiful subtle gradient backgrounds for each variant
  const gradients = [
    "bg-gradient-to-br from-white via-gray-50/30 to-white",
    "bg-gradient-to-br from-white via-blue-50/20 to-white",
    "bg-gradient-to-br from-white via-emerald-50/20 to-white",
    "bg-gradient-to-br from-white via-purple-50/20 to-white",
  ]

  const selectedGradient = gradients[variant % gradients.length]

  return (
    <div className={cn(
      "relative group overflow-hidden",
      "rounded-2xl p-7 transition-all duration-500",
      "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)]",
      "hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.04)]",
      "border border-gray-100/60",
      "hover:-translate-y-0.5",
      selectedGradient,
      className
    )}>
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 opacity-40">
        <div className={cn(
          "absolute -top-40 -right-40 w-80 h-80 rounded-full",
          "bg-gradient-radial blur-3xl",
          variant === 0 && "from-gray-200/30 to-transparent",
          variant === 1 && "from-blue-200/30 to-transparent",
          variant === 2 && "from-emerald-200/30 to-transparent",
          variant === 3 && "from-purple-200/30 to-transparent"
        )} />
      </div>

      {/* Main content */}
      <div className="relative space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          {title}
        </p>

        <div className="flex items-end gap-3">
          <p className="text-[38px] leading-none font-bold text-gray-900">
            {value}
          </p>
          {trend && (
            <div className="mb-1">
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold",
                "transition-all duration-300",
                isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              )}>
                {isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>

        {subtitle && (
          <p className="text-[13px] text-gray-600 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Simple decorative line */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-0.5 opacity-20",
        "bg-gradient-to-r",
        variant === 0 && "from-transparent via-gray-300 to-transparent",
        variant === 1 && "from-transparent via-blue-300 to-transparent",
        variant === 2 && "from-transparent via-emerald-300 to-transparent",
        variant === 3 && "from-transparent via-purple-300 to-transparent"
      )} />
    </div>
  )
}

// Compact version for smaller spaces
export function CompactStatCard({
  title,
  value,
  subtitle,
  trend,
  className,
}: Omit<CleanStatCardProps, 'icon'>) {
  const isPositive = trend?.isPositive ?? (trend ? trend.value > 0 : null)

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all", className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline justify-between">
          <p className="text-xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              <span>{isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

// Minimal version for dashboards
export function MinimalStatCard({
  title,
  value,
  subtitle,
  className,
}: Omit<CleanStatCardProps, 'icon' | 'trend'>) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}