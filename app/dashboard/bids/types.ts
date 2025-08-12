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
    engine?: string
  }
  startingPrice: number
  yourBid: number
  currentHighestBid: number
  numberOfBids: number
  status: BidStatus
  bidDate: Date
  auctionEndDate: Date
  winningBid?: number
  shippingStatus?: 'pending' | 'in_transit' | 'delivered'
  paymentStatus?: 'pending' | 'completed' | 'failed'
  location?: string
  seller?: {
    name: string
    rating: number
    verified: boolean
  }
}

export interface BidStatistics {
  totalBids: number
  wonAuctions: number
  lostAuctions: number
  activeBids: number
  totalSpent: number
  savedAmount: number
  winRate: number
  avgBidAmount: number
}