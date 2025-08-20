'use client'

import { useState, useEffect } from 'react'
import { SearchFilters, initialFilters, MAKERS, TRANSMISSIONS, SHIFTS, RESULTS } from './types'
import RangeFilter from './RangeFilter'
import ColorPicker from './ColorPicker'
import ScoreFilter from './ScoreFilter'
import EquipmentFilter from './EquipmentFilter'
import VehicleTypeFilter from './VehicleTypeFilter'
import DateRangeFilter from './DateRangeFilter'
import LotNumberInput from './LotNumberInput'

interface SidebarFiltersProps {
  onSearch: (filters: SearchFilters) => void
  onReset?: () => void
  className?: string
}

interface FilterCategory {
  id: string
  title: string
  icon: React.ReactElement
  count?: number
}

const filterCategories: FilterCategory[] = [
  {
    id: 'basic',
    title: 'Basic Filters',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  },
  {
    id: 'specific',
    title: 'Specifications',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 'auction',
    title: 'Auction Info',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'equipment',
    title: 'Equipment',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  }
]

export default function SidebarFilters({ onSearch, onReset, className = '' }: SidebarFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic'])
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(filters)
    }, 500)
    return () => clearTimeout(timer)
  }, [filters, onSearch])

  // Count active filters
  useEffect(() => {
    let count = 0
    if (filters.steering.leftHandDrive) count++
    if (filters.basic.maker) count++
    if (filters.basic.year.min || filters.basic.year.max) count++
    if (filters.basic.mileage.min || filters.basic.mileage.max) count++
    if (filters.basic.engine.min || filters.basic.engine.max) count++
    if (filters.basic.price.min || filters.basic.price.max) count++
    if (filters.basic.lotNumbers.length > 0) count++
    if (filters.specific.result !== 'all') count++
    if (filters.specific.model) count++
    if (filters.specific.transmission) count++
    if (filters.specific.shift) count++
    if (filters.specific.modelType) count++
    if (filters.specific.chassisNumber) count++
    if (filters.specific.modification) count++
    if (filters.auction.dateRange.from.day) count++
    count += filters.colors.length
    count += filters.scores.length
    count += filters.equipment.length
    count += filters.vehicleTypes.length
    setActiveFiltersCount(count)
  }, [filters])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleReset = () => {
    setFilters(initialFilters)
    if (onReset) onReset()
  }

  const updateBasicFilter = (key: keyof typeof filters.basic, value: string | number | { min?: number; max?: number } | string[]) => {
    setFilters(prev => ({
      ...prev,
      basic: { ...prev.basic, [key]: value }
    }))
  }

  const updateSpecificFilter = (key: keyof typeof filters.specific, value: string) => {
    setFilters(prev => ({
      ...prev,
      specific: { ...prev.specific, [key]: value }
    }))
  }

  const getSectionActiveCount = (sectionId: string): number => {
    let count = 0
    switch(sectionId) {
      case 'basic':
        if (filters.steering.leftHandDrive) count++
        if (filters.basic.maker) count++
        if (filters.basic.year.min || filters.basic.year.max) count++
        if (filters.basic.mileage.min || filters.basic.mileage.max) count++
        if (filters.basic.engine.min || filters.basic.engine.max) count++
        if (filters.basic.price.min || filters.basic.price.max) count++
        if (filters.basic.lotNumbers.length > 0) count++
        break
      case 'specific':
        if (filters.specific.result !== 'all') count++
        if (filters.specific.model) count++
        if (filters.specific.transmission) count++
        if (filters.specific.shift) count++
        if (filters.specific.modelType) count++
        if (filters.specific.chassisNumber) count++
        if (filters.specific.modification) count++
        break
      case 'appearance':
        count = filters.colors.length + filters.scores.length
        break
      case 'auction':
        if (filters.auction.dateRange.from.day) count++
        count += filters.vehicleTypes.length
        break
      case 'equipment':
        count = filters.equipment.length
        break
    }
    return count
  }

  return (
    <div className={`bg-white/90 backdrop-blur-xl ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white text-xs font-bold rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-gray-200">
        {/* Basic Filters Section */}
        <div className="transition-all">
          <button
            onClick={() => toggleSection('basic')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {filterCategories[0]?.icon}
              <span className="font-semibold text-gray-900">{filterCategories[0]?.title}</span>
              {getSectionActiveCount('basic') > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {getSectionActiveCount('basic')}
                </span>
              )}
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('basic') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('basic') && (
            <div className="px-6 py-4 space-y-4 bg-gray-50/50">
              {/* Steering */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.steering.leftHandDrive}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    steering: { leftHandDrive: e.target.checked }
                  }))}
                  className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Left Hand Drive</span>
              </label>

              {/* Maker */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Maker</label>
                <select
                  value={filters.basic.maker}
                  onChange={(e) => updateBasicFilter('maker', e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">All makers</option>
                  {MAKERS.map(maker => (
                    <option key={maker} value={maker}>{maker}</option>
                  ))}
                </select>
              </div>

              {/* Year Range */}
              <RangeFilter
                label="Year"
                minValue={filters.basic.year.min}
                maxValue={filters.basic.year.max}
                onChange={(min, max) => updateBasicFilter('year', { min, max })}
              />

              {/* Mileage Range */}
              <RangeFilter
                label="Mileage (1000 km)"
                minValue={filters.basic.mileage.min}
                maxValue={filters.basic.mileage.max}
                onChange={(min, max) => updateBasicFilter('mileage', { min, max })}
                step={10}
              />

              {/* Engine Range */}
              <RangeFilter
                label="Engine (cc)"
                minValue={filters.basic.engine.min}
                maxValue={filters.basic.engine.max}
                onChange={(min, max) => updateBasicFilter('engine', { min, max })}
                step={100}
              />

              {/* Price Range */}
              <RangeFilter
                label="Price (¥1000)"
                minValue={filters.basic.price.min}
                maxValue={filters.basic.price.max}
                onChange={(min, max) => updateBasicFilter('price', { min, max })}
                step={100}
              />

              {/* Lot Numbers */}
              <LotNumberInput
                lotNumbers={filters.basic.lotNumbers}
                onChange={(lotNumbers) => updateBasicFilter('lotNumbers', lotNumbers)}
              />
            </div>
          )}
        </div>

        {/* Specific Filters Section */}
        <div className="transition-all">
          <button
            onClick={() => toggleSection('specific')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {filterCategories[1]?.icon}
              <span className="font-semibold text-gray-900">{filterCategories[1]?.title}</span>
              {getSectionActiveCount('specific') > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {getSectionActiveCount('specific')}
                </span>
              )}
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('specific') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('specific') && (
            <div className="px-6 py-4 space-y-4 bg-gray-50/50">
              {/* Result */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Auction Result</label>
                <select
                  value={filters.specific.result}
                  onChange={(e) => updateSpecificFilter('result', e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  {RESULTS.map(result => (
                    <option key={result.value} value={result.value}>{result.label}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Model</label>
                <input
                  type="text"
                  value={filters.specific.model}
                  onChange={(e) => updateSpecificFilter('model', e.target.value)}
                  placeholder="Enter model name"
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Transmission */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Transmission</label>
                <select
                  value={filters.specific.transmission}
                  onChange={(e) => updateSpecificFilter('transmission', e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">All types</option>
                  {TRANSMISSIONS.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              {/* Shift */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Shift</label>
                <select
                  value={filters.specific.shift}
                  onChange={(e) => updateSpecificFilter('shift', e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">All shifts</option>
                  {SHIFTS.map(shift => (
                    <option key={shift} value={shift}>{shift}</option>
                  ))}
                </select>
              </div>

              {/* Model Type */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Model Type</label>
                <input
                  type="text"
                  value={filters.specific.modelType}
                  onChange={(e) => updateSpecificFilter('modelType', e.target.value)}
                  placeholder="e.g., Sedan, SUV"
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Chassis Number */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Chassis Number</label>
                <input
                  type="text"
                  value={filters.specific.chassisNumber}
                  onChange={(e) => updateSpecificFilter('chassisNumber', e.target.value)}
                  placeholder="Enter chassis number"
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Modification */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Modification</label>
                <input
                  type="text"
                  value={filters.specific.modification}
                  onChange={(e) => updateSpecificFilter('modification', e.target.value)}
                  placeholder="Enter modification"
                  className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div className="transition-all">
          <button
            onClick={() => toggleSection('appearance')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {filterCategories[2]?.icon}
              <span className="font-semibold text-gray-900">{filterCategories[2]?.title}</span>
              {getSectionActiveCount('appearance') > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {getSectionActiveCount('appearance')}
                </span>
              )}
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('appearance') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('appearance') && (
            <div className="px-6 py-4 space-y-4 bg-gray-50/50">
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 block">Colors</label>
                <ColorPicker
                  selectedColors={filters.colors}
                  onChange={(colors) => setFilters(prev => ({ ...prev, colors }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 block">Auction Scores</label>
                <ScoreFilter
                  selectedScores={filters.scores}
                  onChange={(scores) => setFilters(prev => ({ ...prev, scores }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Auction Info Section */}
        <div className="transition-all">
          <button
            onClick={() => toggleSection('auction')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {filterCategories[3]?.icon}
              <span className="font-semibold text-gray-900">{filterCategories[3]?.title}</span>
              {getSectionActiveCount('auction') > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {getSectionActiveCount('auction')}
                </span>
              )}
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('auction') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('auction') && (
            <div className="px-6 py-4 space-y-4 bg-gray-50/50">
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 block">Auction Date</label>
                <DateRangeFilter
                  dateRange={filters.auction.dateRange}
                  onChange={(dateRange) => setFilters(prev => ({
                    ...prev,
                    auction: { dateRange }
                  }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 block">Vehicle Types</label>
                <VehicleTypeFilter
                  selectedTypes={filters.vehicleTypes}
                  onChange={(vehicleTypes) => setFilters(prev => ({ ...prev, vehicleTypes }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Equipment Section */}
        <div className="transition-all">
          <button
            onClick={() => toggleSection('equipment')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {filterCategories[4]?.icon}
              <span className="font-semibold text-gray-900">{filterCategories[4]?.title}</span>
              {getSectionActiveCount('equipment') > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {getSectionActiveCount('equipment')}
                </span>
              )}
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('equipment') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('equipment') && (
            <div className="px-6 py-4 bg-gray-50/50">
              <EquipmentFilter
                selectedEquipment={filters.equipment}
                onChange={(equipment) => setFilters(prev => ({ ...prev, equipment }))}
              />
            </div>
          )}
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <button
          onClick={() => onSearch(filters)}
          className="w-full py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-[1.01]"
        >
          Apply Filters
          {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
        </button>
      </div>
    </div>
  )
}