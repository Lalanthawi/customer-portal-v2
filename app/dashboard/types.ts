export interface NavigationItem {
  name: string
  href: string
  icon: React.ReactNode
}

export interface StatsCardData {
  title: string
  value: string | number
  change?: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
  details?: string
  percentage?: number
}

export interface AuctionItem {
  id: number
  title: string
  image: string
  specs: {
    year: number
    mileage: string
    transmission: string
  }
  startingPrice: number
  currentBid: number
  endDate: Date
  bidsCount?: number
  watching?: number
}

export interface ActivityItem {
  id: string
  type: 'bid' | 'win' | 'outbid' | 'listing' | 'payment'
  title: string
  description?: string
  time: string
  amount?: string
  status?: 'success' | 'pending' | 'failed'
}

export interface UserProfile {
  name: string
  email: string
  avatar?: string
  initials: string
}

export interface BalanceData {
  jpyBalance: number
  usdRate: number
  change24h?: number
}