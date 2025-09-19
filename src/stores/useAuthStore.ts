import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
  permissions: string[]
  profileImage?: string
  createdAt: string
  lastLogin: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        setUser: (user) => 
          set({ user, isAuthenticated: !!user }),

        login: async (email, _password) => {
          set({ isLoading: true, error: null })
          
          // Accept any login for now - simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const mockUser: User = {
            id: '1',
            email: email,
            name: email.split('@')[0] || 'User',
            role: 'customer' as const,
            permissions: ['view_vehicles', 'place_bids'],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          }
          
          set({ 
            user: mockUser, 
            isAuthenticated: true,
            isLoading: false 
          })
        },

        logout: async () => {
          set({ isLoading: true })
          
          // Simple logout - just clear the state
          await new Promise(resolve => setTimeout(resolve, 300))
          
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          })
        },

        refreshToken: async () => {
          try {
            const response = await fetch('/api/auth/refresh', {
              method: 'POST',
              credentials: 'include'
            })

            if (!response.ok) {
              throw new Error('Token refresh failed')
            }

            const data = await response.json()
            set({ 
              user: data.user,
              isAuthenticated: true 
            }, false, 'refreshToken/success')
          } catch (error) {
            set({ 
              user: null,
              isAuthenticated: false,
              error: error instanceof Error ? error.message : 'Session expired'
            }, false, 'refreshToken/error')
            throw error
          }
        },

        clearError: () => set({ error: null }, false, 'clearError')
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ 
          user: state.user,
          isAuthenticated: state.isAuthenticated 
        })
      }
    ),
    {
      name: 'auth-store'
    }
  )
)