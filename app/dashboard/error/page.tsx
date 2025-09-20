'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  RefreshCcw,
  Home,
  WifiOff,
  Database,
  ShieldAlert,
  Clock,
  Mail
} from 'lucide-react'
import { PageHeader } from '@/src/components/ui/page-header'

type ErrorType = 'network' | 'database' | 'permission' | 'timeout' | 'general'

interface ErrorInfo {
  type: ErrorType
  title: string
  description: string
  icon: React.ElementType
  iconColor: string
  bgColor: string
  borderColor: string
  suggestions: string[]
}

const errorTypes: Record<ErrorType, ErrorInfo> = {
  network: {
    type: 'network',
    title: 'Network Error',
    description: 'We\'re having trouble connecting to our servers. Please check your internet connection.',
    icon: WifiOff,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    suggestions: [
      'Check your internet connection',
      'Try disabling VPN or proxy if you\'re using one',
      'Clear your browser cache and cookies',
      'Try again in a few moments'
    ]
  },
  database: {
    type: 'database',
    title: 'Data Error',
    description: 'We encountered an issue while processing your data. Our team has been notified.',
    icon: Database,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    suggestions: [
      'Refresh the page to try again',
      'Check if your data is complete',
      'Try a different browser',
      'Contact support if the issue persists'
    ]
  },
  permission: {
    type: 'permission',
    title: 'Permission Denied',
    description: 'You don\'t have permission to access this resource or perform this action.',
    icon: ShieldAlert,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    suggestions: [
      'Verify you\'re logged in with the correct account',
      'Check if your account has the necessary permissions',
      'Contact your administrator for access',
      'Try logging out and logging back in'
    ]
  },
  timeout: {
    type: 'timeout',
    title: 'Request Timeout',
    description: 'The operation took too long to complete. This might be due to high server load.',
    icon: Clock,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    suggestions: [
      'Wait a moment and try again',
      'Check if you\'re uploading large files',
      'Try during off-peak hours',
      'Break down large operations into smaller ones'
    ]
  },
  general: {
    type: 'general',
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred. We apologize for the inconvenience.',
    icon: AlertCircle,
    iconColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    suggestions: [
      'Try refreshing the page',
      'Go back and try again',
      'Clear your browser cache',
      'Contact support if the problem continues'
    ]
  }
}

function DashboardErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  // Get error details from query params
  const errorType = (searchParams.get('type') as ErrorType) || 'general'
  const errorCode = searchParams.get('code') || 'UNKNOWN_ERROR'
  const errorMessage = searchParams.get('message') || ''
  const returnUrl = searchParams.get('return') || '/dashboard'

  const errorInfo = errorTypes[errorType] || errorTypes.general
  const Icon = errorInfo.icon

  useEffect(() => {
    // Log error for monitoring
    console.error('Dashboard error:', {
      type: errorType,
      code: errorCode,
      message: errorMessage,
      timestamp: new Date().toISOString()
    })
  }, [errorType, errorCode, errorMessage])

  const handleRetry = async () => {
    setIsRetrying(true)
    setRetryCount(prev => prev + 1)

    // Simulate retry
    setTimeout(() => {
      setIsRetrying(false)

      // If retry count is less than 3, stay on page
      if (retryCount >= 2) {
        // Max retries reached, redirect to support
        router.push('/dashboard/support?issue=repeated_error')
      } else {
        // Try to go back to the return URL
        router.push(returnUrl)
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Error Occurred"
        subtitle={`Error Code: ${errorCode}`}
        backHref="/dashboard"
      />

      {/* Error Alert */}
      <div className={`${errorInfo.bgColor} border ${errorInfo.borderColor} rounded-xl p-6`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className={`p-3 bg-white rounded-full ${errorInfo.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {errorInfo.title}
            </h2>
            <p className="text-gray-700 mb-1">
              {errorInfo.description}
            </p>
            {errorMessage && (
              <p className="text-sm text-gray-600 mt-2">
                Details: {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Here's what you can try:
        </h3>
        <ul className="space-y-3">
          {errorInfo.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                {index + 1}
              </span>
              <span className="text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleRetry}
            disabled={isRetrying || retryCount >= 3}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : retryCount >= 3 ? 'Max Retries' : 'Try Again'}
          </button>

          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
        </div>

        {retryCount > 0 && retryCount < 3 && (
          <p className="text-sm text-gray-600 mt-4 text-center">
            Retry attempt {retryCount} of 3
          </p>
        )}
      </div>

      {/* Need Help? */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-3">
              If you continue to experience issues, our support team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/dashboard/support?issue=${errorType}_error&code=${errorCode}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Contact Support
              </Link>
              <Link
                href="/dashboard/support#status"
                className="inline-flex items-center justify-center px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                Check System Status
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Error Details (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-sm font-mono font-semibold text-gray-700 mb-2">Debug Info (Dev Only)</h4>
          <pre className="text-xs font-mono text-gray-600 overflow-x-auto">
{JSON.stringify({
  type: errorType,
  code: errorCode,
  message: errorMessage,
  return: returnUrl,
  timestamp: new Date().toISOString()
}, null, 2)}
          </pre>
        </div>
      )}

      {/* Session Info */}
      <div className="text-center">
        <p className="text-xs text-gray-400">
          Session ID: {Math.random().toString(36).substring(7).toUpperCase()} |
          Time: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default function DashboardErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FA7921] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DashboardErrorContent />
    </Suspense>
  )
}