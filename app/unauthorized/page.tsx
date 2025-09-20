'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldOff,
  Lock,
  UserX,
  ArrowLeft,
  Home,
  LogIn,
  Mail,
  Key,
  AlertTriangle
} from 'lucide-react'
import { BackgroundAnimation } from '@/src/components/ui/background-animation'

export default function UnauthorizedPage() {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)

  const handleGoBack = () => {
    router.back()
  }

  const reasons = [
    {
      icon: UserX,
      title: 'Account Not Verified',
      description: 'Your account needs to be verified before accessing this resource.'
    },
    {
      icon: Lock,
      title: 'Insufficient Permissions',
      description: 'Your current role doesn\'t have access to this area.'
    },
    {
      icon: Key,
      title: 'Session Expired',
      description: 'Your login session has expired. Please log in again.'
    },
    {
      icon: ShieldOff,
      title: 'Restricted Content',
      description: 'This content is restricted to authorized personnel only.'
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <BackgroundAnimation />

      <div className="relative z-10 max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <ShieldOff className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Access Denied</h1>
                <p className="text-red-100">You don't have permission to view this page</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Error Code */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Error Code: 401 - Unauthorized</span>
            </div>

            {/* Main Message */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Why am I seeing this?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You're trying to access a restricted area of our platform. This could be due to several reasons:
              </p>
            </div>

            {/* Possible Reasons */}
            <div className="mb-8">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-[#FA7921] hover:text-[#e56b1c] font-medium mb-4 transition-colors"
              >
                {showDetails ? 'Hide' : 'Show'} possible reasons →
              </button>

              {showDetails && (
                <div className="grid gap-4">
                  {reasons.map((reason, index) => {
                    const Icon = reason.icon
                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {reason.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* What to do next */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What can I do?</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">1.</span>
                  <span>Make sure you're logged in with the correct account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">2.</span>
                  <span>Check if your account has been verified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">3.</span>
                  <span>Contact your administrator for access permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">4.</span>
                  <span>Try logging out and logging back in</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-3 gap-3">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>

              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </Link>

              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Log In Again
              </Link>
            </div>

            {/* Support Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Still having trouble? Our support team can help.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/dashboard/support"
                    className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#FA7921] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </Link>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <Link
                    href="/dashboard/support#faq"
                    className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#FA7921] transition-colors"
                  >
                    View FAQ
                  </Link>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <Link
                    href="/dashboard/profile"
                    className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#FA7921] transition-colors"
                  >
                    Check Account Status
                  </Link>
                </div>
              </div>
            </div>

            {/* Request ID */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Request ID: {Math.random().toString(36).substring(7).toUpperCase()} |
                Time: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            If you believe this is a mistake, please contact your system administrator
            or our support team with the request ID above.
          </p>
        </div>
      </div>
    </div>
  )
}