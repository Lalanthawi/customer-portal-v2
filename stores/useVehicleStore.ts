import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { Vehicle, VehicleDetail, VehicleFilters } from '@/types/api.types'

interface VehicleState {
  // State
  vehicles: Vehicle[]
  selectedVehicle: VehicleDetail | null
  favorites: string[]
  filters: VehicleFilters
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  pageSize: number
  
  // Cache management
  cache: Map<string, { data: any; timestamp: number }>
  cacheTimeout: number // in milliseconds
  
  // Actions
  setVehicles: (vehicles: Vehicle[], total?: number) => void
  setSelectedVehicle: (vehicle: VehicleDetail | null) => void
  addToFavorites: (vehicleId: string) => void
  removeFromFavorites: (vehicleId: string) => void
  setFilters: (filters: Partial<VehicleFilters>) => void
  resetFilters: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  
  // API calls
  fetchVehicles: (filters?: VehicleFilters) => Promise<void>
  fetchVehicleDetail: (id: string) => Promise<void>
  searchVehicles: (query: string) => Promise<Vehicle[]>
  
  // Cache methods
  getCached: <T>(key: string) => T | null
  setCached: <T>(key: string, data: T) => void
  clearCache: () => void
  
  // Real-time updates from admin
  handleVehicleUpdate: (vehicle: Partial<Vehicle>) => void
  handleVehicleDelete: (vehicleId: string) => void
  handlePriceUpdate: (vehicleId: string, newPrice: number) => void
}

const DEFAULT_FILTERS: VehicleFilters = {
  make: undefined,
  model: undefined,
  yearMin: undefined,
  yearMax: undefined,
  priceMin: undefined,
  priceMax: undefined,
  mileageMax: undefined,
  transmission: undefined,
  fuel: undefined
}

const CACHE_TIMEOUT = 5 * 60 * 1000 // 5 minutes

