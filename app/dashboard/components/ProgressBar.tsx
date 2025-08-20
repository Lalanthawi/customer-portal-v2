'use client'

interface ProgressBarProps {
  progress: number // 0-100
  status: 'completed' | 'in-progress' | 'pending'
  showPercentage?: boolean
  height?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export default function ProgressBar({
  progress,
  status,
  showPercentage = false,
  height = 'md',
  animated = true
}: ProgressBarProps) {
  const getHeightClass = () => {
    switch (height) {
      case 'sm':
        return 'h-2'
      case 'lg':
        return 'h-4'
      default:
        return 'h-3'
    }
  }

  const getColorClass = () => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-green-600'
      case 'in-progress':
        return 'from-blue-500 to-blue-600'
      default:
        return 'from-gray-300 to-gray-400'
    }
  }

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Progress</span>
          <span className="text-xs font-medium text-gray-900">{progress}%</span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${getHeightClass()} overflow-hidden`}>
        <div 
          className={`h-full bg-gradient-to-r ${getColorClass()} rounded-full transition-all duration-500 ease-out relative`}
          style={{ width: `${progress}%` }}
        >
          {animated && progress > 0 && progress < 100 && (
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          )}
          
          {/* Shimmer effect for in-progress */}
          {status === 'in-progress' && animated && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}