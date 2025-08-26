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
  fee: number // Always 3000 JPY
  status: 'requested' | 'completed' | 'processing'
  auctionUrl: string // Link to bid page
}

interface PurchasedVehicle {
  id: string
  vehicleId: string
  vehicleName: string
  vehicleImage: string
  purchaseDate: string
  purchasePrice: number
  auctionHouse: string
  lotNumber: string
  documents: {
    type: 'invoice' | 'export-certificate' | 'deregistration' | 'auction-sheet' | 'inspection-report' | 'other'
    name: string
    uploadDate: string
    url: string
  }[]
  status: 'payment-pending' | 'preparing-shipment' | 'shipped' | 'delivered'
  inspectionFees: number // Total inspection fees for this vehicle
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
    ],
    videos: [
      '/inspections/cam-001/engine-start.mp4',
      '/inspections/cam-001/walkaround.mp4',
    ],
    remarks: 'Engine runs smooth, minor wear on driver seat, AC working perfectly',
    fee: 3000,
    status: 'completed',
    auctionUrl: '/dashboard/vehicle/TOY-CAM-2023'
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
    auctionUrl: '/dashboard/vehicle/HON-CRV-2022'
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
  }
]

const purchasedVehicles: PurchasedVehicle[] = [
  {
    id: '1',
    vehicleId: 'TOY-PRI-2023',
    vehicleName: '2023 Toyota Prius',
    vehicleImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    purchaseDate: '2024-01-15',
    purchasePrice: 3500000,
    auctionHouse: 'USS Tokyo',
    lotNumber: '31245',
    documents: [
      { type: 'invoice', name: 'Invoice #INV-2024-001', uploadDate: '2024-01-16', url: '/docs/invoice-001.pdf' },
      { type: 'auction-sheet', name: 'Auction Sheet (Translated)', uploadDate: '2024-01-16', url: '/docs/auction-001.pdf' },
      { type: 'export-certificate', name: 'Export Certificate', uploadDate: '2024-01-20', url: '/docs/export-001.pdf' },
      { type: 'inspection-report', name: 'Pre-purchase Inspection', uploadDate: '2024-01-14', url: '/docs/inspection-001.pdf' },
    ],
    status: 'preparing-shipment',
    inspectionFees: 3000
  },
  {
    id: '2',
    vehicleId: 'HON-ACC-2022',
    vehicleName: '2022 Honda Accord',
    vehicleImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    purchaseDate: '2024-01-10',
    purchasePrice: 2800000,
    auctionHouse: 'HAA Kobe',
    lotNumber: '67812',
    documents: [
      { type: 'invoice', name: 'Invoice #INV-2024-002', uploadDate: '2024-01-11', url: '/docs/invoice-002.pdf' },
      { type: 'auction-sheet', name: 'Auction Sheet (Translated)', uploadDate: '2024-01-11', url: '/docs/auction-002.pdf' },
      { type: 'deregistration', name: 'Deregistration Certificate', uploadDate: '2024-01-18', url: '/docs/dereg-002.pdf' },
      { type: 'export-certificate', name: 'Export Certificate', uploadDate: '2024-01-22', url: '/docs/export-002.pdf' },
    ],
    status: 'shipped',
    inspectionFees: 6000 // Had 2 inspections
  }
]

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'translations' | 'purchased'>('translations')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [, setSelectedInspection] = useState<VehicleInspection | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Calculate total inspection fees
  const totalInspectionFees = vehicleInspections.filter(i => i.status === 'completed').length * 3000

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
      // Handle file upload
      const files = Array.from(e.dataTransfer.files)
      console.log('Files dropped:', files)
      // Process files (including unzipping if needed)
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Documents Center</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage translations, inspections, and vehicle documents
              </p>
            </div>
            {/* Total Inspection Fees Display */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              <p className="text-xs text-amber-600">Pending Inspection Fees</p>
              <p className="text-lg font-bold text-amber-900">¥{totalInspectionFees.toLocaleString()}</p>
              <p className="text-xs text-amber-600">Auto-added to invoice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
                Translations & Inspections
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                  {auctionSheetTranslations.length + vehicleInspections.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('purchased')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'purchased'
                    ? 'border-[#FA7921] text-[#FA7921]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Purchased Cars
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                  {purchasedVehicles.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Translations & Inspections Tab */}
          {activeTab === 'translations' && (
            <div className="p-6">
              {/* Auction Sheet Translations Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Auction Sheet Translations</h3>
                <p className="text-sm text-gray-600 mb-4">Free translation service for auction sheets</p>
                
                <div className="space-y-4">
                  {auctionSheetTranslations.map((translation) => (
                    <div key={translation.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={translation.vehicleImage}
                          alt={translation.vehicleName}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{translation.vehicleName}</h4>
                          <p className="text-sm text-gray-600">
                            {translation.auctionHouse} • Lot #{translation.lotNumber} • {translation.auctionDate}
                          </p>
                          {translation.notes && (
                            <p className="text-xs text-gray-500 mt-1">{translation.notes}</p>
                          )}
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
                          {translation.translatedUrl && (
                            <a
                              href={translation.translatedUrl}
                              className="px-3 py-1 bg-[#FA7921] text-white rounded-lg text-sm hover:bg-[#FA7921]/90 transition-colors"
                            >
                              Translation
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle Inspections Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Vehicle Inspections</h3>
                    <p className="text-sm text-gray-600">¥3,000 per inspection (auto-charged on invoice)</p>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium"
                  >
                    Upload Inspection Media
                  </button>
                </div>
                
                <div className="space-y-4">
                  {vehicleInspections.map((inspection) => (
                    <div key={inspection.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <img
                            src={inspection.vehicleImage}
                            alt={inspection.vehicleName}
                            className="w-20 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{inspection.vehicleName}</h4>
                            <p className="text-sm text-gray-600">
                              {inspection.auctionHouse} • Lot #{inspection.lotNumber} • {inspection.inspectionDate}
                            </p>
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
            </div>
          )}

          {/* Purchased Cars Tab */}
          {activeTab === 'purchased' && (
            <div className="p-6">
              <div className="space-y-6">
                {purchasedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    {/* Vehicle Header */}
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={vehicle.vehicleImage}
                          alt={vehicle.vehicleName}
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{vehicle.vehicleName}</h3>
                          <p className="text-sm text-gray-600">
                            {vehicle.auctionHouse} • Lot #{vehicle.lotNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            Purchased: {vehicle.purchaseDate} • ¥{vehicle.purchasePrice.toLocaleString()}
                          </p>
                          {vehicle.inspectionFees > 0 && (
                            <p className="text-xs text-amber-600 mt-1">
                              Inspection fees: ¥{vehicle.inspectionFees.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          vehicle.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          vehicle.status === 'preparing-shipment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Link
                          href={`/dashboard/vehicle/${vehicle.vehicleId}`}
                          className="block mt-2 text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                        >
                          View Vehicle Details →
                        </Link>
                      </div>
                    </div>
                    
                    {/* Documents List */}
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {vehicle.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={doc.url}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.uploadDate}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
            
            {/* Drop Zone */}
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
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}