'use client'

import { useState, useEffect, useCallback } from 'react'
import { GroupInfo, GroupBid, InlineBidData, BidStatus } from './types'

interface UseCarGroupBidReturn {
  groupInfo: GroupInfo | null
  isLoading: boolean
  isSubmitting: boolean
  bidStatus: BidStatus
  submitBid: (data: InlineBidData) => Promise<void>
  refreshGroupInfo: () => void
}

export function useCarGroupBid(carId: string, groupId: string): UseCarGroupBidReturn {
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bidStatus, setBidStatus] = useState<BidStatus>('none')

  // Fetch group information
  const fetchGroupInfo = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock data
      const mockGroupInfo: GroupInfo = {
        groupId,
        totalVehicles: Math.floor(Math.random() * 20) + 5,
        currentWinningBid: Math.floor(Math.random() * 2000000) + 1000000,
        totalBidders: Math.floor(Math.random() * 30) + 1,
        endTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        minBidIncrement: 50000,
        sampleVehicles: [
          {
            id: '1',
            groupId,
            title: 'Toyota Camry 2022',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80',
            price: 2500000,
            year: 2022,
            mileage: '15,000 km',
            transmission: 'Automatic',
            fuel: 'Hybrid'
          },
          {
            id: '2',
            groupId,
            title: 'Honda Accord 2023',
            image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80',
            price: 2800000,
            year: 2023,
            mileage: '8,000 km',
            transmission: 'Automatic',
            fuel: 'Petrol'
          },
          {
            id: '3',
            groupId,
            title: 'Nissan Altima 2022',
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80',
            price: 2300000,
            year: 2022,
            mileage: '20,000 km',
            transmission: 'CVT',
            fuel: 'Petrol'
          }
        ]
      }
      
      // Simulate user having an existing bid 30% of the time
      if (Math.random() > 0.7 && mockGroupInfo.currentWinningBid !== undefined) {
        const bidAmount = mockGroupInfo.currentWinningBid - 100000
        const userBid: GroupBid = {
          id: `bid-${Date.now()}`,
          groupId,
          bidAmount: bidAmount,
          quantity: 1,
          totalAmount: bidAmount,
          status: mockGroupInfo.currentWinningBid > bidAmount ? 'outbid' : 'winning',
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
        }
        mockGroupInfo.userBid = userBid
        setBidStatus(userBid.status === 'winning' ? 'winning' : 'outbid')
      }
      
      setGroupInfo(mockGroupInfo)
    } catch (error) {
      console.error('Failed to fetch group info:', error)
    } finally {
      setIsLoading(false)
    }
  }, [carId, groupId])

  // Submit bid
  const submitBid = useCallback(async (data: InlineBidData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create new bid
      const newBid: GroupBid = {
        id: `bid-${Date.now()}`,
        groupId,
        bidAmount: data.amount,
        quantity: data.quantity,
        totalAmount: data.amount * data.quantity,
        status: 'pending',
        timestamp: new Date()
      }
      
      // Update group info with new bid
      setGroupInfo(prev => {
        if (!prev) return prev
        
        // Determine bid status
        const isWinning = data.amount > (prev.currentWinningBid || 0)
        newBid.status = isWinning ? 'winning' : 'outbid'
        setBidStatus(isWinning ? 'winning' : 'outbid')
        
        const updatedBid = isWinning ? data.amount : prev.currentWinningBid
        return {
          ...prev,
          userBid: newBid,
          ...(updatedBid !== undefined && { currentWinningBid: updatedBid }),
          totalBidders: prev.totalBidders + (prev.userBid ? 0 : 1)
        }
      })
    } catch (error) {
      console.error('Failed to submit bid:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [groupId])

  // Initial fetch
  useEffect(() => {
    fetchGroupInfo()
  }, [fetchGroupInfo])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (groupInfo && Math.random() > 0.8) {
        setGroupInfo(prev => {
          if (!prev) return prev
          
          const newHighestBid = prev.currentWinningBid ? prev.currentWinningBid + 50000 : 1000000
          
          // Check if user is outbid
          if (prev.userBid && prev.userBid.bidAmount < newHighestBid) {
            setBidStatus('outbid')
            return {
              ...prev,
              currentWinningBid: newHighestBid,
              totalBidders: prev.totalBidders + 1,
              userBid: {
                ...prev.userBid,
                status: 'outbid'
              }
            }
          }
          
          return {
            ...prev,
            currentWinningBid: newHighestBid,
            totalBidders: prev.totalBidders + 1
          }
        })
      }
    }, 10000) // Update every 10 seconds
    
    return () => clearInterval(interval)
  }, [groupInfo])

  return {
    groupInfo,
    isLoading,
    isSubmitting,
    bidStatus,
    submitBid,
    refreshGroupInfo: fetchGroupInfo
  }
}