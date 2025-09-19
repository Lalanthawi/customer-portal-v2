import { api } from './client'
import { mockDataStore } from '@/src/mocks'
import { Translation, RequestTranslationRequest } from '@/src/types/api.types'
import { API_CONFIG, API_ENDPOINTS } from '@/src/config/api.config'

export const translationsService = {
  // Request a new translation
  async requestTranslation(request: RequestTranslationRequest): Promise<Translation> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const translation = mockDataStore.requestTranslation(request.vehicleId, 'user1')
      
      // Add notification
      mockDataStore.addNotification({
        userId: 'user1',
        type: 'translation',
        title: 'Translation Requested',
        message: 'Your translation request is being processed',
        vehicleId: request.vehicleId,
        read: false
      })
      
      // Simulate notification when completed
      setTimeout(() => {
        mockDataStore.addNotification({
          userId: 'user1',
          type: 'translation',
          title: 'Translation Completed',
          message: 'Your translated auction sheet is ready',
          vehicleId: request.vehicleId,
          read: false
        })
      }, 4000)
      
      return translation
    }
    
    const response = await api.post<Translation>(API_ENDPOINTS.translations.request, request)
    return response.data.data
  },

  // Get all translations
  async getTranslations(): Promise<Translation[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.translations
    }
    
    const response = await api.get<Translation[]>(API_ENDPOINTS.translations.list)
    return response.data.data
  },

  // Get translation by ID
  async getTranslationById(id: string): Promise<Translation | undefined> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.translations.find(t => t.id === id)
    }
    
    const response = await api.get<Translation>(API_ENDPOINTS.translations.detail(id))
    return response.data.data
  },

  // Get translation by vehicle ID
  async getTranslationByVehicle(vehicleId: string): Promise<Translation | undefined> {
    if (API_CONFIG.USE_MOCK_DATA) {
      return mockDataStore.getTranslationByVehicle(vehicleId)
    }
    
    const response = await api.get<Translation>(API_ENDPOINTS.translations.byVehicle(vehicleId))
    return response.data.data
  },
}