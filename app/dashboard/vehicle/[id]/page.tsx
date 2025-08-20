'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

// Demo vehicle data
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
  images: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1619976215249-0b68cef412e6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1615186279746-f448c7683816?w=800&h=600&fit=crop'
  ],
  description: 'This 2023 Toyota Camry Hybrid XLE is in excellent condition with low mileage. Features include leather seats, sunroof, advanced safety systems, and premium audio. The vehicle has been well-maintained with complete service history available. Perfect for those seeking reliability, comfort, and fuel efficiency.',
  features: [
    'Leather Seats',
    'Sunroof',
    'Navigation System',
    'Backup Camera',
    'Blind Spot Monitoring',
    'Adaptive Cruise Control',
    'Lane Departure Warning',
    'Apple CarPlay/Android Auto',
    'Heated Seats',
    'Keyless Entry',
    'Push Button Start',
    'Dual Zone Climate Control',
    'Premium Audio System',
    'Wireless Charging',
    'LED Headlights'
  ],
  specifications: [
    {
      category: 'Engine',
      items: [
        { label: 'Type', value: '4-Cylinder + Electric Motor' },
        { label: 'Displacement', value: '2487cc' },
        { label: 'Power', value: '208 hp' },
        { label: 'Torque', value: '221 Nm' },
        { label: 'Fuel System', value: 'Direct Injection' }
      ]
    },
    {
      category: 'Performance',
      items: [
        { label: 'Top Speed', value: '180 km/h' },
        { label: '0-100 km/h', value: '8.3 seconds' },
        { label: 'Fuel Economy', value: '4.2L/100km' },
        { label: 'CO2 Emissions', value: '97 g/km' }
      ]
    },
    {
      category: 'Dimensions',
      items: [
        { label: 'Length', value: '4,885 mm' },
        { label: 'Width', value: '1,840 mm' },
        { label: 'Height', value: '1,445 mm' },
        { label: 'Wheelbase', value: '2,825 mm' },
        { label: 'Weight', value: '1,595 kg' }
      ]
    }
  ],
  inspectionScore: 92,
  auctionHistory: [
    { date: '2024-01-16 14:30', bidder: 'User****45', amount: 3150000 },
    { date: '2024-01-16 13:15', bidder: 'User****23', amount: 3100000 },
    { date: '2024-01-16 11:45', bidder: 'User****67', amount: 3050000 },
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
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'history' | 'documents'>('overview')
  const [bidAmount, setBidAmount] = useState('')
  const [showBidModal, setShowBidModal] = useState(false)
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-[#FA7921] transition-colors">Dashboard</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/dashboard/search" className="hover:text-[#FA7921] transition-colors">Search</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">{vehicleData.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-[500px]">
              <Image
                src={vehicleData.images[selectedImage] || '/placeholder.svg'}
                alt={vehicleData.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white rounded-lg text-sm font-medium">
                {vehicleData.lotNumber}
              </div>
              {vehicleData.inspectionScore && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium">
                  Inspection: {vehicleData.inspectionScore}%
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {vehicleData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === index ? 'border-[#FA7921]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={image} alt={`View ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <div className="flex gap-8 px-6">
                {(['overview', 'specifications', 'history', 'documents'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-[#FA7921] text-[#FA7921]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Description</h3>
                    <p className="text-gray-600 leading-relaxed">{vehicleData.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {vehicleData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">VIN</span>
                        <span className="font-medium text-gray-900">{vehicleData.vin}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Condition</span>
                        <span className="font-medium text-gray-900">{vehicleData.condition}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Grade</span>
                        <span className="font-medium text-gray-900">{vehicleData.grade}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Location</span>
                        <span className="font-medium text-gray-900">{vehicleData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="space-y-6">
                  {vehicleData.specifications.map((spec, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{spec.category}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {spec.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Auction History</h3>
                  <div className="space-y-3">
                    {vehicleData.auctionHistory.map((bid, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-[#FA7921] text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            <span className="text-sm font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{bid.bidder}</p>
                            <p className="text-sm text-gray-500">{bid.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">¥{bid.amount.toLocaleString()}</p>
                          {index === 0 && (
                            <span className="text-xs text-green-600 font-medium">Current Highest</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicleData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            doc.available ? 'bg-green-100' : 'bg-gray-200'
                          }`}>
                            <svg className={`w-5 h-5 ${doc.available ? 'text-green-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type}</p>
                          </div>
                        </div>
                        {doc.available ? (
                          <button className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium">
                            Download
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400">Not Available</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Auction Info and Actions */}
        <div className="space-y-6">
          {/* Vehicle Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{vehicleData.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-[#FA7921]/10 text-[#FA7921] rounded text-xs font-medium">
                {vehicleData.bodyType}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                {vehicleData.year}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                {vehicleData.condition}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Mileage</span>
                <span className="font-medium text-gray-900">{vehicleData.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transmission</span>
                <span className="font-medium text-gray-900">{vehicleData.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fuel Type</span>
                <span className="font-medium text-gray-900">{vehicleData.fuelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Engine</span>
                <span className="font-medium text-gray-900">{vehicleData.engineSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Color</span>
                <span className="font-medium text-gray-900">{vehicleData.color}</span>
              </div>
            </div>
          </div>

          {/* Auction Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Current Bid</p>
              <p className="text-3xl font-bold text-[#FA7921]">¥{vehicleData.currentBid?.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{vehicleData.bidsCount} bids</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Buy Now Price</p>
              <p className="text-xl font-bold text-gray-900">¥{vehicleData.price.toLocaleString()}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Auction Ends In</p>
              <p className="text-lg font-semibold text-red-600">{vehicleData.auctionEndsIn}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowBidModal(true)}
                className="w-full px-4 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all font-medium"
              >
                Place Bid
              </button>
              <button className="w-full px-4 py-3 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all font-medium">
                Buy Now
              </button>
              <button
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={`w-full px-4 py-3 border rounded-lg transition-all font-medium flex items-center justify-center gap-2 ${
                  isWatchlisted
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#002233] text-white rounded-full flex items-center justify-center font-bold">
                {vehicleData.seller.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{vehicleData.seller.name}</h4>
                  {vehicleData.seller.verified && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(vehicleData.seller.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({vehicleData.seller.rating})</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{vehicleData.seller.totalSales} vehicles sold</p>
                  <p>Member since {vehicleData.seller.memberSince}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                View Profile
              </button>
              <button className="flex-1 px-3 py-2 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all text-sm font-medium">
                Contact Seller
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Request Inspection
              </button>
              <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Calculate Shipping
              </button>
              <button 
                onClick={() => {
                  // Navigate to documents page with translations tab
                  router.push('/dashboard/documents?tab=translations&vehicle=' + vehicleData.name)
                }}
                className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Request Translation
              </button>
              <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                </svg>
                Financing Options
              </button>
              <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </div>

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
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
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