'use client'

import { useState } from 'react'
import StageIcon from './StageIcon'
import ProgressBar from './ProgressBar'
import StageDetails from './StageDetails'
import { TimelineStage as TimelineStageType } from './types'

interface TimelineStageProps {
  stage: TimelineStageType
  index: number
  isExpanded: boolean
  onToggle: () => void
  onTaskUpdate?: (taskId: string) => void
  isLast: boolean
}

export default function TimelineStage({
  stage,
  index,
  isExpanded,
  onToggle,
  onTaskUpdate,
  isLast
}: TimelineStageProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (date?: Date) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getStatusColor = () => {
    switch (stage.status) {
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'in-progress':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }

  const getStatusText = () => {
    switch (stage.status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      default:
        return 'Pending'
    }
  }

  return (
    <div 
      className={`relative ${!isLast ? 'pb-6' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="relative z-10">
          <StageIcon 
            status={stage.status} 
            isHovered={isHovered}
            index={index}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div 
            className={`bg-white rounded-xl border transition-all duration-200 ${
              stage.status === 'in-progress' 
                ? 'border-blue-200 shadow-md' 
                : stage.status === 'completed'
                ? 'border-green-200'
                : 'border-gray-200'
            } ${isHovered && stage.isExpandable ? 'shadow-lg' : ''}`}
          >
            {/* Header */}
            <div 
              className={`p-4 ${stage.isExpandable ? 'cursor-pointer' : ''}`}
              onClick={stage.isExpandable ? onToggle : undefined}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {stage.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {stage.description}
                  </p>
                  
                  {/* Task Counter & Date */}
                  <div className="flex items-center gap-4 mt-3">
                    {stage.totalTasks > 0 && (
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">{stage.tasksCompleted}</span> of{' '}
                        <span className="font-medium">{stage.totalTasks}</span> tasks completed
                      </span>
                    )}
                    
                    {stage.completedDate && (
                      <span className="text-sm text-gray-500">
                        {formatDate(stage.completedDate)}
                      </span>
                    )}
                    
                    {stage.estimatedDate && stage.status === 'pending' && (
                      <span className="text-sm text-gray-500">
                        Est. {formatDate(stage.estimatedDate)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expand/Collapse Arrow */}
                {stage.isExpandable && (
                  <button className="ml-4 p-1">
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              {stage.totalTasks > 0 && stage.status !== 'completed' && (
                <div className="mt-4">
                  <ProgressBar 
                    progress={stage.progress} 
                    status={stage.status}
                    showPercentage={true}
                  />
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {isExpanded && stage.details && (
              <div className="border-t border-gray-100">
                <StageDetails 
                  details={stage.details}
                  onTaskUpdate={onTaskUpdate}
                />
              </div>
            )}
          </div>

          {/* Additional Info for Completed Stages */}
          {stage.status === 'completed' && stage.completedBy && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Completed by {stage.completedBy}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}