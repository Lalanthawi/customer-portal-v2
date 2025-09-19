'use client'

import { useState, useEffect, useRef } from 'react'

interface TwoFactorAuthProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (code: string) => void
  purpose: 'setup' | 'verify' | 'upgrade'
  phoneNumber?: string
  email?: string
}

export default function TwoFactorAuth({ 
  isOpen, 
  onClose, 
  onVerify, 
  purpose = 'verify',
  phoneNumber = '+1 *** *** 8900',
  email = 'j***@example.com'
}: TwoFactorAuthProps) {
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'email' | 'authenticator'>('sms')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [setupSecret, setSetupSecret] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (isOpen && purpose === 'setup' && verificationMethod === 'authenticator') {
      // Generate QR code for authenticator app
      const secret = generateSecret()
      setSetupSecret(secret)
      // In production, generate actual QR code here
    }
  }, [isOpen, purpose, verificationMethod, email])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [resendTimer])

  const generateSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let secret = ''
    for (let i = 0; i < 32; i++) {
      secret += chars[Math.floor(Math.random() * chars.length)]
    }
    return secret
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6).split('')
      const newCode = [...code]
      pastedCode.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit
        }
      })
      setCode(newCode)
      // Focus last input or next empty input
      const nextIndex = Math.min(index + pastedCode.length, 5)
      inputRefs.current[nextIndex]?.focus()
    } else {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
    setError('')
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSendCode = async () => {
    setIsLoading(true)
    setError('')
    
    // Simulate sending code
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setResendTimer(60)
    
    // Show success message
    if (verificationMethod === 'sms') {
      setError(`Code sent to ${phoneNumber}`)
    } else if (verificationMethod === 'email') {
      setError(`Code sent to ${email}`)
    }
  }

  const handleVerify = async () => {
    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      setError('Please enter a complete 6-digit code')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500))

    // For demo purposes, accept any 6-digit code
    if (fullCode === '123456' || fullCode.length === 6) {
      onVerify(fullCode)
      setCode(['', '', '', '', '', ''])
      setIsLoading(false)
    } else {
      setError('Invalid verification code. Please try again.')
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {purpose === 'setup' ? 'Set Up Two-Factor Authentication' : 
                 purpose === 'upgrade' ? 'Verify Your Identity' :
                 'Two-Factor Authentication'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {purpose === 'setup' ? 'Secure your account with an additional layer of protection' :
                 purpose === 'upgrade' ? 'Required for account upgrade' :
                 'Enter the verification code to continue'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Method Selection */}
          {purpose === 'setup' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose verification method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setVerificationMethod('sms')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    verificationMethod === 'sms'
                      ? 'border-[#FA7921] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs font-medium">SMS</p>
                </button>
                <button
                  onClick={() => setVerificationMethod('email')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    verificationMethod === 'email'
                      ? 'border-[#FA7921] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs font-medium">Email</p>
                </button>
                <button
                  onClick={() => setVerificationMethod('authenticator')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    verificationMethod === 'authenticator'
                      ? 'border-[#FA7921] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <p className="text-xs font-medium">App</p>
                </button>
              </div>
            </div>
          )}

          {/* Authenticator QR Code */}
          {purpose === 'setup' && verificationMethod === 'authenticator' && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Scan this QR code with your authenticator app
                </p>
                <div className="bg-white p-4 rounded-lg inline-block mb-3">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    {/* In production, use actual QR code */}
                    <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h8m-4 0v.01M20 12v.01M12 12v8m0-8H8m0 0H4m16 0h-4" />
                    </svg>
                  </div>
                </div>
                <div className="text-left bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Or enter this code manually:</p>
                  <p className="text-xs font-mono break-all">{setupSecret}</p>
                </div>
              </div>
            </div>
          )}

          {/* Send Code Button */}
          {verificationMethod !== 'authenticator' && purpose !== 'setup' && (
            <div className="mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  We&apos;ll send a verification code to:
                </p>
                <p className="font-medium text-gray-900">
                  {verificationMethod === 'sms' ? phoneNumber : email}
                </p>
              </div>
              <button
                onClick={handleSendCode}
                disabled={isLoading || resendTimer > 0}
                className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-all ${
                  resendTimer > 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FA7921] text-white hover:bg-[#FA7921]/90'
                }`}
              >
                {isLoading ? 'Sending...' : 
                 resendTimer > 0 ? `Resend in ${resendTimer}s` : 
                 'Send Verification Code'}
              </button>
            </div>
          )}

          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Enter verification code
            </label>
            <div className="flex gap-2 justify-center mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg transition-all ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#FA7921]'
                  } focus:outline-none`}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className={`text-center text-sm mb-4 ${
                error.includes('sent') ? 'text-green-600' : 'text-red-600'
              }`}>
                {error}
              </div>
            )}

            {/* Info Message */}
            {purpose === 'upgrade' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Account Upgrade Security</p>
                    <p className="text-xs text-amber-700 mt-1">
                      2FA verification is required to upgrade from {purpose === 'upgrade' ? 'Basic' : 'your current'} account to a higher tier for enhanced security.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isLoading || code.join('').length !== 6}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                code.join('').length === 6
                  ? 'bg-[#FA7921] text-white hover:bg-[#FA7921]/90'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Verifying...' : 
               purpose === 'setup' ? 'Complete Setup' :
               purpose === 'upgrade' ? 'Verify & Upgrade' :
               'Verify'}
            </button>

            {/* Alternative Methods */}
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-500 hover:text-[#FA7921] transition-colors">
                Having trouble? Use backup code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}