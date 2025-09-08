'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'

function DepositSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showDetails, setShowDetails] = useState(false)
  
  // Get deposit details from URL params (in production, this would come from API)
  const amount = searchParams.get('amount') || '500000'
  const transactionId = searchParams.get('txn') || `TXN${Date.now()}`
  const method = searchParams.get('method') || 'Bank Transfer'
  
  // Format currency
  const formatJPY = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseInt(value) : value
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(numValue)
  }

  // Trigger confetti animation on mount
  useEffect(() => {
    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FA7921', '#FFB956', '#22c55e', '#3b82f6']
    })
    
    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#FA7921', '#FFB956']
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#22c55e', '#3b82f6']
      })
    }, 250)
    
    // Auto redirect after 10 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard/wallet')
    }, 10000)
    
    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
              <svg 
                className="w-14 h-14 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Deposit Successful!
            </h1>
            <p className="text-green-100 text-sm">
              Your funds have been added to your wallet
            </p>
          </div>

          {/* Transaction Details */}
          <div className="p-8">
            {/* Amount Display */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-2">Amount Deposited</p>
              <p className="text-4xl font-bold text-gray-900">
                {formatJPY(amount)}
              </p>
            </div>

            {/* Transaction Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Transaction ID</span>
                <span className="text-sm font-mono font-medium text-gray-900">
                  {transactionId}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-medium text-gray-900">
                  {method}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Completed
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600">Date & Time</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            {/* Additional Details (Collapsible) */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-left mb-6"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">View Details</span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {showDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Reference Number</span>
                    <span className="font-mono text-gray-700">REF-2024-{Math.floor(Math.random() * 100000)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Processing Fee</span>
                    <span className="text-gray-700">¥0</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Exchange Rate</span>
                    <span className="text-gray-700">1.00</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Total Credited</span>
                    <span className="text-gray-900">{formatJPY(amount)}</span>
                  </div>
                </div>
              )}
            </button>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/dashboard/wallet"
                className="w-full bg-[#FA7921] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FA7921]/90 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Go to Wallet
              </Link>
              
              <Link
                href="/dashboard"
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Dashboard
              </Link>
            </div>

            {/* Download Receipt */}
            <button className="w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Receipt
              </span>
            </button>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            You will be redirected to your wallet in <span className="font-medium">10 seconds</span>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">Transaction Secured</p>
              <p>Your transaction has been processed securely using bank-grade encryption. A confirmation email has been sent to your registered email address.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DepositSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA7921] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DepositSuccessContent />
    </Suspense>
  )
}