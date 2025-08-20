'use client'

import { EQUIPMENT } from './types'

interface EquipmentFilterProps {
  selectedEquipment: string[]
  onChange: (equipment: string[]) => void
}

export default function EquipmentFilter({ selectedEquipment, onChange }: EquipmentFilterProps) {
  const toggleEquipment = (code: string) => {
    if (selectedEquipment.includes(code)) {
      onChange(selectedEquipment.filter(e => e !== code))
    } else {
      onChange([...selectedEquipment, code])
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-gray-700">Equipment</label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {EQUIPMENT.map((item) => (
          <label
            key={item.code}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedEquipment.includes(item.code)}
              onChange={() => toggleEquipment(item.code)}
              className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921] focus:ring-2"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">{item.code}</span>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          </label>
        ))}
      </div>

      {selectedEquipment.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {selectedEquipment.map((code) => (
              <span
                key={code}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FA7921]/10 text-[#FA7921] rounded-md text-xs font-medium"
              >
                {code}
                <button
                  type="button"
                  onClick={() => toggleEquipment(code)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </span>
          ))}
        </div>
      )}
    </div>
  )
}