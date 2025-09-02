'use client'

import { useState } from 'react'

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

export default function TranslationsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  
  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  const filteredTranslations = filterStatus === 'all' 
    ? auctionSheetTranslations 
    : auctionSheetTranslations.filter(t => t.translationStatus === filterStatus)

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
                <p className="text-lg font-bold text-blue-900">{auctionSheetTranslations.length}</p>
              </div>
              <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium">
                Request Translation
              </button>
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
          {filteredTranslations.map((translation) => (
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
                    {translation.translationStatus === 'completed' ? 'Translated' : 
                     translation.translationStatus === 'in-progress' ? 'Translating' : 'Pending'}
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

        {filteredTranslations.length === 0 && (
          <div className="mt-8 text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No translations found with the selected filter</p>
          </div>
        )}
      </div>
    </div>
  )
}