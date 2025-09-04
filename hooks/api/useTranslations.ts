'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { translationsService } from '@/services/api/translations.service'
import { RequestTranslationRequest } from '@/types/api.types'
import { CACHE_CONFIG } from '@/config/api.config'

// Query keys
const translationKeys = {
  all: ['translations'] as const,
  lists: () => [...translationKeys.all, 'list'] as const,
  list: () => [...translationKeys.lists()] as const,
  details: () => [...translationKeys.all, 'detail'] as const,
  detail: (id: string) => [...translationKeys.details(), id] as const,
  vehicle: (vehicleId: string) => [...translationKeys.all, 'vehicle', vehicleId] as const,
}

// Get all translations
export function useTranslations() {
  return useQuery({
    queryKey: translationKeys.list(),
    queryFn: () => translationsService.getTranslations(),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
  })
}

// Get translation by ID
export function useTranslation(id: string) {
  return useQuery({
    queryKey: translationKeys.detail(id),
    queryFn: () => translationsService.getTranslationById(id),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
    enabled: !!id,
  })
}

// Get translation by vehicle
export function useVehicleTranslation(vehicleId: string) {
  return useQuery({
    queryKey: translationKeys.vehicle(vehicleId),
    queryFn: () => translationsService.getTranslationByVehicle(vehicleId),
    staleTime: CACHE_CONFIG.STALE_TIME.DEFAULT,
    gcTime: CACHE_CONFIG.CACHE_TIME.DEFAULT,
    enabled: !!vehicleId,
  })
}

// Request translation mutation
export function useRequestTranslation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: RequestTranslationRequest) => 
      translationsService.requestTranslation(request),
    onSuccess: (data) => {
      // Invalidate vehicle translation
      queryClient.invalidateQueries({ 
        queryKey: translationKeys.vehicle(data.vehicleId) 
      })
      // Invalidate translations list
      queryClient.invalidateQueries({ 
        queryKey: translationKeys.lists() 
      })
    },
  })
}