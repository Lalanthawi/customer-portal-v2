'use client'

import { useState, useEffect } from 'react'
import FilterSection from './FilterSection'
import RangeFilter from './RangeFilter'
import ColorPicker from './ColorPicker'
import ScoreFilter from './ScoreFilter'
import EquipmentFilter from './EquipmentFilter'
import VehicleTypeFilter from './VehicleTypeFilter'
import DateRangeFilter from './DateRangeFilter'
import LotNumberInput from './LotNumberInput'
import { SearchFilters, initialFilters, MAKERS, TRANSMISSIONS, SHIFTS, RESULTS } from './types'

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onReset?: () => void
  className?: string
}

export default function AdvancedSearch({ onSearch, onReset, className = '' }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(filters)
    }, 500)
    return () => clearTimeout(timer)
  }, [filters])

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

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-[#FA7921] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Advanced Search
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-[#FA7921] text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Content */}
      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* Left Column */}
          <div className="divide-y divide-gray-200">
            {/* Basic Filters */}
            <FilterSection title="Basic Filters">
              <div className="space-y-4">
                {/* Steering */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.steering.leftHandDrive}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      steering: { leftHandDrive: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                  <span className="text-sm text-gray-700">Left Hand Drive</span>
                </label>

                {/* Maker */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Maker</label>
                  <select
                    value={filters.basic.maker}
                    onChange={(e) => updateBasicFilter('maker', e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    <option value="">---All makers---</option>
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
                  label="Mileage (thousand km)"
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
                  label="End Price (thousand JPY)"
                  minValue={filters.basic.price.min}
                  maxValue={filters.basic.price.max}
                  onChange={(min, max) => updateBasicFilter('price', { min, max })}
                  step={100}
                />

                {/* Lot Numbers - Multiple Input */}
                <LotNumberInput
                  lotNumbers={filters.basic.lotNumbers}
                  onChange={(lotNumbers) => updateBasicFilter('lotNumbers', lotNumbers)}
                />
              </div>
            </FilterSection>

            {/* Date of Auction */}
            <FilterSection title="Date of Auction">
              <DateRangeFilter
                dateRange={filters.auction.dateRange}
                onChange={(dateRange) => setFilters(prev => ({
                  ...prev,
                  auction: { dateRange }
                }))}
              />
            </FilterSection>

            {/* Colors */}
            <FilterSection title="Colors">
              <ColorPicker
                selectedColors={filters.colors}
                onChange={(colors) => setFilters(prev => ({ ...prev, colors }))}
              />
            </FilterSection>
          </div>

          {/* Right Column */}
          <div className="divide-y divide-gray-200">
            {/* Specific Filters */}
            <FilterSection title="Specific Filters">
              <div className="space-y-4">
                {/* Result */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Result</label>
                  <select
                    value={filters.specific.result}
                    onChange={(e) => updateSpecificFilter('result', e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    {RESULTS.map(result => (
                      <option key={result.value} value={result.value}>{result.label}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    value={filters.specific.model}
                    onChange={(e) => updateSpecificFilter('model', e.target.value)}
                    placeholder="---All models---"
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                  />
                </div>

                {/* Transmission */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Transmission</label>
                  <select
                    value={filters.specific.transmission}
                    onChange={(e) => updateSpecificFilter('transmission', e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    <option value="">All transmissions</option>
                    {TRANSMISSIONS.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>

                {/* Shift */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Shift</label>
                  <select
                    value={filters.specific.shift}
                    onChange={(e) => updateSpecificFilter('shift', e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    <option value="">All shifts</option>
                    {SHIFTS.map(shift => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                </div>

                {/* Model Type */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Model Type</label>
                  <input
                    type="text"
                    value={filters.specific.modelType}
                    onChange={(e) => updateSpecificFilter('modelType', e.target.value)}
                    placeholder="Enter model type"
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                  />
                </div>

                {/* Chassis Number */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Chassis Number</label>
                  <input
                    type="text"
                    value={filters.specific.chassisNumber}
                    onChange={(e) => updateSpecificFilter('chassisNumber', e.target.value)}
                    placeholder="Enter chassis number"
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                  />
                </div>

                {/* Modification */}
                <div>
                  <label className="text-xs font-medium text-gray-700">Modification</label>
                  <input
                    type="text"
                    value={filters.specific.modification}
                    onChange={(e) => updateSpecificFilter('modification', e.target.value)}
                    placeholder="Enter modification"
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Scores */}
            <FilterSection title="Auction Scores">
              <ScoreFilter
                selectedScores={filters.scores}
                onChange={(scores) => setFilters(prev => ({ ...prev, scores }))}
              />
            </FilterSection>

            {/* Equipment */}
            <FilterSection title="Equipment">
              <EquipmentFilter
                selectedEquipment={filters.equipment}
                onChange={(equipment) => setFilters(prev => ({ ...prev, equipment }))}
              />
            </FilterSection>

            {/* Vehicle Types */}
            <FilterSection title="Vehicle Types">
              <VehicleTypeFilter
                selectedTypes={filters.vehicleTypes}
                onChange={(vehicleTypes) => setFilters(prev => ({ ...prev, vehicleTypes }))}
              />
            </FilterSection>
          </div>
        </div>
      )}
    </div>
  )
}