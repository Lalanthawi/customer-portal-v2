import React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onClear?: () => void
  className?: string
  containerClassName?: string
  showClearButton?: boolean
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'py-1.5 text-sm',
  md: 'py-2 text-base',
  lg: 'py-3 text-lg'
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  className,
  containerClassName,
  showClearButton = true,
  icon,
  size = 'md'
}: SearchBarProps) {
  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon || <Search className="h-5 w-5" />}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 border border-gray-300 rounded-lg",
          "focus:ring-2 focus:ring-[#FA7921] focus:border-transparent",
          "transition-all duration-200",
          sizeClasses[size],
          className
        )}
      />
      {showClearButton && value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

interface FilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  actions,
  className
}: FilterBarProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-4 border border-gray-200",
      className
    )}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            containerClassName="w-full"
          />
        </div>
        {filters && (
          <div className="flex flex-wrap gap-2">
            {filters}
          </div>
        )}
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}