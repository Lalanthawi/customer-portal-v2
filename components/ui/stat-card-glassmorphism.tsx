import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number | string
    isPositive?: boolean
  }
  icon?: React.ReactNode
  href?: string
  className?: string
  iconBgColor?: string
  glowColor?: string
  children?: React.ReactNode
  status?: {
    label: string
    type: 'active' | 'warning' | 'error' | 'success'
  }
  customFooter?: React.ReactNode
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  href,
  className,
  iconBgColor = 'from-[#FA7921]/20 to-[#FF9A56]/10',
  glowColor = '#FA7921',
  children,
  status,
  customFooter
}: StatCardProps) {
  const content = (
    <Card className={cn(
      "group relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1",
      className
    )}>
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl"></div>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-tr",
        glowColor === '#FA7921' ? "from-[#FA7921]/5 via-transparent to-[#FF9A56]/5" :
        glowColor === '#002233' ? "from-[#002233]/5 via-transparent to-[#003344]/5" :
        glowColor === 'purple' ? "from-purple-500/5 via-transparent to-purple-600/5" :
        glowColor === 'green' ? "from-green-500/5 via-transparent to-emerald-500/5" :
        glowColor === 'red' ? "from-red-500/5 via-transparent to-rose-500/5" :
        glowColor === 'black' ? "from-gray-900/5 via-transparent to-gray-800/5" :
        "from-gray-500/5 via-transparent to-gray-600/5"
      )}></div>

      {/* Border gradient */}
      <div className={cn(
        "absolute inset-0 rounded-2xl p-[1px]",
        glowColor === '#FA7921' ? "bg-gradient-to-br from-[#FA7921]/20 via-gray-200/30 to-[#FF9A56]/20" :
        glowColor === '#002233' ? "bg-gradient-to-br from-[#002233]/20 via-gray-200/30 to-blue-500/20" :
        glowColor === 'purple' ? "bg-gradient-to-br from-purple-500/20 via-gray-200/30 to-purple-600/20" :
        glowColor === 'green' ? "bg-gradient-to-br from-green-500/20 via-gray-200/30 to-emerald-500/20" :
        glowColor === 'red' ? "bg-gradient-to-br from-red-500/20 via-gray-200/30 to-rose-500/20" :
        glowColor === 'black' ? "bg-gradient-to-br from-gray-800/20 via-gray-200/30 to-gray-900/20" :
        "bg-gradient-to-br from-gray-300/20 via-gray-200/30 to-gray-400/20"
      )}>
        <div className="h-full w-full rounded-2xl bg-white/50 backdrop-blur-xl"></div>
      </div>

      {/* Animated glow effect */}
      <div className={cn(
        "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-all duration-700",
        glowColor === '#FA7921' ? "bg-[#FA7921]/20 group-hover:bg-[#FA7921]/30" :
        glowColor === '#002233' ? "bg-blue-500/20 group-hover:bg-blue-500/30" :
        glowColor === 'purple' ? "bg-purple-500/20 group-hover:bg-purple-500/30" :
        glowColor === 'green' ? "bg-green-500/20 group-hover:bg-green-500/30" :
        glowColor === 'red' ? "bg-red-500/20 group-hover:bg-red-500/30" :
        glowColor === 'black' ? "bg-gray-800/20 group-hover:bg-gray-900/30" :
        "bg-gray-400/20 group-hover:bg-gray-400/30"
      )}></div>

      <CardContent className="relative z-10 flex flex-col h-full p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {icon && (
            <div className={cn(
              "p-2.5 rounded-xl backdrop-blur-sm border",
              iconBgColor === 'from-[#FA7921]/20 to-[#FF9A56]/10' ?
                "bg-gradient-to-br from-[#FA7921]/20 to-[#FF9A56]/10 border-[#FA7921]/10" :
              iconBgColor === 'from-[#002233]/20 to-blue-500/10' ?
                "bg-gradient-to-br from-[#002233]/20 to-blue-500/10 border-[#002233]/10" :
              iconBgColor === 'from-purple-500/20 to-purple-600/10' ?
                "bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/10" :
              iconBgColor === 'from-green-500/20 to-emerald-500/10' ?
                "bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-500/10" :
              iconBgColor === 'from-red-500/20 to-rose-500/10' ?
                "bg-gradient-to-br from-red-500/20 to-rose-500/10 border-red-500/10" :
              iconBgColor === 'from-gray-800/20 to-gray-900/10' ?
                "bg-gradient-to-br from-gray-800/20 to-gray-900/10 border-gray-800/10" :
                "bg-gradient-to-br from-gray-300/20 to-gray-400/10 border-gray-300/10"
            )}>
              {icon}
            </div>
          )}
          {trend && (
            <span className={cn(
              "px-2 py-1 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1 border",
              trend.isPositive ?
                "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-500/20" :
                "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-700 border-red-500/20"
            )}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d={trend.isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"}
                />
              </svg>
              {trend.value}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-1.5 font-medium">{subtitle}</p>
          )}
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>

        {/* Footer */}
        {(status || href || customFooter) && (
          <div className="mt-auto pt-3 border-t border-gray-200/30">
            <div className="flex items-center justify-between">
              {customFooter ? (
                <>{customFooter}</>
              ) : status ? (
                <span className={cn(
                  "text-xs flex items-center gap-1.5 font-medium",
                  status.type === 'active' || status.type === 'success' ? "text-green-600" :
                  status.type === 'warning' ? "text-amber-600" :
                  status.type === 'error' ? "text-red-600" :
                  "text-gray-600"
                )}>
                  <span className={cn(
                    "w-2 h-2 rounded-full animate-pulse shadow-lg",
                    status.type === 'active' || status.type === 'success' ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-green-500/50" :
                    status.type === 'warning' ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-orange-500/50" :
                    status.type === 'error' ? "bg-gradient-to-r from-red-400 to-rose-500 shadow-red-500/50" :
                    "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-500/50"
                  )}></span>
                  {status.label}
                </span>
              ) : (
                <span className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                  <span className={cn(
                    "w-2 h-2 rounded-full animate-pulse shadow-lg",
                    glowColor === '#FA7921' ? "bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-500/50" :
                    glowColor === '#002233' ? "bg-gradient-to-r from-blue-400 to-indigo-500 shadow-blue-500/50" :
                    glowColor === 'purple' ? "bg-gradient-to-r from-purple-400 to-purple-500 shadow-purple-500/50" :
                    glowColor === 'green' ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-green-500/50" :
                    glowColor === 'red' ? "bg-gradient-to-r from-red-400 to-rose-500 shadow-red-500/50" :
                    glowColor === 'black' ? "bg-gradient-to-r from-gray-700 to-gray-900 shadow-gray-800/50" :
                    "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-500/50"
                  )}></span>
                  Active Now
                </span>
              )}
              {href && !customFooter && (
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#FA7921] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return href ? <Link href={href}>{content}</Link> : content
}