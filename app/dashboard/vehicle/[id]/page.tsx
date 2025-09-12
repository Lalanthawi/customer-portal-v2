'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { sharedDataStore } from '../../utils/sharedData'
import { ImageGalleryEnhanced } from '@/components/ui/image-gallery-enhanced'

// Shadcn UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

// Icons
import { 
  ArrowLeft, Clock, Check, Share2,
  Mail, AlertCircle, CheckCircle, Loader2,
  ExternalLink, Heart,
  ChevronDown, Plus
} from 'lucide-react'

// TypeScript interfaces (same as before)
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

export default function VehiclePageShadcn() {
  const params = useParams()
  const router = useRouter()
  
  // State management
  const [bidAmount, setBidAmount] = useState('')
  const [bidMessage, setBidMessage] = useState('')
  const [isSubmittingBid, setIsSubmittingBid] = useState(false)
  const [bidHistory, setBidHistory] = useState<BidData[]>([])
  const [timeRemaining, setTimeRemaining] = useState('')
  const [selectedLists, setSelectedLists] = useState<string[]>([])
  const [favoritesList] = useState([
    { id: 'all', name: 'All', count: 6, max: 100 },
    { id: 'A', name: 'List A', count: 3, max: 20 },
    { id: 'B', name: 'List B', count: 2, max: 20 },
    { id: 'C', name: 'List C', count: 1, max: 20 },
    { id: 'D', name: 'List D', count: 0, max: 20 },
    { id: 'E', name: 'List E', count: 0, max: 20 },
  ])
  const isInFavorites = selectedLists.length > 0
  
  // Tab state - only details tab now
  
  // Inspection and Translation states
  const [inspectionStatus, setInspectionStatus] = useState<'not available' | 'requested' | 'processing' | 'completed'>('not available')
  const [inspectionData, setInspectionData] = useState<{ report?: string; date?: Date; sharedBy?: string } | null>(null)
  const [translationStatus, setTranslationStatus] = useState<'not available' | 'requested' | 'translating' | 'translated'>('not available')
  const [translationData, setTranslationData] = useState<{ translation?: string; original?: string; sharedBy?: string } | null>(null)
  
  // Generate images array dynamically based on vehicle ID
  const vehicleImages = params['id'] === '4' || params['id'] === 'land-cruiser' 
    ? Array.from({ length: 12 }, (_, i) => `/images/singlecar/${i}.jpeg`)
    : [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1000&q=80'
    ]

  // Mock data - different data based on vehicle ID
  const isLandCruiser = params['id'] === '4' || params['id'] === 'land-cruiser'
  
  const vehicleData: AuctionCar = isLandCruiser ? {
    id: params['id'] as string,
    chassisNumber: 'GDJ250W-9876543',
    make: 'Toyota',
    model: 'Land Cruiser 250',
    year: 2024,
    mileage: 13000,
    transmission: 'FAT (Full Automatic)',
    displacement: 2800,
    color: 'Brown',
    scores: {
      interior: 5.0,
      exterior: 5.0,
      overall: 5.0
    },
    pricing: {
      startPrice: 5000000,
      currentBid: 5600000,
      averagePrice: 5800000
    },
    auction: {
      deadline: new Date('2025-09-10T14:00:00'),
      location: 'TAA Kinki [ Osaka ]',
      result: 'not yet auction',
      lotNumber: '2024-0892'
    },
    images: vehicleImages,
    equipment: [
      'Multi-Terrain Select',
      'Crawl Control',
      '360° Camera',
      'JBL Premium Audio',
      'Leather Seats',
      'Power Tailgate',
      'Adaptive Cruise Control',
      'Lane Keeping Assist',
      'Pre-Collision System',
      'Blind Spot Monitor',
      'Wireless Charging',
      'Apple CarPlay/Android Auto',
      'Heated & Ventilated Seats',
      'Panoramic Sunroof',
      '20-inch Alloy Wheels'
    ],
    condition: 'Excellent - Grade 5',
    fuel: 'Diesel',
    drive: '4WD',
    doors: 5,
    seats: 7,
    bodyType: 'SUV',
    engineNumber: '1GD-FTV-123456',
    registrationDate: '2024-06-15',
    inspectionDate: '2024-08-15',
    additionalData: {
      cooling: 'Auto Climate Control',
      appraisalPoint: '5',
      shift: 'FAT',
      openingDay: '2025-09-10 14:00',
      grade: 'VX',
      holdingFrequency: '2024',
      colorSubstitution: 'Original',
      holdingHall: 'TAA Kinki [ Osaka ]',
      yearH: '2024 year',
      notes: [
        'Premium VX Grade',
        'Full Toyota Warranty',
        'First Owner Vehicle',
        'All Service Records Available',
        'Non-Smoking Vehicle',
        'Garage Kept',
        'Premium Paint Protection',
        'Ceramic Coating Applied'
      ]
    }
  } : {
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
    images: vehicleImages,
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

  
  
  // Check if inspection/translation already exists and subscribe to updates
  useEffect(() => {
    const vehicleId = params['id'] as string
    
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
    const existing = sharedDataStore.getInspection(vehicleId)
    if (existing && (existing.status === 'completed' || existing.status === 'processing')) {
      setInspectionStatus(existing.status)
      setInspectionData({
        report: existing.report || 'Inspection in progress',
        date: existing.completedAt || existing.requestedAt,
        sharedBy: existing.requestedBy
      })
    } else {
      const newInspection = sharedDataStore.requestInspection(vehicleId, 'Current User')
      setInspectionStatus(newInspection.status)
    }
  }
  
  const handleRequestTranslation = () => {
    const vehicleId = params['id'] as string
    const existing = sharedDataStore.getTranslation(vehicleId)
    if (existing && (existing.status === 'translated' || existing.status === 'translating')) {
      setTranslationStatus(existing.status)
      setTranslationData({
        translation: existing.translation || 'Translation in progress',
        original: existing.originalSheet || '',
        sharedBy: existing.requestedBy
      })
    } else {
      const newTranslation = sharedDataStore.requestTranslation(vehicleId, 'Current User')
      setTranslationStatus(newTranslation.status)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button onClick={() => router.back()} variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {vehicleData.year} {vehicleData.make} {vehicleData.model}
                </h1>
                <p className="text-sm text-gray-500">Lot #{vehicleData.auction.lotNumber} • Chassis: {vehicleData.chassisNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Add to Favorites - Main button adds to All, dropdown for specific lists */}
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    if (selectedLists.includes('all')) {
                      // Remove from all lists
                      setSelectedLists([])
                      // Show notification
                      const notification = document.createElement('div')
                      notification.className = 'fixed top-20 right-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
                      notification.textContent = '✓ Removed from favorites'
                      document.body.appendChild(notification)
                      setTimeout(() => notification.remove(), 3000)
                    } else {
                      // Add to All list
                      setSelectedLists(['all'])
                      // Show notification
                      const notification = document.createElement('div')
                      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
                      notification.textContent = '✓ Added to All favorites list'
                      document.body.appendChild(notification)
                      setTimeout(() => notification.remove(), 3000)
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 font-medium shadow-sm rounded-l-lg rounded-r-none ${
                    isInFavorites
                      ? "bg-[#FA7921] text-white border-2 border-[#FA7921] hover:bg-[#FA7921]/90" 
                      : "bg-white text-gray-900 border-2 border-gray-300 hover:border-[#FA7921] hover:bg-[#FA7921]/5"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInFavorites ? 'fill-white' : ''}`} />
                  <span className="font-medium">
                    {isInFavorites 
                      ? selectedLists.length === 1 && selectedLists[0] === 'all' 
                        ? 'In All' 
                        : `In ${selectedLists.length} lists`
                      : 'Add to Favorites'
                    }
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="icon"
                      className={`px-2 rounded-l-none rounded-r-lg border-l-0 ${
                        isInFavorites
                          ? "bg-[#FA7921] text-white border-2 border-[#FA7921] hover:bg-[#FA7921]/90" 
                          : "bg-white text-gray-900 border-2 border-gray-300 hover:border-[#FA7921] hover:bg-[#FA7921]/5"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-semibold text-gray-900">Add to Specific Lists</div>
                    <DropdownMenuSeparator />
                    {favoritesList.map((list) => (
                      <DropdownMenuItem
                        key={list.id}
                        onClick={() => {
                          if (selectedLists.includes(list.id)) {
                            // Remove from this list
                            setSelectedLists(selectedLists.filter(id => id !== list.id))
                            // Show notification
                            const notification = document.createElement('div')
                            notification.className = 'fixed top-20 right-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
                            notification.textContent = `✓ Removed from ${list.name}`
                            document.body.appendChild(notification)
                            setTimeout(() => notification.remove(), 3000)
                          } else {
                            // Add to this list
                            if (!selectedLists.includes(list.id)) {
                              setSelectedLists([...selectedLists, list.id])
                            }
                            // Show notification
                            const notification = document.createElement('div')
                            notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
                            notification.textContent = `✓ Added to ${list.name}`
                            document.body.appendChild(notification)
                            setTimeout(() => notification.remove(), 3000)
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            {selectedLists.includes(list.id) && <Check className="h-4 w-4 text-[#FA7921]" />}
                            <span className={selectedLists.includes(list.id) ? 'font-semibold text-[#FA7921]' : ''}>
                              {list.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {list.count}/{list.max}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = '/dashboard/favorites'}>
                      <div className="flex items-center gap-2 text-[#FA7921]">
                        <Plus className="h-4 w-4" />
                        <span>Manage Lists</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Share Button - More Visible */}
              <Button 
                size="default"
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#FA7921] text-[#FA7921] font-medium shadow-sm hover:bg-[#FA7921] hover:text-white transition-all duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  
                  // Show a better notification
                  const notification = document.createElement('div')
                  notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in'
                  notification.textContent = '✓ Link copied to clipboard!'
                  document.body.appendChild(notification)
                  setTimeout(() => notification.remove(), 3000)
                }}
              >
                <Share2 className="h-5 w-5" />
                <span className="font-medium">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Image Gallery */}
            <Card className="overflow-hidden bg-white border border-gray-200">
              <div className="p-4">
                <ImageGalleryEnhanced 
                  images={vehicleData.images}
                  alt={`${vehicleData.make} ${vehicleData.model}`}
                />
              </div>
            </Card>

            {/* Auction Timer - Mobile Only */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-4 lg:hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-orange-800">LIVE AUCTION</span>
                </div>
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-600">Ends in:</span>
                <span className="text-sm font-bold text-gray-900">{timeRemaining}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-200/50">
                <p className="text-xs text-gray-600 truncate">Lot #{vehicleData.auction.lotNumber}</p>
              </div>
            </div>

            {/* Bidding Panel - Mobile Only (shows after images) */}
            <Card className="bg-white border border-gray-200 lg:hidden">
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Price</p>
                    <p className="text-2xl font-bold">{formatJPY(vehicleData.pricing.startPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-2xl font-bold text-[#FA7921]">{formatJPY(vehicleData.pricing.currentBid)}</p>
                  </div>
                </div>

                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bid Amount (JPY)
                    </label>
                    <Input
                      type="text"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter your bid..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message (Optional)
                    </label>
                    <Textarea
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      placeholder="Add a message with your bid..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingBid}
                    className="w-full"
                  >
                    {isSubmittingBid ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Place Bid'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Car Specifications */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Vehicle Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: 'Make & Model', value: `${vehicleData.make} ${vehicleData.model}` },
                    { label: 'Year', value: vehicleData.year },
                    { label: 'Mileage', value: `${vehicleData.mileage.toLocaleString()} km` },
                    { label: 'Transmission', value: vehicleData.transmission },
                    { label: 'Engine', value: `${vehicleData.displacement}cc` },
                    { label: 'Color', value: vehicleData.color },
                    { label: 'Body Type', value: vehicleData.bodyType },
                    { label: 'Drive Type', value: vehicleData.drive },
                    { label: 'Fuel', value: vehicleData.fuel },
                    { label: 'Doors/Seats', value: `${vehicleData.doors} doors / ${vehicleData.seats} seats` },
                  ].map((spec, index) => (
                    <div key={index}>
                      <p className="text-sm text-muted-foreground">{spec.label}</p>
                      <p className="font-semibold">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Condition Scores */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Condition Scores</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-600">{vehicleData.scores.interior}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Interior</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">{vehicleData.scores.exterior}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Exterior</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">{vehicleData.scores.overall}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Overall</p>
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicleData.equipment.map((item, index) => (
                      <Badge key={index} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Details Card */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: 'Chassis Number', value: vehicleData.chassisNumber },
                    { label: 'Registration Date', value: vehicleData.registrationDate },
                    { label: 'Inspection Valid Until', value: vehicleData.inspectionDate },
                    { label: 'Model Year', value: vehicleData.year },
                    { label: 'Body Type', value: vehicleData.bodyType },
                    { label: 'Doors', value: `${vehicleData.doors} Doors` },
                    { label: 'Seats', value: `${vehicleData.seats} Seats` },
                  ].map((detail, index) => (
                    <div key={index}>
                      <p className="text-sm text-muted-foreground">{detail.label}</p>
                      <p className="font-semibold">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Additional Information */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: 'Cooling', value: vehicleData.additionalData.cooling },
                    { label: 'Fuel', value: vehicleData.fuel },
                    { label: 'Holding Frequency', value: vehicleData.additionalData.holdingFrequency },
                    { label: 'Bidding Deadline', value: vehicleData.auction.deadline.toLocaleString('ja-JP') },
                    { label: 'Displacement', value: `${vehicleData.displacement.toLocaleString()}cc` },
                    { label: 'Appraisal Point', value: vehicleData.additionalData.appraisalPoint },
                    { label: 'Year', value: vehicleData.additionalData.yearH },
                    { label: 'Shift', value: vehicleData.additionalData.shift },
                    { label: 'Mileage', value: `${(vehicleData.mileage / 1000).toFixed(0)} thousand km` },
                    { label: 'Result', value: vehicleData.auction.result },
                    { label: 'Color', value: vehicleData.color },
                    { label: 'Color Substitution', value: vehicleData.additionalData.colorSubstitution },
                    { label: 'Start', value: `${(vehicleData.pricing.startPrice / 10000).toFixed(1)} ten thousand jpy` },
                    { label: 'Grade', value: vehicleData.additionalData.grade },
                    { label: 'Holding Hall', value: vehicleData.additionalData.holdingHall },
                    { label: 'Opening Day', value: vehicleData.additionalData.openingDay },
                    { label: 'Equipment', value: vehicleData.equipment.join(' ') },
                    { label: 'Condition', value: `[ ${vehicleData.condition} ]` },
                  ].map((info, index) => (
                    <div key={index}>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-semibold">{info.value}</p>
                    </div>
                  ))}
                </div>

                {/* Condition Notes */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Condition Notes</h3>
                  <p className="text-gray-700 mb-3">{vehicleData.condition}</p>
                  <ul className="space-y-2">
                    {vehicleData.additionalData.notes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bidding and Actions */}
          <div className="space-y-6">
            {/* Auction Timer */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-orange-800">LIVE AUCTION</span>
                </div>
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-600">Ends in:</span>
                <span className="text-sm font-bold text-gray-900">{timeRemaining}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-200/50">
                <p className="text-xs text-gray-600 truncate">Lot #{vehicleData.auction.lotNumber}</p>
              </div>
            </div>

            {/* Bidding Panel - Desktop Only (shows in right column) */}
            <Card className="bg-white border border-gray-200 hidden lg:block">
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Price</p>
                    <p className="text-2xl font-bold">{formatJPY(vehicleData.pricing.startPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-2xl font-bold text-[#FA7921]">{formatJPY(vehicleData.pricing.currentBid)}</p>
                  </div>
                </div>

                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bid Amount (JPY)
                    </label>
                    <Input
                      type="text"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter your bid..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message (Optional)
                    </label>
                    <Textarea
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      placeholder="Add a message with your bid..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingBid}
                    className="w-full"
                  >
                    {isSubmittingBid ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Place Bid'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>


            {/* Average Price */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Market Price</p>
                    <p className="text-2xl font-bold text-green-600">{formatJPY(vehicleData.pricing.averagePrice)}</p>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on {Math.floor(Math.random() * 50) + 20} similar vehicles sold in the last 30 days
                    </p>
                    <Link 
                      href={`/dashboard/statistics?make=${vehicleData.make}&model=${vehicleData.model}`}
                      className="text-[#FA7921] hover:underline text-sm font-medium inline-flex items-center"
                    >
                      View Consolidated Statistics
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Inquiry
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Inquiry</DialogTitle>
                        <DialogDescription>
                          Send a message about this vehicle
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Input type="email" placeholder="Your email..." />
                        <Textarea placeholder="Your message..." rows={4} />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Send</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-white bg-green-500 hover:bg-green-600 border-green-500">
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1 text-white bg-green-600 hover:bg-green-700 border-green-600">
                      WeChat
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Services Section - Combined Inspection & Translation */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 space-y-4">
                {/* Inspection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Vehicle Inspection</h4>
                    <span className="px-3 py-1 bg-[#FA7921]/10 text-[#FA7921] rounded-full text-sm font-semibold">
                      ¥3,000
                    </span>
                  </div>
                  
                  {inspectionStatus === 'completed' && (
                    <div className="space-y-3">
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Completed</AlertTitle>
                        <AlertDescription className="text-green-600">
                          {inspectionData?.sharedBy && inspectionData.sharedBy !== 'Current User' && (
                            <span>Free (shared by {inspectionData.sharedBy})<br/></span>
                          )}
                          {inspectionData?.date && (
                            <span>Completed: {new Date(inspectionData.date).toLocaleDateString()}</span>
                          )}
                        </AlertDescription>
                      </Alert>
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => router.push('/dashboard/inspections')}
                      >
                        View Report
                      </Button>
                    </div>
                  )}
                  
                  {inspectionStatus === 'processing' && (
                    <Alert>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <AlertTitle>Processing</AlertTitle>
                      <AlertDescription>
                        Inspector is examining the vehicle
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {inspectionStatus === 'requested' && (
                    <Alert className="bg-amber-50 border-amber-200">
                      <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
                      <AlertTitle className="text-amber-700">Requested</AlertTitle>
                      <AlertDescription className="text-amber-600">
                        Waiting for inspector (24-48h)
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {inspectionStatus === 'not available' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full">
                          Request Inspection
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-white [&>*]:text-gray-900 dark:[&>*]:text-gray-900">
                        <DialogHeader>
                          <DialogTitle>Request Vehicle Inspection</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Alert className="bg-amber-50 dark:bg-amber-50 border-amber-200 dark:border-amber-200">
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-600" />
                            <AlertTitle className="text-amber-800 dark:text-amber-800">Inspection Fee: ¥3,000</AlertTitle>
                            <AlertDescription className="text-amber-700 dark:text-amber-700">
                              Will be added to your final invoice if you win this auction
                            </AlertDescription>
                          </Alert>
                          
                          <div>
                            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-900">Professional inspection includes:</p>
                            <ul className="text-sm text-gray-600 dark:text-gray-600 space-y-1 list-disc list-inside">
                              <li>Detailed condition assessment with high-resolution photos</li>
                              <li>Undercarriage and engine inspection</li>
                              <li>Paint thickness measurements</li>
                              <li>Accident history verification</li>
                              <li>Full mechanical inspection</li>
                            </ul>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-600">
                            Estimated completion: 24-48 hours before auction ends
                          </p>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleRequestInspection}>
                            Request Inspection
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Translation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Sheet Translation</h4>
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
                      FREE
                    </span>
                  </div>
                  
                  {translationStatus === 'translated' && (
                    <div className="space-y-3">
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Translated</AlertTitle>
                        <AlertDescription className="text-green-600">
                          {translationData?.sharedBy && translationData.sharedBy !== 'Current User' && (
                            <span>Free (shared by {translationData.sharedBy})<br/></span>
                          )}
                          Ready to view
                        </AlertDescription>
                      </Alert>
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => router.push('/dashboard/translations')}
                      >
                        View Translation
                      </Button>
                    </div>
                  )}
                  
                  {translationStatus === 'translating' && (
                    <Alert>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <AlertTitle>Translating</AlertTitle>
                      <AlertDescription>
                        Processing auction sheet
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {translationStatus === 'requested' && (
                    <Alert className="bg-amber-50 border-amber-200">
                      <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
                      <AlertTitle className="text-amber-700">Requested</AlertTitle>
                      <AlertDescription className="text-amber-600">
                        In queue (2-4 hours)
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {translationStatus === 'not available' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full">
                          Request Translation
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-white [&>*]:text-gray-900 dark:[&>*]:text-gray-900">
                        <DialogHeader>
                          <DialogTitle>Request Auction Sheet Translation</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Alert className="bg-amber-50 dark:bg-amber-50 border-amber-200 dark:border-amber-200">
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-600" />
                            <AlertTitle className="text-amber-800 dark:text-amber-800">Translation Fee: FREE</AlertTitle>
                            <AlertDescription className="text-amber-700 dark:text-amber-700">
                              No charge for auction sheet translation service
                            </AlertDescription>
                          </Alert>
                          
                          <div>
                            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-900">Professional translation includes:</p>
                            <ul className="text-sm text-gray-600 dark:text-gray-600 space-y-1 list-disc list-inside">
                              <li>Complete auction grade explanation</li>
                              <li>All condition notes and remarks</li>
                              <li>Equipment and features list</li>
                              <li>Inspector comments and observations</li>
                              <li>Repair history if noted</li>
                            </ul>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-600">
                            Estimated completion: 2-4 hours
                          </p>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleRequestTranslation}>
                            Request Translation
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Recent Bids</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bidHistory.slice().reverse().map((bid, index) => (
                    <div key={index} className="flex items-start justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-semibold">{formatJPY(bid.amount)}</p>
                        <p className="text-sm text-muted-foreground">{bid.userName}</p>
                        {bid.message && (
                          <p className="text-sm text-muted-foreground mt-1">&ldquo;{bid.message}&rdquo;</p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(bid.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}