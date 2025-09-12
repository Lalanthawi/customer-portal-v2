'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getRandomAuctionHouse } from '@/src/data/auctionHouses'
import { StatCard } from '@/components/ui/stat-card'
import { sharedDataStore, InspectionData, InspectionStatus } from '../utils/sharedData'

// Types
interface VehicleInspection {
  id: string
  vehicleId: string
  vehicleName: string
  vehicleImage: string
  auctionHouse: string
  lotNumber: string
  inspectionDate: string
  photos: string[]
  videos: string[]
  remarks?: string
  fee: number
  status: 'requested' | 'completed' | 'processing'
  auctionUrl: string
  inspector?: string
}

// Mock Data
const vehicleInspections: VehicleInspection[] = [
  {
    id: '1',
    vehicleId: 'TOY-CAM-2023',
    vehicleName: '2023 Toyota Camry Hybrid',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    auctionHouse: getRandomAuctionHouse(),
    lotNumber: '42315',
    inspectionDate: '2024-01-22',
    photos: [
      '/inspections/cam-001/photo1.jpg',
      '/inspections/cam-001/photo2.jpg',
      '/inspections/cam-001/photo3.jpg',
      '/inspections/cam-001/photo4.jpg',
      '/inspections/cam-001/photo5.jpg',
      '/inspections/cam-001/photo6.jpg',
      '/inspections/cam-001/photo7.jpg',
      '/inspections/cam-001/photo8.jpg',
    ],
    videos: [
      '/inspections/cam-001/engine-start.mp4',
      '/inspections/cam-001/walkaround.mp4',
    ],
    remarks: 'Engine runs smooth, minor wear on driver seat, AC working perfectly, all electronics functional',
    fee: 3000,
    status: 'completed',
    auctionUrl: '/dashboard/vehicle/TOY-CAM-2023',
    inspector: 'Yamada-san'
  },
  {
    id: '2',
    vehicleId: 'HON-CRV-2022',
    vehicleName: '2022 Honda CR-V',
    vehicleImage: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=400',
    auctionHouse: getRandomAuctionHouse(),
    lotNumber: '78921',
    inspectionDate: '2024-01-24',
    photos: [],
    videos: [],
    fee: 3000,
    status: 'processing',
    auctionUrl: '/dashboard/vehicle/HON-CRV-2022',
    inspector: 'Tanaka-san'
  },
  {
    id: '3',
    vehicleId: 'NIS-LEAF-2023',
    vehicleName: '2023 Nissan Leaf',
    vehicleImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
    auctionHouse: getRandomAuctionHouse(),
    lotNumber: '89234',
    inspectionDate: '2024-01-25',
    photos: [],
    videos: [],
    fee: 3000,
    status: 'requested',
    auctionUrl: '/dashboard/vehicle/NIS-LEAF-2023'
  },
  {
    id: '4',
    vehicleId: 'MAZ-CX5-2022',
    vehicleName: '2022 Mazda CX-5',
    vehicleImage: 'https://images.unsplash.com/photo-1609521263047-f8f205293b24?w=400',
    auctionHouse: getRandomAuctionHouse(),
    lotNumber: '56789',
    inspectionDate: '2024-01-20',
    photos: [
      '/inspections/cx5-001/photo1.jpg',
      '/inspections/cx5-001/photo2.jpg',
      '/inspections/cx5-001/photo3.jpg',
      '/inspections/cx5-001/photo4.jpg',
    ],
    videos: [
      '/inspections/cx5-001/test-drive.mp4',
    ],
    remarks: 'Excellent condition, new tires, full service history available',
    fee: 3000,
    status: 'completed',
    auctionUrl: '/dashboard/vehicle/MAZ-CX5-2022',
    inspector: 'Suzuki-san'
  },
  {
    id: '5',
    vehicleId: 'SUB-IMP-2023',
    vehicleName: '2023 Subaru Impreza',
    vehicleImage: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=400',
    auctionHouse: getRandomAuctionHouse(),
    lotNumber: '34521',
    inspectionDate: '2024-01-26',
    photos: [],
    videos: [],
    fee: 3000,
    status: 'processing',
    auctionUrl: '/dashboard/vehicle/SUB-IMP-2023',
    inspector: 'Sato-san'
  }
]

