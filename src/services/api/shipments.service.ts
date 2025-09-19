import { api } from './client'
import { 
  ShipmentTimeline, 
  ShipmentDocument, 
  ShipmentListResponse
} from '@/src/types/api.types'

class ShipmentsService {
  private readonly basePath = '/shipments'
  private cache: Map<string, { data: ShipmentTimeline; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 30000 // 30 seconds

  /**
   * Get shipment timeline for a specific order
   */
  async getShipmentTimeline(orderId: string): Promise<ShipmentTimeline> {
    // Check cache first
    const cached = this.cache.get(orderId)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await api.get<ShipmentTimeline>(`${this.basePath}/${orderId}/timeline`)
      const timeline = response.data.data

      // Update cache
      this.cache.set(orderId, { data: timeline, timestamp: Date.now() })
      
      return timeline
    } catch (error) {
      console.error('Error fetching shipment timeline:', error)
      
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data
      }
      
      // Return mock data as fallback for development
      if (process.env.NODE_ENV === 'development') {
        return this.getMockTimeline(orderId)
      }
      
      throw error
    }
  }

  /**
   * Get list of all shipments for the current user
   */
  async getShipments(): Promise<ShipmentListResponse> {
    try {
      const response = await api.get<ShipmentListResponse>(`${this.basePath}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching shipments:', error)
      
      // Return mock data for development
      if (process.env.NODE_ENV === 'development') {
        return {
          shipments: [
            {
              orderId: 'AUC-2024-0892',
              vehicleInfo: {
                make: 'Toyota',
                model: 'Corolla Axio',
                year: 2018,
                chassisNumber: 'NZE161-3153697',
              },
              currentStage: 'payment-documents',
              lastUpdated: new Date().toISOString(),
              destination: 'Los Angeles, USA',
            },
          ],
          total: 1,
        }
      }
      
      throw error
    }
  }

  /**
   * Get documents for a specific shipment stage
   */
  async getStageDocuments(
    orderId: string, 
    stageId: string
  ): Promise<ShipmentDocument[]> {
    try {
      const response = await api.get<ShipmentDocument[]>(
        `${this.basePath}/${orderId}/stages/${stageId}/documents`
      )
      return response.data.data
    } catch (error) {
      console.error('Error fetching stage documents:', error)
      return []
    }
  }

  /**
   * Download a specific document
   */
  async downloadDocument(
    orderId: string, 
    documentId: string
  ): Promise<Blob> {
    try {
      const response = await api.get<Blob>(
        `${this.basePath}/${orderId}/documents/${documentId}`,
        { responseType: 'blob' }
      )
      // When responseType is 'blob', the data is the Blob itself
      return (response as any).data as Blob
    } catch (error) {
      console.error('Error downloading document:', error)
      throw error
    }
  }

  /**
   * Check for timeline updates (for polling)
   */
  async checkForUpdates(
    orderId: string, 
    lastUpdated: string
  ): Promise<boolean> {
    try {
      const response = await api.get<{ hasUpdates: boolean; lastUpdated: string }>(
        `${this.basePath}/${orderId}/timeline/check-updates`,
        { params: { since: lastUpdated } }
      )
      return response.data.data.hasUpdates
    } catch (error) {
      console.error('Error checking for updates:', error)
      return false
    }
  }

  /**
   * Clear cache for a specific order or all orders
   */
  clearCache(orderId?: string): void {
    if (orderId) {
      this.cache.delete(orderId)
    } else {
      this.cache.clear()
    }
  }

  /**
   * Get mock timeline data for development
   */
  private getMockTimeline(orderId: string): ShipmentTimeline {
    return {
      orderId,
      vehicleInfo: {
        make: 'Toyota',
        model: 'Corolla Axio',
        year: 2018,
        chassisNumber: 'NZE161-3153697',
        color: 'Pearl White',
        winningBid: 7350000,
        destination: 'Los Angeles, USA',
        trackingNumber: 'TRK-2024-0892',
      },
      currentStageId: 'payment-documents',
      lastUpdated: new Date().toISOString(),
      stages: [
        {
          id: 'auction-won',
          sequence: 1,
          title: 'Auction Won',
          description: 'Congratulations! You have successfully won the auction',
          status: 'completed',
          progress: 100,
          isVisible: true,
          isOptional: false,
          completedDate: new Date('2024-01-10T14:30:00').toISOString(),
          updatedBy: 'System',
          tasks: [
            {
              id: 'won-1',
              title: 'Auction closed - Winner confirmed',
              status: 'completed',
              description: 'Final bid: ¥7,350,000',
              completedDate: new Date('2024-01-10T14:30:00').toISOString(),
            },
          ],
          documents: [],
        },
        {
          id: 'payment-documents',
          sequence: 2,
          title: 'Payment & Documents',
          description: 'Complete payment and submit required documents',
          status: 'in-progress',
          progress: 50,
          isVisible: true,
          isOptional: false,
          estimatedDate: new Date('2024-01-17T17:00:00').toISOString(),
          tasks: [
            {
              id: 'payment-1',
              title: 'Auction payment received',
              status: 'completed',
              description: 'Payment of ¥7,350,000 confirmed',
              completedDate: new Date('2024-01-11T10:15:00').toISOString(),
              assignee: 'Finance Team',
            },
            {
              id: 'payment-2',
              title: 'Purchase agreement signed',
              status: 'completed',
              description: 'Digital signature received',
              completedDate: new Date('2024-01-11T14:20:00').toISOString(),
              assignee: 'Legal Team',
            },
            {
              id: 'payment-3',
              title: 'Export certificate obtained',
              status: 'pending',
              description: 'Awaiting government approval',
              dueDate: new Date('2024-01-15T17:00:00').toISOString(),
              assignee: 'Export Team',
            },
            {
              id: 'payment-4',
              title: 'Shipping insurance purchased',
              status: 'pending',
              description: 'Select insurance coverage level',
              dueDate: new Date('2024-01-16T17:00:00').toISOString(),
              assignee: 'Insurance Team',
            },
          ],
          documents: [
            {
              id: 'doc-1',
              name: 'Payment Receipt',
              type: 'pdf',
              required: true,
              uploaded: true,
              uploadedDate: '2024-01-11T10:15:00',
              size: 245678,
            },
            {
              id: 'doc-2',
              name: 'Purchase Agreement',
              type: 'pdf',
              required: true,
              uploaded: true,
              uploadedDate: '2024-01-11T14:20:00',
              size: 567890,
            },
          ],
        },
        {
          id: 'shipping-preparation',
          sequence: 3,
          title: 'Shipping Preparation',
          description: 'Vehicle inspection and preparation for shipment',
          status: 'pending',
          progress: 0,
          isVisible: true,
          isOptional: false,
          estimatedDate: new Date('2024-01-20T17:00:00').toISOString(),
          tasks: [
            {
              id: 'prep-1',
              title: 'Final vehicle inspection',
              status: 'pending',
              description: 'Complete pre-shipment inspection checklist',
              dueDate: new Date('2024-01-18T10:00:00').toISOString(),
              assignee: 'Inspection Team',
            },
            {
              id: 'prep-2',
              title: 'Vehicle cleaning and detailing',
              status: 'pending',
              description: 'Professional detailing service',
              dueDate: new Date('2024-01-19T10:00:00').toISOString(),
              assignee: 'Preparation Team',
            },
            {
              id: 'prep-3',
              title: 'Load vehicle into container',
              status: 'pending',
              description: 'Secure vehicle for ocean freight',
              dueDate: new Date('2024-01-20T14:00:00').toISOString(),
              assignee: 'Loading Team',
            },
          ],
          documents: [],
        },
        {
          id: 'port-documentation',
          sequence: 4,
          title: 'Port Documentation',
          description: 'Vehicle photos taken at port before shipping',
          status: 'pending',
          progress: 0,
          isVisible: true,
          isOptional: false,
          estimatedDate: new Date('2024-01-21T17:00:00').toISOString(),
          tasks: [
            {
              id: 'port-1',
              title: 'Port arrival photos',
              status: 'pending',
              description: 'Comprehensive photos of vehicle condition at port',
              dueDate: new Date('2024-01-21T10:00:00').toISOString(),
              assignee: 'Port Team',
            },
            {
              id: 'port-2',
              title: 'Customer notification',
              status: 'pending',
              description: 'Notify customer that port photos are available',
              dueDate: new Date('2024-01-21T14:00:00').toISOString(),
              assignee: 'Customer Service',
            },
          ],
          documents: [],
        },
        {
          id: 'in-transit',
          sequence: 5,
          title: 'In Transit',
          description: 'Vehicle is being shipped to destination',
          status: 'pending',
          progress: 0,
          isVisible: true,
          isOptional: false,
          estimatedDate: new Date('2024-02-15T17:00:00').toISOString(),
          tasks: [
            {
              id: 'transit-1',
              title: 'Departure from port',
              status: 'pending',
              description: 'Vessel: Pacific Carrier - Container #PCT2024892',
              dueDate: new Date('2024-01-22T08:00:00').toISOString(),
              assignee: 'Shipping Line',
            },
            {
              id: 'transit-2',
              title: 'Arrival at destination port',
              status: 'pending',
              description: 'Expected arrival at destination',
              dueDate: new Date('2024-02-15T14:00:00').toISOString(),
              assignee: 'Shipping Line',
            },
          ],
          documents: [],
          customFields: {
            vesselName: 'Pacific Carrier',
            containerNumber: 'PCT2024892',
            shippingLine: 'Maersk',
          },
        },
        {
          id: 'document-shipping',
          sequence: 6,
          title: 'Document Shipping',
          description: 'Original documents sent via DHL/EMS for vehicle release',
          status: 'pending',
          progress: 0,
          isVisible: true,
          isOptional: false,
          estimatedDate: new Date('2024-01-23T17:00:00').toISOString(),
          tasks: [
            {
              id: 'doc-ship-1',
              title: 'Prepare release documents',
              status: 'pending',
              description: 'Bill of Lading, Export Certificate, and vehicle keys',
              dueDate: new Date('2024-01-22T14:00:00').toISOString(),
              assignee: 'Documentation Team',
            },
            {
              id: 'doc-ship-2',
              title: 'Ship via DHL/EMS',
              status: 'pending',
              description: 'Express shipping to customer',
              dueDate: new Date('2024-01-23T10:00:00').toISOString(),
              assignee: 'Shipping Team',
            },
            {
              id: 'doc-ship-3',
              title: 'Customer notification',
              status: 'pending',
              description: 'Send tracking number to customer',
              dueDate: new Date('2024-01-23T14:00:00').toISOString(),
              assignee: 'Customer Service',
            },
          ],
          documents: [],
        },
        {
          id: 'delivered',
          sequence: 7,
          title: 'Delivered',
          description: 'Vehicle delivered to customer',
          status: 'pending',
          progress: 0,
          isVisible: true,
          isOptional: false,
          estimatedDate: new Date('2024-02-20T17:00:00').toISOString(),
          tasks: [
            {
              id: 'delivery-1',
              title: 'Customs clearance',
              status: 'pending',
              description: 'Clear customs at destination',
              dueDate: new Date('2024-02-16T10:00:00').toISOString(),
              assignee: 'Customs Broker',
            },
            {
              id: 'delivery-2',
              title: 'Final delivery arrangement',
              status: 'pending',
              description: 'Schedule delivery with customer',
              dueDate: new Date('2024-02-18T10:00:00').toISOString(),
              assignee: 'Delivery Team',
            },
            {
              id: 'delivery-3',
              title: 'Vehicle handover',
              status: 'pending',
              description: 'Complete delivery and get signature',
              dueDate: new Date('2024-02-20T14:00:00').toISOString(),
              assignee: 'Delivery Team',
            },
          ],
          documents: [],
        },
      ],
    }
  }
}

// Export singleton instance
export const shipmentsService = new ShipmentsService()