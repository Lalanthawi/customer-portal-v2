'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bidsService } from '@/services/api/bids.service'
import { CreateBidRequest } from '@/types/api.types'
import { CACHE_CONFIG } from '@/config/api.config'

// Query keys
const bidKeys = {
  all: ['bids'] as const,
  vehicle: (vehicleId: string) => [...bidKeys.all, 'vehicle', vehicleId] as const,
  user: (userId: string) => [...bidKeys.all, 'user', userId] as const,
}

// Get vehicle bid history
export function useVehicleBids(vehicleId: string) {
  return useQuery({
    queryKey: bidKeys.vehicle(vehicleId),
    queryFn: () => bidsService.getVehicleBidHistory(vehicleId),
    staleTime: 30000, // 30 seconds - bids update frequently
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
    enabled: !!vehicleId,
    refetchInterval: 30000, // Auto-refresh every 30 seconds for live bidding
  })
}

// Get user's bids
export function useUserBids(userId: string) {
  return useQuery({
    queryKey: bidKeys.user(userId),
    queryFn: () => bidsService.getUserBids(userId),
    staleTime: CACHE_CONFIG.STALE_TIME.USER,
    gcTime: CACHE_CONFIG.CACHE_TIME.USER,
    enabled: !!userId,
  })
}

// Place bid mutation
export function usePlaceBid() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: CreateBidRequest) => bidsService.placeBid(request),
    onSuccess: (data) => {
      // Invalidate vehicle bids
      queryClient.invalidateQueries({ 
        queryKey: bidKeys.vehicle(data.vehicleId) 
      })
      // Invalidate user bids
      queryClient.invalidateQueries({ 
        queryKey: bidKeys.user(data.userId) 
      })
      // Invalidate vehicle details to update current bid
      queryClient.invalidateQueries({ 
        queryKey: ['vehicles', 'detail', data.vehicleId] 
      })
    },
  })
}

// Cancel bid mutation
export function useCancelBid() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (bidId: string) => bidsService.cancelBid(bidId),
    onSuccess: () => {
      // Invalidate all bid queries
      queryClient.invalidateQueries({ queryKey: bidKeys.all })
      // Invalidate vehicles to update current bids
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
  })
}