import { api } from './client'
import { VehicleDetail, VehicleDocument, VehicleShipment, VehicleInspection, VehicleTranslation } from '@/types/api.types'

class VehicleDetailsService {
  private readonly basePath = '/vehicles'
  private cache: Map<string, { data: VehicleDetail; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 30000 // 30 seconds

  /**
   * Get complete vehicle details including documents, shipping, etc.
   * This data is managed by admin dashboard
   */
  async getVehicleDetails(vehicleId: string): Promise<VehicleDetail> {
    // Check cache first
    const cached = this.cache.get(vehicleId)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await api.get<VehicleDetail>(`${this.basePath}/${vehicleId}/details`)
      const vehicleDetail = response.data.data

      // Update cache
      this.cache.set(vehicleId, { data: vehicleDetail, timestamp: Date.now() })
      
      return vehicleDetail
    } catch (error) {
      console.error('Error fetching vehicle details:', error)
      
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data
      }
      
      // Return mock data as fallback for development
      if (process.env.NODE_ENV === 'development') {
        return this.getMockVehicleDetails(vehicleId)
      }
      
      throw error
    }
  }

  /**
   * Get vehicle documents (managed by admin)
   */
  async getVehicleDocuments(vehicleId: string): Promise<VehicleDocument[]> {
    try {
      const response = await api.get<VehicleDocument[]>(`${this.basePath}/${vehicleId}/documents`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching vehicle documents:', error)
      
      if (process.env.NODE_ENV === 'development') {
        return this.getMockDocuments()
      }
      
      return []
    }
  }

  /**
   * Get shipping timeline (managed by admin)
   */
  async getVehicleShipping(vehicleId: string): Promise<VehicleShipment | null> {
    try {
      const response = await api.get<VehicleShipment>(`${this.basePath}/${vehicleId}/shipping`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching vehicle shipping:', error)
      
      if (process.env.NODE_ENV === 'development') {
        return this.getMockShipping()
      }
      
      return null
    }
  }

  /**
   * Request vehicle inspection (creates request for admin to process)
   */
  async requestInspection(vehicleId: string): Promise<VehicleInspection> {
    try {
      const response = await api.post<VehicleInspection>(`${this.basePath}/${vehicleId}/inspection/request`)
      return response.data.data
    } catch (error) {
      console.error('Error requesting inspection:', error)
      throw error
    }
  }

  /**
   * Request auction sheet translation (creates request for admin to process)
   */
  async requestTranslation(vehicleId: string): Promise<VehicleTranslation> {
    try {
      const response = await api.post<VehicleTranslation>(`${this.basePath}/${vehicleId}/translation/request`)
      return response.data.data
    } catch (error) {
      console.error('Error requesting translation:', error)
      throw error
    }
  }

  /**
   * Download document
   */
  async downloadDocument(vehicleId: string, documentId: string): Promise<Blob> {
    try {
      const response = await api.get(
        `${this.basePath}/${vehicleId}/documents/${documentId}/download`,
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
   * Clear cache for a specific vehicle or all vehicles
   */
  clearCache(vehicleId?: string): void {
    if (vehicleId) {
      this.cache.delete(vehicleId)
    } else {
      this.cache.clear()
    }
  }

  /**
   * Get mock vehicle details for development
   * Admin can manage all these fields from their dashboard
   */
  private getMockVehicleDetails(vehicleId: string): VehicleDetail {
    return {
      id: vehicleId,
      // Basic Information (Admin Managed)
      title: '2018 Toyota Corolla Axio',
      make: 'Toyota',
      model: 'Corolla Axio',
      year: 2018,
      
      // Identification (Admin Managed)
      vin: 'JTDBR32E820123456',
      chassisNumber: 'NZE161-3153697',
      // engineNumber removed as requested
      
      // Vehicle Details (Admin Managed)
      color: 'Pearl White',
      mileage: 45000,
      transmission: 'automatic',
      fuelType: 'hybrid',
      engineSize: '1.5L',
      
      // Purchase Information (Admin Managed)
      source: 'auction',
      purchaseDate: '2024-01-10',
      purchasePrice: 7350000,
      
      // Status (Admin Updates This)
      status: 'in_transit',
      statusDetails: {
        location: 'Pacific Ocean',
        lastUpdated: new Date().toISOString(),
        nextStep: 'Port Arrival'
      },
      
      // Images (Admin Uploads)
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
          type: 'main',
          caption: 'Front view'
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
          type: 'gallery',
          caption: 'Side view'
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
          type: 'gallery',
          caption: 'Interior'
        }
      ],
      
      // Documents (Admin Manages Upload/Status)
      documents: this.getMockDocuments(),
      
      // Shipping (Admin Updates)
      shipping: this.getMockShipping(),
      
      // Auction Details (Admin Sets Initially)
      auctionDetails: {
        auctionHouse: 'USS Tokyo',
        lotNumber: '42315',
        auctionDate: '2024-01-10',
        grade: '4.5',
        sheetUrl: '#',
        sheetAvailable: true
      },
      
      // Specifications (Admin Managed)
      specifications: {
        doors: 4,
        seats: 5,
        driveType: '2WD',
        bodyType: 'Sedan',
        features: [
          'Navigation System',
          'Backup Camera',
          'Cruise Control',
          'Keyless Entry',
          'Alloy Wheels',
          'LED Headlights'
        ]
      },
      
      // Inspection (Admin Updates After Inspection)
      inspection: {
        status: 'not_requested',
        requestable: true,
        fee: 3000,
        estimatedDuration: '24-48 hours'
      },
      
      // Translation (Admin Updates After Translation)
      translation: {
        status: 'not_requested',
        requestable: true,
        fee: 1500,
        estimatedDuration: '2-4 hours'
      },
      
      // Admin can add custom fields
      customFields: {},
      
      // Metadata
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: new Date().toISOString()
    }
  }

  private getMockDocuments(): VehicleDocument[] {
    return [
      {
        id: '1',
        name: 'Commercial Invoice',
        type: 'invoice',
        uploadDate: '2024-01-12',
        size: 245678,
        url: '#',
        status: 'available',
        required: true,
        visibleToCustomer: true,
        uploadedBy: 'Admin',
        category: 'purchase'
      },
      {
        id: '2',
        name: 'Export Certificate',
        type: 'export_certificate',
        uploadDate: '2024-01-15',
        size: 180432,
        url: '#',
        status: 'available',
        required: true,
        visibleToCustomer: true,
        uploadedBy: 'Admin',
        category: 'export'
      },
      {
        id: '3',
        name: 'Bill of Lading',
        type: 'bill_of_lading',
        uploadDate: '2024-01-20',
        size: 320156,
        url: '#',
        status: 'available',
        required: true,
        visibleToCustomer: true,
        uploadedBy: 'Admin',
        category: 'shipping'
      },
      {
        id: '4',
        name: 'Deregistration Certificate',
        type: 'deregistration',
        uploadDate: '2024-01-18',
        size: 150234,
        status: 'processing',
        required: true,
        visibleToCustomer: true,
        uploadedBy: 'Admin',
        category: 'export',
        processingNote: 'Awaiting government approval'
      },
      {
        id: '5',
        name: 'JEVIC Inspection Report',
        type: 'inspection_report',
        uploadDate: '2024-01-22',
        size: 450789,
        url: '#',
        status: 'available',
        required: false,
        visibleToCustomer: true,
        uploadedBy: 'Inspector',
        category: 'inspection'
      }
    ]
  }

  private getMockShipping(): VehicleShipment {
    return {
      vessel: 'NYK Delphinus',
      eta: '2024-02-20',
      etd: '2024-01-25',
      departurePort: 'Yokohama Port',
      arrivalPort: 'Los Angeles Port',
      containerNumber: 'NYKU1234567',
      bookingNumber: 'BK20240110001',
      shippingLine: 'NYK Line',
      status: 'in_transit',
      trackingUrl: 'https://tracking.nyk.com/NYKU1234567',
      lastUpdate: new Date().toISOString(),
      // Admin can update these milestones
      milestones: [
        {
          date: '2024-01-25',
          status: 'completed',
          description: 'Loaded on vessel',
          location: 'Yokohama Port'
        },
        {
          date: '2024-01-26',
          status: 'completed',
          description: 'Departed from port',
          location: 'Yokohama Port'
        },
        {
          date: '2024-02-15',
          status: 'pending',
          description: 'Arrival at destination',
          location: 'Los Angeles Port'
        }
      ]
    }
  }
}

// Export singleton instance
export const vehicleDetailsService = new VehicleDetailsService()