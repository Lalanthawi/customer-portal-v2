'use client'

import { useState } from 'react'
import Link from 'next/link'

// Types
interface AuctionSheetTranslation {
  id: string
  vehicleId: string
  vehicleName: string
  vehicleImage: string
  auctionHouse: string
  lotNumber: string
  auctionDate: string
  sheetUrl: string
  translationStatus: 'pending' | 'completed' | 'in-progress'
  translatedUrl?: string
  requestDate: string
  completionDate?: string
  notes?: string
}

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
const auctionSheetTranslations: AuctionSheetTranslation[] = [
  {
    id: '1',
    vehicleId: 'TOY-CAM-2023',
    vehicleName: '2023 Toyota Camry Hybrid',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    auctionHouse: 'USS Tokyo',
    lotNumber: '42315',
    auctionDate: '2024-01-25',
    sheetUrl: '/auction-sheets/original-001.pdf',
    translationStatus: 'completed',
    translatedUrl: '/auction-sheets/translated-001.pdf',
    requestDate: '2024-01-20',
    completionDate: '2024-01-20',
    notes: 'Grade 4.5, minor scratches noted'
  },
  {
    id: '2',
    vehicleId: 'HON-CRV-2022',
    vehicleName: '2022 Honda CR-V',
    vehicleImage: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=400',
    auctionHouse: 'HAA Kobe',
    lotNumber: '78921',
    auctionDate: '2024-01-26',
    sheetUrl: '/auction-sheets/original-002.pdf',
    translationStatus: 'in-progress',
    requestDate: '2024-01-25',
  },
  {
    id: '3',
    vehicleId: 'MAZ-MX5-2021',
    vehicleName: '2021 Mazda MX-5',
    vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
    auctionHouse: 'TAA Yokohama',
    lotNumber: '15643',
    auctionDate: '2024-01-27',
    sheetUrl: '/auction-sheets/original-003.pdf',
    translationStatus: 'pending',
    requestDate: '2024-01-26',
  },
  {
    id: '4',
    vehicleId: 'SUB-WRX-2023',
    vehicleName: '2023 Subaru WRX STI',
    vehicleImage: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400',
    auctionHouse: 'USS Nagoya',
    lotNumber: '98234',
    auctionDate: '2024-01-28',
    sheetUrl: '/auction-sheets/original-004.pdf',
    translationStatus: 'completed',
    translatedUrl: '/auction-sheets/translated-004.pdf',
    requestDate: '2024-01-23',
    completionDate: '2024-01-23',
    notes: 'Grade 4B, aftermarket exhaust noted'
  },
  {
    id: '5',
    vehicleId: 'NIS-GTR-2022',
    vehicleName: '2022 Nissan GT-R',
    vehicleImage: 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=400',
    auctionHouse: 'HAA Kansai',
    lotNumber: '45612',
    auctionDate: '2024-01-29',
    sheetUrl: '/auction-sheets/original-005.pdf',
    translationStatus: 'in-progress',
    requestDate: '2024-01-27',
  }
]

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

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'translations' | 'inspections'>('translations')
  const [selectedInspection, setSelectedInspection] = useState<VehicleInspection | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Calculate total inspection fees
  const totalInspectionFees = vehicleInspections.filter(i => i.status === 'completed').length * 3000

  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'requested': 'bg-amber-100 text-amber-800',
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Documents Center</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage translations and vehicle inspections
              </p>
            </div>
            {activeTab === 'inspections' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                <p className="text-xs text-amber-600">Pending Inspection Fees</p>
                <p className="text-lg font-bold text-amber-900">¥{totalInspectionFees.toLocaleString()}</p>
                <p className="text-xs text-amber-600">Auto-added to invoice</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('translations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'translations'
                    ? 'border-[#FA7921] text-[#FA7921]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Translations
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                  {auctionSheetTranslations.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('inspections')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'inspections'
                    ? 'border-[#FA7921] text-[#FA7921]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Inspections
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                  {vehicleInspections.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Translations Tab */}
          {activeTab === 'translations' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Auction Sheet Translations</h3>
                  <p className="text-sm text-gray-600">Free translation service for auction sheets</p>
                </div>
                <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium">
                  Request Translation
                </button>
              </div>
              
              <div className="space-y-4">
                {auctionSheetTranslations.map((translation) => (
                  <div key={translation.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={translation.vehicleImage}
                          alt={translation.vehicleName}
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{translation.vehicleName}</h4>
                          <p className="text-sm text-gray-600">
                            {translation.auctionHouse} • Lot #{translation.lotNumber} • {translation.auctionDate}
                          </p>
                          {translation.notes && (
                            <p className="text-xs text-gray-500 mt-1">{translation.notes}</p>
                          )}
                          <div className="mt-2 text-xs text-gray-500">
                            <span>Requested: {translation.requestDate}</span>
                            {translation.completionDate && (
                              <span className="ml-3">Completed: {translation.completionDate}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(translation.translationStatus)}`}>
                          {translation.translationStatus === 'completed' ? 'Translated' : 
                           translation.translationStatus === 'in-progress' ? 'Translating' : 'Pending'}
                        </span>
                        
                        <div className="flex gap-2">
                          <a
                            href={translation.sheetUrl}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                          >
                            Original
                          </a>
                          {translation.translatedUrl ? (
                            <a
                              href={translation.translatedUrl}
                              className="px-3 py-1 bg-[#FA7921] text-white rounded-lg text-sm hover:bg-[#FA7921]/90 transition-colors"
                            >
                              Translation
                            </a>
                          ) : (
                            <button
                              disabled
                              className="px-3 py-1 bg-gray-200 text-gray-400 rounded-lg text-sm cursor-not-allowed"
                            >
                              Translation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inspections Tab */}
          {activeTab === 'inspections' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Vehicle Inspections</h3>
                  <p className="text-sm text-gray-600">¥3,000 per inspection (auto-charged on invoice)</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                >
                  Upload Inspection Media
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{vehicleInspections.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600">Completed</p>
                  <p className="text-2xl font-bold text-green-900">
                    {vehicleInspections.filter(i => i.status === 'completed').length}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600">Processing</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {vehicleInspections.filter(i => i.status === 'processing').length}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-sm text-amber-600">Requested</p>
                  <p className="text-2xl font-bold text-amber-900">
                    {vehicleInspections.filter(i => i.status === 'requested').length}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {vehicleInspections.map((inspection) => (
                  <div key={inspection.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <img
                          src={inspection.vehicleImage}
                          alt={inspection.vehicleName}
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{inspection.vehicleName}</h4>
                          <p className="text-sm text-gray-600">
                            {inspection.auctionHouse} • Lot #{inspection.lotNumber} • {inspection.inspectionDate}
                          </p>
                          {inspection.inspector && (
                            <p className="text-sm text-gray-600">Inspector: {inspection.inspector}</p>
                          )}
                          {inspection.remarks && (
                            <p className="text-sm text-gray-700 mt-2 bg-white rounded p-2">
                              <span className="font-medium">Remarks:</span> {inspection.remarks}
                            </p>
                          )}
                          
                          {inspection.status === 'completed' && (
                            <div className="mt-3 flex items-center gap-4">
                              <span className="text-sm text-gray-600">
                                {inspection.photos.length} photos, {inspection.videos.length} videos
                              </span>
                              <button
                                onClick={() => setSelectedInspection(inspection)}
                                className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                              >
                                View Media
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                          {inspection.status === 'completed' ? 'Completed' : 
                           inspection.status === 'processing' ? 'Processing' : 'Requested'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">¥{inspection.fee.toLocaleString()}</span>
                        <Link
                          href={inspection.auctionUrl}
                          className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                        >
                          Go to Vehicle →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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