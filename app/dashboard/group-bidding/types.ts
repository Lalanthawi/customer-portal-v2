export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 
  'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export type BidStatus = 'pending' | 'winning' | 'outbid' | 'won' | 'lost'

export interface GroupBid {
  id: string
  groupId: GroupId
  bidAmount: number
  quantity: number
  totalAmount: number
  status: BidStatus
  timestamp: Date
  highestBid?: number
  totalBidders?: number
}

export interface GroupInfo {
  groupId: GroupId
  currentHighestBid: number
  totalBidders: number
  yourBid?: GroupBid
  status: 'available' | 'has-bid' | 'winning' | 'outbid'
  endTime: Date
}

export interface BidFormData {
  groupId: GroupId | null
  bidAmount: number
  quantity: number
}

export interface WebSocketMessage {
  type: 'bid_update' | 'status_change' | 'auction_end'
  groupId: GroupId
  data: {
    highestBid?: number
    totalBidders?: number
    status?: BidStatus
    winnerId?: string
  }
}

export interface ValidationError {
  field: 'groupId' | 'bidAmount' | 'quantity'
  message: string
}

export const GROUP_IDS: GroupId[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]