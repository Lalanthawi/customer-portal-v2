'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// TypeScript interfaces
interface AuctionCar {
  id: string
  chassisNumber: string
  make: string
  model: string
  year: number
  mileage: number
  transmission: string
  displacement: number
  color: string
  scores: {
    interior: number
    exterior: number
    overall: number
  }
  pricing: {
    startPrice: number
    currentBid: number
    averagePrice: number
  }
  auction: {
    deadline: Date
    location: string
    result: string
    lotNumber: string
  }
  images: string[]
  equipment: string[]
  condition: string
  fuel: string
  drive: string
  doors: number
  seats: number
  bodyType: string
  engineNumber: string
  registrationDate: string
  inspectionDate: string
  additionalData: {
    cooling: string
    appraisalPoint: string
    shift: string
    openingDay: string
    notes: string[]
  }
}

interface BidData {
  amount: number
  message: string
  timestamp: Date
  userId: string
  userName: string
}

export default function VehiclePage() {
  const params = useParams()
  const router = useRouter()
  
  // State management
  const [selectedImage, setSelectedImage] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [bidMessage, setBidMessage] = useState('')
  const [isSubmittingBid, setIsSubmittingBid] = useState(false)
  const [bidHistory, setBidHistory] = useState<BidData[]>([])
  const [timeRemaining, setTimeRemaining] = useState('')
  const [favoritesList, setFavoritesList] = useState<string[]>([])
  const [showContactModal, setShowContactModal] = useState(false)
  
  // Mock data - In production, this would come from an API
  const vehicleData: AuctionCar = {
    id: params['id'] as string,
    chassisNumber: 'NZE161-3153697',
    make: 'Toyota',
    model: 'Corolla Axio',
    year: 2018,
    mileage: 42360,
    transmission: 'Automatic',
    displacement: 1500,
    color: 'Pearl White',
    scores: {
      interior: 4.5,
      exterior: 4.0,
      overall: 4.5
    },
    pricing: {
      startPrice: 5200000,
      currentBid: 343000,
      averagePrice: 7260000
    },
    auction: {
      deadline: new Date(Date.now() + 3600000 * 24 * 2), // 2 days from now
      location: 'Tokyo',
      result: 'Active',
      lotNumber: 'LOT-2024-0892'
    },
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80', // Front view
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop', // Front angle view
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1000&q=80', // Different width for variety
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1400&q=80', // Side view
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=90', // Rear view - higher quality
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80', // Interior view
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1600&q=80', // Wide shot
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=75' // Detail shot
    ],
    equipment: ['ABS', 'Air Conditioning', 'Power Steering', 'Power Windows', 'Airbags', 'Keyless Entry', 'Navigation System', 'Backup Camera'],
    condition: 'Excellent - Minor wear consistent with age',
    fuel: 'Gasoline',
    drive: 'FWD',
    doors: 4,
    seats: 5,
    bodyType: 'Sedan',
    engineNumber: '1NZ-FE-7896543',
    registrationDate: '2018-03-15',
    inspectionDate: '2024-03-15',
    additionalData: {
      cooling: 'Air Conditioning',
      appraisalPoint: '4.5A',
      shift: 'CVT',
      openingDay: '2024-01-15 10:00',
      notes: [
        'One owner vehicle',
        'Full service history available',
        'Non-smoking vehicle',
        'Garage kept'
      ]
    }
  }

  // Mock bid history
  useEffect(() => {
    setBidHistory([
      { amount: 330000, message: 'Initial bid', timestamp: new Date(Date.now() - 3600000), userId: 'user1', userName: 'Tanaka San' },
      { amount: 335000, message: 'Competitive offer', timestamp: new Date(Date.now() - 1800000), userId: 'user2', userName: 'Suzuki San' },
      { amount: 343000, message: 'Current highest', timestamp: new Date(Date.now() - 900000), userId: 'user3', userName: 'Yamamoto San' }
    ])
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const deadline = vehicleData.auction.deadline.getTime()
      const distance = deadline - now

      if (distance < 0) {
        setTimeRemaining('Auction Ended')
        clearInterval(timer)
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [vehicleData.auction.deadline])

  // Format currency
  const formatJPY = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Handle bid submission
  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingBid(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newBid: BidData = {
      amount: parseInt(bidAmount.replace(/,/g, '')),
      message: bidMessage,
      timestamp: new Date(),
      userId: 'current-user',
      userName: 'Current User'
    }
    
    setBidHistory([...bidHistory, newBid])
    setBidAmount('')
    setBidMessage('')
    setIsSubmittingBid(false)
  }

  // Handle favorites
  const toggleFavorite = (list: string) => {
    setFavoritesList(prev => 
      prev.includes(list) 
        ? prev.filter(l => l !== list)
        : [...prev, list]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {vehicleData.year} {vehicleData.make} {vehicleData.model}
                </h1>
                <p className="text-sm text-gray-500">Lot #{vehicleData.auction.lotNumber} • Chassis: {vehicleData.chassisNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Share
              </button>
              <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors">
                Watch Auction
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Main Image Section */}
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800">
                {/* Top Bar with Actions */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                        {selectedImage + 1} / {vehicleData.images.length}
                      </span>
                      <span className="px-3 py-1 bg-[#FA7921]/20 backdrop-blur-sm text-[#FFB956] rounded-full text-sm font-medium">
                        HD Photos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setShowImageModal(true)}
                        className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026A9.001 9.001 0 1112 3c4.243 0 7.797 2.93 8.757 6.881M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Image Container */}
                <div className="relative h-[500px] flex items-center justify-center">
                  <Image
                    src={vehicleData.images[selectedImage] || '/images/car-placeholder.jpg'}
                    alt={`${vehicleData.make} ${vehicleData.model}`}
                    width={900}
                    height={500}
                    className="object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                    onClick={() => setShowImageModal(true)}
                    priority
                  />
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={() => setSelectedImage(prev => (prev - 1 + vehicleData.images.length) % vehicleData.images.length)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all hover:scale-110 group"
                  >
                    <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => (prev + 1) % vehicleData.images.length)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all hover:scale-110 group"
                  >
                    <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Category Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg text-xs font-medium">
                    Exterior
                  </span>
                  <span className="px-3 py-1 bg-green-600/80 backdrop-blur-sm text-white rounded-lg text-xs font-medium">
                    Verified
                  </span>
                </div>
              </div>

              {/* Thumbnail Grid with Scroll */}
              <div className="bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Vehicle Photos</h3>
                  <button 
                    onClick={() => setShowImageModal(true)}
                    className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    View Gallery
                  </button>
                </div>
                
                <div className="relative">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {vehicleData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                          selectedImage === index 
                            ? 'ring-2 ring-[#FA7921] ring-offset-2 scale-105' 
                            : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-[#FA7921]/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Scroll Indicators */}
                  {vehicleData.images.length > 7 && (
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                  )}
                </div>

                {/* Image Categories */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Exterior (4)
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Interior (2)
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Engine (1)
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Details (1)
                  </button>
                </div>
              </div>
            </div>

            <style jsx>{`
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Car Specifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Vehicle Specifications</h2>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Make & Model</p>
                  <p className="font-semibold text-gray-900">{vehicleData.make} {vehicleData.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold text-gray-900">{vehicleData.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-semibold text-gray-900">{vehicleData.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold text-gray-900">{vehicleData.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engine</p>
                  <p className="font-semibold text-gray-900">{vehicleData.displacement}cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-semibold text-gray-900">{vehicleData.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Body Type</p>
                  <p className="font-semibold text-gray-900">{vehicleData.bodyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Drive Type</p>
                  <p className="font-semibold text-gray-900">{vehicleData.drive}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel</p>
                  <p className="font-semibold text-gray-900">{vehicleData.fuel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doors/Seats</p>
                  <p className="font-semibold text-gray-900">{vehicleData.doors} doors / {vehicleData.seats} seats</p>
                </div>
              </div>

              {/* Condition Scores */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Condition Scores</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">{vehicleData.scores.interior}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Interior</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">{vehicleData.scores.exterior}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Exterior</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600">{vehicleData.scores.overall}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Overall</p>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicleData.equipment.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Data */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h2>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Chassis Number</p>
                  <p className="font-semibold text-gray-900">{vehicleData.chassisNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engine Number</p>
                  <p className="font-semibold text-gray-900">{vehicleData.engineNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-semibold text-gray-900">{vehicleData.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Inspection Valid Until</p>
                  <p className="font-semibold text-gray-900">{vehicleData.inspectionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cooling</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.cooling}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appraisal Point</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.appraisalPoint}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shift Type</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.shift}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Auction Opens</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.openingDay}</p>
                </div>
              </div>

              {/* Condition Notes */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Condition Notes</h3>
                <p className="text-gray-700 mb-3">{vehicleData.condition}</p>
                <ul className="space-y-2">
                  {vehicleData.additionalData.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Bidding and Actions */}
          <div className="space-y-6">
            {/* Auction Timer */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">Auction Ends In</span>
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold">{timeRemaining}</div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Location</span>
                  <span className="font-semibold">{vehicleData.auction.location}</span>
                </div>
              </div>
            </div>

            {/* Bidding Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Place Your Bid</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Start Price</p>
                  <p className="text-2xl font-bold text-gray-900">{formatJPY(vehicleData.pricing.startPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-2xl font-bold text-[#FA7921]">{formatJPY(vehicleData.pricing.currentBid)}</p>
                </div>
              </div>

              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bid Amount (JPY)
                  </label>
                  <input
                    type="text"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Add a message with your bid..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBid}
                  className="w-full py-3 bg-[#FA7921] text-white rounded-lg font-semibold hover:bg-[#FA7921]/90 transition-colors disabled:opacity-50"
                >
                  {isSubmittingBid ? 'Submitting...' : 'Place Bid'}
                </button>
              </form>

              <button className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Mail the Rate
              </button>
            </div>

            {/* Average Price */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Market Analysis</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Average Market Price</p>
                  <p className="text-2xl font-bold text-green-600">{formatJPY(vehicleData.pricing.averagePrice)}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Based on {Math.floor(Math.random() * 50) + 20} similar vehicles sold in the last 30 days
                  </p>
                  <Link 
                    href={`/dashboard/statistics?make=${vehicleData.make}&model=${vehicleData.model}&year=${vehicleData.year}&type=${vehicleData.displacement}cc%20${vehicleData.transmission}`}
                    className="text-[#FA7921] hover:underline text-sm font-medium"
                  >
                    View Consolidated Statistics →
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact & Favorites */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact & Save</h2>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Inquiry
                </button>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    WhatsApp
                  </button>
                  <button className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                    WeChat
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Add to Favorites List</p>
                <div className="space-y-2">
                  {['A', 'B', 'C', 'D', 'E'].map((list) => (
                    <label key={list} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={favoritesList.includes(list)}
                        onChange={() => toggleFavorite(list)}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">List {list}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Bid History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bids</h2>
              
              <div className="space-y-3">
                {bidHistory.slice().reverse().map((bid, index) => (
                  <div key={index} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900">{formatJPY(bid.amount)}</p>
                      <p className="text-sm text-gray-500">{bid.userName}</p>
                      {bid.message && (
                        <p className="text-sm text-gray-600 mt-1">&ldquo;{bid.message}&rdquo;</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(bid.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-6xl w-full">
            <Image
              src={vehicleData.images[selectedImage] || '/images/car-placeholder.jpg'}
              alt={`${vehicleData.make} ${vehicleData.model}`}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowImageModal(false)
              }}
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send Inquiry</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#FA7921] text-white rounded-lg font-semibold hover:bg-[#FA7921]/90"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}