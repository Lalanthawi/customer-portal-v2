import { Notification } from '@/src/types/api.types'

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'bid',
    title: 'Outbid on Toyota Camry',
    message: 'Someone placed a higher bid on 2023 Toyota Camry',
    read: false,
    vehicleId: '1',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'notif2',
    userId: 'user1',
    type: 'auction',
    title: 'Auction Won!',
    message: 'You won the auction for 2022 Honda Civic',
    read: false,
    vehicleId: '2',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
]