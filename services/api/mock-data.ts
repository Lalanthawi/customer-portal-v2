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

// Comprehensive Mock Vehicles Data
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
  {
    id: '2',
    chassisNumber: 'GDJ250W-9876543',
    make: 'Toyota',
    model: 'Land Cruiser 250 VX',
    year: 2024,
    mileage: 15000,
    transmission: 'Automatic',
    displacement: 2800,
    color: 'Black',
    fuel: 'Diesel',
    drive: '4WD',
    doors: 5,
    seats: 7,
    bodyType: 'SUV',
    engineNumber: '1GD-FTV-123456',
    registrationDate: '2024-01-10',
    inspectionDate: '2024-06-10',
    images: [
      '/images/singlecar/0.jpeg',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    equipment: ['Leather', 'Sunroof', 'Navigation', 'Cruise Control', '360 Camera'],
    condition: 'excellent',
    scores: {
      interior: 5.0,
      exterior: 5.0,
      overall: 5.0
    },
    pricing: {
      startPrice: 5600000,
      currentBid: 5600000,
      averagePrice: 6000000
    },
    auction: {
      id: 'auction2',
      deadline: '2024-01-10T10:00:00',
      location: 'TAA Kinki',
      result: 'sold',
      lotNumber: '2024-0892',
      status: 'ended'
    },
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '5',
      shift: 'F10',
      openingDay: '2024-01-10 10:00',
      grade: 'VX Premium',
      holdingFrequency: '2024',
      colorSubstitution: 'equipped',
      holdingHall: 'TAA Kinki',
      yearH: 'R6 year',
      notes: [
        'Brand new vehicle',
        'Full warranty available',
        'Premium package'
      ]
    },
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    chassisNumber: 'RU1-2023456',
    make: 'Honda',
    model: 'Vezel Hybrid',
    year: 2022,
    mileage: 32000,
    transmission: 'CVT',
    displacement: 1500,
    color: 'Silver',
    fuel: 'Hybrid',
    drive: 'FF',
    doors: 5,
    seats: 5,
    bodyType: 'SUV',
    engineNumber: 'LEB-H4-789012',
    registrationDate: '2022-05-15',
    inspectionDate: '2024-05-15',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    ],
    equipment: ['P/S', 'P/W', 'ABS', 'LED', 'Honda SENSING'],
    condition: 'excellent',
    scores: {
      interior: 4.5,
      exterior: 4.5,
      overall: 4.5
    },
    pricing: {
      startPrice: 3200000,
      currentBid: 3200000,
      averagePrice: 3500000
    },
    auction: {
      id: 'direct1',
      deadline: '2024-01-05T00:00:00',
      location: 'Direct Purchase',
      result: 'sold',
      lotNumber: 'DIRECT-001',
      status: 'ended'
    },
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '4.5',
      shift: 'CVT',
      openingDay: '2024-01-05',
      grade: 'Hybrid X',
      holdingFrequency: '2022',
      colorSubstitution: 'equipped',
      holdingHall: 'Dealer Stock',
      yearH: 'R4 year',
      notes: [
        'Direct purchase from dealer',
        'Low mileage',
        'Well maintained'
      ]
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '4',
    chassisNumber: 'ZE1-001234',
    make: 'Nissan',
    model: 'Leaf',
    year: 2019,
    mileage: 45000,
    transmission: 'Automatic',
    displacement: 0,
    color: 'White',
    fuel: 'Electric',
    drive: 'FF',
    doors: 5,
    seats: 5,
    bodyType: 'Hatchback',
    engineNumber: 'EM57-123456',
    registrationDate: '2019-09-20',
    inspectionDate: '2023-09-20',
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    ],
    equipment: ['ProPilot', 'e-Pedal', 'Quick Charge', 'Navigation'],
    condition: 'good',
    scores: {
      interior: 4.0,
      exterior: 4.0,
      overall: 4.0
    },
    pricing: {
      startPrice: 2800000,
      currentBid: 2800000,
      averagePrice: 3000000
    },
    auction: {
      id: 'export1',
      deadline: '2023-11-15T00:00:00',
      location: 'Export',
      result: 'exported',
      lotNumber: 'EXPORT-001',
      status: 'ended'
    },
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '4',
      shift: 'AT',
      openingDay: '2023-11-15',
      grade: 'G',
      holdingFrequency: '2019',
      colorSubstitution: 'equipped',
      holdingHall: 'Export Service',
      yearH: 'R1 year',
      notes: [
        'Electric vehicle',
        'Battery health 85%',
        'Export ready'
      ]
    },
    createdAt: '2023-11-15T00:00:00Z',
    updatedAt: '2023-11-15T00:00:00Z'
  },
  {
    id: '5',
    chassisNumber: 'JM3KFBDM1L0123456',
    make: 'Mazda',
    model: 'CX-5',
    year: 2020,
    mileage: 68000,
    transmission: 'Automatic',
    displacement: 2500,
    color: 'Soul Red',
    fuel: 'Gasoline',
    drive: 'AWD',
    doors: 5,
    seats: 5,
    bodyType: 'SUV',
    engineNumber: 'PY-VPS-456789',
    registrationDate: '2020-03-10',
    inspectionDate: '2023-03-10',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    equipment: ['Leather', 'Bose Audio', 'HUD', 'Adaptive Cruise', 'Lane Keep'],
    condition: 'excellent',
    scores: {
      interior: 4.5,
      exterior: 4.5,
      overall: 4.5
    },
    pricing: {
      startPrice: 4500000,
      currentBid: 4500000,
      averagePrice: 4800000
    },
    auction: {
      id: 'auction3',
      deadline: '2023-06-20T11:00:00',
      location: getRandomAuctionHouse(),
      result: 'sold',
      lotNumber: '78234',
      status: 'ended'
    },
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '4.5',
      shift: 'F6',
      openingDay: '2023-06-20 11:00',
      grade: '25S L Package',
      holdingFrequency: '2020',
      colorSubstitution: 'equipped',
      holdingHall: getRandomAuctionHouse(),
      yearH: 'R2 year',
      notes: [
        'Top trim level',
        'Full options',
        'Service history complete'
      ]
    },
    createdAt: '2023-06-20T00:00:00Z',
    updatedAt: '2023-06-20T00:00:00Z'
  },
  {
    id: '6',
    chassisNumber: 'ZVW51-8234567',
    make: 'Toyota',
    model: 'Prius',
    year: 2021,
    mileage: 28000,
    transmission: 'CVT',
    displacement: 1800,
    color: 'Blue',
    fuel: 'Hybrid',
    drive: 'FF',
    doors: 5,
    seats: 5,
    bodyType: 'Sedan',
    engineNumber: '2ZR-FXE-112233',
    registrationDate: '2021-07-01',
    inspectionDate: '2024-07-01',
    images: [
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    ],
    equipment: ['TSS', 'JBL Audio', 'HUD', 'Wireless Charging', 'Smart Key'],
    condition: 'excellent',
    scores: {
      interior: 4.5,
      exterior: 4.0,
      overall: 4.5
    },
    pricing: {
      startPrice: 3800000,
      currentBid: 3800000,
      averagePrice: 4000000
    },
    auction: {
      id: 'auction4',
      deadline: '2024-01-25T14:00:00',
      location: getRandomAuctionHouse(),
      result: 'not yet auction',
      lotNumber: '15789',
      status: 'upcoming'
    },
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '4.5',
      shift: 'CVT',
      openingDay: '2024-01-25 14:00',
      grade: 'A Premium',
      holdingFrequency: '2021',
      colorSubstitution: 'equipped',
      holdingHall: getRandomAuctionHouse(),
      yearH: 'R3 year',
      notes: [
        'Latest model',
        'Excellent fuel economy',
        'Advanced safety features'
      ]
    },
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  }
]

