'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useShipmentTimeline } from '@/hooks/useShipmentTimeline'
import ShipmentTimeline from '../components/ShipmentTimeline'
import { TimelineStage as LocalTimelineStage } from '../components/types'
import { TimelineStage } from '@/types/api.types'
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

// Convert API timeline stage to local component format
function convertToLocalStage(stage: TimelineStage): LocalTimelineStage {
  // Calculate tasks completed
  const tasksCompleted = stage.tasks.filter(t => t.status === 'completed').length
  const totalTasks = stage.tasks.length

  return {
    id: stage.id,
    title: stage.title,
    description: stage.description,
    status: stage.status,
    progress: stage.progress,
    tasksCompleted,
    totalTasks,
    completedDate: stage.completedDate ? new Date(stage.completedDate) : undefined,
    completedBy: stage.updatedBy,
    estimatedDate: stage.estimatedDate ? new Date(stage.estimatedDate) : undefined,
    isExpandable: totalTasks > 0,
    details: stage.tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status,
      description: task.description,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      completedDate: task.completedDate ? new Date(task.completedDate) : undefined,
      assignee: task.assignee,
      documents: stage.documents.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        url: doc.url,
        required: doc.required,
        uploaded: doc.uploaded,
      })),
    })),
  }
}

function ShipmentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId') || 'AUC-2024-0892'
  
  // Fetch timeline data using the custom hook
  const { 
    timeline, 
    loading, 
    error, 
    refetch, 
    lastUpdated, 
    isUpdating 
  } = useShipmentTimeline(orderId, { 
    pollingInterval: 30000, // Poll every 30 seconds
    enablePolling: true 
  })

  // Calculate overall progress (can be used for progress indicators if needed)
  // const overallProgress = useTimelineProgress(timeline)

  const handleStageToggle = () => {
    // Stage toggled
  }

  const handleTaskUpdate = () => {
    // Task updated
  }

  // Loading state
  if (loading && !timeline) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !timeline) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Failed to Load Shipment Timeline
                </h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No timeline data
  if (!timeline) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  No Shipment Found
                </h3>
                <p className="text-yellow-700">
                  No shipment timeline found for order {orderId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Convert API stages to local format
  const localStages = timeline.stages
    .filter(stage => stage.isVisible)
    .sort((a, b) => a.sequence - b.sequence)
    .map(convertToLocalStage)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <PageHeader
          title="Shipment Tracking"
          description="Track your vehicle's journey from auction to delivery"
          actions={
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              {isUpdating && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </div>
              )}
            </div>
          }
        />
        
        {/* Vehicle Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {timeline.vehicleInfo.year} {timeline.vehicleInfo.make} {timeline.vehicleInfo.model}
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Chassis:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {timeline.vehicleInfo.chassisNumber}
                    </span>
                  </div>
                  {timeline.vehicleInfo.color && (
                    <div>
                      <span className="text-gray-600">Color:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {timeline.vehicleInfo.color}
                      </span>
                    </div>
                  )}
                  {timeline.vehicleInfo.winningBid && (
                    <div>
                      <span className="text-gray-600">Winning Bid:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        ¥{timeline.vehicleInfo.winningBid.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {timeline.vehicleInfo.destination && (
                    <div>
                      <span className="text-gray-600">Destination:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {timeline.vehicleInfo.destination}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {timeline.vehicleInfo.trackingNumber && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                  <p className="text-lg font-bold text-[#FA7921]">
                    {timeline.vehicleInfo.trackingNumber}
                  </p>
                </div>
              )}
            </div>
            
            {/* Last Updated */}
            {lastUpdated && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Update Notification */}
          {error && timeline && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-800">
                    Unable to fetch latest updates. Showing cached data.
                  </p>
                </div>
                <button
                  onClick={() => refetch()}
                  className="text-sm text-yellow-700 hover:text-yellow-900 font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

        {/* Timeline Component */}
        <ShipmentTimeline
          orderId={orderId}
          stages={localStages}
          onStageToggle={handleStageToggle}
          onTaskUpdate={handleTaskUpdate}
        />

        {/* Additional Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-sm text-gray-600">Chat with support</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Call Us</p>
                <p className="text-sm text-gray-600">+81 3-1234-5678</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">support@auction.jp</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShipmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA7921] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shipment details...</p>
        </div>
      </div>
    }>
      <ShipmentContent />
    </Suspense>
  )
}