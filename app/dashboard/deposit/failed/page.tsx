'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { XCircle, AlertTriangle, RefreshCcw, CreditCard, Phone } from 'lucide-react'
import { PageHeader } from '@/src/components/ui/page-header'

function PaymentFailedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  // Get error details from query params
  const errorCode = searchParams.get('code') || 'PAYMENT_FAILED'
  const amount = searchParams.get('amount') || '0'
  const method = searchParams.get('method') || 'Credit Card'
  const txnId = searchParams.get('txn') || `TXN${Date.now()}`

  // Error message mapping
  const getErrorMessage = (code: string): { title: string; description: string; suggestion: string } => {
    const errorMessages: Record<string, { title: string; description: string; suggestion: string }> = {
      'INSUFFICIENT_FUNDS': {
        title: 'Insufficient Funds',
        description: 'Your payment method does not have sufficient funds to complete this transaction.',
        suggestion: 'Please try a different payment method or contact your bank.'
      },
      'CARD_DECLINED': {
        title: 'Card Declined',
        description: 'Your card was declined by the issuing bank.',
        suggestion: 'Please verify your card details or try a different payment method.'
      },
      'INVALID_CARD': {
        title: 'Invalid Card Details',
        description: 'The card information provided is invalid or expired.',
        suggestion: 'Please check your card details and try again.'
      },
      'NETWORK_ERROR': {
        title: 'Network Error',
        description: 'We encountered a network issue while processing your payment.',
        suggestion: 'Please check your internet connection and try again.'
      },
      'PAYMENT_FAILED': {
        title: 'Payment Failed',
        description: 'We were unable to process your payment at this time.',
        suggestion: 'Please try again or contact support if the issue persists.'
      }
    }

    return errorMessages[code] ?? errorMessages['PAYMENT_FAILED']!
  }

  const errorInfo = getErrorMessage(errorCode || 'PAYMENT_FAILED')

  const handleRetry = async () => {
    setIsRetrying(true)
    setRetryCount(prev => prev + 1)

    // Simulate retry attempt
    setTimeout(() => {
      setIsRetrying(false)
      // If retry count is less than 3, stay on page, otherwise redirect
      if (retryCount >= 2) {
        router.push('/dashboard/support?issue=payment_failed')
      }
    }, 2000)
  }

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue)
  }

  useEffect(() => {
    // Log failed payment attempt for analytics
    console.log('Payment failed:', { errorCode, amount, method, txnId })
  }, [errorCode, amount, method, txnId])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment Failed"
        subtitle={`Transaction ID: ${txnId}`}
        backHref="/dashboard/deposit"
      />

      {/* Error Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              {errorInfo.title}
            </h2>
            <p className="text-red-700 mb-3">
              {errorInfo.description}
            </p>
            <p className="text-sm text-red-600">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              {errorInfo.suggestion}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium text-gray-900">{method}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Status</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              Failed
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Time</span>
            <span className="text-gray-900">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What would you like to do?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleRetry}
            disabled={isRetrying || retryCount >= 3}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : retryCount >= 3 ? 'Max Retries Reached' : 'Retry Payment'}
          </button>

          <Link
            href="/dashboard/deposit"
            className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            Try Different Method
          </Link>
        </div>

        {retryCount > 0 && retryCount < 3 && (
          <p className="text-sm text-gray-600 mt-4 text-center">
            Retry attempt {retryCount} of 3
          </p>
        )}
      </div>

      {/* Support Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-3">
              Our support team is available 24/7 to assist you with payment issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/support?issue=payment_failed"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Contact Support
              </Link>
              <Link
                href="/dashboard/support#faq"
                className="inline-flex items-center justify-center px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Successful Payments (if any) */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Having trouble? You can also try making a smaller deposit first or contact your bank.
        </p>
      </div>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FA7921] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  )
}