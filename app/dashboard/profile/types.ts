export interface ProfileTab {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface UserProfileData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  country: string
  language: string
  avatar?: string
}

export interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface Device {
  id: string
  browser: string
  browserIcon?: string
  device: string
  location: string
  lastActivity: string
  isCurrentDevice?: boolean
}

export interface NotificationSettings {
  emailNotifications: {
    newBids: boolean
    outbid: boolean
    wonAuctions: boolean
    newsletters: boolean
  }
  pushNotifications: {
    enabled: boolean
    newBids: boolean
    outbid: boolean
    wonAuctions: boolean
  }
  smsNotifications: {
    enabled: boolean
    wonAuctions: boolean
    paymentReminders: boolean
  }
}

export interface BillingInfo {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
  billingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
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