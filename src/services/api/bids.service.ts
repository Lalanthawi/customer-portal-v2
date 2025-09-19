import { api } from './client'
import { mockDataStore } from '@/src/mocks'
import { Bid, CreateBidRequest } from '@/src/types/api.types'
import { API_CONFIG, API_ENDPOINTS } from '@/src/config/api.config'

export const bidsService = {
  // Place a new bid
  async placeBid(request: CreateBidRequest): Promise<Bid> {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Update previous bids for this vehicle to 'outbid'
      const vehicleBids = mockDataStore.bids.filter(b => b.vehicleId === request.vehicleId)
      vehicleBids.forEach(bid => {
        if (bid.status === 'accepted') {
          bid.status = 'outbid'
        }
      })
      
      // Create new bid
      const newBid = mockDataStore.addBid({
        vehicleId: request.vehicleId,
        amount: request.amount,
        message: request.message,
        userId: 'user1', // Mock user
        userName: 'John Customer',
        status: 'accepted'
      })
      
      // Update vehicle's current bid
      const vehicle = mockDataStore.vehicles.find(v => v.id === request.vehicleId)
      if (vehicle) {
        vehicle.pricing.currentBid = request.amount
      }
      
      // Add notification
      mockDataStore.addNotification({
        userId: 'user1',
        type: 'bid',
        title: 'Bid Placed Successfully',
        message: `Your bid of ¥${request.amount.toLocaleString()} has been placed`,
        vehicleId: request.vehicleId,
        read: false
      })
      
      return newBid
    }
    
    const response = await api.post<Bid>(API_ENDPOINTS.bids.place, request)
    return response.data.data
  },

  // Get bid history for a vehicle
  async getVehicleBidHistory(vehicleId: string): Promise<Bid[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.getBidsByVehicle(vehicleId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }
    
    const response = await api.get<Bid[]>(API_ENDPOINTS.bids.history(vehicleId))
    return response.data.data
  },

  // Get user's bids
  async getUserBids(userId: string): Promise<Bid[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.bids.filter(b => b.userId === userId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }
    
    const response = await api.get<Bid[]>(API_ENDPOINTS.bids.userBids)
    return response.data.data
  },

  // Cancel a bid
  async cancelBid(bidId: string): Promise<void> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const bid = mockDataStore.bids.find(b => b.id === bidId)
      if (bid) {
        // If this was the current highest bid, find the next highest
        const wasAccepted = bid.status === 'accepted'
        bid.status = 'pending' // Reset to pending (cancelled)
        
        if (wasAccepted) {
          const vehicleBids = mockDataStore.bids
            .filter(b => b.vehicleId === bid.vehicleId && b.id !== bidId)
            .sort((a, b) => b.amount - a.amount)
          
          if (vehicleBids.length > 0) {
            const highestBid = vehicleBids[0]
            if (highestBid) {
              highestBid.status = 'accepted'
              const vehicle = mockDataStore.vehicles.find(v => v.id === bid.vehicleId)
              if (vehicle) {
                vehicle.pricing.currentBid = highestBid.amount
              }
            }
          }
        }
      }
      return
    }
    
    await api.delete(API_ENDPOINTS.bids.cancel(bidId))
  },
}