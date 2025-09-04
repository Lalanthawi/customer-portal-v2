// Shared data store for translations and inspections across customers
// In production, this would be managed by a backend API

export type TranslationStatus = 'not available' | 'requested' | 'translating' | 'translated'
export type InspectionStatus = 'not available' | 'requested' | 'processing' | 'completed'

export interface TranslationData {
  vehicleId: string
  status: TranslationStatus
  requestedBy: string
  requestedAt: Date
  completedAt?: Date
  translation?: string
  originalSheet?: string
}

export interface InspectionData {
  vehicleId: string
  status: InspectionStatus
  requestedBy: string
  requestedAt: Date
  completedAt?: Date
  report?: string
  images?: string[]
}

// Simulated shared database - in production this would be server-side
class SharedDataStore {
  private translations: Map<string, TranslationData> = new Map()
  private inspections: Map<string, InspectionData> = new Map()
  private subscribers: Map<string, Set<(type: 'translation' | 'inspection', data: any) => void>> = new Map()

  constructor() {
    // Initialize with some sample data
    this.inspections.set('2', {
      vehicleId: '2',
      status: 'completed',
      requestedBy: 'Another Customer',
      requestedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 43200000),
      report: 'Professional inspection completed. Vehicle in excellent condition with minor wear consistent with age.',
      images: ['inspection1.jpg', 'inspection2.jpg']
    })

    this.translations.set('3', {
      vehicleId: '3',
      status: 'translated',
      requestedBy: 'Another Customer',
      requestedAt: new Date(Date.now() - 172800000),
      completedAt: new Date(Date.now() - 86400000),
      translation: 'Translated auction sheet: Grade 4.5, excellent condition...',
      originalSheet: 'Original Japanese auction sheet content...'
    })
  }

  // Subscribe to updates for a specific vehicle
  subscribe(vehicleId: string, callback: (type: 'translation' | 'inspection', data: any) => void) {
    if (!this.subscribers.has(vehicleId)) {
      this.subscribers.set(vehicleId, new Set())
    }
    this.subscribers.get(vehicleId)!.add(callback)
    
    // Return unsubscribe function
    return () => {
      const subs = this.subscribers.get(vehicleId)
      if (subs) {
        subs.delete(callback)
        if (subs.size === 0) {
          this.subscribers.delete(vehicleId)
        }
      }
    }
  }

  // Notify subscribers of updates
  private notify(vehicleId: string, type: 'translation' | 'inspection', data: any) {
    const subs = this.subscribers.get(vehicleId)
    if (subs) {
      subs.forEach(callback => callback(type, data))
    }
  }

  // Translation methods
  getTranslation(vehicleId: string): TranslationData | undefined {
    return this.translations.get(vehicleId)
  }

  requestTranslation(vehicleId: string, requestedBy: string): TranslationData {
    const existing = this.translations.get(vehicleId)
    
    // If already exists and is available, return it immediately
    if (existing && (existing.status === 'translated' || existing.status === 'translating')) {
      return existing
    }

    const data: TranslationData = {
      vehicleId,
      status: 'requested',
      requestedBy,
      requestedAt: new Date()
    }
    
    this.translations.set(vehicleId, data)
    this.notify(vehicleId, 'translation', data)
    
    // Simulate processing
    setTimeout(() => {
      data.status = 'translating'
      this.notify(vehicleId, 'translation', data)
      
      setTimeout(() => {
        data.status = 'translated'
        data.completedAt = new Date()
        data.translation = 'Fully translated auction sheet with all details...'
        data.originalSheet = 'Original Japanese content...'
        this.notify(vehicleId, 'translation', data)
      }, 3000)
    }, 2000)
    
    return data
  }

  getAllTranslations(): TranslationData[] {
    return Array.from(this.translations.values())
  }

  // Inspection methods
  getInspection(vehicleId: string): InspectionData | undefined {
    return this.inspections.get(vehicleId)
  }

  requestInspection(vehicleId: string, requestedBy: string): InspectionData {
    const existing = this.inspections.get(vehicleId)
    
    // If already exists and is available, return it immediately
    if (existing && (existing.status === 'completed' || existing.status === 'processing')) {
      return existing
    }

    const data: InspectionData = {
      vehicleId,
      status: 'requested',
      requestedBy,
      requestedAt: new Date()
    }
    
    this.inspections.set(vehicleId, data)
    this.notify(vehicleId, 'inspection', data)
    
    // Simulate processing
    setTimeout(() => {
      data.status = 'processing'
      this.notify(vehicleId, 'inspection', data)
      
      setTimeout(() => {
        data.status = 'completed'
        data.completedAt = new Date()
        data.report = 'Comprehensive inspection report with detailed findings...'
        data.images = ['inspection1.jpg', 'inspection2.jpg', 'inspection3.jpg']
        this.notify(vehicleId, 'inspection', data)
      }, 5000)
    }, 2000)
    
    return data
  }

  getAllInspections(): InspectionData[] {
    return Array.from(this.inspections.values())
  }
}

// Export singleton instance
export const sharedDataStore = new SharedDataStore()