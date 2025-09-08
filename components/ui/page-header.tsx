import React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  badge?: React.ReactNode
  gradient?: boolean
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  icon,
  actions,
  badge,
  gradient = false,
  className,
  children
}: PageHeaderProps) {
  if (gradient) {
    return (
      <div className={cn(
        "bg-gradient-to-r from-[#002244] to-[#003366] p-8 text-white rounded-2xl mb-6",
        className
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {icon && (
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  {icon}
                </div>
              )}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
                  {badge}
                </div>
                {description && (
                  <p className="text-blue-100 mt-1">{description}</p>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-xl flex items-center justify-center shadow-lg">
              <div className="text-white">{icon}</div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
              {badge}
            </div>
            {description && (
              <p className="text-gray-600 mt-2">{description}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}