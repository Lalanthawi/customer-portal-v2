'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { sharedDataStore } from '../../utils/sharedData'

// Shadcn UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

// Icons
import { 
  ArrowLeft, Clock, ZoomIn, Grid3x3, Eye,
  ChevronLeft, ChevronRight, Check, Share2,
  Mail, AlertCircle, CheckCircle, Loader2,
  ExternalLink
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
  const [selectedImage, setSelectedImage] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [bidMessage, setBidMessage] = useState('')
  const [isSubmittingBid, setIsSubmittingBid] = useState(false)
  const [bidHistory, setBidHistory] = useState<BidData[]>([])
  const [timeRemaining, setTimeRemaining] = useState('')
  const [favoritesList, setFavoritesList] = useState<string[]>([])
  
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

  // Handle favorites
  const toggleFavorite = (list: string) => {
    setFavoritesList(prev => 
      prev.includes(list) 
        ? prev.filter(l => l !== list)
        : [...prev, list]
    )
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
              <Button variant="outline" className="border-gray-300">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button className="bg-[#FA7921] hover:bg-[#FA7921]/90 text-white">
                Watch Auction
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
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800">
                {/* Top Bar with Actions */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                        {selectedImage + 1} / {vehicleData.images.length}
                      </Badge>
                      <Badge className="bg-[#FA7921]/20 backdrop-blur-sm text-[#FFB956]">
                        HD Photos
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => setShowImageModal(true)}
                        size="icon"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      >
                        <ZoomIn className="h-5 w-5" />
                      </Button>
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      >
                        <Grid3x3 className="h-5 w-5" />
                      </Button>
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
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
                  <Button 
                    onClick={() => setSelectedImage(prev => (prev - 1 + vehicleData.images.length) % vehicleData.images.length)}
                    size="icon"
                    variant="ghost"
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button 
                    onClick={() => setSelectedImage(prev => (prev + 1) % vehicleData.images.length)}
                    size="icon"
                    variant="ghost"
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Category Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-blue-600/80 backdrop-blur-sm text-white">
                    Exterior
                  </Badge>
                  <Badge className="bg-green-600/80 backdrop-blur-sm text-white">
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Grid with Scroll */}
              <CardContent className="bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Vehicle Photos</h3>
                  <Button 
                    onClick={() => setShowImageModal(true)}
                    variant="ghost"
                    size="sm"
                    className="text-[#FA7921] hover:text-[#FA7921]/80"
                  >
                    <Grid3x3 className="h-4 w-4 mr-1" />
                    View Gallery
                  </Button>
                </div>
                
                <ScrollArea className="w-full">
                  <div className="flex gap-2 pb-2">
                    {vehicleData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all",
                          selectedImage === index 
                            ? "ring-2 ring-[#FA7921] ring-offset-2 scale-105" 
                            : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                        )}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-[#FA7921]/20 flex items-center justify-center">
                            <Check className="h-6 w-6 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                {/* Image Categories */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Exterior (4)
                  </Button>
                  <Button variant="outline" size="sm">
                    Interior (2)
                  </Button>
                  <Button variant="outline" size="sm">
                    Engine (1)
                  </Button>
                  <Button variant="outline" size="sm">
                    Details (1)
                  </Button>
                </div>
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
                    { label: 'Engine Number', value: vehicleData.engineNumber },
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

            {/* Bidding Panel */}
            <Card className="bg-white border border-gray-200">
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

            {/* Contact & Favorites */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Contact & Save</CardTitle>
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
                    <Button variant="outline" className="flex-1">
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1">
                      WeChat
                    </Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium mb-3">Add to Favorites List</p>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D', 'E'].map((list) => (
                      <label key={list} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={favoritesList.includes(list)}
                          onChange={() => toggleFavorite(list)}
                          className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                        />
                        <span className="text-sm">List {list}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inspection Section */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Vehicle Inspection</CardTitle>
                  {inspectionStatus === 'not available' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[#FA7921]">
                          Request
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
              </CardHeader>
              <CardContent className="pt-0">
                {/* Status displays */}
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
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground mb-2">No inspection available</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
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
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Translation Section */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Sheet Translation</CardTitle>
                  {translationStatus === 'not available' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[#FA7921]">
                          Request
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
              </CardHeader>
              <CardContent className="pt-0">
                {/* Status displays */}
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
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground mb-2">No translation available</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
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
                  </div>
                )}
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

      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-6xl bg-white dark:bg-white">
          <Image
            src={vehicleData.images[selectedImage] || '/images/car-placeholder.jpg'}
            alt={`${vehicleData.make} ${vehicleData.model}`}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}