export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 
  'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export type BidStatus = 'pending' | 'winning' | 'outbid' | 'won' | 'lost' | 'partial-win'

// Individual vehicle in a group
export interface GroupVehicle {
  id: string
  vehicleId: string
  title: string
  image: string
  specs: {
    year: number
    mileage: string
    transmission: string
  }
  startingPrice: number
  currentHighestBid: number
  yourBid?: number
  bidStatus?: BidStatus
  auctionEndTime: Date
}

// Group configuration - "Buy Y from X vehicles"
export interface BidGroup {
  groupId: GroupId
  name: string
  description: string
  vehicles: GroupVehicle[]
  requiredWins: number // Y - number of cars to win from this group
  totalVehicles: number // X - total number of vehicles in the group
  status: 'active' | 'completed' | 'cancelled'
  createdAt: Date
  endTime: Date
}

// User's bid on a specific vehicle within a group
export interface VehicleBid {
  id: string
  groupId: GroupId
  vehicleId: string
  bidAmount: number
  status: BidStatus
  placedAt: Date
  lastUpdated: Date
}

// Summary of user's group bidding activity
export interface GroupBidSummary {
  groupId: GroupId
  groupName: string
  requiredWins: number
  totalVehicles: number
  vehicleBids: VehicleBid[]
  currentWins: number
  potentialWins: number
  totalBidAmount: number
  status: 'in-progress' | 'requirement-met' | 'requirement-not-met' | 'partial'
}

export interface GroupBidFormData {
  groupId: GroupId
  vehicleId: string
  bidAmount: number
}

export interface WebSocketMessage {
  type: 'bid_update' | 'status_change' | 'auction_end' | 'group_update'
  groupId: GroupId
  vehicleId?: string
  data: {
    highestBid?: number
    totalBidders?: number
    status?: BidStatus
    winnerId?: string
    groupStatus?: string
  }
}

export interface ValidationError {
  field: 'groupId' | 'vehicleId' | 'bidAmount' | 'requiredWins'
  message: string
}

export const GROUP_IDS: GroupId[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]