// Mock Auctions
export const mockAuctions: Auction[] = [
  {
    id: 'auction1',
    name: (getTodayAuctionHouses()[0] || 'Unknown') + ' Weekly Auction',
    date: new Date().toISOString(),
    location: getTodayAuctionHouses()[0] || 'Unknown',
    totalVehicles: 150,
    status: 'live',
    vehicles: mockVehicles.slice(0, 5),
  },
  {
    id: 'auction2',
    name: (getTodayAuctionHouses()[1] || 'Unknown') + ' Special Sale',
    date: new Date(Date.now() + 86400000).toISOString(),
    location: getTodayAuctionHouses()[1] || 'Unknown',
    totalVehicles: 200,
    status: 'upcoming',
    vehicles: [],
  },
]

// Comprehensive Mock Inspections Data
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
      '/inspections/photo4.jpg',
      '/inspections/photo5.jpg',
      '/inspections/photo6.jpg',
      '/inspections/photo7.jpg',
      '/inspections/photo8.jpg',
    ],
    videos: [
      '/inspections/engine-start.mp4',
      '/inspections/walkaround.mp4',
    ],
    remarks: 'Engine runs smooth, minor wear on driver seat, AC working perfectly, all electronics functional',
    fee: 3000,
  },
  {
    id: 'insp2',
    vehicleId: '2',
    status: 'completed',
    requestedBy: 'user1',
    requestedAt: '2024-01-08T09:00:00Z',
    completedAt: '2024-01-09T14:00:00Z',
    report: 'Brand new vehicle in pristine condition. No issues found.',
    photos: [
      '/inspections/lc250-001/photo1.jpg',
      '/inspections/lc250-001/photo2.jpg',
      '/inspections/lc250-001/photo3.jpg',
      '/inspections/lc250-001/photo4.jpg',
    ],
    videos: [
      '/inspections/lc250-001/test-drive.mp4',
    ],
    remarks: 'Perfect condition, all features working, ready for export',
    fee: 3000,
  },
  {
    id: 'insp3',
    vehicleId: '3',
    status: 'processing',
    requestedBy: 'user1',
    requestedAt: '2024-01-24T10:00:00Z',
    photos: [],
    videos: [],
    fee: 3000,
  },
  {
    id: 'insp4',
    vehicleId: '4',
    status: 'requested',
    requestedBy: 'user1',
    requestedAt: '2024-01-25T11:00:00Z',
    photos: [],
    videos: [],
    fee: 3000,
  },
  {
    id: 'insp5',
    vehicleId: '5',
    status: 'completed',
    requestedBy: 'user1',
    requestedAt: '2023-06-18T10:00:00Z',
    completedAt: '2023-06-19T16:00:00Z',
    report: 'Well-maintained vehicle with complete service history. Minor stone chips on front bumper.',
    photos: [
      '/inspections/cx5-001/photo1.jpg',
      '/inspections/cx5-001/photo2.jpg',
      '/inspections/cx5-001/photo3.jpg',
      '/inspections/cx5-001/photo4.jpg',
    ],
    videos: [
      '/inspections/cx5-001/interior-check.mp4',
      '/inspections/cx5-001/engine-bay.mp4',
    ],
    remarks: 'Premium package with all options, Bose sound system excellent, minor wear on driver side floor mat',
    fee: 3000,
  },
  {
    id: 'insp6',
    vehicleId: '6',
    status: 'requested',
    requestedBy: 'user2',
    requestedAt: new Date(Date.now() - 86400000).toISOString(),
    photos: [],
    videos: [],
    fee: 3000,
  }
]

