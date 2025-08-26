'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DepositPage() {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [isProcessing, setIsProcessing] = useState(false)

  const quickAmounts = [100000, 500000, 1000000, 5000000]

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Deposit successful!')
      router.push('/dashboard/history')
    }, 2000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add Funds</h1>
              <p className="text-sm text-gray-600 mt-1">Deposit money to your account</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Amount Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Deposit Amount</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Enter Amount (JPY)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">¥</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-lg"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="px-3 py-2 border border-gray-200 rounded-lg hover:border-[#FA7921] hover:bg-orange-50 transition-colors text-sm font-medium text-gray-800"
                  >
                    {formatCurrency(quickAmount)}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'stripe' ? 'border-[#FA7921] bg-orange-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#FA7921] focus:ring-[#FA7921]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                      </svg>
                      <span className="font-medium text-gray-900">Stripe</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Credit/Debit Card</p>
                  </div>
                  {paymentMethod === 'stripe' && (
                    <svg className="w-5 h-5 text-[#FA7921]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'paypal' ? 'border-[#FA7921] bg-orange-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#FA7921] focus:ring-[#FA7921]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.074.437-.01.057-.024.117-.035.176l-.035.132c-.03.111-.06.22-.09.33-.077.289-.158.583-.248.882-.087.291-.181.587-.285.885-.105.302-.218.607-.34.914a8.618 8.618 0 0 1-.44.916c-.166.318-.344.637-.533.953-.194.322-.402.644-.62.961-.223.322-.46.64-.71.952-.255.317-.525.628-.808.93a12.44 12.44 0 0 1-.904.9c-.32.282-.654.552-1.004.806a10.67 10.67 0 0 1-1.085.722 9.827 9.827 0 0 1-1.168.598c-.407.177-.83.333-1.267.465-.44.134-.897.242-1.367.323a13.266 13.266 0 0 1-1.437.171c-.495.036-1.003.049-1.52.035-.517-.015-1.043-.056-1.574-.125l-.027 5.358c-.005.37-.323.657-.69.657zm7.49-17.685c-3.102 0-3.874 1.894-4.31 3.854-.436 1.958-.795 5.038 1.471 5.038 3.027 0 4.61-1.548 5.047-3.507.437-1.96-.034-5.386-2.207-5.386z"/>
                      </svg>
                      <span className="font-medium text-gray-900">PayPal</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">PayPal Account</p>
                  </div>
                  {paymentMethod === 'paypal' && (
                    <svg className="w-5 h-5 text-[#FA7921]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'wise' ? 'border-[#FA7921] bg-orange-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="wise"
                    checked={paymentMethod === 'wise'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#FA7921] focus:ring-[#FA7921]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">Wise</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">International Transfer (Best Rates)</p>
                  </div>
                  {paymentMethod === 'wise' && (
                    <svg className="w-5 h-5 text-[#FA7921]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
            </div>

            {/* Deposit Button */}
            <button
              onClick={handleDeposit}
              disabled={isProcessing || !amount}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                isProcessing || !amount
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] hover:shadow-lg transform hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Deposit ${amount ? formatCurrency(parseFloat(amount)) : 'Amount'}`
              )}
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Balance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Current Balance</h3>
              <p className="text-2xl font-bold text-gray-900">¥2,850,000</p>
              <Link
                href="/dashboard/history"
                className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 mt-3 inline-flex items-center gap-1"
              >
                View transaction history
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Processing Time</h4>
                  <p className="text-xs text-blue-800">
                    Deposits are usually processed instantly. Bank transfers may take 1-3 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-100 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Secure Payment</h4>
                  <p className="text-xs text-gray-700">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}