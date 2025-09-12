import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({ 
  message = 'Loading...', 
  className,
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12",
      className
    )}>
      <Loader2 className={cn(
        "animate-spin text-[#FA7921]",
        sizeClasses[size]
      )} />
      {message && (
        <p className="text-sm text-gray-500 mt-3">{message}</p>
      )}
    </div>
  )
}

// Skeleton loader for content
export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  )
}