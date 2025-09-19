import { Vehicle } from '@/src/types/api.types'
import { getRandomAuctionHouse } from '@/src/data/auctionHouses'

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