'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CarGroupBidding from '../../components/car-group-bidding/CarGroupBidding'

interface VehicleDetails {
  id: string
  name: string
  year: number
  manufacturer: string
  model: string
  variant: string
  price: number
  currentBid?: number
  bidsCount: number
  auctionEndsIn: string
  mileage: number
  transmission: string
  fuelType: string
  engineSize: string
  bodyType: string
  color: string
  driveType: string
  seats: number
  doors: number
  location: string
  lotNumber: string
  vin: string
  condition: string
  grade: string
  groupId?: string
  images: string[]
  description: string
  features: string[]
  specifications: {
    category: string
    items: { label: string; value: string }[]
  }[]
  inspectionScore?: number
  auctionHistory: {
    date: string
    bidder: string
    amount: number
  }[]
  documents: {
    name: string
    type: string
    available: boolean
  }[]
  seller: {
    name: string
    rating: number
    totalSales: number
    memberSince: string
    verified: boolean
  }
}

// Updated vehicle data with better images
const vehicleData: VehicleDetails = {
  id: '1',
  name: '2023 Toyota Camry Hybrid',
  year: 2023,
  manufacturer: 'Toyota',
  model: 'Camry',
  variant: 'Hybrid XLE',
  price: 3200000,
  currentBid: 3150000,
  bidsCount: 12,
  auctionEndsIn: '2d 14h 23m',
  mileage: 15000,
  transmission: 'Automatic',
  fuelType: 'Hybrid',
  engineSize: '2.5L',
  bodyType: 'Sedan',
  color: 'Pearl White',
  driveType: 'FWD',
  seats: 5,
  doors: 4,
  location: 'Tokyo, Japan',
  lotNumber: 'LOT-2024-0145',
  vin: 'JTDKN3DU0P3123456',
  condition: 'Excellent',
  grade: '4.5',
  groupId: 'B',
  images: [
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1619976215249-0b68c7683816?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1615186279746-6c30c8981428?w=1200&h=800&fit=crop'
  ],
  description: 'This 2023 Toyota Camry Hybrid XLE is in excellent condition with low mileage. Features include leather seats, sunroof, advanced safety systems, and premium audio. The vehicle has been well-maintained with complete service history available. Perfect for those seeking reliability, comfort, and fuel efficiency.',
  features: [
    'Leather Seats',
    'Sunroof',
    'Navigation System',
    'Backup Camera',
    'Blind Spot Monitor',
    'Lane Departure Warning',
    'Adaptive Cruise Control',
    'Premium Audio System',
    'Heated Seats',
    'Apple CarPlay',
    'Android Auto',
    'Wireless Charging'
  ],
  specifications: [
    {
      category: 'Engine & Performance',
      items: [
        { label: 'Engine Type', value: '2.5L 4-Cylinder' },
        { label: 'Horsepower', value: '208 HP' },
        { label: 'Torque', value: '163 lb-ft' },
        { label: 'Fuel Economy', value: '51 MPG City / 53 MPG Hwy' }
      ]
    },
    {
      category: 'Dimensions',
      items: [
        { label: 'Length', value: '4,885 mm' },
        { label: 'Width', value: '1,840 mm' },
        { label: 'Height', value: '1,445 mm' },
        { label: 'Wheelbase', value: '2,825 mm' }
      ]
    }
  ],
  inspectionScore: 92,
  auctionHistory: [
    { date: '2024-01-15 18:45', bidder: 'User****56', amount: 3150000 },
    { date: '2024-01-15 16:20', bidder: 'User****89', amount: 3000000 },
    { date: '2024-01-15 10:30', bidder: 'User****12', amount: 2950000 }
  ],
  documents: [
    { name: 'Auction Sheet', type: 'PDF', available: true },
    { name: 'Service History', type: 'PDF', available: true },
    { name: 'Registration Certificate', type: 'PDF', available: true },
    { name: 'Inspection Report', type: 'PDF', available: true },
    { name: 'Export Certificate', type: 'PDF', available: false }
  ],
  seller: {
    name: 'Tokyo Premium Motors',
    rating: 4.8,
    totalSales: 523,
    memberSince: '2018',
    verified: true
  }
}

