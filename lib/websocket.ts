import { useVehicleStore } from '@/stores/useVehicleStore'
import { useAuthStore } from '@/stores/useAuthStore'

type MessageType = 
  | 'vehicle:update' 
  | 'vehicle:delete' 
  | 'price:update' 
  | 'bid:new' 
  | 'inspection:update' 
  | 'translation:update'
  | 'notification'
  | 'ping'
  | 'pong'

interface WebSocketMessage {
  type: MessageType
  payload: any
  timestamp: string
  userId?: string
}

class WebSocketManager {
  private ws: WebSocket | null = null
  private url: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private pingInterval: NodeJS.Timeout | null = null
  private isIntentionallyClosed = false
  private messageQueue: WebSocketMessage[] = []
  private subscribers: Map<MessageType, Set<(payload: any) => void>> = new Map()

  constructor() {
    this.url = process.env['NEXT_PUBLIC_WS_URL'] || 'ws://localhost:3001'
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected')
      return
    }

    const token = this.getAuthToken()
    if (!token) {
      console.error('No auth token available')
      return
    }

    this.isIntentionallyClosed = false
    
    try {
      // Include auth token in connection URL or as a protocol
      this.ws = new WebSocket(`${this.url}?token=${token}`)
      
      this.ws.onopen = this.handleOpen.bind(this)
      this.ws.onmessage = this.handleMessage.bind(this)
      this.ws.onerror = this.handleError.bind(this)
      this.ws.onclose = this.handleClose.bind(this)
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      this.scheduleReconnect()
    }
  }

  private handleOpen(): void {
    console.log('WebSocket connected')
    this.reconnectAttempts = 0
    
    // Send any queued messages
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      if (message) {
        this.send(message)
      }
    }
    
    // Start ping interval to keep connection alive
    this.startPingInterval()
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data)
      
      // Handle different message types
      switch (message.type) {
        case 'vehicle:update':
          useVehicleStore.getState().handleVehicleUpdate(message.payload)
          break
          
        case 'vehicle:delete':
          useVehicleStore.getState().handleVehicleDelete(message.payload.vehicleId)
          break
          
        case 'price:update':
          useVehicleStore.getState().handlePriceUpdate(
            message.payload.vehicleId,
            message.payload.newPrice
          )
          break
          
        case 'pong':
          // Server responded to ping, connection is alive
          break
          
        default:
          // Notify subscribers
          const subscribers = this.subscribers.get(message.type)
          if (subscribers) {
            subscribers.forEach(callback => callback(message.payload))
          }
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }

  private handleError(error: Event): void {
    console.error('WebSocket error:', error)
  }

  private handleClose(event: CloseEvent): void {
    console.log('WebSocket closed:', event.code, event.reason)
    
    this.stopPingInterval()
    this.ws = null
    
    // Don't reconnect if closed intentionally or max attempts reached
    if (!this.isIntentionallyClosed && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.scheduleReconnect()
    }
  }

  private scheduleReconnect(): void {
    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1) // Exponential backoff
    
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`)
    
    setTimeout(() => {
      this.connect()
    }, delay)
  }

  private startPingInterval(): void {
    this.stopPingInterval()
    
    // Send ping every 30 seconds to keep connection alive
    this.pingInterval = setInterval(() => {
      this.send({
        type: 'ping',
        payload: {},
        timestamp: new Date().toISOString()
      })
    }, 30000)
  }

  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }
  }

  send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      // Queue message to send when connected
      this.messageQueue.push(message)
      
      // Try to connect if not connected
      if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
        this.connect()
      }
    }
  }

  subscribe(type: MessageType, callback: (payload: any) => void): () => void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set())
    }
    
    this.subscribers.get(type)!.add(callback)
    
    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(type)
      if (subscribers) {
        subscribers.delete(callback)
        if (subscribers.size === 0) {
          this.subscribers.delete(type)
        }
      }
    }
  }

  disconnect(): void {
    this.isIntentionallyClosed = true
    this.stopPingInterval()
    
    if (this.ws) {
      this.ws.close(1000, 'Client disconnecting')
      this.ws = null
    }
    
    this.messageQueue = []
    this.subscribers.clear()
  }

  private getAuthToken(): string | null {
    // Get token from auth store or cookies
    const authState = useAuthStore.getState()
    return authState.user ? 'dummy-token' : null // Replace with actual token logic
  }

  getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

// Export singleton instance
export const wsManager = new WebSocketManager()

// Auto-connect when auth changes
if (typeof window !== 'undefined') {
  useAuthStore.subscribe((state) => {
    if (state.isAuthenticated) {
      wsManager.connect()
    } else {
      wsManager.disconnect()
    }
  })
}