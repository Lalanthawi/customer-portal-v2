import { z } from 'zod'

// API Configuration
const API_CONFIG = {
  baseURL: process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  useMockData: process.env['NEXT_PUBLIC_USE_MOCK_DATA'] === 'true'
}

// Request/Response types
export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
  timeout?: number
  retry?: boolean
  cache?: RequestCache
  credentials?: RequestCredentials
  validateResponse?: z.ZodSchema<any>
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  message?: string
  timestamp: string
  headers: Headers
}

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: any
  timestamp: string
}

// Custom error class
export class ApiClientError extends Error {
  status: number
  code?: string
  details?: any
  timestamp: string

  constructor(error: ApiError) {
    super(error.message)
    this.name = 'ApiClientError'
    this.status = error.status
    this.code = error.code
    this.details = error.details
    this.timestamp = error.timestamp
  }
}

// Request interceptor type
type RequestInterceptor = (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>

// Response interceptor type
type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>

// Error interceptor type
type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>

class ApiClient {
  private baseURL: string
  private timeout: number
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []
  private abortControllers: Map<string, AbortController> = new Map()

  constructor(config = API_CONFIG) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
    
    // Default interceptors
    this.setupDefaultInterceptors()
  }

  private setupDefaultInterceptors(): void {
    // Add CSRF token to requests
    this.addRequestInterceptor((config) => {
      const csrfToken = this.getCSRFToken()
      if (csrfToken) {
        config.headers = {
          ...config.headers,
          'X-CSRF-Token': csrfToken
        }
      }
      return config
    })

    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      this.addRequestInterceptor((config) => {
        // API request logging removed
        return config
      })

      this.addResponseInterceptor((response) => {
        // API response logging removed
        return response
      })
    }
  }

  private getCSRFToken(): string | null {
    // Get CSRF token from meta tag or cookie
    if (typeof document !== 'undefined') {
      const meta = document.querySelector('meta[name="csrf-token"]')
      return meta?.getAttribute('content') || null
    }
    return null
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor)
  }

  private async runRequestInterceptors(config: ApiRequestConfig): Promise<ApiRequestConfig> {
    let finalConfig = config
    
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig)
    }
    
    return finalConfig
  }

  private async runResponseInterceptors<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    let finalResponse = response
    
    for (const interceptor of this.responseInterceptors) {
      finalResponse = await interceptor(finalResponse)
    }
    
    return finalResponse
  }

  private async runErrorInterceptors(error: ApiError): Promise<ApiError> {
    let finalError = error
    
    for (const interceptor of this.errorInterceptors) {
      finalError = await interceptor(finalError)
    }
    
    return finalError
  }

  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    
    return url.toString()
  }

  async request<T = any>(endpoint: string, config: ApiRequestConfig = {}): Promise<T> {
    // Run request interceptors
    const interceptedConfig = await this.runRequestInterceptors(config)
    
    // Build request URL
    const url = this.buildURL(endpoint, interceptedConfig.params)
    
    // Create abort controller for this request
    const requestId = `${interceptedConfig.method || 'GET'}-${endpoint}-${Date.now()}`
    const abortController = new AbortController()
    this.abortControllers.set(requestId, abortController)
    
    // Set up timeout
    const timeoutId = setTimeout(() => {
      abortController.abort()
      this.abortControllers.delete(requestId)
    }, interceptedConfig.timeout || this.timeout)
    
    try {
      // Build fetch options
      const fetchOptions: RequestInit = {
        method: interceptedConfig.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...interceptedConfig.headers
        },
        credentials: interceptedConfig.credentials || 'include',
        cache: interceptedConfig.cache,
        signal: abortController.signal
      }
      
      // Add body for non-GET requests
      if (interceptedConfig.data && interceptedConfig.method !== 'GET') {
        fetchOptions.body = JSON.stringify(interceptedConfig.data)
      }
      
      // Make the request
      const response = await fetch(url, fetchOptions)
      
      // Clear timeout
      clearTimeout(timeoutId)
      this.abortControllers.delete(requestId)
      
      // Parse response
      let data: any
      const contentType = response.headers.get('content-type')
      
      if (contentType?.includes('application/json')) {
        data = await response.json()
      } else if (contentType?.includes('text/')) {
        data = await response.text()
      } else {
        data = await response.blob()
      }
      
      // Handle error responses
      if (!response.ok) {
        const error: ApiError = {
          status: response.status,
          message: data?.message || `Request failed with status ${response.status}`,
          code: data?.code,
          details: data?.details,
          timestamp: new Date().toISOString()
        }
        
        const finalError = await this.runErrorInterceptors(error)
        throw new ApiClientError(finalError)
      }
      
      // Build response object
      const apiResponse: ApiResponse<T> = {
        data: data?.data || data,
        status: response.status,
        message: data?.message,
        timestamp: data?.timestamp || new Date().toISOString(),
        headers: response.headers
      }
      
      // Run response interceptors
      const finalResponse = await this.runResponseInterceptors(apiResponse)
      
      // Validate response if schema provided
      if (interceptedConfig.validateResponse) {
        try {
          const validated = interceptedConfig.validateResponse.parse(finalResponse.data)
          return validated
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new ApiClientError({
              status: 422,
              message: 'Response validation failed',
              details: error.issues,
              timestamp: new Date().toISOString()
            })
          }
          throw error
        }
      }
      
      return finalResponse.data
    } catch (error) {
      clearTimeout(timeoutId)
      this.abortControllers.delete(requestId)
      
      // Handle abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError({
          status: 408,
          message: 'Request timeout',
          timestamp: new Date().toISOString()
        })
      }
      
      // Re-throw ApiClientError
      if (error instanceof ApiClientError) {
        throw error
      }
      
      // Handle other errors
      throw new ApiClientError({
        status: 0,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      })
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T = any>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'data'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', data })
  }

  async put<T = any>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'data'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', data })
  }

  async patch<T = any>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'data'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', data })
  }

  async delete<T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  // Cancel a specific request
  cancelRequest(requestId: string): void {
    const controller = this.abortControllers.get(requestId)
    if (controller) {
      controller.abort()
      this.abortControllers.delete(requestId)
    }
  }

  // Cancel all pending requests
  cancelAllRequests(): void {
    this.abortControllers.forEach(controller => controller.abort())
    this.abortControllers.clear()
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export convenience functions
export const api = {
  get: <T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method'>) => 
    apiClient.get<T>(endpoint, config),
  
  post: <T = any>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'data'>) => 
    apiClient.post<T>(endpoint, data, config),
  
  put: <T = any>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'data'>) => 
    apiClient.put<T>(endpoint, data, config),
  
  patch: <T = any>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'data'>) => 
    apiClient.patch<T>(endpoint, data, config),
  
  delete: <T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method'>) => 
    apiClient.delete<T>(endpoint, config)
}