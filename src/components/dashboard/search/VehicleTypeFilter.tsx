'use client'

import { VEHICLE_TYPES } from './types'

interface VehicleTypeFilterProps {
  selectedTypes: string[]
  onChange: (types: string[]) => void
}

export default function VehicleTypeFilter({ selectedTypes, onChange }: VehicleTypeFilterProps) {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter(t => t !== type))
    } else {
      onChange([...selectedTypes, type])
    }
  }

  return (
    <div className="space-y-4">
      <label className="text-xs font-medium text-gray-700">Vehicle Types</label>
      
      {/* Truck Types */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Truck Types</p>
        <div className="grid grid-cols-3 gap-2">
          {VEHICLE_TYPES.trucks.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921] focus:ring-2"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Vehicle Types */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Special Vehicles</p>
        <div className="grid grid-cols-3 gap-2">
          {VEHICLE_TYPES.special.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921] focus:ring-2"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedTypes.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">
              {selectedTypes.length} type{selectedTypes.length !== 1 ? 's' : ''} selected
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
              >
                {type}
                <button
                  type="button"
                  onClick={() => toggleType(type)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}