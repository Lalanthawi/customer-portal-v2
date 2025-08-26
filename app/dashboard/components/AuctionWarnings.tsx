'use client'

import { useState, useEffect } from 'react'

interface WarningBannerProps {
  type: 'warning' | 'error' | 'info' | 'success'
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
}

export function WarningBanner({ type, title, message, action, dismissible = true }: WarningBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible && dismissible) return null

  const styles = {
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      message: 'text-yellow-800',
      button: 'text-yellow-700 hover:text-yellow-900'
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
      message: 'text-red-800',
      button: 'text-red-700 hover:text-red-900'
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      message: 'text-blue-800',
      button: 'text-blue-700 hover:text-blue-900'
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
      message: 'text-green-800',
      button: 'text-green-700 hover:text-green-900'
    }
  }

  const style = styles[type]

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return (
          <svg className={`w-5 h-5 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'error':
        return (
          <svg className={`w-5 h-5 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'info':
        return (
          <svg className={`w-5 h-5 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'success':
        return (
          <svg className={`w-5 h-5 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  return (
    <div className={`p-4 border rounded-lg ${style.container}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <h4 className={`text-sm font-semibold ${style.title}`}>{title}</h4>
          <p className={`text-sm mt-1 ${style.message}`}>{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`text-sm font-medium mt-2 ${style.button}`}
            >
              {action.label} →
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className={`flex-shrink-0 ${style.button}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export function USSAuctionWarning({ auctionHouse }: { auctionHouse: string }) {
  if (!auctionHouse.toLowerCase().includes('uss')) return null

  return (
    <WarningBanner
      type="warning"
      title="USS Auction - Photos Restricted"
      message="USS does not allow exporters to access their data directly. Contact your sales representative to receive full-size photos and auction sheets."
      action={{
        label: "Contact Sales",
        onClick: () => window.location.href = '/dashboard/messages'
      }}
      dismissible={false}
    />
  )
}

export function InspectionTimeRestriction() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      const jstOffset = 9 * 60 // JST is UTC+9
      const localOffset = now.getTimezoneOffset()
      const jstTime = new Date(now.getTime() + (jstOffset + localOffset) * 60000)
      
      const hours = jstTime.getHours()
      const hoursUntilDeadline = 13 - hours // 1 PM JST deadline
      
      // Show warning if within 2 hours of 1 PM JST
      setShowWarning(hours >= 11 && hours < 13)
    }

    checkTime()
    const interval = setInterval(checkTime, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [])

  if (!showWarning) return null

  return (
    <WarningBanner
      type="error"
      title="Inspection Deadline Approaching"
      message="Inspection requests cannot be accepted within 2 hours of 1:00 PM JST. Please submit your request before 11:00 AM JST."
      dismissible={false}
    />
  )
}

export function TwoFactorRequirement({ accountType }: { accountType: string }) {
  const needsTwoFactor = accountType === 'Standard Account' || accountType === 'Business Account'
  
  if (!needsTwoFactor) return null

  return (
    <WarningBanner
      type="info"
      title="Enable Two-Factor Authentication"
      message="To upgrade your account and access instant bid approval, you must enable two-factor authentication for security."
      action={{
        label: "Enable 2FA",
        onClick: () => window.location.href = '/dashboard/profile?tab=security'
      }}
    />
  )
}