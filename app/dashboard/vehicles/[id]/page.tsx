'use client'

import { useState } from 'react'
import Image from 'next/image'
import ShipmentTimeline from '../../components/ShipmentTimeline'
import { TimelineStage } from '../../components/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getRandomAuctionHouse } from '@/src/data/auctionHouses'

interface Document {
  id: string
  name: string
  type: 'invoice' | 'export_certificate' | 'bill_of_lading' | 'deregistration' | 'inspection_report' | 'insurance' | 'customs' | 'other'
  uploadDate: Date
  size: string
  url?: string
  status: 'available' | 'processing' | 'pending'
  required: boolean
}

interface VehicleDetails {
  id: string
  title: string
  images: string[]
  vin?: string
  chassisNumber?: string
  engineNumber?: string
  make: string
  model: string
  year: number
  color: string
  mileage: number
  transmission: 'automatic' | 'manual'
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  engineSize: string
  source: 'auction' | 'direct' | 'export'
  purchaseDate: Date
  status: 'payment_pending' | 'preparing' | 'in_transit' | 'at_port' | 'delivered' | 'completed'
  location?: string
  price: number
  documents: Document[]
  shipping?: {
    vessel?: string
    eta?: Date
    departurePort?: string
    arrivalPort?: string
    containerNumber?: string
    bookingNumber?: string
  }
  auctionDetails?: {
    auctionHouse: string
    lotNumber: string
    auctionDate: Date
    grade?: string
    sheetUrl?: string
  }
  specifications?: {
    doors: number
    seats: number
    driveType: '2WD' | '4WD' | 'AWD'
    bodyType: string
    features: string[]
  }
  notes?: string
}

