'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Activity {
  id: string
  type: 'bid' | 'win' | 'outbid' | 'listing' | 'payment' | 'message'
  title: string
  description?: string
  amount?: number
  timestamp: Date
  status?: 'success' | 'pending' | 'failed'
  vehicleInfo?: {
    make: string
    model: string
    year: number
    image: string
  }
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'bid',
    title: 'Bid placed on Toyota Supra',
    description: 'Your bid of ¥5,200,000 has been placed',
    amount: 5200000,
    timestamp: new Date('2024-01-20T10:30:00'),
    status: 'success',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Supra RZ',
      year: 1997,
      image: '/placeholder.svg'
    }
  },
  {
    id: '2',
    type: 'outbid',
    title: 'Outbid on Nissan Skyline',
    description: 'Someone placed a higher bid of ¥4,800,000',
    amount: 4800000,
    timestamp: new Date('2024-01-20T09:15:00'),
    status: 'pending',
    vehicleInfo: {
      make: 'Nissan',
      model: 'Skyline GT-R',
      year: 1999,
      image: '/placeholder.svg'
    }
  },
  {
    id: '3',
    type: 'win',
    title: 'Won auction for Mazda RX-7',
    description: 'Congratulations! You won with ¥3,500,000',
    amount: 3500000,
    timestamp: new Date('2024-01-19T18:00:00'),
    status: 'success',
    vehicleInfo: {
      make: 'Mazda',
      model: 'RX-7 Type R',
      year: 1995,
      image: '/placeholder.svg'
    }
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment processed',
    description: 'Deposit of ¥500,000 successful',
    amount: 500000,
    timestamp: new Date('2024-01-19T14:30:00'),
    status: 'success'
  },
  {
    id: '5',
    type: 'message',
    title: 'New message from dealer',
    description: 'Regarding your inquiry about Honda NSX',
    timestamp: new Date('2024-01-19T12:00:00'),
    vehicleInfo: {
      make: 'Honda',
      model: 'NSX Type R',
      year: 2002,
      image: '/placeholder.svg'
    }
  },
  {
    id: '6',
    type: 'listing',
    title: 'New matching listing',
    description: 'Subaru Impreza WRX STI matching your criteria',
    timestamp: new Date('2024-01-18T16:45:00'),
    vehicleInfo: {
      make: 'Subaru',
      model: 'Impreza WRX STI',
      year: 2004,
      image: '/placeholder.svg'
    }
  }
]

export default function ActivityPage() {
  const [filter, setFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState('7days')

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'bid':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'win':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'outbid':
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )
      case 'payment':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        )
      case 'message':
        return (
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        )
      case 'listing':
        return (
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        )
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity History</h1>
              <p className="text-sm text-gray-500 mt-1">Track all your auction activities</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="all">All Activities</option>
                <option value="bid">Bids</option>
                <option value="win">Wins</option>
                <option value="outbid">Outbids</option>
                <option value="payment">Payments</option>
                <option value="message">Messages</option>
                <option value="listing">New Listings</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{activity.title}</h3>
                        {activity.description && (
                          <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                        )}
                        {activity.vehicleInfo && (
                          <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-16 h-12 bg-gray-200 rounded-md"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {activity.vehicleInfo.year} {activity.vehicleInfo.make} {activity.vehicleInfo.model}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        {activity.amount && (
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(activity.amount)}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{formatTime(activity.timestamp)}</p>
                        {activity.status && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                            activity.status === 'success' ? 'bg-green-100 text-green-700' :
                            activity.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}