import { api } from './client'
import { mockDataStore, createPaginatedResponse } from '@/src/mocks'
import { Vehicle, VehicleFilters, PaginatedResponse } from '@/src/types/api.types'
import { API_CONFIG, API_ENDPOINTS } from '@/src/config/api.config'

export const vehiclesService = {
  // Get all vehicles with optional filters
  async getVehicles(filters?: VehicleFilters, page = 1, limit = 20): Promise<PaginatedResponse<Vehicle>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      let vehicles = [...mockDataStore.vehicles]
      
      // Apply filters
      if (filters) {
        if (filters.make) {
          vehicles = vehicles.filter(v => v.make.toLowerCase().includes(filters.make!.toLowerCase()))
        }
        if (filters.model) {
          vehicles = vehicles.filter(v => v.model.toLowerCase().includes(filters.model!.toLowerCase()))
        }
        if (filters.yearMin) {
          vehicles = vehicles.filter(v => v.year >= filters.yearMin!)
        }
        if (filters.yearMax) {
          vehicles = vehicles.filter(v => v.year <= filters.yearMax!)
        }
        if (filters.priceMin) {
          vehicles = vehicles.filter(v => v.pricing.currentBid >= filters.priceMin!)
        }
        if (filters.priceMax) {
          vehicles = vehicles.filter(v => v.pricing.currentBid <= filters.priceMax!)
        }
        if (filters.mileageMax) {
          vehicles = vehicles.filter(v => v.mileage <= filters.mileageMax!)
        }
        if (filters.transmission) {
          vehicles = vehicles.filter(v => v.transmission === filters.transmission)
        }
        if (filters.fuel) {
          vehicles = vehicles.filter(v => v.fuel === filters.fuel)
        }
        if (filters.bodyType) {
          vehicles = vehicles.filter(v => v.bodyType === filters.bodyType)
        }
        if (filters.auctionStatus) {
          vehicles = vehicles.filter(v => v.auction.status === filters.auctionStatus)
        }
      }
      
      return createPaginatedResponse(vehicles, page, limit)
    }
    
    const response = await api.get<PaginatedResponse<Vehicle>>(API_ENDPOINTS.vehicles.list, {
      params: { ...filters, page, limit }
    })
    return response.data.data
  },

  // Get single vehicle by ID
  async getVehicleById(id: string): Promise<Vehicle | undefined> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.getVehicleById(id)
    }
    
    const response = await api.get<Vehicle>(API_ENDPOINTS.vehicles.detail(id))
    return response.data.data
  },

  // Search vehicles
  async searchVehicles(query: string): Promise<Vehicle[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const lowerQuery = query.toLowerCase()
      return mockDataStore.vehicles.filter(v => 
        v.make.toLowerCase().includes(lowerQuery) ||
        v.model.toLowerCase().includes(lowerQuery) ||
        v.chassisNumber.toLowerCase().includes(lowerQuery)
      )
    }
    
    const response = await api.get<Vehicle[]>(API_ENDPOINTS.vehicles.search, {
      params: { q: query }
    })
    return response.data.data
  },

  // Get favorite vehicles
  async getFavoriteVehicles(userId: string): Promise<Vehicle[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const user = mockDataStore.users.find(u => u.id === userId)
      if (!user) return []
      
      return mockDataStore.vehicles.filter(v => 
        user.favoriteVehicles.includes(v.id)
      )
    }
    
    const response = await api.get<Vehicle[]>(API_ENDPOINTS.vehicles.favorites)
    return response.data.data
  },

  // Add vehicle to favorites
  async addToFavorites(vehicleId: string, userId: string): Promise<void> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const user = mockDataStore.users.find(u => u.id === userId)
      if (user && !user.favoriteVehicles.includes(vehicleId)) {
        user.favoriteVehicles.push(vehicleId)
      }
      return
    }
    
    await api.post(API_ENDPOINTS.vehicles.addFavorite(vehicleId))
  },

  // Remove vehicle from favorites
  async removeFromFavorites(vehicleId: string, userId: string): Promise<void> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const user = mockDataStore.users.find(u => u.id === userId)
      if (user) {
        user.favoriteVehicles = user.favoriteVehicles.filter(id => id !== vehicleId)
      }
      return
    }
    
    await api.delete(API_ENDPOINTS.vehicles.removeFavorite(vehicleId))
  },
}