export default function InspectionsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'not available' | 'requested' | 'processing' | 'completed'>('all')
  const [selectedInspection, setSelectedInspection] = useState<VehicleInspection | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [inspections, setInspections] = useState<InspectionData[]>([])
  const [mockInspections] = useState(vehicleInspections)
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<InspectionData | VehicleInspection | null>(null)
  // Always show last 3 months of data
  
  useEffect(() => {
    // Load inspections from shared store
    const loadInspections = () => {
      const sharedInspections = sharedDataStore.getAllInspections()
      setInspections(sharedInspections)
    }
    
    loadInspections()
    
    // Poll for updates every 2 seconds
    const interval = setInterval(loadInspections, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Calculate total inspection fees
  const totalInspectionFees = mockInspections.filter(i => i.status === 'completed').length * 3000
  
  const getStatusBadge = (status: InspectionStatus | string) => {
    const badges = {
      'completed': 'bg-green-100 text-green-800',
      'processing': 'bg-blue-100 text-blue-800',
      'requested': 'bg-amber-100 text-amber-800',
      'not available': 'bg-gray-100 text-gray-800',
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }
  
  const getStatusLabel = (status: InspectionStatus | string) => {
    const labels: Record<string, string> = {
      'completed': 'Completed',
      'processing': 'Processing',
      'requested': 'Requested',
      'not available': 'Not Available'
    }
    return labels[status] || status
  }

  // Helper function to check if date is within last 3 months
  const isWithinLast3Months = (dateString: string | Date) => {
    const date = new Date(dateString)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    return date >= threeMonthsAgo
  }

  let filteredMockInspections = filterStatus === 'all' 
    ? mockInspections 
    : mockInspections.filter(i => i.status === filterStatus)
  
  // Apply date filter - always show last 3 months
  filteredMockInspections = filteredMockInspections.filter(i => 
    isWithinLast3Months(i.inspectionDate)
  )
    
  let filteredSharedInspections = filterStatus === 'all'
    ? inspections
    : inspections.filter(i => i.status === filterStatus)
  
  // Apply date filter - always show last 3 months
  filteredSharedInspections = filteredSharedInspections.filter(i => 
    isWithinLast3Months(i.requestedAt)
  )

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      console.log('Files dropped:', files)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Inspections</h1>
              <p className="text-sm text-gray-500 mt-1">
                Professional inspection service - ¥3,000 per vehicle
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                <p className="text-xs text-amber-600">Pending Fees</p>
                <p className="text-lg font-bold text-amber-900">¥{totalInspectionFees.toLocaleString()}</p>
                <p className="text-xs text-amber-600">Auto-added to invoice</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <p className="text-xs text-blue-700 font-medium">
                  Request from vehicle page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Inspections Card */}
          <StatCard
            title="Total Inspections"
            value={(mockInspections.length + inspections.length).toString()}
            subtitle="All time"
            className="min-h-[140px]"
          />

          {/* Completed Card */}
          <StatCard
            title="Completed"
            value={(mockInspections.filter(i => i.status === 'completed').length + inspections.filter(i => i.status === 'completed').length).toString()}
            subtitle="Ready to view"
            className="min-h-[140px]"
          />

          {/* In Progress Card */}
          <StatCard
            title="In Progress"
            value={(mockInspections.filter(i => i.status === 'processing').length + inspections.filter(i => i.status === 'processing').length).toString()}
            subtitle="Being processed"
            className="min-h-[140px]"
          />

          {/* Pending Card */}
          <StatCard
            title="Pending"
            value={(mockInspections.filter(i => i.status === 'requested').length + inspections.filter(i => i.status === 'requested').length).toString()}
            subtitle="Awaiting action"
            className="min-h-[140px]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 inline-flex mb-6">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({mockInspections.length + inspections.length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'completed' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed ({mockInspections.filter(i => i.status === 'completed').length + inspections.filter(i => i.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'processing' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Processing ({mockInspections.filter(i => i.status === 'processing').length + inspections.filter(i => i.status === 'processing').length})
          </button>
          <button
            onClick={() => setFilterStatus('requested')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'requested' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Requested ({mockInspections.filter(i => i.status === 'requested').length + inspections.filter(i => i.status === 'requested').length})
          </button>
        </div>

        {/* Date Range Notice */}
        <div className="mt-4 mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              This page displays your inspection reports from the last 3 months. For older reports, please contact support.
            </p>
          </div>
        </div>

        {/* Inspections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Show shared inspections from customers */}
          {filteredSharedInspections.map((inspection) => (
            <div key={inspection.vehicleId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Vehicle ID: {inspection.vehicleId}</h3>
                      <p className="text-sm text-gray-600">Requested by: {inspection.requestedBy}</p>
                      <p className="text-sm text-gray-500">Request Date: {inspection.requestedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                    {getStatusLabel(inspection.status)}
                  </span>
                </div>
                
                {inspection.completedAt && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Completed:</span> {inspection.completedAt.toLocaleString()}
                    </p>
                    {inspection.report && (
                      <p className="text-sm text-gray-600 mt-2">{inspection.report}</p>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/dashboard/vehicle/${inspection.vehicleId}`}
                    className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium"
                  >
                    View Vehicle
                  </Link>
                  {inspection.status === 'completed' && (
                    <button 
                      onClick={() => {
                        setSelectedReport(inspection)
                        setShowReportModal(true)
                      }}
                      className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg text-sm hover:bg-[#FA7921]/90 transition-colors font-medium">
                      View Report
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show mock inspections */}
          {filteredMockInspections.map((inspection) => (
            <div key={inspection.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={inspection.vehicleImage}
                      alt={inspection.vehicleName}
                      className="w-24 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{inspection.vehicleName}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {inspection.auctionHouse} • Lot #{inspection.lotNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Inspection: {inspection.inspectionDate}
                      </p>
                      {inspection.inspector && (
                        <p className="text-sm text-gray-600">
                          Inspector: {inspection.inspector}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                      {inspection.status === 'completed' ? 'Completed' : 
                       inspection.status === 'processing' ? 'Processing' : 'Requested'}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-2">¥{inspection.fee.toLocaleString()}</p>
                  </div>
                </div>

                {inspection.remarks && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Inspector Remarks:</span> {inspection.remarks}
                    </p>
                  </div>
                )}

                {inspection.status === 'completed' && (
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {inspection.photos.length} photos
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {inspection.videos.length} videos
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  {inspection.status === 'completed' && (
                    <button
                      onClick={() => {
                        setSelectedReport(inspection)
                        setShowReportModal(true)
                      }}
                      className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium"
                    >
                      View Report
                    </button>
                  )}
                  <Link
                    href={inspection.auctionUrl}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-center"
                  >
                    Go to Vehicle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(filteredMockInspections.length === 0 && filteredSharedInspections.length === 0) && (
          <div className="mt-8 text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No inspections found with the selected filter</p>
          </div>
        )}
      </div>

      {/* Inspection Media Viewer Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">Vehicle Inspection</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Auction House:</span> {'auctionHouse' in selectedReport ? selectedReport.auctionHouse : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Lot #:</span> {'lotNumber' in selectedReport ? selectedReport.lotNumber : selectedReport.vehicleId}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {
                        'inspectionDate' in selectedReport 
                          ? selectedReport.inspectionDate 
                          : 'completedAt' in selectedReport && selectedReport.completedAt
                          ? new Date(selectedReport.completedAt).toLocaleDateString()
                          : new Date().toLocaleDateString()
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={`/dashboard/vehicle/${selectedReport.vehicleId}`}
                    className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Place Bid
                  </a>
                  <button 
                    onClick={() => {
                      setShowReportModal(false)
                      setSelectedReport(null)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Photos Grid */}
              {'photos' in selectedReport && selectedReport.photos && selectedReport.photos.length > 0 ? (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Photos ({selectedReport.photos.length})</h3>
                    <button 
                      className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium flex items-center gap-1"
                      onClick={() => {
                        // Download all photos
                        selectedReport.photos.forEach((photo, index) => {
                          const link = document.createElement('a')
                          link.href = photo
                          link.download = `inspection-photo-${index + 1}.jpg`
                          link.click()
                        })
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Download All Photos
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedReport.photos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group relative">
                        <img
                          src={photo}
                          alt={`Inspection photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => window.open(photo, '_blank')}
                            className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                            title="View Full Size"
                          >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <a
                            href={photo}
                            download={`inspection-photo-${index + 1}.jpg`}
                            className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                            title="Download"
                          >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No photos available yet</p>
                </div>
              )}

              {/* Videos Grid */}
              {'videos' in selectedReport && selectedReport.videos && selectedReport.videos.length > 0 ? (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Videos ({selectedReport.videos.length})</h3>
                    <button 
                      className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium flex items-center gap-1"
                      onClick={() => {
                        // Download all videos
                        selectedReport.videos.forEach((video, index) => {
                          const link = document.createElement('a')
                          link.href = video
                          link.download = `inspection-video-${index + 1}.mp4`
                          link.click()
                        })
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Download All Videos
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.videos.map((video, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                          <video
                            src={video}
                            controls
                            className="w-full h-full"
                            poster=""
                          />
                        </div>
                        <a
                          href={video}
                          download={`inspection-video-${index + 1}.mp4`}
                          className="absolute top-2 right-2 p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                          title="Download Video"
                        >
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No videos available yet</p>
                </div>
              )}

              {/* Remarks Section */}
              {('remarks' in selectedReport && selectedReport.remarks) || ('report' in selectedReport && selectedReport.report) ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Inspector Remarks</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">
                      {'remarks' in selectedReport && selectedReport.remarks 
                        ? selectedReport.remarks
                        : 'report' in selectedReport && selectedReport.report
                        ? selectedReport.report
                        : 'No remarks provided'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-blue-700">No remarks from inspector</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Inspection completed on {
                    'completedAt' in selectedReport && selectedReport.completedAt
                      ? new Date(selectedReport.completedAt).toLocaleDateString()
                      : 'inspectionDate' in selectedReport
                      ? selectedReport.inspectionDate
                      : new Date().toLocaleDateString()
                  }
                </div>
                <button 
                  className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium flex items-center gap-2"
                  onClick={() => {
                    // Download all media as a zip (in production)
                    alert('Downloading all inspection media as a ZIP file...')
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Download All Media (ZIP)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Viewer Modal */}
      {selectedInspection && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Inspection Media - {selectedInspection.vehicleName}
                </h3>
                <button
                  onClick={() => setSelectedInspection(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Photos ({selectedInspection.photos.length})</h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedInspection.photos.map((photo, index) => (
                    <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={photo}
                        alt={`Inspection photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedInspection.videos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Videos ({selectedInspection.videos.length})</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedInspection.videos.map((video, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <video
                          src={video}
                          controls
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal removed - functionality moved to vehicle pages */}
      {false && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Upload Inspection Media</h3>
              <button
                onClick={() => {}}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive ? 'border-[#FA7921] bg-[#FA7921]/5' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
              <p className="text-sm text-gray-500">Supports: Images, Videos, ZIP files</p>
              <p className="text-xs text-gray-400 mt-2">ZIP files will be automatically extracted</p>
              
              <input
                type="file"
                multiple
                accept="image/*,video/*,.zip"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block mt-4 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors cursor-pointer"
              >
                Select Files
              </label>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 font-medium">Quick Upload Tips:</p>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• Drag and drop ZIP files for automatic extraction</li>
                <li>• Upload multiple photos/videos at once</li>
                <li>• Supported formats: JPG, PNG, MP4, MOV, ZIP</li>
                <li>• Maximum file size: 500MB per file</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}