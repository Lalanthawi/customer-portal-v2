'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, Search, ArrowLeft, HelpCircle } from 'lucide-react'
import { BackgroundAnimation } from '@/src/components/ui/background-animation'

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <BackgroundAnimation />

      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-[150px] font-bold text-gray-200 leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[150px] font-bold bg-gradient-to-r from-[#FA7921] to-[#ff9a4d] bg-clip-text text-transparent animate-pulse leading-none">
                  404
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Search Suggestion */}
          <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              You might want to try searching for what you need:
            </p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles, auctions, or features..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      router.push(`/dashboard/search?q=${encodeURIComponent(e.currentTarget.value)}`)
                    }
                  }}
                />
              </div>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement
                  if (input?.value) {
                    router.push(`/dashboard/search?q=${encodeURIComponent(input.value)}`)
                  }
                }}
                className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors"
            >
              <Home className="w-5 h-5" />
              Dashboard Home
            </Link>
            <Link
              href="/dashboard/support"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Get Help
            </Link>
          </div>


          {/* Error Code */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Error Code: 404 | Request ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}