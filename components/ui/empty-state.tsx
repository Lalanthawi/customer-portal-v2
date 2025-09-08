import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  children
}: EmptyStateProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-12 text-center border border-gray-200",
      className
    )}>
      {icon && (
        <div className="w-16 h-16 text-gray-300 mx-auto mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {children}
      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || 'default'}
          className={action.variant === 'default' ? 'bg-[#FA7921] hover:bg-[#FA7921]/90' : ''}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}