'use client'

interface RangeFilterProps {
  label: string
  minValue?: number
  maxValue?: number
  minPlaceholder?: string
  maxPlaceholder?: string
  unit?: string
  onChange: (min?: number, max?: number) => void
  step?: number
}

export default function RangeFilter({
  label,
  minValue,
  maxValue,
  minPlaceholder = 'From',
  maxPlaceholder = 'To',
  unit,
  onChange,
  step = 1
}: RangeFilterProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined
    onChange(value, maxValue)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined
    onChange(minValue, value)
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            value={minValue || ''}
            onChange={handleMinChange}
            placeholder={minPlaceholder}
            step={step}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
          />
          {unit && minValue && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {unit}
            </span>
          )}
        </div>
        
        <span className="text-gray-400">~</span>
        
        <div className="relative flex-1">
          <input
            type="number"
            value={maxValue || ''}
            onChange={handleMaxChange}
            placeholder={maxPlaceholder}
            step={step}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
          />
          {unit && maxValue && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}