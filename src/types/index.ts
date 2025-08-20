export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'premium'
  createdAt: Date
  updatedAt: Date
}

export interface Vehicle {
  id: string
  title: string
  manufacturer: string
  model: string
  year: number
  mileage: number
  transmission: 'automatic' | 'manual'
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  images: string[]
  description?: string
  features?: string[]
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  location?: string
}

export interface Auction extends Vehicle {
  auctionId: string
  startingPrice: number
  currentBid: number
  minimumIncrement: number
  startDate: Date
  endDate: Date
  status: 'upcoming' | 'active' | 'ended' | 'cancelled'
  bidsCount: number
  watchersCount: number
  sellerId: string
  winnerId?: string
}

export interface Bid {
  id: string
  auctionId: string
  userId: string
  amount: number
  timestamp: Date
  isWinning: boolean
  isAutomatic?: boolean
}

export interface Activity {
  id: string
  type: 'bid' | 'win' | 'outbid' | 'listing' | 'payment' | 'message'
  title: string
  description?: string
  timestamp: Date
  amount?: number
  status?: 'success' | 'pending' | 'failed'
  metadata?: Record<string, unknown>
}

export interface DashboardStats {
  activeAuctions: number
  newListings: number
  totalBids: number
  watchedItems: number
  accountStatus: 'active' | 'premium' | 'suspended'
  accountBalance: number
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
  status: number
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchFilters {
  query?: string
  manufacturer?: string[]
  yearFrom?: number
  yearTo?: number
  priceFrom?: number
  priceTo?: number
  transmission?: string[]
  fuelType?: string[]
  condition?: string[]
  location?: string
}