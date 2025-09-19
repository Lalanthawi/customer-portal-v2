'use client'

import { useState, useRef, useEffect } from 'react'
import TimelineStage from './TimelineStage'
import { TimelineStage as TimelineStageType } from './types'

interface ShipmentTimelineProps {
  orderId: string
  stages: TimelineStageType[]
  onStageToggle?: (stageId: string) => void
  onTaskUpdate?: (stageId: string, taskId: string) => void
}

export default function ShipmentTimeline({ 
  orderId, 
  stages, 
  onStageToggle,
  onTaskUpdate 
}: ShipmentTimelineProps) {
  const [expandedStages, setExpandedStages] = useState<string[]>([])
  const [lineHeight, setLineHeight] = useState<string>('0px')
  const [bgLineHeight, setBgLineHeight] = useState<string>('0px')
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleStageToggle = (stageId: string) => {
    setExpandedStages(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    )
    onStageToggle?.(stageId)
  }

  const getOverallProgress = () => {
    const totalStages = stages.length
    const completedStages = stages.filter(s => s.status === 'completed').length
    const inProgressValue = stages.find(s => s.status === 'in-progress')?.progress || 0
    
    return Math.round(((completedStages + (inProgressValue / 100)) / totalStages) * 100)
  }

  const getCurrentStageIndex = () => {
    const inProgressIndex = stages.findIndex(s => s.status === 'in-progress')
    if (inProgressIndex !== -1) return inProgressIndex
    
    const lastCompletedIndex = stages.findLastIndex(s => s.status === 'completed')
    return lastCompletedIndex !== -1 ? lastCompletedIndex : -1
  }
  
  // Calculate line heights based on actual DOM positions
  useEffect(() => {
    const updateLineHeights = () => {
      if (!containerRef.current) return
      
      const containerTop = containerRef.current.getBoundingClientRect().top
      const currentIndex = getCurrentStageIndex()
      
      // Calculate background line height (to last stage)
      if (stages.length > 0 && stageRefs.current[stages.length - 1]) {
        const lastStageEl = stageRefs.current[stages.length - 1]
        if (lastStageEl) {
          const lastStageTop = lastStageEl.getBoundingClientRect().top
          const height = lastStageTop - containerTop + 24 // Add icon center offset
          setBgLineHeight(`${height}px`)
        }
      }
      
      // Calculate active line height
      if (currentIndex >= 0 && stageRefs.current[currentIndex]) {
        const currentStageEl = stageRefs.current[currentIndex]
        if (currentStageEl) {
          const currentStageTop = currentStageEl.getBoundingClientRect().top
          let height = currentStageTop - containerTop + 24 // Base height to icon center
          
          // Add progress-based extension for in-progress stages
          const currentStage = stages[currentIndex]
          if (currentStage?.status === 'in-progress' && currentStage.progress) {
            // Try to get next stage position for accurate progress
            if (currentIndex < stages.length - 1 && stageRefs.current[currentIndex + 1]) {
              const nextStageEl = stageRefs.current[currentIndex + 1]
              if (nextStageEl) {
                const nextStageTop = nextStageEl.getBoundingClientRect().top
                const stageDistance = nextStageTop - currentStageTop
                height += (currentStage.progress / 100) * stageDistance
              }
            } else {
              // Fallback if no next stage
              height += (currentStage.progress / 100) * 100
            }
          }
          
          setLineHeight(`${height}px`)
        }
      } else {
        setLineHeight('0px')
      }
    }
    
    // Update on mount and when stages change
    updateLineHeights()
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(updateLineHeights, 100)
    
    // Update on window resize
    window.addEventListener('resize', updateLineHeights)
    return () => {
      window.removeEventListener('resize', updateLineHeights)
      clearTimeout(timer)
    }
  }, [stages, expandedStages])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shipment Timeline</h2>
            <p className="text-sm text-gray-600 mt-1">Order #{orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Progress</p>
            <p className="text-2xl font-bold text-[#FA7921]">{getOverallProgress()}%</p>
          </div>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FA7921] to-[#FFB956] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${getOverallProgress()}%` }}
          >
            <div className="h-full bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Quick Status */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">
              {stages.filter(s => s.status === 'completed').length} Completed
            </span>
          </span>
          {stages.find(s => s.status === 'in-progress') && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span className="text-gray-700">1 In Progress</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">
              {stages.filter(s => s.status === 'pending').length} Pending
            </span>
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative" ref={containerRef}>
        {/* Connecting Line - Full height background line */}
        <div 
          className="absolute left-6 top-12 w-0.5 bg-gray-200"
          style={{ 
            height: bgLineHeight
          }}
        ></div>
        
        {/* Active Line - Progress indicator */}
        <div 
          className="absolute left-6 top-12 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-500 z-10"
          style={{ 
            height: lineHeight
          }}
        ></div>
        
        {/* Stages */}
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <div 
              key={stage.id} 
              ref={el => {
                stageRefs.current[index] = el
              }}
            >
              <TimelineStage
                stage={stage}
                index={index}
                isExpanded={expandedStages.includes(stage.id)}
                onToggle={() => handleStageToggle(stage.id)}
                onTaskUpdate={(taskId) => onTaskUpdate?.(stage.id, taskId)}
                isLast={index === stages.length - 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Contact Support
            </button>
            <button className="px-4 py-2 text-sm bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium">
              Track Shipment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}