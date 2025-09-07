'use client'

import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { LoginCredentials, RegisterData } from '@/lib/validations/auth.schema'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, setUser, logout } = useAuthStore()

  // Check authentication status on mount
  useQuery({
    queryKey: ['auth', 'status'],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/auth/me')
        if (response) {
          setUser(response)
        }
        return response
      } catch {
        return null
      }
    },
    retry: false,
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post('/auth/login', credentials)
      return response
    },
    onSuccess: (data) => {
      setUser(data.user)
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout')
    },
    onSuccess: () => {
      logout()
      router.push('/')
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await apiClient.post('/auth/register', data)
      return response
    },
    onSuccess: (data) => {
      setUser(data.user)
      router.push('/dashboard')
    },
  })

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await apiClient.post('/auth/refresh')
      if (response?.user) {
        setUser(response.user)
      }
      return response
    } catch {
      logout()
      router.push('/')
      return null
    }
  }

  // Set up token refresh interval
  useEffect(() => {
    if (!isAuthenticated) return

    // Refresh token every 50 minutes (access token expires in 2 hours)
    const interval = setInterval(() => {
      refreshToken()
    }, 50 * 60 * 1000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    register: registerMutation.mutate,
    refreshToken,
    isLoading: loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || logoutMutation.error || registerMutation.error,
  }
}