export default function VehicleDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'history' | 'docs'>('overview')
  const [bidAmount, setBidAmount] = useState('')
  const [showBidModal, setShowBidModal] = useState(false)
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      {/* Modern Header with Title and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/dashboard" className="hover:text-[#FA7921]">Dashboard</Link>
              <span>/</span>
              <Link href="/dashboard/search" className="hover:text-[#FA7921]">Search</Link>
              <span>/</span>
              <span className="text-gray-900">{vehicleData.manufacturer} {vehicleData.model}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{vehicleData.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#FA7921]/10 text-[#FA7921] rounded-full text-sm font-medium">
                {vehicleData.bodyType}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {vehicleData.condition}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Grade {vehicleData.grade}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {vehicleData.location}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
            <button
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                isWatchlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-6">
          {/* Enhanced Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicleData.images[selectedImage]}
                alt={vehicleData.name}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setShowImageModal(true)}
                priority
              />
              
              {/* Image Navigation */}
              <button
                onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : vehicleData.images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage(prev => (prev < vehicleData.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-sm font-medium">
                  {vehicleData.lotNumber}
                </div>
                {vehicleData.inspectionScore && (
                  <div className="px-3 py-1 bg-green-600/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium">
                    ✓ Inspection {vehicleData.inspectionScore}%
                  </div>
                )}
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-sm">
                {selectedImage + 1} / {vehicleData.images.length}
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="p-4 bg-gray-50">
              <div className="flex gap-2 overflow-x-auto">
                {vehicleData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-[#FA7921] ring-offset-2' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={image} alt={`View ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mileage</p>
                  <p className="font-semibold text-gray-900">{vehicleData.mileage.toLocaleString()} km</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Transmission</p>
                  <p className="font-semibold text-gray-900">{vehicleData.transmission}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fuel Type</p>
                  <p className="font-semibold text-gray-900">{vehicleData.fuelType}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engine</p>
                  <p className="font-semibold text-gray-900">{vehicleData.engineSize}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <div className="flex gap-1 p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { id: 'specs', label: 'Specifications', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                  { id: 'history', label: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { id: 'docs', label: 'Documents', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'specs' | 'history' | 'docs')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#FA7921] text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Vehicle</h3>
                    <p className="text-gray-600 leading-relaxed">{vehicleData.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {vehicleData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', label: 'Request Inspection', color: 'blue' },
                        { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Calculate Shipping', color: 'green' },
                        { icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129', label: 'Request Translation', color: 'purple' },
                        { icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326', label: 'Financing Options', color: 'yellow' },
                        { icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Get Support', color: 'red' },
                        { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'Contact Seller', color: 'indigo' }
                      ].map((action, index) => (
                        <button
                          key={index}
                          className={`p-4 rounded-lg border transition-all hover:shadow-md hover:scale-105 flex flex-col items-center gap-2 ${
                            action.color === 'blue' ? 'bg-blue-50 border-blue-200 hover:border-blue-300 text-blue-700' :
                            action.color === 'green' ? 'bg-green-50 border-green-200 hover:border-green-300 text-green-700' :
                            action.color === 'purple' ? 'bg-purple-50 border-purple-200 hover:border-purple-300 text-purple-700' :
                            action.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300 text-yellow-700' :
                            action.color === 'red' ? 'bg-red-50 border-red-200 hover:border-red-300 text-red-700' :
                            'bg-indigo-50 border-indigo-200 hover:border-indigo-300 text-indigo-700'
                          }`}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                          </svg>
                          <span className="text-xs font-medium text-center">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-6">
                  {vehicleData.specifications.map((spec, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{spec.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {spec.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between py-2 px-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Bidding Activity</h3>
                  {vehicleData.auctionHistory.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-[#FA7921] text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{bid.bidder}</p>
                          <p className="text-sm text-gray-500">{bid.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">¥{bid.amount.toLocaleString()}</p>
                        {index === 0 && <span className="text-xs text-green-600 font-medium">Leading</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicleData.documents.map((doc, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      doc.available ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            doc.available ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <svg className={`w-5 h-5 ${doc.available ? 'text-green-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type}</p>
                          </div>
                        </div>
                        {doc.available && (
                          <button className="text-[#FA7921] hover:text-[#FA7921]/80">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enhanced Auction & Bidding Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Auction Timer Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Auction Ends In</span>
                </div>
                <span className="text-lg font-bold text-red-600">{vehicleData.auctionEndsIn}</span>
              </div>
            </div>

            {/* Group Bidding Badge */}
            {vehicleData.groupId && (
              <div className="bg-gradient-to-r from-[#FA7921] to-[#FF9A56] p-3 border-b border-[#FA7921]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{vehicleData.groupId}</span>
                    </div>
                    <div>
                      <p className="text-xs text-white/90 font-medium">Group Bidding Active</p>
                      <p className="text-[10px] text-white/70">Bid on multiple vehicles</p>
                    </div>
                  </div>
                  <Link 
                    href={`/dashboard/group-bidding?group=${vehicleData.groupId}`}
                    className="px-2 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded text-xs font-medium text-white transition-colors"
                  >
                    View Group
                  </Link>
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Current Bid */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-sm text-gray-600">Current Bid</p>
                  <span className="text-xs text-gray-500">{vehicleData.bidsCount} bidders</span>
                </div>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-[#FA7921]">¥{vehicleData.currentBid?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 pb-1">+¥10,000</p>
                </div>
              </div>

              {/* Buy Now */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Buy Now Price</p>
                    <p className="text-xl font-bold text-gray-900">¥{vehicleData.price.toLocaleString()}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowBidModal(true)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all font-medium"
                >
                  Place Bid
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2.5 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all font-medium text-sm">
                    Buy Now
                  </button>
                  <button
                    onClick={() => setIsWatchlisted(!isWatchlisted)}
                    className={`px-4 py-2.5 border rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 ${
                      isWatchlisted
                        ? 'border-red-500 text-red-500 hover:bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {isWatchlisted ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Group Bidding Details */}
          {vehicleData.groupId && (
            <div className="">
              <CarGroupBidding 
                carId={vehicleData.id} 
                groupId={vehicleData.groupId} 
              />
            </div>
          )}

        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-6xl w-full h-[80vh]">
            <Image
              src={vehicleData.images[selectedImage]}
              alt={vehicleData.name}
              fill
              className="object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowImageModal(false)
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Place Your Bid</h2>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">{vehicleData.name}</h3>
                <p className="text-sm text-gray-500">Lot: {vehicleData.lotNumber}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Current Bid</span>
                  <span className="font-medium text-gray-900">¥{vehicleData.currentBid?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Minimum Increment</span>
                  <span className="font-medium text-gray-900">¥10,000</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Bid Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">¥</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent placeholder:text-gray-400"
                    placeholder={(vehicleData.currentBid! + 10000).toString()}
                    min={vehicleData.currentBid! + 10000}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum bid: ¥{(vehicleData.currentBid! + 10000).toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm text-gray-600">
                    I agree to the auction terms and conditions. This bid is legally binding.
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBidModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all font-medium">
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}