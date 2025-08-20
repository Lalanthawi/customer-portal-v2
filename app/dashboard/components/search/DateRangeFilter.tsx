'use client'

import { MONTHS } from './types'

interface DateRangeFilterProps {
  dateRange: {
    from: { day?: number; month?: string; year?: number }
    to: { day?: number; month?: string; year?: number }
  }
  onChange: (dateRange: {
    from: { day?: number; month?: string; year?: number }
    to: { day?: number; month?: string; year?: number }
  }) => void
}

export default function DateRangeFilter({ dateRange, onChange }: DateRangeFilterProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const handleFromChange = (field: 'day' | 'month' | 'year', value: string) => {
    const numValue = field !== 'month' && value ? Number(value) : undefined
    const strValue = field === 'month' ? value : undefined
    
    onChange({
      ...dateRange,
      from: {
        ...dateRange.from,
        [field]: field === 'month' ? strValue : numValue
      }
    })
  }

  const handleToChange = (field: 'day' | 'month' | 'year', value: string) => {
    const numValue = field !== 'month' && value ? Number(value) : undefined
    const strValue = field === 'month' ? value : undefined
    
    onChange({
      ...dateRange,
      to: {
        ...dateRange.to,
        [field]: field === 'month' ? strValue : numValue
      }
    })
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-gray-700">Date of Auction</label>
      
      {/* From Date */}
      <div>
        <p className="text-xs text-gray-500 mb-2">From</p>
        <div className="grid grid-cols-3 gap-2">
          <select
            value={dateRange.from.day || ''}
            onChange={(e) => handleFromChange('day', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="">Day</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          
          <select
            value={dateRange.from.month || ''}
            onChange={(e) => handleFromChange('month', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="">Month</option>
            {MONTHS.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          
          <select
            value={dateRange.from.year || ''}
            onChange={(e) => handleFromChange('year', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="">Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* To Date */}
      <div>
        <p className="text-xs text-gray-500 mb-2">To</p>
        <div className="grid grid-cols-3 gap-2">
          <select
            value={dateRange.to.day || ''}
            onChange={(e) => handleToChange('day', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="">Day</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          
          <select
            value={dateRange.to.month || ''}
            onChange={(e) => handleToChange('month', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="">Month</option>
            {MONTHS.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          
          <select
            value={dateRange.to.year || ''}
            onChange={(e) => handleToChange('year', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="">Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display selected range */}
      {(dateRange.from.day || dateRange.to.day) && (
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
          {dateRange.from.day && (
            <span>
              From: {dateRange.from.day} {dateRange.from.month} {dateRange.from.year}
            </span>
          )}
          {dateRange.from.day && dateRange.to.day && <span className="mx-2">→</span>}
          {dateRange.to.day && (
            <span>
              To: {dateRange.to.day} {dateRange.to.month} {dateRange.to.year}
            </span>
          )}
        </div>
      )}
    </div>
  )
}