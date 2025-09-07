'use client'

import { useEffect, useRef } from 'react'
import { wsManager as websocketManager } from '@/lib/websocket'
import { useAuthStore } from '@/stores/useAuthStore'
import { useVehicleStore } from '@/stores/useVehicleStore'

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()
  const { handleVehicleUpdate, handleVehicleDelete, handlePriceUpdate } = useVehicleStore()
  const initialized = useRef(false)

  useEffect(() => {
    if (!isAuthenticated || !user || initialized.current) return

    // Connect WebSocket
    websocketManager.connect()
    initialized.current = true

    // Subscribe to global events
    const unsubscribeVehicleUpdate = websocketManager.subscribe('vehicle:update', (data) => {
      console.log('Vehicle update received:', data)
      handleVehicleUpdate(data.vehicle)
    })

    const unsubscribeVehicleDelete = websocketManager.subscribe('vehicle:delete', (data) => {
      console.log('Vehicle deleted:', data)
      handleVehicleDelete(data.vehicleId)
    })

    const unsubscribeBidUpdate = websocketManager.subscribe('bid:new', (data) => {
      console.log('Bid update received:', data)
      handlePriceUpdate(data.vehicleId, data.amount)
    })

    const unsubscribePriceUpdate = websocketManager.subscribe('price:update', (data) => {
      console.log('Price update received:', data)
      handlePriceUpdate(data.vehicleId, data.price)
    })

    // Cleanup function
    return () => {
      unsubscribeVehicleUpdate()
      unsubscribeVehicleDelete()
      unsubscribeBidUpdate()
      unsubscribePriceUpdate()
      
      if (initialized.current) {
        websocketManager.disconnect()
        initialized.current = false
      }
    }
  }, [isAuthenticated, user, handleVehicleUpdate, handleVehicleDelete, handlePriceUpdate])

  return <>{children}</>
}