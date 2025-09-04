import { api } from './client'
import { mockDataStore } from './mock-data'
import { Inspection, RequestInspectionRequest } from '@/types/api.types'
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config'

export const inspectionsService = {
  // Request a new inspection
  async requestInspection(request: RequestInspectionRequest): Promise<Inspection> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const inspection = mockDataStore.requestInspection(request.vehicleId, 'user1')
      
      // Add notification
      mockDataStore.addNotification({
        userId: 'user1',
        type: 'inspection',
        title: 'Inspection Requested',
        message: 'Your inspection request has been received and is being processed',
        vehicleId: request.vehicleId,
        read: false
      })
      
      // Simulate notification when completed
      setTimeout(() => {
        mockDataStore.addNotification({
          userId: 'user1',
          type: 'inspection',
          title: 'Inspection Completed',
          message: 'Your inspection report is ready for viewing',
          vehicleId: request.vehicleId,
          read: false
        })
      }, 6000)
      
      return inspection
    }
    
    const response = await api.post<Inspection>(API_ENDPOINTS.inspections.request, request)
    return response.data.data
  },

  // Get all inspections
  async getInspections(): Promise<Inspection[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.inspections
    }
    
    const response = await api.get<Inspection[]>(API_ENDPOINTS.inspections.list)
    return response.data.data
  },

  // Get inspection by ID
  async getInspectionById(id: string): Promise<Inspection | undefined> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.inspections.find(i => i.id === id)
    }
    
    const response = await api.get<Inspection>(API_ENDPOINTS.inspections.detail(id))
    return response.data.data
  },

  // Get inspection by vehicle ID
  async getInspectionByVehicle(vehicleId: string): Promise<Inspection | undefined> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.getInspectionByVehicle(vehicleId)
    }
    
    const response = await api.get<Inspection>(API_ENDPOINTS.inspections.byVehicle(vehicleId))
    return response.data.data
  },

  // Download inspection report
  async downloadInspectionReport(id: string): Promise<Blob> {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate PDF download
      const mockPdfContent = 'Mock PDF content for inspection ' + id
      return new Blob([mockPdfContent], { type: 'application/pdf' })
    }
    
    const response = await api.get<Blob>(API_ENDPOINTS.inspections.download(id), {
      responseType: 'blob'
    })
    return response.data as unknown as Blob
  },
}