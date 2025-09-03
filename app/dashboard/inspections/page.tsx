'use client'

import { useState } from 'react'
import Link from 'next/link'

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
    auctionHouse: 'USS Tokyo',
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
    auctionHouse: 'HAA Kobe',
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
    auctionHouse: 'JU Nagoya',
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
    auctionHouse: 'USS Yokohama',
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
    auctionHouse: 'CAA Tokyo',
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'requested' | 'processing' | 'completed'>('all')
  const [selectedInspection, setSelectedInspection] = useState<VehicleInspection | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  
  // Calculate total inspection fees
  const totalInspectionFees = vehicleInspections.filter(i => i.status === 'completed').length * 3000
  
  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': 'bg-green-100 text-green-800',
      'processing': 'bg-blue-100 text-blue-800',
      'requested': 'bg-amber-100 text-amber-800',
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  const filteredInspections = filterStatus === 'all' 
    ? vehicleInspections 
    : vehicleInspections.filter(i => i.status === filterStatus)

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
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
              >
                Upload Media
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Inspections</p>
            <p className="text-2xl font-bold text-gray-900">{vehicleInspections.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {vehicleInspections.filter(i => i.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">
              {vehicleInspections.filter(i => i.status === 'processing').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {vehicleInspections.filter(i => i.status === 'requested').length}
            </p>
          </div>
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
            All ({vehicleInspections.length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'completed' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed ({vehicleInspections.filter(i => i.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'processing' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Processing ({vehicleInspections.filter(i => i.status === 'processing').length})
          </button>
          <button
            onClick={() => setFilterStatus('requested')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'requested' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Requested ({vehicleInspections.filter(i => i.status === 'requested').length})
          </button>
        </div>

        {/* Inspections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInspections.map((inspection) => (
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {inspection.photos.length} photos
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {inspection.videos.length} videos
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  {inspection.status === 'completed' && (
                    <button
                      onClick={() => setSelectedInspection(inspection)}
                      className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium"
                    >
                      View Media
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

        {filteredInspections.length === 0 && (
          <div className="mt-8 text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No inspections found with the selected filter</p>
          </div>
        )}
      </div>

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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Upload Inspection Media</h3>
              <button
                onClick={() => setShowUploadModal(false)}
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