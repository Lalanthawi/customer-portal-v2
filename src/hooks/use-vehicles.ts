'use client'

import { useVehicleStore } from '@/src/stores/useVehicleStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/src/lib/api-client'
import { VehicleFilters } from '@/src/lib/validations/vehicle.schema'
import { useEffect } from 'react'
import { wsManager as websocketManager } from '@/src/lib/websocket'

export function useVehicles(filters?: VehicleFilters) {
  const queryClient = useQueryClient()
  const { 
    vehicles, 
    setVehicles, 
    handleVehicleUpdate,
    filters: storeFilters,
    setFilters 
  } = useVehicleStore()

  // Fetch vehicles
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vehicles', filters || storeFilters],
    queryFn: async () => {
      const response = await apiClient.get('/vehicles', {
        params: filters || storeFilters
      })
      return response
    },
    staleTime: 30 * 1000, // 30 seconds
  })

  // Update store when data changes
  useEffect(() => {
    if (data?.vehicles) {
      setVehicles(data.vehicles)
    }
  }, [data, setVehicles])

  // Subscribe to WebSocket updates
  useEffect(() => {
    const unsubscribe = websocketManager.subscribe('vehicle:update', (data) => {
      handleVehicleUpdate(data.vehicle)
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    })

    return unsubscribe
  }, [handleVehicleUpdate, queryClient])

  return {
    vehicles: vehicles || data?.vehicles || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    setFilters,
  }
}

export function useVehicle(id: string) {
  const { getCached, handleVehicleUpdate } = useVehicleStore()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      // Check cache first
      const cached = getCached(id)
      if (cached && Date.now() - (cached as any).fetchedAt < 60000) {
        return cached
      }

      const response = await apiClient.get(`/vehicles/${id}`)
      return response
    },
    staleTime: 60 * 1000, // 1 minute
  })

  // Subscribe to vehicle updates
  useEffect(() => {
    const unsubscribe = websocketManager.subscribe('vehicle:update', (data) => {
      // Only update if it's the vehicle we're interested in
      if (data.vehicle?.id === id) {
        handleVehicleUpdate(data.vehicle)
        queryClient.invalidateQueries({ queryKey: ['vehicle', id] })
      }
    })

    return unsubscribe
  }, [id, handleVehicleUpdate, queryClient])

  // Place bid mutation
  const placeBidMutation = useMutation({
    mutationFn: async (amount: number) => {
      const response = await apiClient.post(`/vehicles/${id}/bid`, { amount })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] })
    },
  })

  // Request inspection mutation
  const requestInspectionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(`/vehicles/${id}/inspection`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] })
    },
  })

  // Request translation mutation
  const requestTranslationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(`/vehicles/${id}/translation`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] })
    },
  })

  return {
    vehicle: data,
    isLoading,
    error,
    placeBid: placeBidMutation.mutate,
    requestInspection: requestInspectionMutation.mutate,
    requestTranslation: requestTranslationMutation.mutate,
    isBidding: placeBidMutation.isPending,
  }
}