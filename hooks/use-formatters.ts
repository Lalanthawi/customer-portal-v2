import { 
  formatJPY, 
  formatUSD, 
  formatDate, 
  formatDateTime, 
  formatRelativeTime,
  formatNumber,
  formatMileage,
  formatPercentage,
  formatVIN,
  formatChassisNumber,
  formatPhoneNumber,
  formatStatus,
  formatFileSize
} from '@/lib/formatters'

export function useFormatters() {
  return {
    // Currency
    formatJPY,
    formatUSD,
    formatCurrency: (amount: number, currency: 'JPY' | 'USD' = 'JPY') => {
      return currency === 'JPY' ? formatJPY(amount) : formatUSD(amount)
    },
    
    // Dates
    formatDate,
    formatDateTime,
    formatRelativeTime,
    
    // Numbers
    formatNumber,
    formatMileage,
    formatPercentage,
    
    // Vehicle specific
    formatVIN,
    formatChassisNumber,
    
    // Other
    formatPhoneNumber,
    formatStatus,
    formatFileSize
  }
}