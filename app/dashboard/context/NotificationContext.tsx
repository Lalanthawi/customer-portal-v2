'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { sharedDataStore } from '../utils/sharedData'

interface Notification {
  id: string
  type: 'translation' | 'inspection' | 'bid' | 'win' | 'info'
  title: string
  message: string
  time: Date
  read: boolean
  vehicleId?: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'bid',
      title: 'Outbid on Toyota Camry',
      message: 'Someone placed a higher bid on 2023 Toyota Camry',
      time: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: '2',
      type: 'win',
      title: 'Auction Won!',
      message: 'You won the auction for 2022 Honda Civic',
      time: new Date(Date.now() - 1800000),
      read: false
    }
  ])

  // Subscribe to all vehicle updates for notifications
  useEffect(() => {
    const subscriptions: (() => void)[] = []
    
    // Subscribe to specific vehicles (in production, this would be user-specific)
    const vehicleIds = ['1', '2', '3', '4', '5']
    
    vehicleIds.forEach(vehicleId => {
      const unsubscribe = sharedDataStore.subscribe(vehicleId, (type, data) => {
        let title = ''
        let message = ''
        
        if (type === 'translation') {
          switch (data.status) {
            case 'requested':
              title = 'Translation Requested'
              message = `Translation requested for vehicle ${vehicleId}`
              break
            case 'translating':
              title = 'Translation In Progress'
              message = `Translation is being processed for vehicle ${vehicleId}`
              break
            case 'translated':
              title = 'Translation Complete!'
              message = `Translation completed for vehicle ${vehicleId}. View it now!`
              break
          }
        } else if (type === 'inspection') {
          switch (data.status) {
            case 'requested':
              title = 'Inspection Requested'
              message = `Inspection requested for vehicle ${vehicleId}`
              break
            case 'processing':
              title = 'Inspection In Progress'
              message = `Inspector is examining vehicle ${vehicleId}`
              break
            case 'completed':
              title = 'Inspection Complete!'
              message = `Inspection report ready for vehicle ${vehicleId}. View it now!`
              break
          }
        }
        
        if (title && message) {
          addNotification({
            type: type as 'translation' | 'inspection',
            title,
            message,
            vehicleId
          })
        }
      })
      
      subscriptions.push(unsubscribe)
    })
    
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe())
    }
  }, [])

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: new Date(),
      read: false
    }
    
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}