// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || true,
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    register: '/auth/register',
    verify2FA: '/auth/verify-2fa',
  },
  
  // Vehicles
  vehicles: {
    list: '/vehicles',
    detail: (id: string) => `/vehicles/${id}`,
    search: '/vehicles/search',
    favorites: '/vehicles/favorites',
    addFavorite: (id: string) => `/vehicles/${id}/favorite`,
    removeFavorite: (id: string) => `/vehicles/${id}/unfavorite`,
  },
  
  // Auctions
  auctions: {
    list: '/auctions',
    detail: (id: string) => `/auctions/${id}`,
    upcoming: '/auctions/upcoming',
    live: '/auctions/live',
    ended: '/auctions/ended',
    vehicles: (id: string) => `/auctions/${id}/vehicles`,
  },
  
  // Bidding
  bids: {
    place: '/bids',
    history: (vehicleId: string) => `/bids/vehicle/${vehicleId}`,
    userBids: '/bids/my-bids',
    cancel: (id: string) => `/bids/${id}/cancel`,
  },
  
  // Inspections
  inspections: {
    list: '/inspections',
    detail: (id: string) => `/inspections/${id}`,
    request: '/inspections/request',
    byVehicle: (vehicleId: string) => `/inspections/vehicle/${vehicleId}`,
    download: (id: string) => `/inspections/${id}/download`,
  },
  
  // Translations
  translations: {
    list: '/translations',
    detail: (id: string) => `/translations/${id}`,
    request: '/translations/request',
    byVehicle: (vehicleId: string) => `/translations/vehicle/${vehicleId}`,
  },
  
  // User
  user: {
    profile: '/user/profile',
    update: '/user/profile',
    notifications: '/user/notifications',
    markNotificationRead: (id: string) => `/user/notifications/${id}/read`,
    favorites: '/user/favorites',
    bids: '/user/bids',
    invoices: '/user/invoices',
  },
  
  // Statistics
  statistics: {
    market: '/statistics/market',
    vehicle: (make: string, model: string) => `/statistics/vehicle/${make}/${model}`,
    priceHistory: (vehicleId: string) => `/statistics/price-history/${vehicleId}`,
  },
  
  // Websocket Events
  ws: {
    connect: '/ws',
    subscribe: {
      auction: (id: string) => `auction:${id}`,
      vehicle: (id: string) => `vehicle:${id}`,
      bids: (vehicleId: string) => `bids:${vehicleId}`,
      notifications: (userId: string) => `notifications:${userId}`,
    },
  },
}

// Feature Flags
export const FEATURES = {
  USE_REAL_API: !API_CONFIG.USE_MOCK_DATA,
  ENABLE_WEBSOCKETS: process.env.NEXT_PUBLIC_ENABLE_WEBSOCKETS === 'true' || false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_2FA: true,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_CACHE: true,
}

// Cache Configuration
export const CACHE_CONFIG = {
  // Stale times (how long data is considered fresh)
  STALE_TIME: {
    DEFAULT: 5 * 60 * 1000, // 5 minutes
    VEHICLES: 10 * 60 * 1000, // 10 minutes
    AUCTIONS: 5 * 60 * 1000, // 5 minutes
    USER: 30 * 60 * 1000, // 30 minutes
    STATIC: 60 * 60 * 1000, // 1 hour
  },
  
  // Cache times (how long to keep in cache)
  CACHE_TIME: {
    DEFAULT: 10 * 60 * 1000, // 10 minutes
    VEHICLES: 30 * 60 * 1000, // 30 minutes
    AUCTIONS: 15 * 60 * 1000, // 15 minutes
    USER: 60 * 60 * 1000, // 1 hour
    STATIC: 24 * 60 * 60 * 1000, // 24 hours
  },
}

// HTTP Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT: 'Request timed out. Please try again.',
  UNKNOWN: 'An unexpected error occurred.',
}