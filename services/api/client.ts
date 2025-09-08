import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_CONFIG, DEFAULT_HEADERS, ERROR_MESSAGES } from '@/config/api.config'
import { ApiResponse, ApiError } from '@/types/api.types'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: DEFAULT_HEADERS,
})

// Token management
let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common['Authorization']
  }
}

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (authToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${authToken}`
    }
    
    // Add timestamp to prevent caching on GET requests if needed
    if (config.method === 'get' && config.params) {
      config.params._t = Date.now()
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      // API request logging removed
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      // API response logging removed
    }
    
    // Transform response to standard format if needed
    if (!response.data.hasOwnProperty('data')) {
      response.data = {
        data: response.data,
        status: response.status,
        message: 'Success',
        timestamp: new Date().toISOString(),
      }
    }
    
    return response
  },
  async (error: AxiosError<ApiError>) => {
    // Handle different error scenarios
    if (!error.response) {
      // Network error
      console.error('Network error:', error.message)
      return Promise.reject({
        status: 0,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        error: error.message,
        timestamp: new Date().toISOString(),
      })
    }
    
    const { status, data } = error.response
    
    // Handle specific status codes
    switch (status) {
      case 401:
        // Unauthorized - try to refresh token
        if (error.config && !error.config.headers?.['X-Retry-Request']) {
          try {
            // Attempt token refresh
            const newToken = await refreshToken()
            if (newToken) {
              setAuthToken(newToken)
              error.config.headers['X-Retry-Request'] = 'true'
              return apiClient.request(error.config)
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            handleLogout()
          }
        }
        break
        
      case 403:
        console.error('Forbidden:', data?.message || ERROR_MESSAGES.UNAUTHORIZED)
        break
        
      case 404:
        console.error('Not found:', data?.message || ERROR_MESSAGES.NOT_FOUND)
        break
        
      case 422:
        console.error('Validation error:', data?.message || ERROR_MESSAGES.VALIDATION_ERROR)
        break
        
      case 500:
      case 502:
      case 503:
      case 504:
        console.error('Server error:', data?.message || ERROR_MESSAGES.SERVER_ERROR)
        break
        
      default:
        console.error(`API Error ${status}:`, data?.message || ERROR_MESSAGES.UNKNOWN)
    }
    
    // Return standardized error
    return Promise.reject({
      status,
      message: data?.message || ERROR_MESSAGES.UNKNOWN,
      error: data?.error,
      timestamp: data?.timestamp || new Date().toISOString(),
    })
  }
)

// Helper function to refresh token
async function refreshToken(): Promise<string | null> {
  try {
    const refreshTokenValue = localStorage.getItem('refreshToken')
    if (!refreshTokenValue) return null
    
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}/auth/refresh`,
      { refreshToken: refreshTokenValue },
      { headers: DEFAULT_HEADERS }
    )
    
    const { accessToken, refreshToken: newRefreshToken } = response.data.data
    
    // Store new tokens
    localStorage.setItem('accessToken', accessToken)
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken)
    }
    
    return accessToken
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  setAuthToken(null)
  
  // Don't redirect - just log the logout
  // User logout logged
}

// Retry logic for failed requests
export async function apiRequestWithRetry<T>(
  config: AxiosRequestConfig,
  retries = API_CONFIG.RETRY_ATTEMPTS
): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T>>(config)
    return response.data.data
  } catch (error) {
    if (retries > 0 && (error as ApiError).status >= 500) {
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY))
      return apiRequestWithRetry<T>(config, retries - 1)
    }
    throw error
  }
}

// Convenience methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    apiClient.get<ApiResponse<T>>(url, config),
    
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiClient.post<ApiResponse<T>>(url, data, config),
    
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiClient.put<ApiResponse<T>>(url, data, config),
    
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiClient.patch<ApiResponse<T>>(url, data, config),
    
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    apiClient.delete<ApiResponse<T>>(url, config),
}

export default apiClient