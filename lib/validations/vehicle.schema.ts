import { z } from 'zod'

// Enums
export const TransmissionEnum = z.enum(['automatic', 'manual', 'cvt', 'semi-automatic'])
export const FuelTypeEnum = z.enum(['petrol', 'diesel', 'hybrid', 'electric', 'lpg', 'hydrogen'])
export const DriveTypeEnum = z.enum(['2WD', '4WD', 'AWD', 'FWD', 'RWD'])
export const VehicleStatusEnum = z.enum([
  'available',
  'bidding',
  'sold',
  'payment_pending',
  'preparing',
  'in_transit',
  'at_port',
  'delivered',
  'completed'
])

// Nested schemas
export const VehicleScoresSchema = z.object({
  interior: z.number().min(0).max(10),
  exterior: z.number().min(0).max(10),
  overall: z.number().min(0).max(10)
})

export const VehiclePricingSchema = z.object({
  startPrice: z.number().positive(),
  currentBid: z.number().nonnegative(),
  averagePrice: z.number().positive(),
  reservePrice: z.number().positive().optional(),
  buyNowPrice: z.number().positive().optional()
})

export const VehicleAuctionSchema = z.object({
  id: z.string(),
  deadline: z.string().datetime(),
  location: z.string(),
  result: z.string(),
  lotNumber: z.string(),
  status: z.enum(['live', 'ended', 'upcoming']),
  auctionHouse: z.string(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional()
})

export const VehicleImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  type: z.enum(['main', 'gallery', 'document', 'inspection']),
  caption: z.string().optional(),
  order: z.number().optional()
})

export const VehicleDocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum([
    'invoice',
    'export_certificate',
    'bill_of_lading',
    'deregistration',
    'insurance',
    'inspection_report',
    'auction_sheet',
    'other'
  ]),
  url: z.string().url(),
  uploadedAt: z.string().datetime(),
  size: z.number().positive(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
  required: z.boolean()
})

// Main Vehicle schema
export const VehicleSchema = z.object({
  id: z.string(),
  chassisNumber: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  mileage: z.number().nonnegative(),
  transmission: TransmissionEnum,
  displacement: z.number().positive(),
  color: z.string().min(1),
  fuel: FuelTypeEnum,
  drive: DriveTypeEnum,
  doors: z.number().min(2).max(5),
  seats: z.number().min(1).max(9),
  bodyType: z.string().min(1),
  engineNumber: z.string().optional(),
  registrationDate: z.string().datetime(),
  inspectionDate: z.string().datetime(),
  images: z.array(VehicleImageSchema),
  equipment: z.array(z.string()),
  condition: z.string(),
  scores: VehicleScoresSchema,
  pricing: VehiclePricingSchema,
  auction: VehicleAuctionSchema,
  status: VehicleStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// Vehicle Detail schema (extended version)
export const VehicleDetailSchema = VehicleSchema.extend({
  vin: z.string().optional(),
  specifications: z.object({
    doors: z.number(),
    seats: z.number(),
    driveType: DriveTypeEnum,
    bodyType: z.string(),
    features: z.array(z.string())
  }).optional(),
  documents: z.array(VehicleDocumentSchema),
  inspection: z.object({
    status: z.enum(['not_requested', 'requested', 'processing', 'completed']),
    requestable: z.boolean(),
    fee: z.number(),
    estimatedDuration: z.string(),
    report: z.string().optional(),
    completedDate: z.string().datetime().optional()
  }).optional(),
  translation: z.object({
    status: z.enum(['not_requested', 'requested', 'processing', 'completed']),
    requestable: z.boolean(),
    fee: z.number(),
    estimatedDuration: z.string(),
    translatedContent: z.string().optional(),
    completedDate: z.string().datetime().optional()
  }).optional(),
  shipping: z.object({
    status: z.enum(['pending', 'booked', 'in_transit', 'arrived', 'delivered']),
    estimatedDeparture: z.string().datetime().optional(),
    estimatedArrival: z.string().datetime().optional(),
    vessel: z.string().optional(),
    port: z.string().optional(),
    trackingNumber: z.string().optional()
  }).optional()
})

// Filter schema
export const VehicleFiltersSchema = z.object({
  make: z.array(z.string()).optional(),
  model: z.array(z.string()).optional(),
  yearMin: z.number().optional(),
  yearMax: z.number().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  mileageMin: z.number().optional(),
  mileageMax: z.number().optional(),
  transmission: z.array(TransmissionEnum).optional(),
  fuelType: z.array(FuelTypeEnum).optional(),
  status: z.array(VehicleStatusEnum).optional(),
  auctionHouse: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  bodyType: z.array(z.string()).optional(),
  scoreMin: z.number().min(0).max(10).optional(),
  sortBy: z.enum([
    'createdAt',
    'price',
    'year',
    'mileage',
    'score',
    'deadline'
  ]).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
})

// API Response schemas
export const VehicleListResponseSchema = z.object({
  vehicles: z.array(VehicleSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number()
})

export const VehicleCreateSchema = VehicleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  auction: true,
  pricing: true
}).extend({
  startPrice: z.number().positive(),
  auctionId: z.string()
})

export const VehicleUpdateSchema = VehicleCreateSchema.partial()

// Type exports
export type Vehicle = z.infer<typeof VehicleSchema>
export type VehicleDetail = z.infer<typeof VehicleDetailSchema>
export type VehicleFilters = z.infer<typeof VehicleFiltersSchema>
export type VehicleListResponse = z.infer<typeof VehicleListResponseSchema>
export type VehicleCreate = z.infer<typeof VehicleCreateSchema>
export type VehicleUpdate = z.infer<typeof VehicleUpdateSchema>