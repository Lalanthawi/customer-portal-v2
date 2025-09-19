import { cn } from '@/src/lib/utils'
import { STATUS_CONFIG, StatusType } from '@/src/lib/constants'

interface StatusBadgeProps {
  status: StatusType
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showDot?: boolean
}

export function StatusBadge({ 
  status, 
  size = 'md',
  className,
  showDot = false
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium",
      config.className,
      sizeClasses[size],
      className
    )}>
      {showDot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          config.dotColor
        )} />
      )}
      {config.label}
    </span>
  )
}