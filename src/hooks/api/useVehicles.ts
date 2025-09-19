'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { vehiclesService } from '@/src/services/api/vehicles.service'
import { VehicleFilters } from '@/src/types/api.types'
import { CACHE_CONFIG } from '@/src/config/api.config'

// Query keys
const vehicleKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehicleKeys.all, 'list'] as const,
  list: (filters?: VehicleFilters, page?: number) => 
    [...vehicleKeys.lists(), { filters, page }] as const,
  details: () => [...vehicleKeys.all, 'detail'] as const,
  detail: (id: string) => [...vehicleKeys.details(), id] as const,
  favorites: () => [...vehicleKeys.all, 'favorites'] as const,
  search: (query: string) => [...vehicleKeys.all, 'search', query] as const,
}

// Get vehicles with filters
export function useVehicles(filters?: VehicleFilters, page = 1, limit = 20) {
  return useQuery({
    queryKey: vehicleKeys.list(filters, page),
    queryFn: () => vehiclesService.getVehicles(filters, page, limit),
    staleTime: CACHE_CONFIG.STALE_TIME.VEHICLES,
    gcTime: CACHE_CONFIG.CACHE_TIME.VEHICLES,
  })
}

// Get single vehicle
export function useVehicle(id: string) {
  return useQuery({
    queryKey: vehicleKeys.detail(id),
    queryFn: () => vehiclesService.getVehicleById(id),
    staleTime: CACHE_CONFIG.STALE_TIME.VEHICLES,
    gcTime: CACHE_CONFIG.CACHE_TIME.VEHICLES,
    enabled: !!id,
  })
}

// Search vehicles
export function useVehicleSearch(query: string) {
  return useQuery({
    queryKey: vehicleKeys.search(query),
    queryFn: () => vehiclesService.searchVehicles(query),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
    enabled: query.length > 2, // Only search with 3+ characters
  })
}

// Get favorite vehicles
export function useFavoriteVehicles(userId: string) {
  return useQuery({
    queryKey: vehicleKeys.favorites(),
    queryFn: () => vehiclesService.getFavoriteVehicles(userId),
    staleTime: CACHE_CONFIG.STALE_TIME.USER,
    gcTime: CACHE_CONFIG.CACHE_TIME.USER,
    enabled: !!userId,
  })
}

// Add to favorites mutation
export function useAddToFavorites() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ vehicleId, userId }: { vehicleId: string; userId: string }) => 
      vehiclesService.addToFavorites(vehicleId, userId),
    onSuccess: () => {
      // Invalidate favorites list
      queryClient.invalidateQueries({ queryKey: vehicleKeys.favorites() })
    },
  })
}

// Remove from favorites mutation
export function useRemoveFromFavorites() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ vehicleId, userId }: { vehicleId: string; userId: string }) => 
      vehiclesService.removeFromFavorites(vehicleId, userId),
    onSuccess: () => {
      // Invalidate favorites list
      queryClient.invalidateQueries({ queryKey: vehicleKeys.favorites() })
    },
  })
}