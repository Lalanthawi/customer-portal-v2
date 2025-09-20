'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, Home, Mail, FileText } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">500 - Server Error</h1>
                <p className="text-red-100">Something went wrong on our end</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                We're sorry for the inconvenience
              </h2>
              <p className="text-gray-600">
                An unexpected error occurred while processing your request. Our team has been notified and is working to fix the issue.
              </p>
            </div>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-sm font-semibold text-red-900 mb-2">Error Details (Dev Only)</h3>
                <pre className="text-xs text-red-700 overflow-x-auto whitespace-pre-wrap break-words">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="text-xs text-red-600 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* What you can do */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">What you can do:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Try refreshing the page or clicking the "Try Again" button below</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Clear your browser cache and cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Check back in a few minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Contact support if the problem persists</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Go to Dashboard
              </Link>
            </div>

            {/* Support Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <Link
                  href="/dashboard/support"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#FA7921] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
                <Link
                  href="/dashboard/support#status"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#FA7921] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  System Status
                </Link>
              </div>
            </div>

            {/* Error Reference */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Error Reference: {error.digest || `ERR-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}