// API Response Types
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
  timestamp: string
}

export interface ApiError {
  status: number
  message: string
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Domain Types
export interface Vehicle {
  id: string
  chassisNumber: string
  make: string
  model: string
  year: number
  mileage: number
  transmission: string
  displacement: number
  color: string
  fuel: string
  drive: string
  doors: number
  seats: number
  bodyType: string
  engineNumber: string
  registrationDate: string
  inspectionDate: string
  images: string[]
  equipment: string[]
  condition: string
  scores: {
    interior: number
    exterior: number
    overall: number
  }
  pricing: {
    startPrice: number
    currentBid: number
    averagePrice: number
  }
  auction: {
    id: string
    deadline: string
    location: string
    result: string
    lotNumber: string
    status: 'live' | 'ended' | 'upcoming'
  }
  additionalData: {
    cooling: string
    appraisalPoint: string
    shift: string
    openingDay: string
    grade: string
    holdingFrequency: string
    colorSubstitution: string
    holdingHall: string
    yearH: string
    notes: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface Auction {
  id: string
  name: string
  date: string
  location: string
  totalVehicles: number
  status: 'upcoming' | 'live' | 'ended'
  vehicles: Vehicle[]
}

export interface Inspection {
  id: string
  vehicleId: string
  status: 'not_available' | 'requested' | 'processing' | 'completed'
  requestedBy: string
  requestedAt: string
  completedAt?: string
  report?: string
  photos: string[]
  videos: string[]
  remarks?: string
  fee: number
}

export interface Translation {
  id: string
  vehicleId: string
  status: 'not_available' | 'requested' | 'translating' | 'translated'
  requestedBy: string
  requestedAt: string
  completedAt?: string
  translation?: string
  originalSheet?: string
  fee: number
}

export interface Bid {
  id: string
  vehicleId: string
  amount: number
  message?: string
  userId: string
  userName: string
  timestamp: string
  status: 'pending' | 'accepted' | 'outbid' | 'won'
}

export interface User {
  id: string
  email: string
  name: string
  role: 'basic_customer' | 'premium_customer' | 'basic_dealer' | 'premium_dealer' | 'admin'
  company?: string
  phone?: string
  address?: string
  favoriteVehicles: string[]
  bids: Bid[]
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  userId: string
  type: 'bid' | 'auction' | 'inspection' | 'translation' | 'system'
  title: string
  message: string
  read: boolean
  vehicleId?: string
  createdAt: string
}

// Request Types
export interface CreateBidRequest {
  vehicleId: string
  amount: number
  message?: string
}

export interface RequestInspectionRequest {
  vehicleId: string
  priority?: 'normal' | 'urgent'
}

export interface RequestTranslationRequest {
  vehicleId: string
  targetLanguage?: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  company?: string
}

// Filter Types
export interface VehicleFilters {
  make?: string
  model?: string
  yearMin?: number
  yearMax?: number
  priceMin?: number
  priceMax?: number
  mileageMax?: number
  transmission?: string
  fuel?: string
  bodyType?: string
  auctionStatus?: string
}

export interface AuctionFilters {
  status?: 'upcoming' | 'live' | 'ended'
  location?: string
  dateFrom?: string
  dateTo?: string
}