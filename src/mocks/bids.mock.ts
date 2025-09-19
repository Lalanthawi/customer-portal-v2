import { Bid } from '@/src/types/api.types'

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