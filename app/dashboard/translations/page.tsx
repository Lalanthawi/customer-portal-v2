'use client'

import { useState, useEffect } from 'react'
import { getRandomAuctionHouse, allAuctionHouses } from '@/src/data/auctionHouses'
import { sharedDataStore, TranslationData, TranslationStatus } from '../utils/sharedData'
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

// Mock Data
const auctionSheetTranslations: AuctionSheetTranslation[] = [
  {
    id: '1',
    vehicleId: 'TOY-CAM-2023',
    vehicleName: '2023 Toyota Camry Hybrid',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    auctionHouse: getRandomAuctionHouse(),
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
    auctionHouse: getRandomAuctionHouse(),
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
    auctionHouse: getRandomAuctionHouse(),
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
    auctionHouse: getRandomAuctionHouse(),
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
    auctionHouse: getRandomAuctionHouse(),
    lotNumber: '45612',
    auctionDate: '2024-01-29',
    sheetUrl: '/auction-sheets/original-005.pdf',
    translationStatus: 'in-progress',
    requestDate: '2024-01-27',
  }
]

export default function TranslationsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'not available' | 'requested' | 'translating' | 'translated'>('all')
  const [translations, setTranslations] = useState<TranslationData[]>([])
  const [mockTranslations, setMockTranslations] = useState(auctionSheetTranslations)
  
  useEffect(() => {
    // Load translations from shared store
    const loadTranslations = () => {
      const sharedTranslations = sharedDataStore.getAllTranslations()
      setTranslations(sharedTranslations)
    }
    
    loadTranslations()
    
    // Poll for updates every 2 seconds
    const interval = setInterval(loadTranslations, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  const getStatusBadge = (status: TranslationStatus | string) => {
    const badges = {
      'translated': 'bg-green-100 text-green-800',
      'translating': 'bg-blue-100 text-blue-800',
      'requested': 'bg-yellow-100 text-yellow-800',
      'not available': 'bg-gray-100 text-gray-800',
      // Legacy statuses for mock data
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }
  
  const getStatusLabel = (status: TranslationStatus | string) => {
    const labels: Record<string, string> = {
      'translated': 'Translated',
      'translating': 'Translating',
      'requested': 'Requested',
      'not available': 'Not Available',
      // Legacy statuses for mock data
      'completed': 'Translated',
      'in-progress': 'Translating',
      'pending': 'Requested'
    }
    return labels[status] || status
  }

  const filteredMockTranslations = filterStatus === 'all' 
    ? mockTranslations 
    : mockTranslations.filter(t => {
        const statusMap: Record<string, TranslationStatus> = {
          'completed': 'translated',
          'in-progress': 'translating',
          'pending': 'requested'
        }
        return statusMap[t.translationStatus] === filterStatus || t.translationStatus === filterStatus
      })
      
  const filteredSharedTranslations = filterStatus === 'all'
    ? translations
    : translations.filter(t => t.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Auction Sheet Translations</h1>
              <p className="text-sm text-gray-500 mt-1">
                Free translation service for all auction sheets
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <p className="text-xs text-blue-600">Total Translations</p>
                <p className="text-lg font-bold text-blue-900">{mockTranslations.length + translations.length}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <p className="text-xs text-amber-700 font-medium">
                  Request from vehicle page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 inline-flex">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({auctionSheetTranslations.length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'completed' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed ({auctionSheetTranslations.filter(t => t.translationStatus === 'completed').length})
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'in-progress' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            In Progress ({auctionSheetTranslations.filter(t => t.translationStatus === 'in-progress').length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'pending' 
                ? 'bg-[#FA7921] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending ({auctionSheetTranslations.filter(t => t.translationStatus === 'pending').length})
          </button>
        </div>

        {/* Translations List */}
        <div className="mt-6 space-y-4">
          {/* Show shared translations from customers */}
          {filteredSharedTranslations.map((translation) => (
            <div key={translation.vehicleId} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Vehicle ID: {translation.vehicleId}</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Requested by:</span> {translation.requestedBy}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Request Date:</span> {translation.requestedAt.toLocaleString()}
                      </p>
                      {translation.completedAt && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Completed:</span> {translation.completedAt.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(translation.status)}`}>
                    {getStatusLabel(translation.status)}
                  </span>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/vehicle/${translation.vehicleId}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium"
                    >
                      View Vehicle
                    </Link>
                    {translation.status === 'translated' ? (
                      <button
                        className="px-4 py-2 bg-[#FA7921] text-white rounded-lg text-sm hover:bg-[#FA7921]/90 transition-colors font-medium"
                      >
                        View Translation
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Translation {translation.status === 'translating' ? 'In Progress' : 'Pending'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Show mock translations */}
          {filteredMockTranslations.map((translation) => (
            <div key={translation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <img
                    src={translation.vehicleImage}
                    alt={translation.vehicleName}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{translation.vehicleName}</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Auction House:</span> {translation.auctionHouse}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Lot Number:</span> #{translation.lotNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Auction Date:</span> {translation.auctionDate}
                      </p>
                      {translation.notes && (
                        <p className="text-sm text-gray-700 bg-gray-50 rounded p-2 mt-2">
                          <span className="font-medium">Notes:</span> {translation.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(translation.translationStatus)}`}>
                    {getStatusLabel(translation.translationStatus)}
                  </span>
                  
                  <div className="text-right text-xs text-gray-500">
                    <p>Requested: {translation.requestDate}</p>
                    {translation.completionDate && (
                      <p>Completed: {translation.completionDate}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={translation.sheetUrl}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium"
                    >
                      View Original
                    </a>
                    {translation.translatedUrl ? (
                      <a
                        href={translation.translatedUrl}
                        className="px-4 py-2 bg-[#FA7921] text-white rounded-lg text-sm hover:bg-[#FA7921]/90 transition-colors font-medium"
                      >
                        View Translation
                      </a>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Translation Pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(filteredMockTranslations.length === 0 && filteredSharedTranslations.length === 0) && (
          <div className="mt-8 text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No translations found with the selected filter</p>
          </div>
        )}
      </div>

      {/* Request Translation Modal removed - functionality moved to vehicle pages */}
      {false && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Request Auction Sheet Translation</h2>
                <button 
                  onClick={() => {}}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Vehicle Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Name/Model
                </label>
                <input
                  type="text"
                  value={''}
                  onChange={() => {}}
                  placeholder="e.g., 2023 Toyota Camry Hybrid"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                />
              </div>

              {/* Auction House */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction House
                </label>
                <select
                  value={''}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
>
                  <option value="">Select Auction House</option>
                  {allAuctionHouses.map((house) => (
                    <option key={house} value={house}>{house}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Lot Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lot Number
                  </label>
                  <input
                    type="text"
                    value={''}
                    onChange={() => {}}
                    placeholder="e.g., 42315"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>

                {/* Auction Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auction Date
                  </label>
                  <input
                    type="date"
                    value={''}
                    onChange={() => {}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Auction Sheet Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Auction Sheet
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={''}
                  onChange={() => {}}
                  rows={3}
                  placeholder="Any specific areas of concern or details you need translated..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                />
              </div>

              {/* Service Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Free Translation Service</p>
                    <p className="text-blue-700 mt-1">
                      All auction sheet translations are provided free of charge. Our professional translators ensure accurate and detailed translations including grade, condition notes, and repair history.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button 
                onClick={() => {}}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Modal removed - functionality moved to vehicle pages
                }}
                className="px-6 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}