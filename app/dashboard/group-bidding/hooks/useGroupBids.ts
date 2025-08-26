'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { GroupId, VehicleBid as GroupBid, GroupInfo, GroupBidFormData as BidFormData, WebSocketMessage, BidStatus } from '../types'

interface UseGroupBidsReturn {
  groups: Map<GroupId, GroupInfo>
  bids: GroupBid[]
  selectedGroup: GroupId | null
  isConnected: boolean
  isSubmitting: boolean
  selectGroup: (groupId: GroupId) => void
  submitBid: (data: BidFormData) => Promise<void>
  cancelBid: (bidId: string) => void
  updateBid: (bidId: string) => void
}

// Mock WebSocket implementation for demo
// In production, replace with actual WebSocket connection:
// const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'

export function useGroupBids(): UseGroupBidsReturn {
  const [groups, setGroups] = useState<Map<GroupId, GroupInfo>>(new Map())
  const [bids, setBids] = useState<GroupBid[]>([])
  const [selectedGroup, setSelectedGroup] = useState<GroupId | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef(0)

  // Initialize mock data
  useEffect(() => {
    const mockGroups = new Map<GroupId, GroupInfo>()
    const groupIds: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    
    groupIds.forEach(id => {
      mockGroups.set(id, {
        currentHighestBid: Math.floor(Math.random() * 1000000) + 100000,
        totalBidders: Math.floor(Math.random() * 20),
        status: 'available'
      })
    })
    
    setGroups(mockGroups)
  }, [])

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    
    const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000)
    reconnectAttemptsRef.current++
    
    reconnectTimeoutRef.current = setTimeout(() => {
      if (wsRef.current?.readyState !== WebSocket.OPEN) {
        // Attempt reconnection
        setIsConnected(false)
      }
    }, delay)
  }, [])

  // WebSocket connection management
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    try {
      // For demo purposes, we'll simulate WebSocket behavior
      // In production, uncomment the actual WebSocket connection
      
      // wsRef.current = new WebSocket(WS_URL)
      
      // wsRef.current.onopen = () => {
      //   console.log('WebSocket connected')
      //   setIsConnected(true)
      //   reconnectAttemptsRef.current = 0
      // }
      
      // wsRef.current.onmessage = (event) => {
      //   try {
      //     const message: WebSocketMessage = JSON.parse(event.data)
      //     handleWebSocketMessage(message)
      //   } catch (error) {
      //     console.error('Failed to parse WebSocket message:', error)
      //   }
      // }
      
      // wsRef.current.onerror = (error) => {
      //   console.error('WebSocket error:', error)
      // }
      
      // wsRef.current.onclose = () => {
      //   console.log('WebSocket disconnected')
      //   setIsConnected(false)
      //   scheduleReconnect()
      // }
      
      // Simulate connection for demo
      setTimeout(() => setIsConnected(true), 500)
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
      scheduleReconnect()
    }
  }, [scheduleReconnect])

  const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
    if (message.type === 'bid_update') {
      setGroups(prev => {
        const updated = new Map(prev)
        const group = updated.get(message.groupId)
        if (group && message.data.highestBid) {
          group.currentHighestBid = message.data.highestBid
          group.totalBidders = message.data.totalBidders || group.totalBidders
        }
        return updated
      })
      
      // Update bid status if outbid
      setBids(prev => prev.map(bid => {
        if (bid.groupId === message.groupId && message.data.highestBid) {
          if (bid.bidAmount < message.data.highestBid && bid.status === 'winning') {
            return { ...bid, status: 'outbid' as BidStatus }
          }
        }
        return bid
      }))
    }
  }, [])

  const selectGroup = useCallback((groupId: GroupId) => {
    setSelectedGroup(groupId)
  }, [])

  const submitBid = useCallback(async (data: BidFormData) => {
    if (!data.groupId) throw new Error('No group selected')
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newBid: GroupBid = {
        id: `bid-${Date.now()}`,
        groupId: data.groupId,
        vehicleId: data.vehicleId,
        bidAmount: data.bidAmount,
        status: 'pending',
        placedAt: new Date(),
        lastUpdated: new Date()
      }
      
      // Optimistic update
      setBids(prev => [newBid, ...prev])
      
      // Update group info
      setGroups(prev => {
        const updated = new Map(prev)
        const group = data.groupId ? updated.get(data.groupId) : null
        if (group && data.groupId) {
          group.yourBid = newBid
          group.status = 'has-bid'
          
          // Simulate winning/outbid status
          if (data.bidAmount > group.currentHighestBid) {
            group.status = 'winning'
            newBid.status = 'winning'
          } else {
            group.status = 'outbid'
            newBid.status = 'outbid'
          }
        }
        return updated
      })
      
      // Reset selected group
      setSelectedGroup(null)
    } catch (error) {
      console.error('Failed to submit bid:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [groups])

  const cancelBid = useCallback((bidId: string) => {
    setBids(prev => prev.filter(bid => bid.id !== bidId))
    
    // Update group info
    const cancelledBid = bids.find(b => b.id === bidId)
    if (cancelledBid) {
      setGroups(prev => {
        const updated = new Map(prev)
        const group = updated.get(cancelledBid.groupId)
        if (group) {
          delete group.yourBid
          group.status = 'available'
        }
        return updated
      })
    }
  }, [bids])

  const updateBid = useCallback((bidId: string) => {
    const bid = bids.find(b => b.id === bidId)
    if (bid) {
      setSelectedGroup(bid.groupId)
      // Pre-fill form with existing bid data would be handled by the form component
    }
  }, [bids])

  // Connect WebSocket on mount
  useEffect(() => {
    connectWebSocket()
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      const ws = wsRef.current
      if (ws) {
        ws.close()
      }
    }
  }, [connectWebSocket])

  // Simulate real-time updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update a group's highest bid
      const groupIds: GroupId[] = Array.from(groups.keys())
      if (groupIds.length > 0) {
        const randomGroup = groupIds[Math.floor(Math.random() * groupIds.length)]
        if (randomGroup) {
          const group = groups.get(randomGroup)
          if (group && Math.random() > 0.7) {
          const message: WebSocketMessage = {
            type: 'bid_update',
            groupId: randomGroup,
            data: {
              highestBid: group.currentHighestBid + Math.floor(Math.random() * 50000) + 10000,
              totalBidders: group.totalBidders + 1
            }
          }
            handleWebSocketMessage(message)
          }
        }
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [groups, handleWebSocketMessage])

  return {
    groups,
    bids,
    selectedGroup,
    isConnected,
    isSubmitting,
    selectGroup,
    submitBid,
    cancelBid,
    updateBid
  }
}