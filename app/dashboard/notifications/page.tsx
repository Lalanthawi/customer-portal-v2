'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Notification {
  id: string
  type: 'bid' | 'auction' | 'payment' | 'system' | 'message' | 'alert' | 'bid-update'
  title: string
  description: string
  timestamp: Date
  read: boolean
  priority: 'high' | 'medium' | 'low'
  actionUrl?: string
  actionLabel?: string
  image?: string
}

const notifications: Notification[] = [
  {
    id: '0',
    type: 'bid-update',
    title: 'Bid Cancellation Confirmed',
    description: 'Your bid cancellation for 2018 Toyota Corolla Axio (AUC-2024-0892) has been reviewed and accepted by our staff.',
    timestamp: new Date('2024-01-20T11:00:00'),
    read: false,
    priority: 'high',
    actionUrl: '/dashboard/bids',
    actionLabel: 'View Details'
  },
  {
    id: '1',
    type: 'bid',
    title: 'Outbid on Toyota Supra',
    description: 'Another bidder has placed a higher bid of ¥5,300,000. Place a new bid to stay in the auction.',
    timestamp: new Date('2024-01-20T10:30:00'),
    read: false,
    priority: 'high',
    actionUrl: '/dashboard/search',
    actionLabel: 'Place New Bid'
  },
  {
    id: '2',
    type: 'auction',
    title: 'Auction Ending Soon',
    description: 'The auction for Nissan Skyline GT-R ends in 2 hours. Current bid: ¥4,800,000',
    timestamp: new Date('2024-01-20T09:00:00'),
    read: false,
    priority: 'high',
    actionUrl: '/dashboard/search',
    actionLabel: 'View Auction'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Confirmed',
    description: 'Your deposit of ¥500,000 has been successfully processed and added to your account.',
    timestamp: new Date('2024-01-19T15:45:00'),
    read: true,
    priority: 'medium',
    actionUrl: '/dashboard/history',
    actionLabel: 'View Transaction'
  },
  {
    id: '4',
    type: 'auction',
    title: 'You Won the Auction!',
    description: 'Congratulations! You won the auction for Mazda RX-7 Type R with a bid of ¥3,500,000.',
    timestamp: new Date('2024-01-19T12:00:00'),
    read: true,
    priority: 'high',
    actionUrl: '/dashboard/bids',
    actionLabel: 'View Details'
  },
  {
    id: '5',
    type: 'message',
    title: 'New Message from Dealer',
    description: 'Tokyo Auto Imports has sent you a message regarding your inquiry about Honda NSX.',
    timestamp: new Date('2024-01-18T16:30:00'),
    read: true,
    priority: 'medium',
    actionUrl: '/dashboard/messages',
    actionLabel: 'Read Message'
  },
  {
    id: '6',
    type: 'system',
    title: 'Account Verification Complete',
    description: 'Your account has been successfully verified. You now have access to all premium features.',
    timestamp: new Date('2024-01-18T10:00:00'),
    read: true,
    priority: 'low'
  },
  {
    id: '7',
    type: 'alert',
    title: 'New Matching Vehicle',
    description: 'A new Subaru Impreza WRX STI matching your saved search criteria has been listed.',
    timestamp: new Date('2024-01-17T14:20:00'),
    read: true,
    priority: 'medium',
    actionUrl: '/dashboard/search',
    actionLabel: 'View Vehicle'
  },
  {
    id: '8',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance will be performed on Jan 25, 2024 from 2:00 AM to 4:00 AM JST.',
    timestamp: new Date('2024-01-17T09:00:00'),
    read: true,
    priority: 'low'
  }
]

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [filter, setFilter] = useState<string>('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'bid':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'auction':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'payment':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        )
      case 'message':
        return (
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        )
      case 'alert':
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        )
      case 'bid-update':
        return (
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'system':
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

    if (days > 7) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id))
  }

  const filteredNotifications = notificationsList.filter(n => {
    if (showUnreadOnly && n.read) return false
    if (filter !== 'all' && n.type !== filter) return false
    return true
  })

  const unreadCount = notificationsList.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
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
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              {(['all', 'bid', 'auction', 'payment', 'message', 'alert', 'system'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === type
                      ? 'bg-[#FA7921] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4 text-[#FA7921] rounded focus:ring-[#FA7921]"
                />
                <span className="text-sm text-gray-600">Unread only</span>
              </label>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No notifications to show</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border ${
                  !notification.read ? 'border-[#FA7921]/30 bg-orange-50/30' : 'border-gray-100'
                } p-4 hover:shadow-md transition-all`}
              >
                <div className="flex gap-4">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-[#FA7921] rounded-full"></span>
                          )}
                          {notification.priority === 'high' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                              Important
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                          {notification.actionUrl && (
                            <Link
                              href={notification.actionUrl}
                              className="text-xs font-medium text-[#FA7921] hover:text-[#FA7921]/80"
                            >
                              {notification.actionLabel}
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Mark as read"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings Link */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard/profile?tab=notifications"
            className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage notification settings
          </Link>
        </div>
      </div>
    </div>
  )
}