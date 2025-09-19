import {
  Inspection,
  Translation,
  Bid,
  Notification,
  ApiResponse,
  PaginatedResponse
} from '@/src/types/api.types'

import { mockVehicles } from './vehicles.mock'
import { mockUsers } from './users.mock'
import { mockAuctions } from './auctions.mock'
import { mockInspections } from './inspections.mock'
import { mockTranslations } from './translations.mock'
import { mockBids } from './bids.mock'
import { mockNotifications } from './notifications.mock'

// Mock API Response Generators
export function createApiResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: message || 'Success',
    timestamp: new Date().toISOString(),
  }
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 20
): PaginatedResponse<T> {
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedData = data.slice(start, end)

  return {
    data: paginatedData,
    pagination: {
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit),
    },
  }
}

// Mock Data Store (simulates backend database)
export class MockDataStore {
  vehicles = mockVehicles
  auctions = mockAuctions
  inspections = mockInspections
  translations = mockTranslations
  bids = mockBids
  users = mockUsers
  notifications = mockNotifications

  // Add methods to simulate CRUD operations
  addBid(bid: Omit<Bid, 'id' | 'timestamp'>) {
    const newBid: Bid = {
      ...bid,
      id: `bid${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
    this.bids.push(newBid)
    return newBid
  }

  requestInspection(vehicleId: string, userId: string) {
    const inspection: Inspection = {
      id: `insp${Date.now()}`,
      vehicleId,
      status: 'requested',
      requestedBy: userId,
      requestedAt: new Date().toISOString(),
      photos: [],
      videos: [],
      fee: 3000,
    }
    this.inspections.push(inspection)

    // Simulate processing after 3 seconds
    setTimeout(() => {
      inspection.status = 'processing'
    }, 3000)

    // Simulate completion after 6 seconds
    setTimeout(() => {
      inspection.status = 'completed'
      inspection.completedAt = new Date().toISOString()
      inspection.report = 'Inspection completed successfully'
      inspection.photos = ['/mock/photo1.jpg', '/mock/photo2.jpg']
      inspection.videos = ['/mock/video1.mp4']
    }, 6000)

    return inspection
  }

  requestTranslation(vehicleId: string, userId: string) {
    const translation: Translation = {
      id: `trans${Date.now()}`,
      vehicleId,
      status: 'requested',
      requestedBy: userId,
      requestedAt: new Date().toISOString(),
      fee: 1500,
    }
    this.translations.push(translation)

    // Simulate processing after 2 seconds
    setTimeout(() => {
      translation.status = 'translating'
    }, 2000)

    // Simulate completion after 4 seconds
    setTimeout(() => {
      translation.status = 'translated'
      translation.completedAt = new Date().toISOString()
      translation.translation = 'Translated auction sheet content...'
      translation.originalSheet = 'Original Japanese content...'
    }, 4000)

    return translation
  }

  addNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
    const newNotification: Notification = {
      ...notification,
      id: `notif${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.notifications.push(newNotification)
    return newNotification
  }

  markNotificationRead(id: string) {
    const notification = this.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
    return notification
  }

  getVehicleById(id: string) {
    return this.vehicles.find(v => v.id === id)
  }

  getAuctionById(id: string) {
    return this.auctions.find(a => a.id === id)
  }

  getBidsByVehicle(vehicleId: string) {
    return this.bids.filter(b => b.vehicleId === vehicleId)
  }

  getInspectionByVehicle(vehicleId: string) {
    return this.inspections.find(i => i.vehicleId === vehicleId)
  }

  getTranslationByVehicle(vehicleId: string) {
    return this.translations.find(t => t.vehicleId === vehicleId)
  }

  getUserNotifications(userId: string) {
    return this.notifications.filter(n => n.userId === userId)
  }
}

// Export singleton instance
export const mockDataStore = new MockDataStore()