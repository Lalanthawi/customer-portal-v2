'use client'

import { useState } from 'react'

interface LotNumberInputProps {
  lotNumbers: string[]
  onChange: (lotNumbers: string[]) => void
}

export default function LotNumberInput({ lotNumbers, onChange }: LotNumberInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim() && !lotNumbers.includes(inputValue.trim())) {
      onChange([...lotNumbers, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  const handleRemove = (lotNumber: string) => {
    onChange(lotNumbers.filter(num => num !== lotNumber))
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">Lot Numbers (Multiple)</label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter lot number and press Enter"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder-black/70"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-[#FA7921] text-white text-sm rounded-md hover:bg-[#FA7921]/90 transition-colors"
        >
          Add
        </button>
      </div>

      {lotNumbers.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
          {lotNumbers.map((lotNumber) => (
            <span
              key={lotNumber}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-md text-sm"
            >
              <span className="font-medium text-gray-700">{lotNumber}</span>
              <button
                type="button"
                onClick={() => handleRemove(lotNumber)}
                className="ml-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-red-600 hover:text-red-700 ml-2"
          >
            Clear all
          </button>
        </div>
      )}
      
      {lotNumbers.length > 0 && (
        <p className="text-xs text-gray-500">
          Searching for {lotNumbers.length} lot number{lotNumbers.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}