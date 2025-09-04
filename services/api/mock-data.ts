import { 
  Vehicle, 
  Auction, 
  Inspection, 
  Translation, 
  Bid, 
  User,
  Notification,
  ApiResponse,
  PaginatedResponse
} from '@/types/api.types'
import { getRandomAuctionHouse, getTodayAuctionHouses } from '@/src/data/auctionHouses'

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'customer@example.com',
    name: 'John Customer',
    role: 'premium_customer',
    company: 'Import Motors Ltd',
    phone: '+81-90-1234-5678',
    address: 'Tokyo, Japan',
    favoriteVehicles: ['1', '3', '5'],
    bids: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
]

// Mock Vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    chassisNumber: 'NZE161-3153697',
    make: 'Toyota',
    model: 'Corolla Axio',
    year: 2018,
    mileage: 122000,
    transmission: 'Automatic',
    displacement: 2000,
    color: 'Pearl',
    fuel: 'GS',
    drive: '4WD',
    doors: 4,
    seats: 5,
    bodyType: 'Sedan',
    engineNumber: '1NZ-FE-7896543',
    registrationDate: '2019-03-15',
    inspectionDate: '2024-03-15',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1000&q=80',
    ],
    equipment: ['P/S', 'P/W', 'ABS', 'leather', 'airbag'],
    condition: 'bidding is possible',
    scores: {
      interior: 4.5,
      exterior: 4.0,
      overall: 4.5
    },
    pricing: {
      startPrice: 3000000,
      currentBid: 343000,
      averagePrice: 7260000
    },
    auction: {
      id: 'auction1',
      deadline: '2025-09-06T13:10:00',
      location: getRandomAuctionHouse(),
      result: 'not yet auction',
      lotNumber: 'LOT-2024-0892',
      status: 'live'
    },
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '4',
      shift: 'F6',
      openingDay: '2025-09-06 14:10',
      grade: '4WD Evolution 9 MR GSR',
      holdingFrequency: '2010',
      colorSubstitution: 'equipped',
      holdingHall: 'JU Gifu [ Gifu prefecture Hashima city ]',
      yearH: 'H19 year',
      notes: [
        'One owner vehicle',
        'Full service history available',
        'Non-smoking vehicle',
        'Garage kept'
      ]
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  // Add more mock vehicles as needed
]

// Mock Auctions
export const mockAuctions: Auction[] = [
  {
    id: 'auction1',
    name: getTodayAuctionHouses()[0] + ' Weekly Auction',
    date: new Date().toISOString(),
    location: getTodayAuctionHouses()[0],
    totalVehicles: 150,
    status: 'live',
    vehicles: mockVehicles.slice(0, 5),
  },
  {
    id: 'auction2',
    name: getTodayAuctionHouses()[1] + ' Special Sale',
    date: new Date(Date.now() + 86400000).toISOString(),
    location: getTodayAuctionHouses()[1],
    totalVehicles: 200,
    status: 'upcoming',
    vehicles: [],
  },
]

// Mock Inspections
export const mockInspections: Inspection[] = [
  {
    id: 'insp1',
    vehicleId: '1',
    status: 'completed',
    requestedBy: 'user1',
    requestedAt: '2024-01-15T10:00:00Z',
    completedAt: '2024-01-16T15:00:00Z',
    report: 'Vehicle in excellent condition with minor wear consistent with age.',
    photos: [
      '/inspections/photo1.jpg',
      '/inspections/photo2.jpg',
      '/inspections/photo3.jpg',
    ],
    videos: [
      '/inspections/engine-start.mp4',
      '/inspections/walkaround.mp4',
    ],
    remarks: 'Engine runs smooth, minor wear on driver seat, AC working perfectly',
    fee: 3000,
  },
]

// Mock Translations
export const mockTranslations: Translation[] = [
  {
    id: 'trans1',
    vehicleId: '1',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2024-01-15T10:00:00Z',
    completedAt: '2024-01-15T12:00:00Z',
    translation: 'Fully translated auction sheet with all details...',
    originalSheet: 'Original Japanese content...',
    fee: 1500,
  },
]

// Mock Bids
export const mockBids: Bid[] = [
  {
    id: 'bid1',
    vehicleId: '1',
    amount: 330000,
    message: 'Initial bid',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'outbid'
  },
  {
    id: 'bid2',
    vehicleId: '1',
    amount: 335000,
    message: 'Competitive offer',
    userId: 'user2',
    userName: 'Suzuki San',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: 'outbid'
  },
  {
    id: 'bid3',
    vehicleId: '1',
    amount: 343000,
    message: 'Current highest',
    userId: 'user3',
    userName: 'Yamamoto San',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    status: 'accepted'
  },
]

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
class MockDataStore {
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