export default function VehicleDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'shipping' | 'history' | 'inspection' | 'translation'>('overview')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedDocumentType, setSelectedDocumentType] = useState<Document['type']>('invoice')
  
  // Inspection and Translation states
  const [inspectionRequested, setInspectionRequested] = useState(false)
  const [inspectionData, setInspectionData] = useState<{ report?: string; date?: Date } | null>(null)
  const [translationRequested, setTranslationRequested] = useState(false)
  const [translationData, setTranslationData] = useState<{ translation?: string; original?: string } | null>(null)
  const [showInspectionModal, setShowInspectionModal] = useState(false)
  const [showTranslationModal, setShowTranslationModal] = useState(false)
  
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
          description: `${getRandomAuctionHouse()} - Lot #42315`,
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
      id: 'arrival',
      title: 'Port Arrival',
      description: 'Arrival at destination port',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-15'),
      isExpandable: true,
      details: [
        { 
          id: 'arrival-1',
          title: 'Port Entry',
          status: 'pending',
          description: 'Los Angeles Port',
          dueDate: new Date('2024-02-15')
        },
        { 
          id: 'arrival-2',
          title: 'Container Unloading',
          status: 'pending',
          description: 'Terminal assignment pending',
          dueDate: new Date('2024-02-16')
        }
      ]
    },
    {
      id: 'customs',
      title: 'Customs Clearance',
      description: 'Import customs processing',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 3,
      estimatedDate: new Date('2024-02-18'),
      isExpandable: true,
      details: [
        { 
          id: 'customs-1',
          title: 'Document Submission',
          status: 'pending',
          description: 'Submit import documents',
          dueDate: new Date('2024-02-16')
        },
        { 
          id: 'customs-2',
          title: 'Customs Inspection',
          status: 'pending',
          description: 'Awaiting inspection',
          dueDate: new Date('2024-02-17')
        },
        { 
          id: 'customs-3',
          title: 'Duty Payment',
          status: 'pending',
          description: 'Import duty to be calculated',
          dueDate: new Date('2024-02-18')
        }
      ]
    },
    {
      id: 'delivery',
      title: 'Ready for Pickup',
      description: 'Vehicle available for collection',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-20'),
      isExpandable: true,
      details: [
        { 
          id: 'delivery-1',
          title: 'Release Order',
          status: 'pending',
          description: 'Obtain release from terminal',
          dueDate: new Date('2024-02-19')
        },
        { 
          id: 'delivery-2',
          title: 'Vehicle Pickup',
          status: 'pending',
          description: 'Ready for customer collection',
          dueDate: new Date('2024-02-20')
        }
      ]
    }
  ]

  // Mock data - would come from API based on params.id
  const vehicle: VehicleDetails = {
    id: params['id'] as string,
    title: '2018 Toyota Corolla Axio',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800'
    ],
    vin: 'JTDBR32E820123456',
    chassisNumber: 'NZE161-3153697',
    engineNumber: '1NZ-FE-2847293',
    make: 'Toyota',
    model: 'Corolla Axio',
    year: 2018,
    color: 'Pearl White',
    mileage: 45000,
    transmission: 'automatic',
    fuelType: 'hybrid',
    engineSize: '1.5L',
    source: 'auction',
    purchaseDate: new Date('2024-01-10'),
    status: 'in_transit',
    location: 'Pacific Ocean',
    price: 7350000,
    documents: [
      {
        id: '1',
        name: 'Commercial Invoice',
        type: 'invoice',
        uploadDate: new Date('2024-01-12'),
        size: '245 KB',
        url: '#',
        status: 'available',
        required: true
      },
      {
        id: '2',
        name: 'Export Certificate',
        type: 'export_certificate',
        uploadDate: new Date('2024-01-15'),
        size: '180 KB',
        url: '#',
        status: 'available',
        required: true
      },
      {
        id: '3',
        name: 'Bill of Lading',
        type: 'bill_of_lading',
        uploadDate: new Date('2024-01-20'),
        size: '320 KB',
        url: '#',
        status: 'available',
        required: true
      },
      {
        id: '4',
        name: 'Deregistration Certificate',
        type: 'deregistration',
        uploadDate: new Date('2024-01-18'),
        size: '150 KB',
        status: 'processing',
        required: true
      },
      {
        id: '5',
        name: 'JEVIC Inspection Report',
        type: 'inspection_report',
        uploadDate: new Date('2024-01-22'),
        size: '450 KB',
        url: '#',
        status: 'available',
        required: false
      }
    ],
    shipping: {
      vessel: 'NYK Delphinus',
      eta: new Date('2024-02-20'),
      departurePort: 'Yokohama Port',
      arrivalPort: 'Los Angeles Port',
      containerNumber: 'NYKU1234567',
      bookingNumber: 'BK20240110001'
    },
    auctionDetails: {
      auctionHouse: getRandomAuctionHouse(),
      lotNumber: '42315',
      auctionDate: new Date('2024-01-10'),
      grade: '4.5',
      sheetUrl: '#'
    },
    specifications: {
      doors: 4,
      seats: 5,
      driveType: '2WD',
      bodyType: 'Sedan',
      features: [
        'Navigation System',
        'Backup Camera',
        'Cruise Control',
        'Keyless Entry',
        'Alloy Wheels',
        'LED Headlights'
      ]
    }
  }

  const getDocumentIcon = (type: Document['type']) => {
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
          {/* Image Gallery */}
          <div className="lg:w-1/3">
            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden mb-4">
              <Image
                src={vehicle.images[0] || '/placeholder.jpg'}
                alt={vehicle.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {vehicle.images.slice(1, 4).map((image, index) => (
                <div key={index} className="relative h-20 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${vehicle.title} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="lg:w-2/3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {vehicle.vin && <span><strong>VIN:</strong> {vehicle.vin}</span>}
                  {vehicle.chassisNumber && <span><strong>Chassis:</strong> {vehicle.chassisNumber}</span>}
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                vehicle.status === 'in_transit' ? 'bg-purple-100 text-purple-800' :
                vehicle.status === 'delivered' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {vehicle.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
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
                <p className="text-lg font-semibold text-gray-900 capitalize">{vehicle.transmission}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Fuel Type</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">{vehicle.fuelType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Engine</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.engineSize}</p>
              </div>
            </div>

            {/* Specifications */}
            {vehicle.specifications && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Features</h3>
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
            {['overview', 'documents', 'shipping', 'inspection', 'translation', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'overview' | 'documents' | 'shipping' | 'history' | 'inspection' | 'translation')}
                className={`py-4 px-6 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#FA7921] text-[#FA7921]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
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
                        <p className="text-sm font-medium text-gray-900">{vehicle.auctionDetails.auctionHouse}</p>
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
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Engine Number</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.engineNumber}</p>
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
                <button 
                  onClick={() => setUploadModalOpen(true)}
                  className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Document
                </button>
              </div>

              {/* Required Documents Alert */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-900">Required Documents Missing</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Some required documents are still being processed. They will be available soon.
                    </p>
                  </div>
                </div>
              </div>

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
                          {doc.required && (
                            <span className="inline-flex items-center gap-1 mt-2 text-xs text-red-600">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Required
                            </span>
                          )}
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

              {/* Additional Documents Section */}
              <div className="mt-8 border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Additional Documents</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {['Manuals', 'Service History', 'Spare Keys Receipt', 'Port Photos'].map((item) => (
                    <button key={item} className="p-3 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
                      <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {item}
                    </button>
                  ))}
                </div>
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

                <button className="w-full py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium">
                  Track Shipment
                </button>
              </div>
              
              {/* Shipment Timeline Component */}
              <div className="mt-6">
                <ShipmentTimeline
                  orderId={vehicle.id}
                  stages={shipmentStages}
                  onStageToggle={(stageId) => console.log('Stage toggled:', stageId)}
                  onTaskUpdate={(stageId, taskId) => console.log('Task updated:', stageId, taskId)}
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

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select 
                  value={selectedDocumentType}
                  onChange={(e) => setSelectedDocumentType(e.target.value as Document['type'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  <option value="invoice">Invoice</option>
                  <option value="export_certificate">Export Certificate</option>
                  <option value="bill_of_lading">Bill of Lading</option>
                  <option value="deregistration">Deregistration Certificate</option>
                  <option value="inspection_report">Inspection Report</option>
                  <option value="insurance">Insurance Document</option>
                  <option value="customs">Customs Document</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setUploadModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  )
}