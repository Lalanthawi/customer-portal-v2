'use client'

interface StageIconProps {
  status: 'completed' | 'in-progress' | 'pending'
  isHovered?: boolean
  index: number
}

export default function StageIcon({ status, isHovered, index }: StageIconProps) {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return (
          <div className={`w-12 h-12 rounded-full bg-green-500 flex items-center justify-center transition-all duration-200 ${
            isHovered ? 'scale-110 shadow-lg shadow-green-500/30' : ''
          }`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      
      case 'in-progress':
        return (
          <div className={`w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-200 ${
            isHovered ? 'scale-110 shadow-lg shadow-blue-500/30' : ''
          }`}>
            <div className="relative">
              <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className={`w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center transition-all duration-200 ${
            isHovered ? 'scale-110 shadow-lg shadow-gray-300/30' : ''
          }`}>
            <span className="text-white font-bold">{index + 1}</span>
          </div>
        )
    }
  }

  const getPulseAnimation = () => {
    if (status === 'in-progress') {
      return (
        <>
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
        </>
      )
    }
    return null
  }

  return (
    <div className="relative">
      {getPulseAnimation()}
      {getIcon()}
    </div>
  )
}