'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ShipmentTimeline from '../components/ShipmentTimeline'
import { TimelineStage } from '../components/types'

function ShipmentContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'AUC-2024-0892'
  
  // Configuration options (would come from admin settings in real app)
  const [exportInspectionEnabled, setExportInspectionEnabled] = useState(true)
  const [inspectionCompany, setInspectionCompany] = useState('JEVIC')
  
  const baseStages: TimelineStage[] = [
    {
      id: 'auction-won',
      title: 'Auction Won',
      description: 'Congratulations! You have successfully won the auction',
      status: 'completed',
      progress: 100,
      tasksCompleted: 1,
      totalTasks: 1,
      completedDate: new Date('2024-01-10T14:30:00'),
      completedBy: 'System',
      isExpandable: true,
      details: [
        {
          id: 'won-1',
          title: 'Auction closed - Winner confirmed',
          status: 'completed',
          description: 'Final bid: ¥7,350,000',
          completedDate: new Date('2024-01-10T14:30:00'),
        }
      ]
    },
    {
      id: 'payment-documents',
      title: 'Payment & Documents',
      description: 'Complete payment and submit required documents',
      status: 'in-progress',
      progress: 50,
      tasksCompleted: 2,
      totalTasks: 4,
      estimatedDate: new Date('2024-01-17T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'payment-1',
          title: 'Auction payment received',
          status: 'completed',
          description: 'Payment of ¥7,350,000 confirmed',
          completedDate: new Date('2024-01-11T10:15:00'),
          assignee: 'Finance Team',
          documents: [
            { id: 'doc-1', name: 'Payment Receipt', type: 'pdf', required: true, uploaded: true }
          ]
        },
        {
          id: 'payment-2',
          title: 'Purchase agreement signed',
          status: 'completed',
          description: 'Digital signature received',
          completedDate: new Date('2024-01-11T14:20:00'),
          assignee: 'Legal Team',
          documents: [
            { id: 'doc-2', name: 'Purchase Agreement', type: 'pdf', required: true, uploaded: true }
          ]
        },
        {
          id: 'payment-3',
          title: 'Export certificate obtained',
          status: 'pending',
          description: 'Awaiting government approval',
          dueDate: new Date('2024-01-15T17:00:00'),
          assignee: 'Export Team',
          documents: [
            { id: 'doc-3', name: 'Export Certificate', type: 'pdf', required: true, uploaded: false }
          ]
        },
        {
          id: 'payment-4',
          title: 'Shipping insurance purchased',
          status: 'pending',
          description: 'Select insurance coverage level',
          dueDate: new Date('2024-01-16T17:00:00'),
          assignee: 'Insurance Team',
          documents: [
            { id: 'doc-4', name: 'Insurance Policy', type: 'pdf', required: true, uploaded: false },
            { id: 'doc-5', name: 'Coverage Details', type: 'pdf', required: false, uploaded: false }
          ]
        }
      ]
    },
    {
      id: 'shipping-preparation',
      title: 'Shipping Preparation',
      description: 'Vehicle inspection and preparation for shipment',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 3,
      estimatedDate: new Date('2024-01-20T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'prep-1',
          title: 'Final vehicle inspection',
          status: 'pending',
          description: 'Complete pre-shipment inspection checklist',
          dueDate: new Date('2024-01-18T10:00:00'),
          assignee: 'Inspection Team'
        },
        {
          id: 'prep-2',
          title: 'Vehicle cleaning and detailing',
          status: 'pending',
          description: 'Professional detailing service',
          dueDate: new Date('2024-01-19T10:00:00'),
          assignee: 'Preparation Team'
        },
        {
          id: 'prep-3',
          title: 'Load vehicle into container',
          status: 'pending',
          description: 'Secure vehicle for ocean freight',
          dueDate: new Date('2024-01-20T14:00:00'),
          assignee: 'Loading Team'
        }
      ]
    },
    {
      id: 'port-photos',
      title: 'Port Documentation',
      description: 'Vehicle photos taken at port before shipping',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-01-21T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'port-1',
          title: 'Port arrival photos',
          status: 'pending',
          description: 'Comprehensive photos of vehicle condition at port',
          dueDate: new Date('2024-01-21T10:00:00'),
          assignee: 'Port Team',
          documents: [
            { id: 'port-doc-1', name: 'Exterior Photos', type: 'images', required: true, uploaded: false },
            { id: 'port-doc-2', name: 'Interior Photos', type: 'images', required: true, uploaded: false },
            { id: 'port-doc-3', name: 'Engine Bay Photos', type: 'images', required: true, uploaded: false }
          ]
        },
        {
          id: 'port-2',
          title: 'Customer notification',
          status: 'pending',
          description: 'Notify customer that port photos are available',
          dueDate: new Date('2024-01-21T14:00:00'),
          assignee: 'Customer Service'
        }
      ]
    },
    {
      id: 'in-transit',
      title: 'In Transit',
      description: 'Vehicle is being shipped to destination',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-15T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'transit-1',
          title: 'Departure from port',
          status: 'pending',
          description: 'Vessel: Pacific Carrier - Container #PCT2024892',
          dueDate: new Date('2024-01-22T08:00:00'),
          assignee: 'Shipping Line'
        },
        {
          id: 'transit-2',
          title: 'Arrival at destination port',
          status: 'pending',
          description: 'Expected arrival at destination',
          dueDate: new Date('2024-02-15T14:00:00'),
          assignee: 'Shipping Line'
        }
      ]
    },
    {
      id: 'document-shipping',
      title: 'Document Shipping',
      description: 'Original documents sent via DHL/EMS for vehicle release',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 3,
      estimatedDate: new Date('2024-01-23T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'doc-ship-1',
          title: 'Prepare release documents',
          status: 'pending',
          description: 'Bill of Lading, Export Certificate, and vehicle keys',
          dueDate: new Date('2024-01-22T14:00:00'),
          assignee: 'Documentation Team',
          documents: [
            { id: 'dhl-doc-1', name: 'Original Bill of Lading', type: 'pdf', required: true, uploaded: false },
            { id: 'dhl-doc-2', name: 'Export Certificate', type: 'pdf', required: true, uploaded: false },
            { id: 'dhl-doc-3', name: 'Deregistration Certificate', type: 'pdf', required: true, uploaded: false }
          ]
        },
        {
          id: 'doc-ship-2',
          title: 'Ship via DHL/EMS',
          status: 'pending',
          description: 'Express shipping to customer',
          dueDate: new Date('2024-01-23T10:00:00'),
          assignee: 'Shipping Team'
        },
        {
          id: 'doc-ship-3',
          title: 'Customer notification',
          status: 'pending',
          description: 'Send tracking number to customer',
          dueDate: new Date('2024-01-23T14:00:00'),
          assignee: 'Customer Service'
        }
      ]
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Vehicle delivered to customer',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 3,
      estimatedDate: new Date('2024-02-20T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'delivery-1',
          title: 'Customs clearance',
          status: 'pending',
          description: 'Clear customs at destination',
          dueDate: new Date('2024-02-16T10:00:00'),
          assignee: 'Customs Broker'
        },
        {
          id: 'delivery-2',
          title: 'Final delivery arrangement',
          status: 'pending',
          description: 'Schedule delivery with customer',
          dueDate: new Date('2024-02-18T10:00:00'),
          assignee: 'Delivery Team'
        },
        {
          id: 'delivery-3',
          title: 'Vehicle handover',
          status: 'pending',
          description: 'Complete delivery and get signature',
          dueDate: new Date('2024-02-20T14:00:00'),
          assignee: 'Delivery Team',
          documents: [
            { id: 'doc-6', name: 'Delivery Receipt', type: 'pdf', required: true, uploaded: false },
            { id: 'doc-7', name: 'Condition Report', type: 'pdf', required: true, uploaded: false }
          ]
        }
      ]
    }
  ]
  
  // Add optional export inspection stage if enabled
  const exportInspectionStage: TimelineStage = {
    id: 'export-inspection',
    title: `Export Inspection (${inspectionCompany})`,
    description: `Vehicle inspection by ${inspectionCompany} for export compliance`,
    status: 'pending',
    progress: 0,
    tasksCompleted: 0,
    totalTasks: 2,
    estimatedDate: new Date('2024-01-19T17:00:00'),
    isExpandable: true,
    details: [
      {
        id: 'export-1',
        title: `Schedule ${inspectionCompany} inspection`,
        status: 'pending',
        description: `Arrange inspection appointment with ${inspectionCompany}`,
        dueDate: new Date('2024-01-17T10:00:00'),
        assignee: 'Export Team'
      },
      {
        id: 'export-2',
        title: 'Receive inspection certificate',
        status: 'pending',
        description: `${inspectionCompany} inspection certificate for export`,
        dueDate: new Date('2024-01-19T14:00:00'),
        assignee: 'Export Team',
        documents: [
          { id: 'insp-doc-1', name: `${inspectionCompany} Certificate`, type: 'pdf', required: true, uploaded: false }
        ]
      }
    ]
  }
  
  // Insert export inspection after payment if enabled
  const stages = [...baseStages]
  if (exportInspectionEnabled) {
    const paymentIndex = stages.findIndex(s => s.id === 'payment-documents')
    stages.splice(paymentIndex + 1, 0, exportInspectionStage)
  }
  
  const [currentStages, setCurrentStages] = useState<TimelineStage[]>(stages)

  const handleStageToggle = (stageId: string) => {
    console.log('Stage toggled:', stageId)
  }

  const handleTaskUpdate = (stageId: string, taskId: string) => {
    console.log('Task updated:', stageId, taskId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Shipment Tracking</h1>
          </div>
          
          {/* Vehicle Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  2018 Toyota Corolla Axio
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Chassis:</span>
                    <span className="ml-2 font-medium text-gray-900">NZE161-3153697</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Color:</span>
                    <span className="ml-2 font-medium text-gray-900">Pearl White</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Winning Bid:</span>
                    <span className="ml-2 font-medium text-gray-900">¥7,350,000</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Destination:</span>
                    <span className="ml-2 font-medium text-gray-900">Los Angeles, USA</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                <p className="text-lg font-bold text-[#FA7921]">TRK-2024-0892</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Inspection Settings (Staff Only) */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-900 mb-2">Export Inspection Settings (Staff Only)</h3>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportInspectionEnabled}
                    onChange={(e) => {
                      setExportInspectionEnabled(e.target.checked)
                      const newStages = [...baseStages]
                      if (e.target.checked) {
                        const paymentIndex = newStages.findIndex(s => s.id === 'payment-documents')
                        newStages.splice(paymentIndex + 1, 0, exportInspectionStage)
                      }
                      setCurrentStages(newStages)
                    }}
                    className="w-4 h-4 text-[#FA7921] rounded focus:ring-[#FA7921]"
                  />
                  <span className="text-sm text-gray-700">Export inspection required</span>
                </label>
                {exportInspectionEnabled && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Company:</label>
                    <input
                      type="text"
                      value={inspectionCompany}
                      onChange={(e) => setInspectionCompany(e.target.value)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FA7921]"
                      placeholder="e.g., JEVIC, QISJ"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Component */}
        <ShipmentTimeline
          orderId={orderId}
          stages={currentStages}
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