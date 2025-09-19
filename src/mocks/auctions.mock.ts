import { Auction } from '@/src/types/api.types'
import { getTodayAuctionHouses } from '@/src/data/auctionHouses'
import { mockVehicles } from './vehicles.mock'

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