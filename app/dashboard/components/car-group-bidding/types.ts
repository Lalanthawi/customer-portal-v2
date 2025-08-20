export interface Car {
  id: string
  groupId: string // 'A', 'B', etc.
  title: string
  image: string
  price: number
  year: number
  mileage: string
  transmission: string
  fuel: string
}

export interface GroupBid {
  id: string
  groupId: string
  bidAmount: number
  quantity: number
  totalAmount: number
  status: 'pending' | 'winning' | 'outbid' | 'won' | 'lost'
  timestamp: Date
}

export interface GroupInfo {
  groupId: string
  totalVehicles: number
  currentWinningBid?: number
  totalBidders: number
  userBid?: GroupBid
  sampleVehicles: Car[]
  endTime: Date
  minBidIncrement: number
}

export interface InlineBidData {
  amount: number
  quantity: number
}

export type BidStatus = 'winning' | 'outbid' | 'pending' | 'none'