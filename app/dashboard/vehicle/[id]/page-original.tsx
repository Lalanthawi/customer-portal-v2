'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { sharedDataStore } from '../../utils/sharedData'

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
    grade: string
    holdingFrequency: string
    colorSubstitution: string
    holdingHall: string
    yearH: string
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
  const [activeTab, setActiveTab] = useState<'details' | 'production'>('details')
  
  // Date of Production states
  const [selectedCompany, setSelectedCompany] = useState('Mitsubishi')
  const [chassisInput, setChassisInput] = useState('CT9A-0000001')
  
  // Inspection and Translation states
  const [inspectionStatus, setInspectionStatus] = useState<'not available' | 'requested' | 'processing' | 'completed'>('not available')
  const [inspectionData, setInspectionData] = useState<{ report?: string; date?: Date; sharedBy?: string } | null>(null)
  const [translationStatus, setTranslationStatus] = useState<'not available' | 'requested' | 'translating' | 'translated'>('not available')
  const [translationData, setTranslationData] = useState<{ translation?: string; original?: string; sharedBy?: string } | null>(null)
  const [showInspectionModal, setShowInspectionModal] = useState(false)
  const [showTranslationModal, setShowTranslationModal] = useState(false)
  
  // Mock data - In production, this would come from an API
  const vehicleData: AuctionCar = {
    id: params['id'] as string,
    chassisNumber: 'NZE161-3153697',
    make: 'Toyota',
    model: 'Corolla Axio',
    year: 2018,
    mileage: 122000,
    transmission: 'Automatic',
    displacement: 2000,
    color: 'Pearl',
    scores: {
      interior: 4.5,
      exterior: 4.0,
      overall: 4.5
    },
    pricing: {
      startPrice: 3000000,
      currentBid: 343000,
      averagePrice: 7260000
    },
    auction: {
      deadline: new Date('2025-09-06T13:10:00'),
      location: 'JU Gifu [ Gifu prefecture Hashima city ]',
      result: 'not yet auction',
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
    equipment: ['P/S', 'P/W', 'ABS', 'leather', 'airbag'],
    condition: 'bidding is possible',
    fuel: 'GS',
    drive: '4WD',
    doors: 4,
    seats: 5,
    bodyType: 'Sedan',
    engineNumber: '1NZ-FE-7896543',
    registrationDate: '2019-03-15',
    inspectionDate: '2024-03-15',
    additionalData: {
      cooling: 'AAC',
      appraisalPoint: '4',
      shift: 'F6',
      openingDay: '2025-09-06 14:10',
      grade: '4WD Evolution 9 MR GSR',
      holdingFrequency: '2010',
      colorSubstitution: 'equipped',
      holdingHall: 'JU Gifu [ Gifu prefecture Hashima city ]',
      yearH: 'H19 year',
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
  
  // Initialize chassis input with vehicle data
  useEffect(() => {
    if (vehicleData && vehicleData.chassisNumber) {
      const chassisParts = vehicleData.chassisNumber.split('-')
      setChassisInput(`CT9A-${chassisParts[1] || chassisParts[0] || '0000001'}`)
    }
  }, [])
  
  // Check if inspection/translation already exists and subscribe to updates
  useEffect(() => {
    const vehicleId = params['id'] as string
    
    // Check existing data
    const existingInspection = sharedDataStore.getInspection(vehicleId)
    const existingTranslation = sharedDataStore.getTranslation(vehicleId)
    
    if (existingInspection) {
      setInspectionStatus(existingInspection.status)
      setInspectionData({
        report: existingInspection.report || 'Inspection in progress',
        date: existingInspection.completedAt || existingInspection.requestedAt,
        sharedBy: existingInspection.requestedBy
      })
    }
    
    if (existingTranslation) {
      setTranslationStatus(existingTranslation.status)
      setTranslationData({
        translation: existingTranslation.translation || 'Translation in progress',
        original: existingTranslation.originalSheet || '',
        sharedBy: existingTranslation.requestedBy
      })
    }
    
    // Subscribe to updates
    const unsubscribe = sharedDataStore.subscribe(vehicleId, (type, data) => {
      if (type === 'inspection' && 'report' in data) {
        // Map InspectionStatus to the component's expected status type
        const statusMap: Record<string, 'not available' | 'requested' | 'processing' | 'completed'> = {
          'not available': 'not available',
          'requested': 'requested',
          'processing': 'processing',
          'completed': 'completed'
        }
        setInspectionStatus(statusMap[data.status] || 'not available')
        setInspectionData({
          report: data.report || 'Inspection in progress',
          date: data.completedAt || data.requestedAt,
          sharedBy: data.requestedBy
        })
      } else if (type === 'translation' && 'translation' in data) {
        // Map TranslationStatus to the component's expected status type
        const statusMap: Record<string, 'not available' | 'requested' | 'translating' | 'translated'> = {
          'not available': 'not available',
          'requested': 'requested',
          'translating': 'translating',
          'translated': 'translated'
        }
        setTranslationStatus(statusMap[data.status] || 'not available')
        setTranslationData({
          translation: data.translation || 'Translation in progress',
          original: data.originalSheet || '',
          sharedBy: data.requestedBy
        })
      }
    })
    
    return () => unsubscribe()
  }, [params])
  
  // Handlers for inspection and translation requests
  const handleRequestInspection = () => {
    const vehicleId = params['id'] as string
    setShowInspectionModal(false)
    
    // Check if already exists
    const existing = sharedDataStore.getInspection(vehicleId)
    if (existing && (existing.status === 'completed' || existing.status === 'processing')) {
      // Already available, just update local state
      setInspectionStatus(existing.status)
      setInspectionData({
        report: existing.report || 'Inspection in progress',
        date: existing.completedAt || existing.requestedAt,
        sharedBy: existing.requestedBy
      })
    } else {
      // Request new inspection
      const newInspection = sharedDataStore.requestInspection(vehicleId, 'Current User')
      setInspectionStatus(newInspection.status)
    }
  }
  
  const handleRequestTranslation = () => {
    const vehicleId = params['id'] as string
    setShowTranslationModal(false)
    
    // Check if already exists
    const existing = sharedDataStore.getTranslation(vehicleId)
    if (existing && (existing.status === 'translated' || existing.status === 'translating')) {
      // Already available, just update local state
      setTranslationStatus(existing.status)
      setTranslationData({
        translation: existing.translation || 'Translation in progress',
        original: existing.originalSheet || '',
        sharedBy: existing.requestedBy
      })
    } else {
      // Request new translation
      const newTranslation = sharedDataStore.requestTranslation(vehicleId, 'Current User')
      setTranslationStatus(newTranslation.status)
    }
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

            {/* Tabbed Interface */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tab Headers */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-[#FA7921] text-[#FA7921]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Vehicle Details
                  </button>
                  <button
                    onClick={() => setActiveTab('production')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'production'
                        ? 'border-[#FA7921] text-[#FA7921]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Date of Production
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {/* Vehicle Details Tab */}
                {activeTab === 'details' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Vehicle Details</h2>
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
                        <p className="text-sm text-gray-500">Model Year</p>
                        <p className="font-semibold text-gray-900">{vehicleData.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Body Type</p>
                        <p className="font-semibold text-gray-900">{vehicleData.bodyType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Doors</p>
                        <p className="font-semibold text-gray-900">{vehicleData.doors} Doors</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Seats</p>
                        <p className="font-semibold text-gray-900">{vehicleData.seats} Seats</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Date of Production Tab */}
                {activeTab === 'production' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Date of Production</h2>
                    
                    <div className="space-y-6">
                      {/* Company Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Manufacturer
                        </label>
                        <select
                          value={selectedCompany}
                          onChange={(e) => setSelectedCompany(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        >
                          <option value="Mitsubishi">Mitsubishi</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Nissan">Nissan</option>
                          <option value="Honda">Honda</option>
                          <option value="Mazda">Mazda</option>
                          <option value="Subaru">Subaru</option>
                          <option value="Suzuki">Suzuki</option>
                          <option value="Daihatsu">Daihatsu</option>
                          <option value="Lexus">Lexus</option>
                          <option value="Infiniti">Infiniti</option>
                          <option value="Acura">Acura</option>
                        </select>
                      </div>
                      
                      {/* Chassis Number Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chassis Number
                        </label>
                        <input
                          type="text"
                          value={chassisInput}
                          onChange={(e) => setChassisInput(e.target.value)}
                          placeholder="CT9A-0000001"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter the chassis number starting with CT9A- prefix
                        </p>
                      </div>
                      
                      {/* Check Production Date Button */}
                      <div className="flex items-center gap-4">
                        <button
                          className="px-6 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                          onClick={() => {
                            // Simulate production date check
                            alert(`Checking production date for ${selectedCompany} - ${chassisInput}`)
                          }}
                        >
                          Check Production Date
                        </button>
                        
                        <button
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          onClick={() => {
                            const chassisParts = vehicleData.chassisNumber.split('-')
                            setChassisInput(`CT9A-${chassisParts[1] || chassisParts[0] || '0000001'}`)
                          }}
                        >
                          Reset
                        </button>
                      </div>
                      
                      {/* Production Date Result (example) */}
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-blue-900 mb-2">Production Information</h3>
                        <div className="space-y-1 text-sm text-blue-800">
                          <p><span className="font-medium">Production Date:</span> March 15, 2019</p>
                          <p><span className="font-medium">Factory:</span> Okazaki Plant, Aichi</p>
                          <p><span className="font-medium">Model Code:</span> Evolution IX MR</p>
                          <p><span className="font-medium">Production Number:</span> #1,247 of 2,500</p>
                        </div>
                      </div>
                      
                      {/* Additional Production Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Assembly Line</p>
                          <p className="font-semibold text-gray-900">Line A-3</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Quality Check</p>
                          <p className="font-semibold text-gray-900">Passed (A Grade)</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Original Destination</p>
                          <p className="font-semibold text-gray-900">Domestic (JDM)</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Special Edition</p>
                          <p className="font-semibold text-gray-900">Final Edition</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Additional Information - Separate Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h2>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Cooling</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.cooling}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel</p>
                  <p className="font-semibold text-gray-900">{vehicleData.fuel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Holding Frequency</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.holdingFrequency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bidding Deadline</p>
                  <p className="font-semibold text-gray-900">{vehicleData.auction.deadline.toLocaleString('ja-JP', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Displacement</p>
                  <p className="font-semibold text-gray-900">{vehicleData.displacement.toLocaleString()}cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appraisal Point</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.appraisalPoint}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.yearH}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shift</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.shift}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-semibold text-gray-900">{(vehicleData.mileage / 1000).toFixed(0)} thousand km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Result</p>
                  <p className="font-semibold text-gray-900">{vehicleData.auction.result}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-semibold text-gray-900">{vehicleData.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color Substitution</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.colorSubstitution}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start</p>
                  <p className="font-semibold text-gray-900">{(vehicleData.pricing.startPrice / 10000).toFixed(1)} ten thousand jpy</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Holding Hall</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.holdingHall}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opening Day</p>
                  <p className="font-semibold text-gray-900">{vehicleData.additionalData.openingDay}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Equipment</p>
                  <p className="font-semibold text-gray-900">{vehicleData.equipment.join(' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-semibold text-gray-900">[ {vehicleData.condition} ]</p>
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

            {/* Inspection Section - Compact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Vehicle Inspection</h3>
                {inspectionStatus === 'not available' && (
                  <button
                    onClick={() => setShowInspectionModal(true)}
                    className="text-xs text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                  >
                    Request
                  </button>
                )}
              </div>

              {/* Status: Completed */}
              {inspectionStatus === 'completed' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-800">Completed</p>
                      {inspectionData?.sharedBy && inspectionData.sharedBy !== 'Current User' && (
                        <p className="text-xs text-green-600 mt-1">Free (shared by {inspectionData.sharedBy})</p>
                      )}
                      {inspectionData?.date && (
                        <p className="text-xs text-green-600">Completed: {new Date(inspectionData.date).toLocaleDateString()}</p>
                      )}
                    </div>
                    <button className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      View Report
                    </button>
                  </div>
                </div>
              )}

              {/* Status: Processing */}
              {inspectionStatus === 'processing' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-blue-700">Processing</p>
                      <p className="text-xs text-blue-600">Inspector is examining the vehicle</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status: Requested */}
              {inspectionStatus === 'requested' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-amber-700">Requested</p>
                      <p className="text-xs text-amber-600">Waiting for inspector (24-48h)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status: Not Available */}
              {inspectionStatus === 'not available' && (
                <div className="text-center py-2">
                  <p className="text-xs text-gray-500 mb-2">No inspection available</p>
                  <button
                    onClick={() => setShowInspectionModal(true)}
                    className="px-3 py-1.5 bg-[#FA7921] text-white rounded text-xs hover:bg-[#FA7921]/90 transition-colors"
                  >
                    Request Inspection
                  </button>
                </div>
              )}
            </div>

            {/* Translation Section - Compact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Sheet Translation</h3>
                {translationStatus === 'not available' && (
                  <button
                    onClick={() => setShowTranslationModal(true)}
                    className="text-xs text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                  >
                    Request
                  </button>
                )}
              </div>

              {/* Status: Translated */}
              {translationStatus === 'translated' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-800">Translated</p>
                      {translationData?.sharedBy && translationData.sharedBy !== 'Current User' && (
                        <p className="text-xs text-green-600 mt-1">Free (shared by {translationData.sharedBy})</p>
                      )}
                      <p className="text-xs text-green-600">Ready to view</p>
                    </div>
                    <button className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      View Translation
                    </button>
                  </div>
                </div>
              )}

              {/* Status: Translating */}
              {translationStatus === 'translating' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-blue-700">Translating</p>
                      <p className="text-xs text-blue-600">Processing auction sheet</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status: Requested */}
              {translationStatus === 'requested' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-amber-700">Requested</p>
                      <p className="text-xs text-amber-600">In queue (2-4 hours)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status: Not Available */}
              {translationStatus === 'not available' && (
                <div className="text-center py-2">
                  <p className="text-xs text-gray-500 mb-2">No translation available</p>
                  <button
                    onClick={() => setShowTranslationModal(true)}
                    className="px-3 py-1.5 bg-[#FA7921] text-white rounded text-xs hover:bg-[#FA7921]/90 transition-colors"
                  >
                    Request Translation
                  </button>
                </div>
              )}
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

      {/* Inspection Request Modal */}
      {showInspectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Vehicle Inspection</h3>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm font-medium text-amber-800">Inspection Fee: ¥3,000</p>
                <p className="text-xs text-amber-700 mt-1">Will be added to your final invoice if you win this auction</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Professional inspection includes:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Detailed condition assessment with high-resolution photos</li>
                  <li>Undercarriage and engine inspection</li>
                  <li>Paint thickness measurements</li>
                  <li>Accident history verification</li>
                  <li>Full mechanical inspection</li>
                </ul>
              </div>
              
              <div className="text-sm text-gray-500">
                Estimated completion: 24-48 hours before auction ends
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
                <p className="text-sm font-medium text-amber-800">Translation Fee: ¥1,500</p>
                <p className="text-xs text-amber-700 mt-1">Will be added to your final invoice if you win this auction</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Professional translation includes:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Complete auction grade explanation</li>
                  <li>All condition notes and remarks</li>
                  <li>Equipment and features list</li>
                  <li>Inspector comments and observations</li>
                  <li>Repair history if noted</li>
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