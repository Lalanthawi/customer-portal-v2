'use client'

import { useState } from 'react'

interface SearchFilters {
  // Basic Filters
  leftHandDrive: boolean
  maker: string
  yearFrom: string
  yearTo: string
  mileageFrom: string
  mileageTo: string
  engineFrom: string
  engineTo: string
  priceFrom: string
  priceTo: string
  lotNumber: string
  
  // Specific Filters
  result: string
  model: string
  transmission: string
  shift: string
  modelType: string
  chassisNumber: string
  modification: string
  
  // Date of Auction
  auctionDateFrom: {
    day: string
    month: string
    year: string
  }
  auctionDateTo: {
    day: string
    month: string
    year: string
  }
  
  // Colors
  colors: string[]
  
  // Scores
  scores: string[]
  
  // Equipment
  equipment: string[]
  
  // Vehicle Types
  vehicleTypes: string[]
}

const initialFilters: SearchFilters = {
  leftHandDrive: false,
  maker: '',
  yearFrom: '',
  yearTo: '',
  mileageFrom: '',
  mileageTo: '',
  engineFrom: '',
  engineTo: '',
  priceFrom: '',
  priceTo: '',
  lotNumber: '',
  result: 'all',
  model: '',
  transmission: '',
  shift: '',
  modelType: '',
  chassisNumber: '',
  modification: '',
  auctionDateFrom: { day: '', month: '', year: '' },
  auctionDateTo: { day: '', month: '', year: '' },
  colors: [],
  scores: [],
  equipment: [],
  vehicleTypes: []
}

const makers = [
  'Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 'Suzuki', 'Lexus',
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche', 'Ferrari', 'Lamborghini'
]

const results = [
  { value: 'all', label: 'All lots' },
  { value: 'sold', label: 'Sold' },
  { value: 'unsold', label: 'Unsold' },
  { value: 'negotiating', label: 'Negotiating' }
]

