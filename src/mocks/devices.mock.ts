// Import types from profile page
export interface Device {
  id: string
  browser: string
  browserIcon?: string
  device: string
  location: string
  lastActivity: string
  isCurrentDevice?: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'paypal' | 'stripe' | 'wise'
  last4?: string
  brand?: string
  bankName?: string
  email?: string
  isDefault: boolean
  expiryDate?: string
}

// Countries list
export const mockCountries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Japan',
  'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria'
]

// Languages list
export const mockLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian',
  'Portuguese', 'Dutch', 'Swedish', 'Norwegian', 'Danish',
  'Finnish', 'Japanese', 'Korean', 'Chinese (Simplified)', 'Chinese (Traditional)'
]

// Device data
export const mockDevices: Device[] = [
  {
    id: '1',
    browser: 'Chrome on macOS',
    browserIcon: '🌐',
    device: 'MacBook Pro',
    location: 'Tokyo, Japan',
    lastActivity: '2 minutes ago',
    isCurrentDevice: true,
  },
  {
    id: '2',
    browser: 'Safari on iPhone',
    browserIcon: '📱',
    device: 'iPhone 14 Pro',
    location: 'Tokyo, Japan',
    lastActivity: '1 hour ago',
  },
  {
    id: '3',
    browser: 'Chrome on Windows',
    browserIcon: '💻',
    device: 'Windows PC',
    location: 'Osaka, Japan',
    lastActivity: '3 days ago',
  },
  {
    id: '4',
    browser: 'Firefox on Android',
    browserIcon: '📱',
    device: 'Samsung Galaxy S23',
    location: 'Kyoto, Japan',
    lastActivity: '1 week ago',
  },
]

// Payment methods data
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'stripe',
    last4: '4242',
    brand: 'Stripe',
    isDefault: true,
    expiryDate: '12/25',
  },
  {
    id: '2',
    type: 'paypal',
    email: 'john.doe@example.com',
    isDefault: false,
  },
  {
    id: '3',
    type: 'wise',
    email: 'john.doe@example.com',
    isDefault: false,
  },
]