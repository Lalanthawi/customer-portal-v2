'use client'

import { useState, useEffect } from 'react'
import { Wrench, Clock, Bell } from 'lucide-react'

export default function MaintenancePage() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1

        if (totalSeconds <= 0) {
          clearInterval(timer)
          window.location.reload()
          return { hours: 0, minutes: 0, seconds: 0 }
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
    }
  }

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FA7921] bg-opacity-10 rounded-full">
            <Wrench className="w-12 h-12 text-[#FA7921]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          We'll be back soon
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Our site is currently undergoing scheduled maintenance.
        </p>

        {/* Countdown Timer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">ESTIMATED TIME REMAINING</span>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{formatTime(timeRemaining.hours)}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Hours</div>
            </div>
            <div className="text-3xl text-gray-400">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{formatTime(timeRemaining.minutes)}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Minutes</div>
            </div>
            <div className="text-3xl text-gray-400">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{formatTime(timeRemaining.seconds)}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Seconds</div>
            </div>
          </div>
        </div>

        {/* What we're doing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What we're working on</h2>
          <ul className="space-y-2 text-gray-600 max-w-md mx-auto text-left">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FA7921] rounded-full"></div>
              <span>System performance improvements</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FA7921] rounded-full"></div>
              <span>Database optimization</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FA7921] rounded-full"></div>
              <span>Security updates</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FA7921] rounded-full"></div>
              <span>New features deployment</span>
            </li>
          </ul>
        </div>

        {/* Email Notification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          {!isSubscribed ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Stay updated
              </h2>
              <p className="text-gray-600 mb-4">
                We'll notify you when we're back online
              </p>
              <form onSubmit={handleNotifySubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Notify Me
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">You're all set!</h3>
              <p className="text-gray-600">
                We'll email you at {email} when we're back.
              </p>
            </div>
          )}
        </div>

        {/* Contact */}
        <p className="text-gray-500 text-sm">
          For urgent matters, contact us at{' '}
          <a href="mailto:support@caromoto.jp" className="text-[#FA7921] hover:underline">
            support@caromoto.jp
          </a>
        </p>
      </div>
    </div>
  )
}