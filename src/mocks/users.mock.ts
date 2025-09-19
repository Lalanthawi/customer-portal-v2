import { User } from '@/src/types/api.types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'customer@example.com',
    name: 'John Customer',
    role: 'premium_customer',
    company: 'Import Motors Ltd',
    phone: '+81-90-1234-5678',
    address: 'Tokyo, Japan',
    favoriteVehicles: ['1', '3', '5'],
    bids: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
]