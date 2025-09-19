'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inspectionsService } from '@/src/services/api/inspections.service'
import { RequestInspectionRequest } from '@/src/types/api.types'
import { CACHE_CONFIG } from '@/src/config/api.config'

// Query keys
const inspectionKeys = {
  all: ['inspections'] as const,
  lists: () => [...inspectionKeys.all, 'list'] as const,
  list: () => [...inspectionKeys.lists()] as const,
  details: () => [...inspectionKeys.all, 'detail'] as const,
  detail: (id: string) => [...inspectionKeys.details(), id] as const,
  vehicle: (vehicleId: string) => [...inspectionKeys.all, 'vehicle', vehicleId] as const,
}

// Get all inspections
export function useInspections() {
  return useQuery({
    queryKey: inspectionKeys.list(),
    queryFn: () => inspectionsService.getInspections(),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
  })
}

// Get inspection by ID
export function useInspection(id: string) {
  return useQuery({
    queryKey: inspectionKeys.detail(id),
    queryFn: () => inspectionsService.getInspectionById(id),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
    enabled: !!id,
  })
}

// Get inspection by vehicle
export function useVehicleInspection(vehicleId: string) {
  return useQuery({
    queryKey: inspectionKeys.vehicle(vehicleId),
    queryFn: () => inspectionsService.getInspectionByVehicle(vehicleId),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
    enabled: !!vehicleId,
  })
}

// Request inspection mutation
export function useRequestInspection() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: RequestInspectionRequest) => 
      inspectionsService.requestInspection(request),
    onSuccess: (data) => {
      // Invalidate vehicle inspection
      queryClient.invalidateQueries({ 
        queryKey: inspectionKeys.vehicle(data.vehicleId) 
      })
      // Invalidate inspections list
      queryClient.invalidateQueries({ 
        queryKey: inspectionKeys.lists() 
      })
    },
  })
}

// Download inspection report
export function useDownloadInspection() {
  return useMutation({
    mutationFn: async (id: string) => {
      const blob = await inspectionsService.downloadInspectionReport(id)
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `inspection-report-${id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      return true
    },
  })
}