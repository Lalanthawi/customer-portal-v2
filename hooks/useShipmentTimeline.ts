import { useState, useEffect, useCallback, useRef } from 'react'
import { ShipmentTimeline } from '@/types/api.types'
import { shipmentsService } from '@/services/api/shipments.service'

interface UseShipmentTimelineOptions {
  pollingInterval?: number // in milliseconds
  enablePolling?: boolean
}

interface UseShipmentTimelineReturn {
  timeline: ShipmentTimeline | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  lastUpdated: Date | null
  isUpdating: boolean
}

export function useShipmentTimeline(
  orderId: string,
  options: UseShipmentTimelineOptions = {}
): UseShipmentTimelineReturn {
  const { 
    pollingInterval = 30000, // 30 seconds default
    enablePolling = true 
  } = options

  const [timeline, setTimeline] = useState<ShipmentTimeline | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Refs to track polling state
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastFetchTimeRef = useRef<number>(0)
  const isMountedRef = useRef(true)

  // Fetch timeline data
  const fetchTimeline = useCallback(async (showLoading = true) => {
    // Prevent concurrent fetches
    const now = Date.now()
    if (now - lastFetchTimeRef.current < 1000) {
      return // Skip if last fetch was less than 1 second ago
    }
    lastFetchTimeRef.current = now

    try {
      if (showLoading && !timeline) {
        setLoading(true)
      } else {
        setIsUpdating(true)
      }
      
      setError(null)
      
      const data = await shipmentsService.getShipmentTimeline(orderId)
      
      if (isMountedRef.current) {
        setTimeline(data)
        setLastUpdated(new Date())
        
        // Check if there are any updates
        if (timeline && data.lastUpdated !== timeline.lastUpdated) {
          // Timeline has been updated - could trigger a notification here
          console.log('Timeline updated:', data.lastUpdated)
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch timeline'
        setError(errorMessage)
        console.error('Error fetching shipment timeline:', err)
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
        setIsUpdating(false)
      }
    }
  }, [orderId, timeline])

  // Initial fetch
  useEffect(() => {
    isMountedRef.current = true
    fetchTimeline()
    
    return () => {
      isMountedRef.current = false
    }
  }, [orderId])

  // Set up polling
  useEffect(() => {
    if (!enablePolling || !timeline) {
      return
    }

    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
    }

    // Set up new polling interval
    pollingIntervalRef.current = setInterval(() => {
      if (isMountedRef.current) {
        fetchTimeline(false) // Don't show loading state for polling updates
      }
    }, pollingInterval)

    // Cleanup
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
  }, [enablePolling, pollingInterval, fetchTimeline, timeline])

  // Check for updates when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !loading) {
        // Fetch updates when user returns to the tab
        fetchTimeline(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [fetchTimeline, loading])

  // Manual refetch function
  const refetch = useCallback(async () => {
    await fetchTimeline(false)
  }, [fetchTimeline])

  return {
    timeline,
    loading,
    error,
    refetch,
    lastUpdated,
    isUpdating,
  }
}

// Helper hook to get current stage details
export function useCurrentStage(timeline: ShipmentTimeline | null) {
  if (!timeline) return null

  const currentStage = timeline.stages.find(
    stage => stage.id === timeline.currentStageId
  )

  if (!currentStage) {
    // If no current stage ID, find the in-progress or last completed stage
    const inProgressStage = timeline.stages.find(s => s.status === 'in-progress')
    if (inProgressStage) return inProgressStage

    const completedStages = timeline.stages
      .filter(s => s.status === 'completed')
      .sort((a, b) => b.sequence - a.sequence)
    
    return completedStages[0] || timeline.stages[0]
  }

  return currentStage
}

// Helper hook to calculate overall progress
export function useTimelineProgress(timeline: ShipmentTimeline | null) {
  if (!timeline) return 0

  const visibleStages = timeline.stages.filter(s => s.isVisible)
  const totalStages = visibleStages.length
  
  if (totalStages === 0) return 0

  const completedStages = visibleStages.filter(s => s.status === 'completed').length
  const inProgressStage = visibleStages.find(s => s.status === 'in-progress')
  const inProgressValue = inProgressStage ? inProgressStage.progress / 100 : 0

  return Math.round(((completedStages + inProgressValue) / totalStages) * 100)
}