// Comprehensive Mock Translations Data
export const mockTranslations: Translation[] = [
  {
    id: 'trans1',
    vehicleId: '1',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2024-01-15T10:00:00Z',
    completedAt: '2024-01-15T12:00:00Z',
    translation: 'Toyota Corolla Axio 2018\n- Grade: 4WD Evolution 9 MR GSR\n- Interior Score: 4.5/5\n- Exterior Score: 4.0/5\n- Equipment: Power steering, Power windows, ABS, Leather seats, Airbags\n- Condition: Bidding is possible, vehicle in excellent condition\n- Notes: One owner vehicle, full service history available, non-smoking vehicle, garage kept',
    originalSheet: '車両情報：トヨタ カローラ アクシオ 2018年式\nグレード：4WD Evolution 9 MR GSR\n内装評価：4.5\n外装評価：4.0',
    fee: 0,
  },
  {
    id: 'trans2',
    vehicleId: '2',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2024-01-08T09:00:00Z',
    completedAt: '2024-01-08T10:00:00Z',
    translation: 'Toyota Land Cruiser 250 VX 2024\n- Grade: VX Premium\n- Interior Score: 5.0/5\n- Exterior Score: 5.0/5\n- Equipment: Full leather, Sunroof, Navigation, 360 camera, Cruise control\n- Condition: Brand new vehicle\n- Notes: Premium package, full warranty',
    originalSheet: 'トヨタ ランドクルーザー250 VX 2024年式',
    fee: 0,
  },
  {
    id: 'trans3',
    vehicleId: '3',
    status: 'translating',
    requestedBy: 'user1',
    requestedAt: '2024-01-24T11:00:00Z',
    fee: 0,
  },
  {
    id: 'trans4',
    vehicleId: '4',
    status: 'requested',
    requestedBy: 'user1',
    requestedAt: '2024-01-25T12:00:00Z',
    fee: 0,
  },
  {
    id: 'trans5',
    vehicleId: '5',
    status: 'translated',
    requestedBy: 'user1',
    requestedAt: '2023-06-18T10:00:00Z',
    completedAt: '2023-06-18T11:00:00Z',
    translation: 'Mazda CX-5 2020\n- Grade: 25S L Package\n- Interior Score: 4.5/5\n- Exterior Score: 4.5/5\n- Equipment: Leather seats, Bose audio, HUD, Adaptive cruise, Lane keep assist\n- Condition: Excellent, top trim level\n- Notes: Full options, complete service history',
    originalSheet: 'マツダ CX-5 2020年式 25S Lパッケージ',
    fee: 0,
  },
  {
    id: 'trans6',
    vehicleId: '6',
    status: 'requested',
    requestedBy: 'user2',
    requestedAt: new Date(Date.now() - 43200000).toISOString(),
    fee: 0,
  }
]

