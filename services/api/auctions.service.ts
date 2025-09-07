import { api } from './client'
import { mockDataStore, createPaginatedResponse } from './mock-data'
import { Auction, AuctionFilters, PaginatedResponse, Vehicle } from '@/types/api.types'
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config'

export const auctionsService = {
  // Get all auctions with optional filters
  async getAuctions(filters?: AuctionFilters, page = 1, limit = 20): Promise<PaginatedResponse<Auction>> {
    if (API_CONFIG.USE_MOCK_DATA) {
      let auctions = [...mockDataStore.auctions]
      
      // Apply filters
      if (filters) {
        if (filters.status) {
          auctions = auctions.filter(a => a.status === filters.status)
        }
        if (filters.location) {
          auctions = auctions.filter(a => 
            a.location.toLowerCase().includes(filters.location!.toLowerCase())
          )
        }
        if (filters.dateFrom) {
          auctions = auctions.filter(a => new Date(a.date) >= new Date(filters.dateFrom!))
        }
        if (filters.dateTo) {
          auctions = auctions.filter(a => new Date(a.date) <= new Date(filters.dateTo!))
        }
      }
      
      return createPaginatedResponse(auctions, page, limit)
    }
    
    const response = await api.get<PaginatedResponse<Auction>>(API_ENDPOINTS.auctions.list, {
      params: { ...filters, page, limit }
    })
    return response.data.data
  },

  // Get single auction by ID
  async getAuctionById(id: string): Promise<Auction | undefined> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.getAuctionById(id)
    }
    
    const response = await api.get<Auction>(API_ENDPOINTS.auctions.detail(id))
    return response.data.data
  },

  // Get upcoming auctions
  async getUpcomingAuctions(): Promise<Auction[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.auctions.filter(a => a.status === 'upcoming')
    }
    
    const response = await api.get<Auction[]>(API_ENDPOINTS.auctions.upcoming)
    return response.data.data
  },

  // Get live auctions
  async getLiveAuctions(): Promise<Auction[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.auctions.filter(a => a.status === 'live')
    }
    
    const response = await api.get<Auction[]>(API_ENDPOINTS.auctions.live)
    return response.data.data
  },

  // Get ended auctions
  async getEndedAuctions(): Promise<Auction[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.auctions.filter(a => a.status === 'ended')
    }
    
    const response = await api.get<Auction[]>(API_ENDPOINTS.auctions.ended)
    return response.data.data
  },

  // Get vehicles in an auction
  async getAuctionVehicles(auctionId: string): Promise<Vehicle[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const auction = mockDataStore.auctions.find(a => a.id === auctionId)
      return auction?.vehicles || []
    }
    
    const response = await api.get<Vehicle[]>(API_ENDPOINTS.auctions.vehicles(auctionId))
    return response.data.data
  },
}