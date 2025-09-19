import { useState, useEffect, useCallback } from 'react'
import { VehicleDetail } from '@/src/types/api.types'
import { vehicleDetailsService } from '@/src/services/api/vehicle-details.service'

interface UseVehicleDetailsReturn {
  vehicle: VehicleDetail | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  requestInspection: () => Promise<void>
  requestTranslation: () => Promise<void>
  inspectionLoading: boolean
  translationLoading: boolean
}

export function useVehicleDetails(vehicleId: string): UseVehicleDetailsReturn {
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inspectionLoading, setInspectionLoading] = useState(false)
  const [translationLoading, setTranslationLoading] = useState(false)

  // Fetch vehicle details
  const fetchVehicleDetails = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await vehicleDetailsService.getVehicleDetails(vehicleId)
      setVehicle(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vehicle details'
      setError(errorMessage)
      console.error('Error fetching vehicle details:', err)
    } finally {
      setLoading(false)
    }
  }, [vehicleId])

  // Request inspection
  const requestInspection = useCallback(async () => {
    if (!vehicle) return
    
    try {
      setInspectionLoading(true)
      await vehicleDetailsService.requestInspection(vehicleId)
      
      // Update local state
      setVehicle(prev => {
        if (!prev || !prev.inspection) return prev
        return {
          ...prev,
          inspection: {
            ...prev.inspection,
            status: 'requested' as const,
            requestable: false
          }
        }
      })
    } catch (err) {
      console.error('Error requesting inspection:', err)
      throw err
    } finally {
      setInspectionLoading(false)
    }
  }, [vehicleId, vehicle])

  // Request translation
  const requestTranslation = useCallback(async () => {
    if (!vehicle) return
    
    try {
      setTranslationLoading(true)
      await vehicleDetailsService.requestTranslation(vehicleId)
      
      // Update local state
      setVehicle(prev => {
        if (!prev || !prev.translation) return prev
        return {
          ...prev,
          translation: {
            ...prev.translation,
            status: 'requested' as const,
            requestable: false
          }
        }
      })
    } catch (err) {
      console.error('Error requesting translation:', err)
      throw err
    } finally {
      setTranslationLoading(false)
    }
  }, [vehicleId, vehicle])

  // Initial fetch
  useEffect(() => {
    fetchVehicleDetails()
  }, [fetchVehicleDetails])

  // Polling for updates (every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !error) {
        fetchVehicleDetails()
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [fetchVehicleDetails, loading, error])

  return {
    vehicle,
    loading,
    error,
    refetch: fetchVehicleDetails,
    requestInspection,
    requestTranslation,
    inspectionLoading,
    translationLoading
  }
}

// Helper hook to format document size
export function useFormattedSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}