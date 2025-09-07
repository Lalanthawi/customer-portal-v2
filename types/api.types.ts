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

// Shipment Timeline Types
export interface ShipmentTimeline {
  orderId: string
  vehicleInfo: {
    make: string
    model: string
    year: number
    chassisNumber: string
    color?: string
    winningBid?: number
    destination?: string
    trackingNumber?: string
  }
  currentStageId: string
  lastUpdated: string
  stages: TimelineStage[]
}

export interface TimelineStage {
  id: string
  sequence: number
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  progress: number // 0-100
  isVisible: boolean
  isOptional: boolean
  completedDate?: string
  estimatedDate?: string
  updatedBy?: string
  tasks: TimelineTask[]
  documents: ShipmentDocument[]
  customFields?: Record<string, any>
}

export interface TimelineTask {
  id: string
  title: string
  status: 'completed' | 'pending'
  description?: string
  dueDate?: string
  completedDate?: string
  assignee?: string
}

export interface ShipmentDocument {
  id: string
  name: string
  type: string
  url?: string
  required: boolean
  uploaded: boolean
  uploadedDate?: string
  size?: number
}

export interface ShipmentListResponse {
  shipments: ShipmentSummary[]
  total: number
}

export interface ShipmentSummary {
  orderId: string
  vehicleInfo: {
    make: string
    model: string
    year: number
    chassisNumber: string
  }
  currentStage: string
  lastUpdated: string
  destination: string
}

export interface TimelineUpdateRequest {
  stageId: string
  status?: 'completed' | 'in-progress' | 'pending'
  progress?: number
  tasks?: TimelineTask[]
  documents?: ShipmentDocument[]
}

// Vehicle Detail Types (Admin Managed)
export interface VehicleDetail {
  id: string
  // Basic Info (Admin Managed)
  title: string
  make: string
  model: string
  year: number
  
  // Identification (Admin Managed)
  vin?: string
  chassisNumber?: string
  // Note: engineNumber removed as per requirement
  
  // Details (Admin Managed)
  color: string
  mileage: number
  transmission: 'automatic' | 'manual'
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  engineSize: string
  
  // Purchase Info (Admin Managed)
  source: 'auction' | 'direct' | 'export'
  purchaseDate: string
  purchasePrice: number
  
  // Status (Admin Updates)
  status: 'payment_pending' | 'preparing' | 'in_transit' | 'at_port' | 'delivered' | 'completed'
  statusDetails?: {
    location?: string
    lastUpdated: string
    nextStep?: string
  }
  
  // Media (Admin Uploads)
  images: VehicleImage[]
  
  // Documents (Admin Manages)
  documents: VehicleDocument[]
  
  // Shipping (Admin Updates)
  shipping?: VehicleShipment
  
  // Auction Info (Admin Sets)
  auctionDetails?: {
    auctionHouse: string
    lotNumber: string
    auctionDate: string
    grade?: string
    sheetUrl?: string
    sheetAvailable: boolean
  }
  
  // Specs (Admin Managed)
  specifications?: {
    doors: number
    seats: number
    driveType: '2WD' | '4WD' | 'AWD'
    bodyType: string
    features: string[]
  }
  
  // Services (Admin Controls Availability)
  inspection?: {
    status: 'not_requested' | 'requested' | 'processing' | 'completed'
    requestable: boolean
    fee: number
    estimatedDuration: string
    report?: string
    completedDate?: string
  }
  
  translation?: {
    status: 'not_requested' | 'requested' | 'processing' | 'completed'
    requestable: boolean
    fee: number
    estimatedDuration: string
    translatedContent?: string
    completedDate?: string
  }
  
  // Custom Fields (Admin Can Add)
  customFields?: Record<string, any>
  
  // Metadata
  createdAt: string
  updatedAt: string
}

export interface VehicleImage {
  id: string
  url: string
  type: 'main' | 'gallery' | 'document'
  caption?: string
  uploadedBy?: string
  uploadedAt?: string
}

export interface VehicleDocument {
  id: string
  name: string
  type: 'invoice' | 'export_certificate' | 'bill_of_lading' | 'deregistration' | 
        'inspection_report' | 'insurance' | 'customs' | 'other'
  uploadDate: string
  size: number
  url?: string
  status: 'available' | 'processing' | 'pending'
  required: boolean
  visibleToCustomer: boolean
  uploadedBy: string
  category: 'purchase' | 'export' | 'shipping' | 'inspection' | 'other'
  processingNote?: string
}

export interface VehicleShipment {
  vessel: string
  eta: string
  etd: string
  departurePort: string
  arrivalPort: string
  containerNumber: string
  bookingNumber: string
  shippingLine: string
  status: 'preparing' | 'in_transit' | 'arrived' | 'cleared'
  trackingUrl?: string
  lastUpdate: string
  milestones: ShippingMilestone[]
}

export interface ShippingMilestone {
  date: string
  status: 'completed' | 'pending'
  description: string
  location?: string
  updatedBy?: string
}

export interface VehicleInspection {
  id: string
  vehicleId: string
  status: 'requested' | 'processing' | 'completed'
  requestedDate: string
  fee: number
  report?: string
  photos?: string[]
  completedDate?: string
  inspector?: string
}

export interface VehicleTranslation {
  id: string
  vehicleId: string
  status: 'requested' | 'processing' | 'completed'
  requestedDate: string
  fee: number
  originalDocument?: string
  translatedContent?: string
  completedDate?: string
  translator?: string
}