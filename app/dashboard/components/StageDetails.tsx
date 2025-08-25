'use client'

import { useState } from 'react'
import { StageDetail } from './types'

interface StageDetailsProps {
  details: StageDetail[]
  onTaskUpdate?: (taskId: string) => void
}

export default function StageDetails({ details, onTaskUpdate }: StageDetailsProps) {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

  const formatDate = (date?: Date) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <div className="p-4 space-y-3">
      {details.map((detail) => (
        <div 
          key={detail.id}
          className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
            hoveredTask === detail.id ? 'bg-gray-50' : ''
          }`}
          onMouseEnter={() => setHoveredTask(detail.id)}
          onMouseLeave={() => setHoveredTask(null)}
        >
          {/* Checkbox/Status Icon */}
          <div className="mt-0.5">
            {detail.status === 'completed' ? (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <button 
                onClick={() => onTaskUpdate?.(detail.id)}
                className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className={`text-sm font-medium ${
                  detail.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {detail.title}
                </h4>
                
                {detail.description && (
                  <p className="text-xs text-gray-600 mt-1">
                    {detail.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 mt-2">
                  {detail.dueDate && detail.status === 'pending' && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due: {formatDate(detail.dueDate)}
                    </span>
                  )}
                  
                  {detail.completedDate && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {formatDate(detail.completedDate)}
                    </span>
                  )}
                  
                  {detail.assignee && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {detail.assignee}
                    </span>
                  )}
                  
                  {detail.note && (
                    <span className="text-xs text-green-600 font-medium">
                      ✓ {detail.note}
                    </span>
                  )}
                </div>
                
                {/* Action Buttons */}
                {detail.actions && detail.actions.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    {detail.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className={`px-3 py-1.5 text-xs rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                          action.variant === 'primary' 
                            ? 'bg-[#FA7921] text-white hover:bg-[#FA7921]/90' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {action.icon === 'document' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {action.icon === 'credit-card' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        )}
                        {action.icon === 'location' && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Documents */}
              {detail.documents && detail.documents.length > 0 && (
                <div className="ml-4">
                  <div className="flex -space-x-2">
                    {detail.documents.slice(0, 3).map((doc) => (
                      <div 
                        key={doc.id}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-white ${
                          doc.uploaded ? 'bg-green-100' : 'bg-gray-100'
                        }`}
                        title={doc.name}
                      >
                        {doc.uploaded ? (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        )}
                      </div>
                    ))}
                    {detail.documents.length > 3 && (
                      <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-white">
                        <span className="text-xs font-medium text-gray-600">
                          +{detail.documents.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons for Pending Tasks */}
            {detail.status === 'pending' && hoveredTask === detail.id && (
              <div className="flex items-center gap-2 mt-3">
                <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors font-medium">
                  Mark Complete
                </button>
                {detail.documents && detail.documents.some(d => !d.uploaded) && (
                  <button className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors font-medium">
                    Upload Documents
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}