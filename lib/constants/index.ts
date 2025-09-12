// Status configurations
export const STATUS_CONFIG = {
  // Vehicle/Shipment Status
  in_transit: {
    label: 'In Transit',
    className: 'bg-purple-100 text-purple-800',
    dotColor: 'bg-purple-500',
    color: 'purple'
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800',
    dotColor: 'bg-green-500',
    color: 'green'
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800',
    dotColor: 'bg-amber-500',
    color: 'amber'
  },
  processing: {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-800',
    dotColor: 'bg-blue-500',
    color: 'blue'
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800',
    dotColor: 'bg-green-500',
    color: 'green'
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800',
    dotColor: 'bg-red-500',
    color: 'red'
  },
  // Auction Status
  won: {
    label: 'Won',
    className: 'bg-green-100 text-green-800',
    dotColor: 'bg-green-500',
    color: 'green'
  },
  lost: {
    label: 'Lost',
    className: 'bg-gray-100 text-gray-800',
    dotColor: 'bg-gray-500',
    color: 'gray'
  },
  bidding: {
    label: 'Bidding',
    className: 'bg-yellow-100 text-yellow-800',
    dotColor: 'bg-yellow-500',
    color: 'yellow'
  },
  active: {
    label: 'Active',
    className: 'bg-blue-100 text-blue-800',
    dotColor: 'bg-blue-500',
    color: 'blue'
  },
  outbid: {
    label: 'Outbid',
    className: 'bg-orange-100 text-orange-800',
    dotColor: 'bg-orange-500',
    color: 'orange'
  },
  // Document Status
  available: {
    label: 'Available',
    className: 'bg-green-100 text-green-800',
    dotColor: 'bg-green-500',
    color: 'green'
  },
  requested: {
    label: 'Requested',
    className: 'bg-amber-100 text-amber-800',
    dotColor: 'bg-amber-500',
    color: 'amber'
  },
  // Inspection/Translation Status
  not_available: {
    label: 'Not Available',
    className: 'bg-gray-100 text-gray-800',
    dotColor: 'bg-gray-500',
    color: 'gray'
  },
  translating: {
    label: 'Translating',
    className: 'bg-blue-100 text-blue-800',
    dotColor: 'bg-blue-500',
    color: 'blue'
  },
  translated: {
    label: 'Translated',
    className: 'bg-green-100 text-green-800',
    dotColor: 'bg-green-500',
    color: 'green'
  }
} as const

export type StatusType = keyof typeof STATUS_CONFIG

// Icon sizes
export const ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8'
} as const

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

// API Endpoints
export const API_ENDPOINTS = {
  vehicles: '/api/vehicles',
  auctions: '/api/auctions',
  bids: '/api/bids',
  documents: '/api/documents',
  inspections: '/api/inspections',
  translations: '/api/translations',
  shipments: '/api/shipments',
  users: '/api/users',
  auth: '/api/auth'
} as const

// Routes
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  vehicles: '/dashboard/vehicles',
  vehicleDetail: (id: string) => `/dashboard/vehicles/${id}`,
  auctions: '/dashboard/auctions',
  bids: '/dashboard/bids',
  shipments: '/dashboard/shipments',
  inspections: '/dashboard/inspections',
  translations: '/dashboard/translations',
  documents: '/dashboard/documents',
  profile: '/dashboard/profile',
  settings: '/dashboard/settings'
} as const

// Common colors
export const COLORS = {
  primary: '#FA7921',
  primaryHover: '#FA7921/90',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
} as const