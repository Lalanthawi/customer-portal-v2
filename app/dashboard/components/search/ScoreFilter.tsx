'use client'

import { SCORES } from './types'

interface ScoreFilterProps {
  selectedScores: string[]
  onChange: (scores: string[]) => void
}

export default function ScoreFilter({ selectedScores, onChange }: ScoreFilterProps) {
  const toggleScore = (score: string) => {
    if (selectedScores.includes(score)) {
      onChange(selectedScores.filter(s => s !== score))
    } else {
      onChange([...selectedScores, score])
    }
  }

  const numericScores = SCORES.filter(s => !['***', '-', 'R', 'RA', 'S'].includes(s))
  const specialScores = SCORES.filter(s => ['***', '-', 'R', 'RA', 'S'].includes(s))

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-gray-700">Auction Scores</label>
      
      {/* Numeric Scores */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Grade Scores</p>
        <div className="grid grid-cols-7 gap-2">
          {numericScores.map((score) => (
            <label
              key={score}
              className="flex items-center justify-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedScores.includes(score)}
                onChange={() => toggleScore(score)}
                className="sr-only"
              />
              <span
                className={`w-full py-1 px-2 text-xs text-center rounded-md border transition-all ${
                  selectedScores.includes(score)
                    ? 'bg-[#FA7921] text-white border-[#FA7921]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {score}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Scores */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Special Grades</p>
        <div className="flex flex-wrap gap-2">
          {specialScores.map((score) => (
            <label
              key={score}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedScores.includes(score)}
                onChange={() => toggleScore(score)}
                className="sr-only"
              />
              <span
                className={`px-3 py-1 text-xs rounded-md border transition-all ${
                  selectedScores.includes(score)
                    ? 'bg-[#FA7921] text-white border-[#FA7921]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {score}
              </span>
            </label>
          ))}
        </div>
      </div>

      {selectedScores.length > 0 && (
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">
              {selectedScores.length} score{selectedScores.length !== 1 ? 's' : ''} selected
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}