'use client'

import { COLORS } from './types'

interface ColorPickerProps {
  selectedColors: string[]
  onChange: (colors: string[]) => void
}

export default function ColorPicker({ selectedColors, onChange }: ColorPickerProps) {
  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      onChange(selectedColors.filter(c => c !== colorName))
    } else {
      onChange([...selectedColors, colorName])
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">Colors</label>
      <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
        {COLORS.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => toggleColor(color.name)}
            className={`relative group ${
              selectedColors.includes(color.name) ? 'ring-2 ring-[#FA7921] ring-offset-2' : ''
            }`}
            title={color.name}
          >
            <div
              className={`w-10 h-10 rounded-md border-2 transition-all hover:scale-110 ${
                color.name === 'White' ? 'border-gray-300' : 'border-gray-400'
              }`}
              style={{ backgroundColor: color.value }}
            >
              {selectedColors.includes(color.name) && (
                <svg
                  className={`w-full h-full p-2 ${
                    ['White', 'Light Yellow', 'Light Gray', 'Silver'].includes(color.name)
                      ? 'text-gray-800'
                      : 'text-white'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none transition-opacity">
              {color.name}
            </span>
          </button>
        ))}
      </div>
      
      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedColors.map((colorName) => {
            const color = COLORS.find(c => c.name === colorName)
            return (
              <span
                key={colorName}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs"
              >
                <div
                  className="w-3 h-3 rounded border border-gray-400"
                  style={{ backgroundColor: color?.value }}
                />
                {colorName}
                <button
                  type="button"
                  onClick={() => toggleColor(colorName)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}