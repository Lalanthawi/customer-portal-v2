'use client'

import { useState, useEffect } from 'react'

export default function JapanTime() {
  const [japanTime, setJapanTime] = useState<Date | null>(null)

  useEffect(() => {
    const updateJapanTime = () => {
      const now = new Date()
      // Convert to JST (UTC+9)
      const jstOffset = 9 * 60 // JST is UTC+9 in minutes
      const localOffset = now.getTimezoneOffset() // Local timezone offset in minutes
      const jstTime = new Date(now.getTime() + (jstOffset + localOffset) * 60000)
      setJapanTime(jstTime)
    }

    // Update immediately
    updateJapanTime()

    // Update every second
    const interval = setInterval(updateJapanTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!japanTime) return null

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    
    return `${hours}:${minutes}:${seconds}`
  }

  // Check if it's near inspection deadline (11 AM - 1 PM JST)
  const hours = japanTime.getHours()
  const isNearDeadline = hours >= 11 && hours < 13

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">Japan Time (JST):</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatTime(japanTime)}
              </span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">
                {formatDate(japanTime)}
              </span>
            </div>
            
            {isNearDeadline && (
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-yellow-800">
                  Inspection deadline: 1:00 PM JST
                </span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Auctions typically end 1-3 minutes after start time
          </div>
        </div>
      </div>
    </div>
  )
}