const transmissions = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic']
const shifts = ['Floor', 'Column', 'Paddle', 'Tiptronic']

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const colors = [
  { name: 'Red', code: '#FF0000' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Light Yellow', code: '#FFFFE0' },
  { name: 'Green', code: '#008000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Purple', code: '#800080' },
  { name: 'Light Purple', code: '#DDA0DD' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Light Gray', code: '#D3D3D3' },
  { name: 'Gray', code: '#808080' },
  { name: 'Dark Gray', code: '#404040' },
  { name: 'Silver', code: '#C0C0C0' },
  { name: 'Black', code: '#000000' }
]

const scores = ['***', '-', '1', '2', '3', '3.5', '4', '4.5', '5', '6', '7', '8', '9', 'R', 'RA', 'S']
const equipmentOptions = ['AC', 'AW', 'LE', 'SR', 'PW', 'PS', 'TV']
const truckTypes = ['WCab', 'Dump', 'Mixer', 'Tanker', 'Chassis', 'Loader', 'Tractorhead', 'Wrecker', 'Truck']
const vehicleTypes = ['Refrigerator', 'Thermos', 'Crane', 'Fullcrane', 'Camping', 'Concrete', 'Bus']

interface AdvancedSearchStaticProps {
  onSearch: (filters: SearchFilters) => void
  onReset?: () => void
  className?: string
}

export default function AdvancedSearchStatic({ onSearch, onReset, className = '' }: AdvancedSearchStaticProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters(initialFilters)
    if (onReset) onReset()
  }

  const toggleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }))
  }

  const toggleScore = (score: string) => {
    setFilters(prev => ({
      ...prev,
      scores: prev.scores.includes(score)
        ? prev.scores.filter(s => s !== score)
        : [...prev.scores, score]
    }))
  }

  const toggleEquipment = (equip: string) => {
    setFilters(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equip)
        ? prev.equipment.filter(e => e !== equip)
        : [...prev.equipment, equip]
    }))
  }

  const toggleVehicleType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter(t => t !== type)
        : [...prev.vehicleTypes, type]
    }))
  }

  return (
    <div className={`bg-white rounded-xl ${className}`}>
      <div className="p-6">
        {/* Main Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Basic Filters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Filters</h3>
            <div className="space-y-4">
              {/* Steering Wheel */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.leftHandDrive}
                    onChange={(e) => setFilters(prev => ({ ...prev, leftHandDrive: e.target.checked }))}
                    className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                  <span className="text-sm text-gray-700">Left Hand Drive</span>
                </label>
              </div>

              {/* Maker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maker</label>
                <select
                  value={filters.maker}
                  onChange={(e) => setFilters(prev => ({ ...prev, maker: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">---All makers---</option>
                  {makers.map(maker => (
                    <option key={maker} value={maker}>{maker}</option>
                  ))}
                </select>
              </div>

              {/* Year Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="from"
                    value={filters.yearFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="text"
                    placeholder="to"
                    value={filters.yearTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearTo: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mileage Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (thousand km)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="from"
                    value={filters.mileageFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, mileageFrom: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="text"
                    placeholder="to"
                    value={filters.mileageTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, mileageTo: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>
              </div>

              {/* V Engine */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">V engine (cc)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="from"
                    value={filters.engineFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, engineFrom: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="text"
                    placeholder="to"
                    value={filters.engineTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, engineTo: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>
              </div>

              {/* End Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End price (thousand JPY)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="from"
                    value={filters.priceFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="text"
                    placeholder="to"
                    value={filters.priceTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Lot Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lot number</label>
                <input
                  type="text"
                  value={filters.lotNumber}
                  onChange={(e) => setFilters(prev => ({ ...prev, lotNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Specific Filters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specific Filters</h3>
            <div className="space-y-4">
              {/* Result */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
                <select
                  value={filters.result}
                  onChange={(e) => setFilters(prev => ({ ...prev, result: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  {results.map(result => (
                    <option key={result.value} value={result.value}>{result.label}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select
                  value={filters.model}
                  onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">---All models---</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">All transmissions</option>
                  {transmissions.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              {/* Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select
                  value={filters.shift}
                  onChange={(e) => setFilters(prev => ({ ...prev, shift: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="">All shifts</option>
                  {shifts.map(shift => (
                    <option key={shift} value={shift}>{shift}</option>
                  ))}
                </select>
              </div>

              {/* Model Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model type</label>
                <input
                  type="text"
                  value={filters.modelType}
                  onChange={(e) => setFilters(prev => ({ ...prev, modelType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                />
              </div>

              {/* Chassis Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chassis number</label>
                <input
                  type="text"
                  value={filters.chassisNumber}
                  onChange={(e) => setFilters(prev => ({ ...prev, chassisNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                />
              </div>

              {/* Modification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modification</label>
                <input
                  type="text"
                  value={filters.modification}
                  onChange={(e) => setFilters(prev => ({ ...prev, modification: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date of Auction */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Date of Auction</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-700">since</span>
            <div className="flex items-center gap-2">
              <select
                value={filters.auctionDateFrom.day}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  auctionDateFrom: { ...prev.auctionDateFrom, day: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={filters.auctionDateFrom.month}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  auctionDateFrom: { ...prev.auctionDateFrom, month: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={filters.auctionDateFrom.year}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  auctionDateFrom: { ...prev.auctionDateFrom, year: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <span className="text-sm text-gray-700">till</span>
            <div className="flex items-center gap-2">
              <select
                value={filters.auctionDateTo.day}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  auctionDateTo: { ...prev.auctionDateTo, day: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={filters.auctionDateTo.month}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  auctionDateTo: { ...prev.auctionDateTo, month: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={filters.auctionDateTo.year}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  auctionDateTo: { ...prev.auctionDateTo, year: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Color Selection */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Selection</h3>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`relative group ${filters.colors.includes(color.name) ? 'ring-2 ring-[#FA7921] ring-offset-2' : ''}`}
                title={color.name}
              >
                <div
                  className={`w-10 h-10 rounded border-2 ${color.code === '#FFFFFF' ? 'border-gray-300' : 'border-gray-200'} hover:scale-110 transition-transform`}
                  style={{ backgroundColor: color.code }}
                >
                  {filters.colors.includes(color.name) && (
                    <svg className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scores Filter */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scores Filter</h3>
          <div className="flex flex-wrap gap-3">
            {scores.map((score) => (
              <label key={score} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.scores.includes(score)}
                  onChange={() => toggleScore(score)}
                  className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                />
                <span className="text-sm text-gray-700">{score}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Equipment Filter */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Filter</h3>
          <div className="flex flex-wrap gap-4">
            {equipmentOptions.map((equip) => (
              <label key={equip} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.equipment.includes(equip)}
                  onChange={() => toggleEquipment(equip)}
                  className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                />
                <span className="text-sm text-gray-700">{equip}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle Type Filters */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Type Filters</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Truck Types</h4>
              <div className="flex flex-wrap gap-3">
                {truckTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.vehicleTypes.includes(type)}
                      onChange={() => toggleVehicleType(type)}
                      className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Vehicle Types</h4>
              <div className="flex flex-wrap gap-3">
                {vehicleTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.vehicleTypes.includes(type)}
                      onChange={() => toggleVehicleType(type)}
                      className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={handleSearch}
            className="flex-1 px-6 py-3 bg-[#FA7921] text-white rounded-lg font-semibold hover:bg-[#e86f1e] transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  )
}