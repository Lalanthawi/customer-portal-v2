'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Shield, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react'

function PaymentProcessingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [processingStep, setProcessingStep] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed'>('processing')

  // Get payment details from query params
  const amount = searchParams.get('amount') || '0'
  const method = searchParams.get('method') || 'Credit Card'
  const txnId = searchParams.get('txn') || `TXN${Date.now()}`

  const processingSteps = [
    { id: 1, label: 'Validating payment details', icon: CreditCard },
    { id: 2, label: 'Securing transaction', icon: Shield },
    { id: 3, label: 'Processing with payment provider', icon: Clock },
    { id: 4, label: 'Confirming payment', icon: CheckCircle },
  ]

  useEffect(() => {
    // Simulate payment processing steps
    const stepInterval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1500)

    // Simulate final payment result
    const finalTimeout = setTimeout(() => {
      // Randomly succeed or fail for demo (80% success rate)
      const isSuccess = Math.random() > 0.2

      if (isSuccess) {
        setPaymentStatus('success')
        setTimeout(() => {
          router.push(`/dashboard/deposit/success?amount=${amount}&method=${encodeURIComponent(method)}&txn=${txnId}`)
        }, 1000)
      } else {
        setPaymentStatus('failed')
        setTimeout(() => {
          router.push(`/dashboard/deposit/failed?amount=${amount}&method=${encodeURIComponent(method)}&txn=${txnId}&code=PAYMENT_FAILED`)
        }, 1000)
      }
    }, 6000)

    return () => {
      clearInterval(stepInterval)
      clearTimeout(finalTimeout)
    }
  }, [amount, method, txnId, router])

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue)
  }

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FA7921] to-[#ff9a4d] p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold">Processing Payment</h1>
              <div className="text-sm opacity-90">
                {txnId}
              </div>
            </div>
            <div className="text-3xl font-bold">
              {formatCurrency(amount)}
            </div>
            <div className="text-sm mt-1 opacity-90">
              via {method}
            </div>
          </div>

          {/* Processing Animation */}
          <div className="p-8">
            <div className="flex justify-center mb-8">
              {paymentStatus === 'processing' ? (
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-[#FA7921] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#FA7921] opacity-20 rounded-full animate-ping" />
                  </div>
                </div>
              ) : paymentStatus === 'success' ? (
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                </div>
              ) : (
                <div className="relative">
                  <XCircle className="w-16 h-16 text-red-500" />
                </div>
              )}
            </div>

            {/* Status Message */}
            <div className="text-center mb-8">
              {paymentStatus === 'processing' ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Please wait while we process your payment
                  </h2>
                  <p className="text-sm text-gray-600">
                    This usually takes a few seconds. Please do not close this window.
                  </p>
                </>
              ) : paymentStatus === 'success' ? (
                <>
                  <h2 className="text-lg font-semibold text-green-600 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Redirecting to confirmation page...
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-red-600 mb-2">
                    Payment Failed
                  </h2>
                  <p className="text-sm text-gray-600">
                    Redirecting to error page...
                  </p>
                </>
              )}
            </div>

            {/* Processing Steps */}
            {paymentStatus === 'processing' && (
              <div className="space-y-3">
                {processingSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === processingStep
                  const isCompleted = index < processingStep

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-orange-50 border border-[#FA7921]'
                          : isCompleted
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className={`flex-shrink-0 ${
                        isActive
                          ? 'text-[#FA7921]'
                          : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isActive
                          ? 'text-[#FA7921]'
                          : isCompleted
                          ? 'text-green-700'
                          : 'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <div className="ml-auto">
                          <Loader2 className="w-4 h-4 text-[#FA7921] animate-spin" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secured by SSL Encryption</span>
              </div>
              <span>Powered by Stripe</span>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your payment is being processed securely. All transactions are encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PaymentProcessingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FA7921] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentProcessingContent />
    </Suspense>
  )
}