export const useVehicleStore = create<VehicleState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      vehicles: [],
      selectedVehicle: null,
      favorites: [],
      filters: DEFAULT_FILTERS,
      isLoading: false,
      error: null,
      totalCount: 0,
      currentPage: 1,
      pageSize: 20,
      cache: new Map(),
      cacheTimeout: CACHE_TIMEOUT,

      // Actions
      setVehicles: (vehicles, total) => 
        set({ 
          vehicles, 
          totalCount: total || vehicles.length,
          error: null 
        }, false, 'setVehicles'),

      setSelectedVehicle: (vehicle) => 
        set({ selectedVehicle: vehicle }, false, 'setSelectedVehicle'),

      addToFavorites: (vehicleId) => 
        set((state) => ({
          favorites: [...state.favorites, vehicleId]
        }), false, 'addToFavorites'),

      removeFromFavorites: (vehicleId) => 
        set((state) => ({
          favorites: state.favorites.filter(id => id !== vehicleId)
        }), false, 'removeFromFavorites'),

      setFilters: (filters) => 
        set((state) => ({
          filters: { ...state.filters, ...filters },
          currentPage: 1 // Reset to first page on filter change
        }), false, 'setFilters'),

      resetFilters: () => 
        set({ 
          filters: DEFAULT_FILTERS,
          currentPage: 1 
        }, false, 'resetFilters'),

      setPage: (page) => 
        set({ currentPage: page }, false, 'setPage'),

      setPageSize: (size) => 
        set({ 
          pageSize: size,
          currentPage: 1 
        }, false, 'setPageSize'),

      // API calls
      fetchVehicles: async (filters) => {
        const state = get()
        const cacheKey = `vehicles-${JSON.stringify(filters || state.filters)}-${state.currentPage}-${state.pageSize}`
        
        // Check cache first
        const cached = state.getCached<{ vehicles: Vehicle[]; total: number }>(cacheKey)
        if (cached) {
          set({ 
            vehicles: cached.vehicles,
            totalCount: cached.total,
            isLoading: false 
          })
          return
        }

        set({ isLoading: true, error: null }, false, 'fetchVehicles/start')
        
        try {
          const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              filters: filters || state.filters,
              page: state.currentPage,
              limit: state.pageSize
            })
          })

          if (!response.ok) {
            throw new Error('Failed to fetch vehicles')
          }

          const data = await response.json()
          
          // Cache the result
          state.setCached(cacheKey, {
            vehicles: data.vehicles,
            total: data.total
          })
          
          set({ 
            vehicles: data.vehicles,
            totalCount: data.total,
            isLoading: false 
          }, false, 'fetchVehicles/success')
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch vehicles',
            isLoading: false 
          }, false, 'fetchVehicles/error')
        }
      },

      fetchVehicleDetail: async (id) => {
        const state = get()
        const cacheKey = `vehicle-${id}`
        
        // Check cache first
        const cached = state.getCached<VehicleDetail>(cacheKey)
        if (cached) {
          set({ selectedVehicle: cached, isLoading: false })
          return
        }

        set({ isLoading: true, error: null }, false, 'fetchVehicleDetail/start')
        
        try {
          const response = await fetch(`/api/vehicles/${id}`, {
            credentials: 'include'
          })

          if (!response.ok) {
            throw new Error('Failed to fetch vehicle details')
          }

          const vehicle = await response.json()
          
          // Cache the result
          state.setCached(cacheKey, vehicle)
          
          set({ 
            selectedVehicle: vehicle,
            isLoading: false 
          }, false, 'fetchVehicleDetail/success')
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch vehicle',
            isLoading: false 
          }, false, 'fetchVehicleDetail/error')
        }
      },

      searchVehicles: async (query) => {
        if (query.length < 3) return []
        
        const state = get()
        const cacheKey = `search-${query}`
        
        // Check cache first
        const cached = state.getCached<Vehicle[]>(cacheKey)
        if (cached) return cached

        try {
          const response = await fetch(`/api/vehicles/search?q=${encodeURIComponent(query)}`, {
            credentials: 'include'
          })

          if (!response.ok) {
            throw new Error('Search failed')
          }

          const results = await response.json()
          
          // Cache the result
          state.setCached(cacheKey, results)
          
          return results
        } catch (error) {
          console.error('Search error:', error)
          return []
        }
      },

      // Cache methods
      getCached: function<T>(key: string): T | null {
        const state = get()
        const cached = state.cache.get(key)
        
        if (!cached) return null
        
        const now = Date.now()
        if (now - cached.timestamp > state.cacheTimeout) {
          state.cache.delete(key)
          return null
        }
        
        return cached.data as T
      },

      setCached: function<T>(key: string, data: T) {
        const state = get()
        state.cache.set(key, {
          data,
          timestamp: Date.now()
        })
      },

      clearCache: () => {
        const state = get()
        state.cache.clear()
        set({ cache: new Map() }, false, 'clearCache')
      },

      // Real-time updates from admin
      handleVehicleUpdate: (vehicleUpdate) => 
        set((state) => ({
          vehicles: state.vehicles.map(v => 
            v.id === vehicleUpdate.id 
              ? { ...v, ...vehicleUpdate }
              : v
          ),
          selectedVehicle: state.selectedVehicle?.id === vehicleUpdate.id
            ? { ...state.selectedVehicle, ...vehicleUpdate } as VehicleDetail
            : state.selectedVehicle
        }), false, 'handleVehicleUpdate'),

      handleVehicleDelete: (vehicleId) => 
        set((state) => ({
          vehicles: state.vehicles.filter(v => v.id !== vehicleId),
          selectedVehicle: state.selectedVehicle?.id === vehicleId 
            ? null 
            : state.selectedVehicle
        }), false, 'handleVehicleDelete'),

      handlePriceUpdate: (vehicleId, newPrice) => 
        set((state) => ({
          vehicles: state.vehicles.map(v => 
            v.id === vehicleId 
              ? { ...v, pricing: { ...v.pricing, currentBid: newPrice } }
              : v
          ),
          selectedVehicle: state.selectedVehicle?.id === vehicleId
            ? { 
                ...state.selectedVehicle, 
                purchasePrice: newPrice 
              } as VehicleDetail
            : state.selectedVehicle
        }), false, 'handlePriceUpdate')
    })),
    {
      name: 'vehicle-store'
    }
  )
)