// Comprehensive Mock Bids Data
export const mockBids: Bid[] = [
  // Bids for vehicle 1 - Active auction
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
  // Bids for vehicle 2 - Won auction
  {
    id: 'bid4',
    vehicleId: '2',
    amount: 5200000,
    message: 'Opening bid',
    userId: 'user2',
    userName: 'Suzuki San',
    timestamp: '2024-01-10T08:00:00Z',
    status: 'outbid'
  },
  {
    id: 'bid5',
    vehicleId: '2',
    amount: 5400000,
    message: 'Counter bid',
    userId: 'user3',
    userName: 'Yamamoto San',
    timestamp: '2024-01-10T08:30:00Z',
    status: 'outbid'
  },
  {
    id: 'bid6',
    vehicleId: '2',
    amount: 5600000,
    message: 'Winning bid',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: '2024-01-10T09:00:00Z',
    status: 'won'
  },
  // Bids for vehicle 3 - Lost auction
  {
    id: 'bid7',
    vehicleId: '3',
    amount: 3000000,
    message: 'Starting bid',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: '2024-01-05T10:00:00Z',
    status: 'outbid'
  },
  {
    id: 'bid8',
    vehicleId: '3',
    amount: 3100000,
    message: 'Increased bid',
    userId: 'user4',
    userName: 'Watanabe San',
    timestamp: '2024-01-05T10:30:00Z',
    status: 'outbid'
  },
  {
    id: 'bid9',
    vehicleId: '3',
    amount: 3200000,
    message: 'Final bid - won by other',
    userId: 'user5',
    userName: 'Ito San',
    timestamp: '2024-01-05T11:00:00Z',
    status: 'won'
  },
  // Bids for vehicle 5
  {
    id: 'bid10',
    vehicleId: '5',
    amount: 4300000,
    message: 'Strong opening',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: '2023-06-20T09:00:00Z',
    status: 'outbid'
  },
  {
    id: 'bid11',
    vehicleId: '5',
    amount: 4500000,
    message: 'Final winning bid',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: '2023-06-20T10:00:00Z',
    status: 'won'
  },
  // Bids for vehicle 6 - Upcoming auction
  {
    id: 'bid12',
    vehicleId: '6',
    amount: 3700000,
    message: 'Pre-bid placed',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'pending'
  },
  {
    id: 'bid13',
    vehicleId: '6',
    amount: 3750000,
    message: 'Competitive pre-bid',
    userId: 'user2',
    userName: 'Suzuki San',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'pending'
  },
  {
    id: 'bid14',
    vehicleId: '6',
    amount: 3800000,
    message: 'Maximum pre-bid',
    userId: 'user1',
    userName: 'Tanaka San',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: 'pending'
  }
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

// Manufacturers Data (for auctions page)
export interface Manufacturer {
  id: string
  name: string
  vehicleCount: number
  popular?: boolean
}

export const mockManufacturers: Manufacturer[] = [
  // Japanese
  { id: 'toyota', name: 'Toyota', vehicleCount: 245, popular: true },
  { id: 'lexus', name: 'Lexus', vehicleCount: 156, popular: true },
  { id: 'honda', name: 'Honda', vehicleCount: 198, popular: true },
  { id: 'nissan', name: 'Nissan', vehicleCount: 167, popular: true },
  { id: 'mazda', name: 'Mazda', vehicleCount: 145, popular: true },
  { id: 'subaru', name: 'Subaru', vehicleCount: 134 },
  { id: 'suzuki', name: 'Suzuki', vehicleCount: 156 },
  { id: 'mitsubishi', name: 'Mitsubishi', vehicleCount: 98 },
  { id: 'daihatsu', name: 'Daihatsu', vehicleCount: 67 },
  { id: 'infiniti', name: 'Infiniti', vehicleCount: 54 },
  { id: 'acura', name: 'Acura', vehicleCount: 43 },
  { id: 'isuzu', name: 'Isuzu', vehicleCount: 38 },

  // German
  { id: 'mercedes', name: 'Mercedes-Benz', vehicleCount: 134 },
  { id: 'bmw', name: 'BMW', vehicleCount: 145, popular: true },
  { id: 'audi', name: 'Audi', vehicleCount: 123 },
  { id: 'volkswagen', name: 'Volkswagen', vehicleCount: 112 },
  { id: 'porsche', name: 'Porsche', vehicleCount: 89, popular: true },
  { id: 'mini', name: 'MINI', vehicleCount: 56 },
  { id: 'smart', name: 'Smart', vehicleCount: 23 },
  { id: 'opel', name: 'Opel', vehicleCount: 31 },

  // American
  { id: 'tesla', name: 'Tesla', vehicleCount: 45, popular: true },
  { id: 'ford', name: 'Ford', vehicleCount: 178 },
  { id: 'chevrolet', name: 'Chevrolet', vehicleCount: 134 },
  { id: 'jeep', name: 'Jeep', vehicleCount: 92 },
  { id: 'dodge', name: 'Dodge', vehicleCount: 78 },
  { id: 'cadillac', name: 'Cadillac', vehicleCount: 34 },
  { id: 'gmc', name: 'GMC', vehicleCount: 67 },
  { id: 'chrysler', name: 'Chrysler', vehicleCount: 29 },
  { id: 'lincoln', name: 'Lincoln', vehicleCount: 21 },
  { id: 'ram', name: 'RAM', vehicleCount: 45 },
  { id: 'hummer', name: 'Hummer', vehicleCount: 12 },

  // British
  { id: 'jaguar', name: 'Jaguar', vehicleCount: 67 },
  { id: 'land-rover', name: 'Land Rover', vehicleCount: 78 },
  { id: 'bentley', name: 'Bentley', vehicleCount: 7 },
  { id: 'rolls-royce', name: 'Rolls-Royce', vehicleCount: 5 },
  { id: 'aston-martin', name: 'Aston Martin', vehicleCount: 9 },
  { id: 'mclaren', name: 'McLaren', vehicleCount: 6 },
  { id: 'lotus', name: 'Lotus', vehicleCount: 11 },
  { id: 'mg', name: 'MG', vehicleCount: 24 },

  // Korean
  { id: 'hyundai', name: 'Hyundai', vehicleCount: 189 },
  { id: 'kia', name: 'Kia', vehicleCount: 145 },
  { id: 'genesis', name: 'Genesis', vehicleCount: 23 },
  { id: 'ssangyong', name: 'SsangYong', vehicleCount: 18 },

  // Italian
  { id: 'ferrari', name: 'Ferrari', vehicleCount: 12 },
  { id: 'lamborghini', name: 'Lamborghini', vehicleCount: 8 },
  { id: 'maserati', name: 'Maserati', vehicleCount: 15 },
  { id: 'alfa-romeo', name: 'Alfa Romeo', vehicleCount: 19 },
  { id: 'fiat', name: 'Fiat', vehicleCount: 28 },
  { id: 'lancia', name: 'Lancia', vehicleCount: 14 },

  // French
  { id: 'peugeot', name: 'Peugeot', vehicleCount: 67 },
  { id: 'renault', name: 'Renault', vehicleCount: 54 },
  { id: 'citroen', name: 'Citroen', vehicleCount: 41 },
  { id: 'alpine', name: 'Alpine', vehicleCount: 3 },
  { id: 'bugatti', name: 'Bugatti', vehicleCount: 2 },

  // Swedish
  { id: 'volvo', name: 'Volvo', vehicleCount: 89 },
  { id: 'polestar', name: 'Polestar', vehicleCount: 12 },
  { id: 'koenigsegg', name: 'Koenigsegg', vehicleCount: 1 },

  // Other
  { id: 'pagani', name: 'Pagani', vehicleCount: 2 },
  { id: 'rimac', name: 'Rimac', vehicleCount: 1 },
  { id: 'lucid', name: 'Lucid', vehicleCount: 8 },
  { id: 'rivian', name: 'Rivian', vehicleCount: 14 },
]

// Types for Bids page
export type BidStatus = 'won' | 'lost' | 'active' | 'outbid'

export interface AuctionBid {
  id: string
  auctionId: string
  vehicleTitle: string
  vehicleImage: string
  vehicleSpecs: {
    year: number
    mileage: string
    transmission: string
    engine: string
  }
  startingPrice: number
  yourBid: number
  currentHighestBid: number
  numberOfBids: number
  status: BidStatus
  bidDate: Date
  auctionEndDate: Date
  winningBid?: number
  paymentStatus?: 'pending' | 'processing' | 'completed'
  shippingStatus?: 'pending' | 'preparing' | 'shipped' | 'in_transit' | 'delivered'
  location: string
  auctionHouse: {
    name: string
    rating: number
    verified: boolean
  }
  groupInfo?: {
    groupId: string
    groupName: string
    requiredWins: number
    totalVehicles: number
    currentWins: number
  }
}

// Vehicle Status types for My Vehicles page
export type VehicleSource = 'auction' | 'direct' | 'export'
export type VehicleStatus = 'payment_pending' | 'preparing' | 'in_transit' | 'at_port' | 'delivered' | 'completed'

// Extended Vehicle interface for My Vehicles page
export interface MyVehicle {
  id: string
  title: string
  image: string
  vin?: string
  chassisNumber?: string
  source: VehicleSource
  purchaseDate: Date
  status: VehicleStatus
  location?: string
  price: number
  documents: {
    invoice?: boolean
    exportCertificate?: boolean
    billOfLading?: boolean
    deregistration?: boolean
    inspection?: boolean
  }
  shipping?: {
    vessel?: string
    eta?: Date
    departurePort?: string
    arrivalPort?: string
  }
  auctionDetails?: {
    auctionHouse: string
    lotNumber: string
    auctionDate: Date
  }
  notes?: string
}

// Mock Auction Bids Data
export const mockAuctionBids: AuctionBid[] = [
  {
    id: '1',
    auctionId: 'AUC-2024-0892',
    vehicleTitle: '2018 Toyota Corolla Axio',
    vehicleImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    vehicleSpecs: {
      year: 2018,
      mileage: '42,360 km',
      transmission: 'Automatic',
      engine: '1.5L'
    },
    startingPrice: 5200000,
    yourBid: 7350000,
    currentHighestBid: 7350000,
    numberOfBids: 23,
    status: 'won',
    bidDate: new Date('2024-01-10'),
    auctionEndDate: new Date('2024-01-10'),
    winningBid: 7350000,
    paymentStatus: 'completed',
    shippingStatus: 'pending',
    location: 'Tokyo, Japan',
    auctionHouse: {
      name: 'Tokyo Motors',
      rating: 4.8,
      verified: true
    },
    groupInfo: {
      groupId: 'A',
      groupName: 'Group A - Premium Sedans',
      requiredWins: 2,
      totalVehicles: 3,
      currentWins: 1
    }
  },
  {
    id: '2',
    auctionId: 'AUC002',
    vehicleTitle: 'Honda Civic 2021',
    vehicleImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    vehicleSpecs: {
      year: 2021,
      mileage: '28,000 km',
      transmission: 'Manual',
      engine: '1.8L V4'
    },
    startingPrice: 1800000,
    yourBid: 1950000,
    currentHighestBid: 2100000,
    numberOfBids: 31,
    status: 'lost',
    bidDate: new Date('2024-01-08'),
    auctionEndDate: new Date('2024-01-12'),
    winningBid: 2100000,
    location: 'Osaka, Japan',
    auctionHouse: {
      name: 'Osaka Auto Hub',
      rating: 4.5,
      verified: true
    }
  },
  {
    id: '3',
    auctionId: 'AUC003',
    vehicleTitle: 'BMW 3 Series 2023',
    vehicleImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    vehicleSpecs: {
      year: 2023,
      mileage: '8,000 km',
      transmission: 'Automatic',
      engine: '2.0L Turbo'
    },
    startingPrice: 4500000,
    yourBid: 4750000,
    currentHighestBid: 4850000,
    numberOfBids: 24,
    status: 'outbid',
    bidDate: new Date('2024-01-18'),
    auctionEndDate: new Date('2024-01-25'),
    location: 'Yokohama, Japan',
    auctionHouse: {
      name: 'Premium Cars Japan',
      rating: 4.9,
      verified: true
    },
    groupInfo: {
      groupId: 'B',
      groupName: 'Group B - Economy Selection',
      requiredWins: 1,
      totalVehicles: 2,
      currentWins: 0
    }
  },
  {
    id: '4',
    auctionId: 'AUC004',
    vehicleTitle: 'Mercedes-Benz C-Class 2022',
    vehicleImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    vehicleSpecs: {
      year: 2022,
      mileage: '15,000 km',
      transmission: 'Automatic',
      engine: '2.0L'
    },
    startingPrice: 3800000,
    yourBid: 4200000,
    currentHighestBid: 4200000,
    numberOfBids: 27,
    status: 'active',
    bidDate: new Date('2024-01-20'),
    auctionEndDate: new Date('2024-01-28'),
    location: 'Nagoya, Japan',
    auctionHouse: {
      name: 'Central Auto Auction',
      rating: 4.6,
      verified: true
    }
  },
  {
    id: '5',
    auctionId: 'AUC005',
    vehicleTitle: 'Tesla Model 3 2023',
    vehicleImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    vehicleSpecs: {
      year: 2023,
      mileage: '5,000 km',
      transmission: 'Automatic',
      engine: 'Electric'
    },
    startingPrice: 5000000,
    yourBid: 5300000,
    currentHighestBid: 5500000,
    numberOfBids: 35,
    status: 'lost',
    bidDate: new Date('2024-01-15'),
    auctionEndDate: new Date('2024-01-15'),
    winningBid: 5500000,
    location: 'Tokyo, Japan',
    auctionHouse: {
      name: 'EV Motors Japan',
      rating: 4.7,
      verified: true
    }
  }
]

// Mock My Vehicles Data
export const mockMyVehicles: MyVehicle[] = [
  {
    id: '1',
    title: '2024 Toyota Land Cruiser 250 VX 4WD',
    image: '/images/singlecar/0.jpeg',
    vin: 'GDJ250W-001234',
    chassisNumber: 'GDJ250W-9876543',
    source: 'auction',
    purchaseDate: new Date('2024-01-10'),
    status: 'in_transit',
    location: 'Pacific Ocean',
    price: 5600000,
    documents: {
      invoice: true,
      exportCertificate: true,
      billOfLading: true,
      deregistration: false,
      inspection: true
    },
    shipping: {
      vessel: 'NYK Delphinus',
      eta: new Date('2024-02-20'),
      departurePort: 'Yokohama Port',
      arrivalPort: 'Los Angeles Port'
    },
    auctionDetails: {
      auctionHouse: 'TAA Kinki',
      lotNumber: '2024-0892',
      auctionDate: new Date('2024-01-10')
    }
  },
  {
    id: '2',
    title: '2022 Honda Vezel Hybrid',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    source: 'direct',
    purchaseDate: new Date('2024-01-05'),
    status: 'delivered',
    location: 'Customer Warehouse',
    price: 3200000,
    documents: {
      invoice: true,
      exportCertificate: true,
      billOfLading: true,
      deregistration: true,
      inspection: true
    },
    notes: 'Direct purchase from dealer stock'
  },
  {
    id: '3',
    title: '2019 Nissan Leaf',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    source: 'export',
    purchaseDate: new Date('2023-11-15'),
    status: 'completed',
    price: 2800000,
    documents: {
      invoice: true,
      exportCertificate: true,
      billOfLading: true,
      deregistration: true,
      inspection: true
    },
    notes: 'Customer personal vehicle export'
  },
  {
    id: '4',
    title: '2020 Mazda CX-5',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    vin: 'JM3KFBDM1L0123456',
    source: 'auction',
    purchaseDate: new Date('2023-06-20'),
    status: 'completed',
    price: 4500000,
    documents: {
      invoice: true,
      exportCertificate: true,
      billOfLading: true,
      deregistration: true,
      inspection: true
    },
    auctionDetails: {
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '78234',
      auctionDate: new Date('2023-06-20')
    }
  },
  {
    id: '5',
    title: '2021 Toyota Prius',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    chassisNumber: 'ZVW51-8234567',
    source: 'auction',
    purchaseDate: new Date('2024-01-25'),
    status: 'preparing',
    location: 'Auction Yard',
    price: 3800000,
    documents: {
      invoice: true,
      exportCertificate: false,
      billOfLading: false,
      deregistration: false,
      inspection: false
    },
    auctionDetails: {
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '15789',
      auctionDate: new Date('2024-01-25')
    }
  }
]

// Export singleton instance
export const mockDataStore = new MockDataStore()