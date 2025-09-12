// Currency Formatters
export function formatJPY(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0
  }).format(amount)
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

// Date Formatters
export function formatDate(date: Date | string, format: 'short' | 'long' | 'full' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(d.getTime())) {
    return 'Invalid date'
  }

  const formatOptions = {
    short: { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const },
    long: { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const },
    full: { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const }
  }
  
  const options: Intl.DateTimeFormatOptions = formatOptions[format]

  return d.toLocaleDateString('en-US', options)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(d.getTime())) {
    return 'Invalid date'
  }

  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 30) return formatDate(d)
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

// Number Formatters
export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

export function formatMileage(km: number): string {
  return `${formatNumber(km)} km`
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// String Formatters
export function formatVIN(vin: string): string {
  // Format VIN with dashes for readability
  if (vin.length !== 17) return vin
  return `${vin.slice(0, 3)}-${vin.slice(3, 9)}-${vin.slice(9)}`
}

export function formatChassisNumber(chassis: string): string {
  // Add spacing for readability
  return chassis.replace(/(.{4})/g, '$1 ').trim()
}

export function formatPhoneNumber(phone: string): string {
  // Remove non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as Japanese phone number
  if (cleaned.startsWith('81')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`
  }
  
  // Format as US phone number
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

// Status Formatters
export function formatStatus(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

// File Size Formatter
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}