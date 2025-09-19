// Application-wide constants

// Transmission types
export const TRANSMISSION_TYPES = [
  'Automatic',
  'Manual',
  'CVT',
  'Semi-Automatic',
  'Dual-Clutch'
] as const

// Fuel types
export const FUEL_TYPES = [
  'Gasoline',
  'Diesel',
  'Hybrid',
  'Electric',
  'Plug-in Hybrid',
  'Hydrogen',
  'LPG',
  'CNG'
] as const

// Drive types
export const DRIVE_TYPES = [
  'FF', // Front-wheel drive
  'FR', // Rear-wheel drive
  '4WD', // Four-wheel drive
  'AWD', // All-wheel drive
  'MR', // Mid-engine, rear-wheel drive
  'RR' // Rear-engine, rear-wheel drive
] as const

// Body types
export const BODY_TYPES = [
  'Sedan',
  'SUV',
  'Hatchback',
  'Coupe',
  'Convertible',
  'Wagon',
  'Van',
  'Truck',
  'Minivan',
  'Sports Car'
] as const

// Vehicle conditions
export const VEHICLE_CONDITIONS = [
  'excellent',
  'good',
  'fair',
  'needs repair',
  'accident history',
  'bidding is possible',
  'not yet auction'
] as const

// Bid status
export const BID_STATUS = [
  'pending',
  'accepted',
  'rejected',
  'outbid',
  'won',
  'lost'
] as const

// Payment status
export const PAYMENT_STATUS = [
  'pending',
  'processing',
  'completed',
  'failed',
  'refunded'
] as const

// Shipping status
export const SHIPPING_STATUS = [
  'pending',
  'preparing',
  'shipped',
  'in_transit',
  'at_port',
  'delivered',
  'completed'
] as const

// Document types
export const DOCUMENT_TYPES = [
  'invoice',
  'exportCertificate',
  'billOfLading',
  'deregistration',
  'inspection',
  'translation'
] as const

// Inspection status
export const INSPECTION_STATUS = [
  'requested',
  'processing',
  'completed',
  'cancelled'
] as const

// Translation status
export const TRANSLATION_STATUS = [
  'requested',
  'translating',
  'translated',
  'cancelled'
] as const

// Fee structure
export const FEES = {
  inspection: 3000, // ¥3,000
  translation: 0, // FREE
  expeditedInspection: 5000, // ¥5,000
} as const

// Pagination defaults
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
  options: [10, 20, 50, 100]
} as const

// Date formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  input: 'yyyy-MM-dd',
  datetime: 'MMM dd, yyyy HH:mm',
  api: "yyyy-MM-dd'T'HH:mm:ss'Z'"
} as const

// Currency
export const CURRENCY = {
  code: 'JPY',
  symbol: '¥',
  locale: 'ja-JP'
} as const

// Application routes
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  vehicles: '/dashboard/vehicles',
  bids: '/dashboard/bids',
  auctions: '/dashboard/auctions',
  inspections: '/dashboard/inspections',
  translations: '/dashboard/translations',
  shipment: '/dashboard/shipment',
  profile: '/dashboard/profile',
  settings: '/dashboard/settings',
  login: '/login',
  register: '/register'
} as const

export type TransmissionType = typeof TRANSMISSION_TYPES[number]
export type FuelType = typeof FUEL_TYPES[number]
export type DriveType = typeof DRIVE_TYPES[number]
export type BodyType = typeof BODY_TYPES[number]
export type VehicleCondition = typeof VEHICLE_CONDITIONS[number]
export type BidStatus = typeof BID_STATUS[number]
export type PaymentStatus = typeof PAYMENT_STATUS[number]
export type ShippingStatus = typeof SHIPPING_STATUS[number]
export type DocumentType = typeof DOCUMENT_TYPES[number]
export type InspectionStatus = typeof INSPECTION_STATUS[number]
export type TranslationStatus = typeof TRANSLATION_STATUS[number]