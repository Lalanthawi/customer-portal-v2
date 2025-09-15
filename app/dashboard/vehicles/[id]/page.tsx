'use client'

import { useState } from 'react'
import ShipmentTimeline from '../../components/ShipmentTimeline'
import { TimelineStage } from '../../components/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { VehicleDetails, VehicleDocument, generateMockVehicle } from '../types'
import { ImageGalleryEnhanced } from '@/components/ui/image-gallery-enhanced'

export default function VehicleDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'shipping' | 'history' | 'inspection' | 'translation' | 'included-items'>('overview')
  
  // Inspection and Translation states
  const [inspectionRequested, setInspectionRequested] = useState(false)
  const [inspectionData, setInspectionData] = useState<{ report?: string; date?: Date } | null>(null)
  const [translationRequested, setTranslationRequested] = useState(false)
  const [translationData, setTranslationData] = useState<{ translation?: string; original?: string } | null>(null)
  const [showInspectionModal, setShowInspectionModal] = useState(false)
  const [showTranslationModal, setShowTranslationModal] = useState(false)
  
  // Delivery confirmation state
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false)
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [deliveryRating, setDeliveryRating] = useState(5)

  // Included Items state (admin-controlled, read-only for customers)
  const [includedItems] = useState({
    spareKey: true,
    maintenanceRecords: true,
    manuals: true,
    catalogues: false,
    accessories: true,
    accessoriesDetails: 'Floor mats, Original remote control',
    others: false,
    othersDetails: ''
  })
  
  // Handlers for inspection and translation requests
  const handleRequestInspection = () => {
    setShowInspectionModal(false)
    setInspectionRequested(true)
    // Simulate inspection completion after 3 seconds
    setTimeout(() => {
      setInspectionData({ report: 'Inspection Report', date: new Date() })
    }, 3000)
  }
  
  const handleRequestTranslation = () => {
    setShowTranslationModal(false)
    setTranslationRequested(true)
    // Simulate translation completion after 3 seconds
    setTimeout(() => {
      setTranslationData({ translation: 'Translated content', original: 'Original content' })
    }, 3000)
  }

  // In production, this would be fetched from API
  // For now, using mock data generator
  const vehicle: VehicleDetails = generateMockVehicle(params['id'] as string)

  // Timeline stages for the ShipmentTimeline component
  const shipmentStages: TimelineStage[] = [
    {
      id: 'auction-won',
      title: 'Auction Won',
      description: 'Vehicle successfully won at auction',
      status: 'completed',
      progress: 100,
      tasksCompleted: 3,
      totalTasks: 3,
      estimatedDate: new Date('2024-01-10'),
      completedDate: new Date('2024-01-10'),
      completedBy: 'System',
      isExpandable: true,
      details: [
        { 
          id: 'auction-1',
          title: 'Auction Details',
          status: 'completed',
          description: `${vehicle.auctionDetails?.auctionHouse || 'Auction House'} - Lot #${vehicle.auctionDetails?.lotNumber || '42315'}`,
          completedDate: new Date('2024-01-10')
        },
        { 
          id: 'auction-2',
          title: 'Final Bid',
          status: 'completed',
          description: '¥1,250,000',
          completedDate: new Date('2024-01-10')
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment Processing',
      description: 'Payment received and confirmed',
      status: 'completed',
      progress: 100,
      tasksCompleted: 2,
      totalTasks: 2,
      estimatedDate: new Date('2024-01-12'),
      completedDate: new Date('2024-01-12'),
      completedBy: 'Finance Team',
      isExpandable: true,
      details: [
        { 
          id: 'payment-1',
          title: 'Wire Transfer Received',
          status: 'completed',
          description: '¥1,350,000 - Reference: PAY-2024-0892',
          completedDate: new Date('2024-01-12')
        }
      ]
    },
    {
      id: 'export-docs',
      title: 'Export Documentation',
      description: 'Preparing export certificate and deregistration',
      status: 'completed',
      progress: 100,
      tasksCompleted: 3,
      totalTasks: 3,
      estimatedDate: new Date('2024-01-18'),
      completedDate: new Date('2024-01-18'),
      completedBy: 'Documentation Team',
      isExpandable: true,
      details: [
        { 
          id: 'export-1',
          title: 'Export Certificate',
          status: 'completed',
          description: 'Certificate #EXP-2024-0892 issued',
          completedDate: new Date('2024-01-18')
        },
        { 
          id: 'export-2',
          title: 'Vehicle Deregistration',
          status: 'completed',
          description: 'Japanese registration cancelled',
          completedDate: new Date('2024-01-18')
        },
        { 
          id: 'export-3',
          title: 'Bill of Lading',
          status: 'completed',
          description: 'BL-2024-0892 issued',
          completedDate: new Date('2024-01-18')
        }
      ]
    },
    {
      id: 'inspection',
      title: 'Pre-shipment Inspection',
      description: 'Vehicle inspection by JEVIC',
      status: 'completed',
      progress: 100,
      tasksCompleted: 2,
      totalTasks: 2,
      estimatedDate: new Date('2024-01-22'),
      completedDate: new Date('2024-01-22'),
      completedBy: 'JEVIC Inspector',
      isExpandable: true,
      details: [
        { 
          id: 'inspect-1',
          title: 'Inspection Completed',
          status: 'completed',
          description: 'Passed - Certificate #JEVIC-2024-0892',
          completedDate: new Date('2024-01-22')
        }
      ]
    },
    {
      id: 'loading',
      title: 'Vessel Loading',
      description: 'Vehicle loaded onto shipping vessel',
      status: 'completed',
      progress: 100,
      tasksCompleted: 3,
      totalTasks: 3,
      estimatedDate: new Date('2024-01-25'),
      completedDate: new Date('2024-01-25'),
      completedBy: 'Port Operations',
      isExpandable: true,
      details: [
        { 
          id: 'load-1',
          title: 'Loaded on Vessel',
          status: 'completed',
          description: 'Tokyo Express - Container TCNU1234567',
          completedDate: new Date('2024-01-25')
        },
        { 
          id: 'load-2',
          title: 'Booking Confirmed',
          status: 'completed',
          description: 'Booking #BK-2024-0892',
          completedDate: new Date('2024-01-25')
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Ocean Shipping',
      description: 'In transit to destination port',
      status: 'in-progress',
      progress: 65,
      tasksCompleted: 1,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-15'),
      isExpandable: true,
      details: [
        { 
          id: 'ship-1',
          title: 'Departed Yokohama',
          status: 'completed',
          description: 'Vessel departed on schedule',
          completedDate: new Date('2024-01-26')
        },
        { 
          id: 'ship-2',
          title: 'Arrival at Los Angeles',
          status: 'pending',
          description: 'ETA: Feb 15, 2024',
          dueDate: new Date('2024-02-15')
        }
      ]
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Vehicle successfully delivered',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-20'),
      isExpandable: true,
      details: [
        { 
          id: 'delivery-1',
          title: 'Port Entry',
          status: 'pending',
          description: 'Los Angeles Port',
          dueDate: new Date('2024-02-15')
        },
        { 
          id: 'delivery-2',
          title: 'Final Delivery',
          status: 'pending',
          description: 'Vehicle delivered to customer',
          dueDate: new Date('2024-02-20'),
          actions: !deliveryConfirmed ? [
            {
              label: 'Confirm Received',
              icon: 'check' as const,
              onClick: () => {
                setShowDeliveryModal(true)
              }
            }
          ] : undefined
        }
      ]
    }
  ]

  const getDocumentIcon = (type: VehicleDocument['type']) => {
    const icons = {
      invoice: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      export_certificate: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bill_of_lading: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      deregistration: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      inspection_report: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      insurance: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      customs: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      other: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
    return icons[type] || icons.other
  }

  const formatJPY = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="w-full">
      {/* Back Button */}
      <Link 
        href="/dashboard/vehicles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Vehicles
      </Link>

      {/* Vehicle Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Image Gallery */}
          <div className="lg:w-1/2">
            <ImageGalleryEnhanced 
              images={vehicle.images}
              alt={vehicle.title}
            />
          </div>

          {/* Vehicle Info */}
          <div className="lg:w-1/2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {vehicle.vin && <span><strong>VIN:</strong> {vehicle.vin}</span>}
                  {vehicle.chassisNumber && <span><strong>Chassis:</strong> {vehicle.chassisNumber}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  vehicle.status === 'in_transit' ? 'bg-purple-100 text-purple-800' :
                  vehicle.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {vehicle.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Purchase Price</p>
                <p className="text-lg font-semibold text-gray-900">{formatJPY(vehicle.price)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Year</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mileage</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Transmission</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.transmissionType || vehicle.transmission}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Fuel Type</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">{vehicle.fuelType}</p>
              </div>
              {vehicle.type && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="text-lg font-semibold text-gray-900">{vehicle.type}</p>
                </div>
              )}
              {vehicle.grade && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Grade</p>
                  <p className="text-lg font-semibold text-gray-900">{vehicle.grade}</p>
                </div>
              )}
              {vehicle.location && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-lg font-semibold text-gray-900">{vehicle.location}</p>
                </div>
              )}
            </div>

            {/* Equipment */}
            {vehicle.specifications && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Equipment</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.specifications.features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['overview', 'documents', 'shipping', 'inspection', 'translation', 'included-items', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'overview' | 'documents' | 'shipping' | 'history' | 'inspection' | 'translation' | 'included-items')}
                className={`py-4 px-6 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#FA7921] text-[#FA7921]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'included-items' ? 'Included Items' : tab}
                {tab === 'documents' && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {vehicle.documents.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Auction Details */}
              {vehicle.auctionDetails && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Auction Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Auction House</p>
                        <p className="text-sm font-medium text-gray-900">
                          {vehicle.auctionDetails.auctionHouse}
                          {vehicle.auctionDetails.location && ` (${vehicle.auctionDetails.location})`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lot Number</p>
                        <p className="text-sm font-medium text-gray-900">#{vehicle.auctionDetails.lotNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Auction Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {vehicle.auctionDetails.auctionDate.toLocaleDateString()}
                        </p>
                      </div>
                      {vehicle.auctionDetails.grade && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Grade</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.auctionDetails.grade}</p>
                        </div>
                      )}
                    </div>
                    {vehicle.auctionDetails.sheetUrl && (
                      <button className="mt-3 text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium">
                        View Auction Sheet →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Vehicle Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Make & Model</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Color</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.color}</p>
                  </div>
                  {vehicle.specifications && (
                    <>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Body Type</p>
                        <p className="text-sm font-medium text-gray-900">{vehicle.specifications.bodyType}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Doors/Seats</p>
                        <p className="text-sm font-medium text-gray-900">
                          {vehicle.specifications.doors} doors / {vehicle.specifications.seats} seats
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Drive Type</p>
                        <p className="text-sm font-medium text-gray-900">{vehicle.specifications.driveType}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Vehicle Documents</h3>
                  <p className="text-sm text-gray-600 mt-1">All documents related to this vehicle purchase</p>
                </div>
              </div>

              {/* Documents Processing Alert */}
              {vehicle.documents.some(doc => doc.status === 'processing' || doc.status === 'pending') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900">Documents Processing</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Some documents are still being processed and will be available soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {vehicle.documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          doc.status === 'available' ? 'bg-green-100 text-green-600' :
                          doc.status === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Uploaded {doc.uploadDate.toLocaleDateString()} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === 'available' && doc.url && (
                          <>
                            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </>
                        )}
                        {doc.status === 'processing' && (
                          <span className="text-xs text-yellow-600 font-medium">Processing...</span>
                        )}
                        {doc.status === 'pending' && (
                          <span className="text-xs text-gray-500">Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && vehicle.shipping && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-blue-900">Current Status</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      In Transit
                    </span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-blue-700 mb-1">Vessel</p>
                      <p className="text-sm font-medium text-blue-900">{vehicle.shipping.vessel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 mb-1">Container</p>
                      <p className="text-sm font-medium text-blue-900">{vehicle.shipping.containerNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 mb-1">Booking</p>
                      <p className="text-sm font-medium text-blue-900">{vehicle.shipping.bookingNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 mb-1">ETA</p>
                      <p className="text-sm font-medium text-blue-900">
                        {vehicle.shipping.eta?.toLocaleDateString() || 'TBD'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Departure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-gray-900">{vehicle.shipping.departurePort}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-900">Jan 25, 2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Arrival</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-gray-900">{vehicle.shipping.arrivalPort}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-900">
                          {vehicle.shipping.eta?.toLocaleDateString() || 'TBD'} (Estimated)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shipment Timeline Component */}
              <div className="mt-6">
                <ShipmentTimeline
                  orderId={vehicle.id}
                  stages={shipmentStages}
                  onStageToggle={() => {/* Stage toggled */}}
                  onTaskUpdate={() => {/* Task updated */}}
                />
              </div>
            </div>
          )}

          {/* History Tab */}
          {/* Inspection Tab */}
          {activeTab === 'inspection' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Vehicle Inspection</h3>
                {!inspectionRequested && !inspectionData && (
                  <button
                    onClick={() => setShowInspectionModal(true)}
                    className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                  >
                    Request Inspection
                  </button>
                )}
              </div>

              {/* If inspection is already available (shared from another user) */}
              {inspectionData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-800">Inspection Available</p>
                      <p className="text-sm text-green-700 mt-1">
                        This vehicle has already been inspected. The inspection report is available for viewing.
                      </p>
                      <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                        View Inspection Report
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* If inspection is requested but pending */}
              {inspectionRequested && !inspectionData && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-amber-800">Inspection Requested</p>
                      <p className="text-sm text-amber-700 mt-1">
                        Your inspection request has been submitted. The inspection will be completed within 24-48 hours.
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <span className="text-xs text-amber-600">Request ID: #INS-2024-0892</span>
                        <span className="text-xs text-amber-600">Fee: ¥3,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* If no inspection */}
              {!inspectionRequested && !inspectionData && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">No Inspection Available</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Request a professional inspection for this vehicle (¥3,000 fee)
                  </p>
                  <button
                    onClick={() => setShowInspectionModal(true)}
                    className="px-6 py-2.5 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                  >
                    Request Inspection
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Translation Tab */}
          {activeTab === 'translation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Auction Sheet Translation</h3>
                {!translationRequested && !translationData && (
                  <button
                    onClick={() => setShowTranslationModal(true)}
                    className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                  >
                    Request Translation
                  </button>
                )}
              </div>

              {/* If translation is already available (shared from another user) */}
              {translationData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-800">Translation Available</p>
                      <p className="text-sm text-green-700 mt-1">
                        The auction sheet for this vehicle has already been translated and is ready for viewing.
                      </p>
                      <div className="mt-3 flex gap-3">
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm">
                          View Original Sheet
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                          View Translation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* If translation is requested but pending */}
              {translationRequested && !translationData && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-amber-800">Translation In Progress</p>
                      <p className="text-sm text-amber-700 mt-1">
                        Your translation request has been submitted. The translation will be completed within 2-4 hours.
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <span className="text-xs text-amber-600">Request ID: #TRN-2024-1567</span>
                        <span className="text-xs text-amber-600">Fee: ¥1,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* If no translation */}
              {!translationRequested && !translationData && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">No Translation Available</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Request a professional translation of the auction sheet (¥1,500 fee)
                  </p>
                  <button
                    onClick={() => setShowTranslationModal(true)}
                    className="px-6 py-2.5 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                  >
                    Request Translation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Included Items Tab */}
          {activeTab === 'included-items' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">DHL Shipment Information</p>
                    <p className="text-xs text-blue-700">These items will be shipped separately via DHL along with your vehicle documentation. The items below indicate what will be included with your vehicle shipment.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Spare Key */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    id="spareKey"
                    checked={includedItems.spareKey}
                    disabled
                    readOnly
                    className="mt-1 w-5 h-5 text-[#FA7921] bg-white border-gray-300 rounded cursor-not-allowed"
                  />
                  <label htmlFor="spareKey" className="flex-1 cursor-pointer">
                    <span className="block text-sm font-medium text-gray-900">Spare Key</span>
                    <span className="text-xs text-gray-500">Additional key for the vehicle</span>
                  </label>
                </div>

                {/* Maintenance Records */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    id="maintenanceRecords"
                    checked={includedItems.maintenanceRecords}
                    disabled
                    readOnly
                    className="mt-1 w-5 h-5 text-[#FA7921] bg-white border-gray-300 rounded cursor-not-allowed"
                  />
                  <label htmlFor="maintenanceRecords" className="flex-1 cursor-pointer">
                    <span className="block text-sm font-medium text-gray-900">Maintenance Records</span>
                    <span className="text-xs text-gray-500">Service history and maintenance documentation</span>
                  </label>
                </div>

                {/* Manuals */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    id="manuals"
                    checked={includedItems.manuals}
                    disabled
                    readOnly
                    className="mt-1 w-5 h-5 text-[#FA7921] bg-white border-gray-300 rounded cursor-not-allowed"
                  />
                  <label htmlFor="manuals" className="flex-1 cursor-pointer">
                    <span className="block text-sm font-medium text-gray-900">Manuals</span>
                    <span className="text-xs text-gray-500">Owner's manual and instruction booklets</span>
                  </label>
                </div>

                {/* Catalogues */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    id="catalogues"
                    checked={includedItems.catalogues}
                    disabled
                    readOnly
                    className="mt-1 w-5 h-5 text-[#FA7921] bg-white border-gray-300 rounded cursor-not-allowed"
                  />
                  <label htmlFor="catalogues" className="flex-1 cursor-pointer">
                    <span className="block text-sm font-medium text-gray-900">Catalogues</span>
                    <span className="text-xs text-gray-500">Parts catalogues and promotional materials</span>
                  </label>
                </div>

                {/* Accessories */}
                <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="accessories"
                      checked={includedItems.accessories}
                      disabled
                      readOnly
                      className="mt-1 w-5 h-5 text-[#FA7921] bg-white border-gray-300 rounded cursor-not-allowed"
                    />
                    <label htmlFor="accessories" className="flex-1 cursor-pointer">
                      <span className="block text-sm font-medium text-gray-900">Accessories</span>
                      <span className="text-xs text-gray-500">Remotes, shift knobs, parts, etc.</span>
                    </label>
                  </div>
                  {includedItems.accessories && (
                    <div className="mt-3 ml-8">
                      <input
                        type="text"
                        value={includedItems.accessoriesDetails}
                        disabled
                        readOnly
                        placeholder="Please specify accessories (e.g., remote control, custom shift knob)"
                        className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed"
                      />
                    </div>
                  )}
                </div>

                {/* Others */}
                <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="othersItem"
                      checked={includedItems.others}
                      disabled
                      readOnly
                      className="mt-1 w-5 h-5 text-[#FA7921] bg-white border-gray-300 rounded cursor-not-allowed"
                    />
                    <label htmlFor="othersItem" className="flex-1 cursor-pointer">
                      <span className="block text-sm font-medium text-gray-900">Others</span>
                      <span className="text-xs text-gray-500">Any other items not listed above</span>
                    </label>
                  </div>
                  {includedItems.others && (
                    <div className="mt-3 ml-8">
                      <textarea
                        value={includedItems.othersDetails}
                        disabled
                        readOnly
                        placeholder="Please describe other items that will be included"
                        rows={3}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity History</h3>
              <div className="space-y-4">
                {[
                  { date: new Date('2024-01-25'), event: 'Vehicle loaded onto vessel', type: 'shipping' },
                  { date: new Date('2024-01-22'), event: 'Export inspection completed', type: 'document' },
                  { date: new Date('2024-01-20'), event: 'Bill of Lading issued', type: 'document' },
                  { date: new Date('2024-01-18'), event: 'Vehicle deregistered', type: 'document' },
                  { date: new Date('2024-01-15'), event: 'Export certificate received', type: 'document' },
                  { date: new Date('2024-01-12'), event: 'Payment confirmed', type: 'payment' },
                  { date: new Date('2024-01-10'), event: 'Vehicle won at auction', type: 'auction' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'shipping' ? 'bg-blue-100 text-blue-600' :
                      item.type === 'document' ? 'bg-green-100 text-green-600' :
                      item.type === 'payment' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.date.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Inspection Request Modal */}
      {showInspectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Vehicle Inspection</h3>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Fee:</strong> ¥3,000 (will be added to your invoice)
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  A professional inspection will be conducted on this vehicle. The inspection report will include:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Detailed condition assessment</li>
                  <li>High-resolution photos of key areas</li>
                  <li>Mechanical inspection results</li>
                  <li>Accident history verification</li>
                </ul>
              </div>
              
              <div className="text-sm text-gray-500">
                Estimated completion: 24-48 hours
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowInspectionModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestInspection}
                className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
              >
                Request Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Translation Request Modal */}
      {showTranslationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Auction Sheet Translation</h3>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Fee:</strong> ¥1,500 (will be added to your invoice)
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Professional translation of the auction sheet will include:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Complete auction grade translation</li>
                  <li>Condition notes and remarks</li>
                  <li>Equipment and features list</li>
                  <li>Inspector comments</li>
                </ul>
              </div>
              
              <div className="text-sm text-gray-500">
                Estimated completion: 2-4 hours
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowTranslationModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestTranslation}
                className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
              >
                Request Translation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Confirmation Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Vehicle Delivery</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Please confirm that you have received your vehicle in good condition.</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium">{vehicle.title}</p>
                  <p className="text-xs text-gray-500">VIN: {vehicle.vin}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rate your experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setDeliveryRating(star)}
                      className={`text-2xl ${star <= deliveryRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional notes (optional)</label>
                <textarea
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                  rows={3}
                  placeholder="Any comments about the delivery?"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  By confirming, you acknowledge that you have received the vehicle and found it in acceptable condition.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDeliveryConfirmed(true)
                  setShowDeliveryModal(false)
                  alert('Thank you for confirming delivery! Your feedback has been recorded.')
                }}
                className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors"
              >
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}