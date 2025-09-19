'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ShipmentTimeline from '@/src/components/dashboard/ShipmentTimeline'
import { TimelineStage } from '@/src/components/dashboard/types'
import { getRandomAuctionHouse } from '@/src/data/auctionHouses'

interface BidDetail {
  id: string
  auctionId: string
  vehicleTitle: string
  vehicleImage: string
  vin: string
  vehicleSpecs: {
    year: number
    mileage: string
    transmission: string
    engine: string
    chassisNumber?: string
    color?: string
    bodyType?: string
  }
  startingPrice: number
  yourBid: number
  currentHighestBid: number
  numberOfBids: number
  status: 'won' | 'lost' | 'active' | 'outbid'
  bidDate: Date
  auctionEndDate: Date
  winningBid?: number
  paymentStatus?: 'pending' | 'processing' | 'completed'
  shippingStatus?: 'preparing' | 'in-transit' | 'delivered'
  location: string
  auctionHouse: {
    name: string
    rating: number
    verified: boolean
  }
  bidHistory?: {
    amount: number
    bidder: string
    timestamp: Date
    isYou?: boolean
  }[]
}

export default function BidDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bidId = params['id'] as string
  
  const [activeTab, setActiveTab] = useState<'overview' | 'shipment'>('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<'default' | 'new'>('default')
  const [showChangeBidModal, setShowChangeBidModal] = useState(false)
  const [showCancelBidModal, setShowCancelBidModal] = useState(false)
  const [newBidAmount, setNewBidAmount] = useState('')
  const [showUrgentWarning, setShowUrgentWarning] = useState(false)
  const [cancellationReason, setCancellationReason] = useState('')
  const [selectedPort, setSelectedPort] = useState('')
  const [vehicleStatus, setVehicleStatus] = useState<'normal' | 'repair'>('normal')
  const [repairRemarks, setRepairRemarks] = useState('')
  const [defaultAddress] = useState({
    name: 'John Doe',
    street: '1-2-3 Shibuya',
    city: 'Tokyo',
    state: 'Tokyo',
    postalCode: '150-0002',
    country: 'Japan',
    phone: '+81-3-1234-5678'
  })
  
  // Generate a random auction house for this bid
  const auctionHouseName = getRandomAuctionHouse()
  
  // Mock data - In production, fetch from API based on bidId
  const [bidDetail] = useState<BidDetail>({
    id: bidId,
    auctionId: 'AUC-2024-0892',
    vehicleTitle: '2018 Toyota Corolla Axio',
    vin: 'JTDBR32E180123456',
    vehicleImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    vehicleSpecs: {
      year: 2018,
      mileage: '42,360 km',
      transmission: 'Automatic',
      engine: '1.5L',
      chassisNumber: 'NZE161-3153697',
      color: 'Pearl White',
      bodyType: 'Sedan'
    },
    startingPrice: 5200000,
    yourBid: 7350000,
    currentHighestBid: 7350000,
    numberOfBids: 23,
    status: 'won',
    bidDate: new Date('2024-01-10T14:30:00'),
    auctionEndDate: new Date('2024-01-10T14:30:00'),
    winningBid: 7350000,
    paymentStatus: 'completed', // Changed to completed to show shipment tracking
    shippingStatus: 'preparing',
    location: 'Tokyo, Japan',
    auctionHouse: {
      name: 'Tokyo Motors',
      rating: 4.8,
      verified: true
    },
    bidHistory: [
      { amount: 5200000, bidder: 'Starting Price', timestamp: new Date('2024-01-08T10:00:00') },
      { amount: 5500000, bidder: 'User_423', timestamp: new Date('2024-01-08T11:30:00') },
      { amount: 6000000, bidder: 'You', timestamp: new Date('2024-01-08T14:20:00'), isYou: true },
      { amount: 6500000, bidder: 'User_891', timestamp: new Date('2024-01-09T09:15:00') },
      { amount: 7000000, bidder: 'You', timestamp: new Date('2024-01-09T16:45:00'), isYou: true },
      { amount: 7200000, bidder: 'User_423', timestamp: new Date('2024-01-10T13:00:00') },
      { amount: 7350000, bidder: 'You', timestamp: new Date('2024-01-10T14:25:00'), isYou: true }
    ]
  })

  // Available ports for shipping
  const availablePorts = [
    'Yokohama Port',
    'Nagoya Port',
    'Osaka Port',
    'Kobe Port',
    'Tokyo Port',
    'Kawasaki Port'
  ]

  // Shipment timeline stages (only for won auctions) - Simplified timeline
  const [shipmentStages] = useState<TimelineStage[]>([
    {
      id: 'auction-won',
      title: 'Auction Won',
      description: 'You have successfully won the auction',
      status: 'completed',
      progress: 100,
      tasksCompleted: 1,
      totalTasks: 1,
      completedDate: bidDetail.auctionEndDate,
      completedBy: 'System',
      isExpandable: false
    },
    {
      id: 'payment-documents',
      title: 'Payment & Documents',
      description: 'Complete payment and submit required documents',
      status: 'completed',
      progress: 100,
      tasksCompleted: 4,
      totalTasks: 4,
      completedDate: new Date('2024-01-14T15:30:00'),
      isExpandable: true,
      details: [
        {
          id: 'payment-1',
          title: 'Invoice & Payment',
          status: 'completed',
          description: 'View invoice and make payment',
          completedDate: new Date('2024-01-11T10:15:00'),
          actions: [
            { label: 'View Invoice', icon: 'document', onClick: () => {/* View invoice */} },
            { label: 'Make Payment', icon: 'credit-card', onClick: () => setShowPaymentModal(true) }
          ]
        },
        {
          id: 'payment-2',
          title: 'Confirm Shipping Address',
          status: 'completed',
          description: 'Delivery address confirmed',
          completedDate: new Date('2024-01-12T14:20:00'),
          actions: [
            { label: 'Manage Address', icon: 'location', onClick: () => setShowAddressModal(true) }
          ]
        },
        {
          id: 'payment-3',
          title: 'Port Selection',
          status: 'completed',
          description: selectedPort ? `Departure: ${selectedPort}` : 'Select departure port',
          completedDate: selectedPort ? new Date('2024-01-14T11:00:00') : undefined,
          actions: [
            { 
              label: 'Select Port', 
              icon: 'location' as const,
              onClick: () => {
                const port = prompt(`Select departure port:\n${availablePorts.join('\n')}`, selectedPort || availablePorts[0])
                if (port && availablePorts.includes(port)) {
                  setSelectedPort(port)
                }
              }
            }
          ]
        },
        {
          id: 'payment-4',
          title: 'Shipping Insurance',
          status: 'completed',
          description: 'Included in shipping fee',
          completedDate: new Date('2024-01-11T10:15:00'),
          note: 'Comprehensive coverage included'
        }
      ]
    },
    {
      id: 'inland-transport',
      title: 'Inland Transport',
      description: selectedPort ? `${auctionHouseName} to ${selectedPort}` : 'Transport to departure port',
      status: 'in-progress',
      progress: 60,
      tasksCompleted: 1,
      totalTasks: 2,
      estimatedDate: new Date('2024-01-18T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'transport-1',
          title: 'Vehicle Pickup',
          status: 'completed',
          description: `Vehicle collected from ${auctionHouseName}`,
          completedDate: new Date('2024-01-15T09:00:00')
        },
        {
          id: 'transport-2',
          title: vehicleStatus === 'repair' ? 'Vehicle Under Repair' : 'In Transit to Port',
          status: 'pending',
          description: vehicleStatus === 'repair' 
            ? `Repair required: ${repairRemarks || 'Awaiting inspection'}` 
            : selectedPort ? `En route to ${selectedPort}` : 'Transporting to port',
          dueDate: new Date('2024-01-18T17:00:00'),
          note: vehicleStatus === 'repair' ? repairRemarks : undefined,
          actions: vehicleStatus === 'repair' ? [
            {
              label: 'Update Repair Status',
              icon: 'document' as const,
              onClick: () => {
                const remarks = prompt('Update repair remarks:', repairRemarks)
                if (remarks !== null) {
                  setRepairRemarks(remarks)
                  if (remarks.toLowerCase().includes('completed')) {
                    setVehicleStatus('normal')
                  }
                }
              }
            }
          ] : undefined
        }
      ]
    },
    {
      id: 'shipping-preparation',
      title: 'Port Processing & Documents',
      description: selectedPort ? `At ${selectedPort} - Preparing for shipment` : 'Vehicle inspection and export preparation',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 4,
      estimatedDate: new Date('2024-01-22T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'prep-1',
          title: 'Arrival at Port',
          status: 'pending',
          description: selectedPort ? `Vehicle arrived at ${selectedPort}` : 'Waiting for port arrival',
          dueDate: new Date('2024-01-19T10:00:00')
        },
        {
          id: 'prep-2',
          title: 'Export Inspection',
          status: 'pending',
          description: 'JEVIC export inspection',
          dueDate: new Date('2024-01-20T14:00:00')
        },
        {
          id: 'prep-3',
          title: 'Container Loading',
          status: 'pending',
          description: 'Vehicle loaded into shipping container',
          dueDate: new Date('2024-01-22T16:00:00')
        },
        {
          id: 'prep-4',
          title: 'Export Documents',
          status: 'pending',
          description: 'Awaiting document upload by staff',
          dueDate: new Date('2024-01-22T16:00:00'),
          note: 'Documents will be available once uploaded by staff'
        }
      ]
    },
    {
      id: 'ocean-shipping',
      title: 'Ocean Shipping',
      description: 'In transit to destination port',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-15T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'ship-1',
          title: 'Vessel Departure',
          status: 'pending',
          description: selectedPort ? `Departing from ${selectedPort}` : 'Awaiting departure',
          dueDate: new Date('2024-01-26T10:00:00')
        },
        {
          id: 'ship-2',
          title: 'Arrival at Destination',
          status: 'pending',
          description: 'ETA to destination port',
          dueDate: new Date('2024-02-15T17:00:00')
        }
      ]
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Final delivery to customer',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-02-20T17:00:00'),
      completedDate: undefined,
      isExpandable: true,
      details: [
        {
          id: 'delivery-1',
          title: 'Port Entry',
          status: 'pending',
          description: 'Vehicle arrived at destination port',
          completedDate: undefined,
          dueDate: new Date('2024-02-15T17:00:00')
        },
        {
          id: 'delivery-2',
          title: 'Final Delivery',
          status: 'pending',
          description: 'Vehicle ready for customer pickup',
          completedDate: undefined,
          dueDate: new Date('2024-02-20T17:00:00'),
          actions: [
            {
              label: 'Confirm Received',
              icon: 'check' as const,
              onClick: () => {
                const confirmed = confirm('Confirm that you have received the vehicle?')
                if (confirmed) {
                  // Handle delivery confirmation
                  alert('Thank you for confirming delivery!')
                }
              }
            }
          ]
        }
      ]
    }
  ])

  // Simulate vehicle breakdown (for demo)
  useEffect(() => {
    // This would be triggered by actual events in production
    if (selectedPort && Math.random() > 0.8) { // 20% chance for demo
      setVehicleStatus('repair')
      setRepairRemarks('Engine coolant leak detected during transport')
    }
  }, [selectedPort])
  

  const formatJPY = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = () => {
    switch (bidDetail.status) {
      case 'won':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Won</span>
      case 'lost':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Lost</span>
      case 'active':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Active</span>
      case 'outbid':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Outbid</span>
    }
  }

  const getPaymentStatusBadge = () => {
    switch (bidDetail.paymentStatus) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Paid</span>
      case 'processing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Processing</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">Pending</span>
    }
  }

  // Determine which tab to show based on status
  useEffect(() => {
    if (bidDetail.status === 'won' && bidDetail.paymentStatus === 'completed') {
      setActiveTab('shipment')
    } else {
      setActiveTab('overview')
    }
  }, [bidDetail.status, bidDetail.paymentStatus])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">{bidDetail.vehicleTitle}</h1>
                  {getStatusBadge()}
                  {bidDetail.status === 'won' && getPaymentStatusBadge()}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Auction ID: {bidDetail.auctionId} • Bid placed on {bidDetail.bidDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {bidDetail.status === 'won' && (
              <div className="flex items-center gap-3">
                {bidDetail.paymentStatus !== 'completed' && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                  >
                    Complete Payment
                  </button>
                )}
                <Link
                  href={`/dashboard/vehicle/${bidDetail.auctionId}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  View Vehicle
                </Link>
              </div>
            )}
            
            {(bidDetail.status === 'active' || bidDetail.status === 'outbid') && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    const hoursUntilAuction = Math.abs(new Date(bidDetail.auctionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60)
                    if (hoursUntilAuction <= 3) {
                      setShowUrgentWarning(true)
                      setShowChangeBidModal(true)
                    } else {
                      setShowChangeBidModal(true)
                    }
                  }}
                  className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                >
                  Change Bid
                </button>
                <button 
                  onClick={() => {
                    const hoursUntilAuction = Math.abs(new Date(bidDetail.auctionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60)
                    if (hoursUntilAuction <= 3) {
                      setShowUrgentWarning(true)
                      setShowCancelBidModal(true)
                    } else {
                      setShowCancelBidModal(true)
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Cancel Bid
                </button>
                <Link
                  href={`/dashboard/vehicle/${bidDetail.auctionId}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  View Vehicle
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#FA7921] text-[#FA7921]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            {bidDetail.status === 'won' && bidDetail.paymentStatus === 'completed' && (
              <button
                onClick={() => setActiveTab('shipment')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === 'shipment'
                    ? 'border-[#FA7921] text-[#FA7921]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Shipment Tracking
                {bidDetail.shippingStatus === 'preparing' && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vehicle Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src={bidDetail.vehicleImage}
                    alt={bidDetail.vehicleTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Year</p>
                      <p className="font-semibold text-gray-900">{bidDetail.vehicleSpecs.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mileage</p>
                      <p className="font-semibold text-gray-900">{bidDetail.vehicleSpecs.mileage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transmission</p>
                      <p className="font-semibold text-gray-900">{bidDetail.vehicleSpecs.transmission}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Engine</p>
                      <p className="font-semibold text-gray-900">{bidDetail.vehicleSpecs.engine}</p>
                    </div>
                    {bidDetail.vehicleSpecs.chassisNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Chassis Number</p>
                        <p className="font-semibold text-gray-900">{bidDetail.vehicleSpecs.chassisNumber}</p>
                      </div>
                    )}
                    {bidDetail.vehicleSpecs.color && (
                      <div>
                        <p className="text-sm text-gray-600">Color</p>
                        <p className="font-semibold text-gray-900">{bidDetail.vehicleSpecs.color}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bid Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Bid Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price</span>
                    <span className="font-medium">{formatJPY(bidDetail.startingPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Bid</span>
                    <span className="font-medium">{formatJPY(bidDetail.yourBid)}</span>
                  </div>
                  {bidDetail.winningBid && (
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-gray-900 font-medium">Winning Bid</span>
                      <span className="font-bold text-green-600">{formatJPY(bidDetail.winningBid)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bids</span>
                    <span className="font-medium">{bidDetail.numberOfBids}</span>
                  </div>
                </div>
              </div>

              {/* Auction House Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Auction House Information</h3>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{bidDetail.auctionHouse.name}</p>
                      {bidDetail.auctionHouse.verified && (
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(bidDetail.auctionHouse.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({bidDetail.auctionHouse.rating})</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{bidDetail.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Shipment Tracking Tab */}
        {activeTab === 'shipment' && bidDetail.status === 'won' && bidDetail.paymentStatus === 'completed' && (
          <>
            {/* Vehicle Status Alert */}
            {vehicleStatus === 'repair' && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900">Vehicle Under Repair</h4>
                    <p className="text-sm text-amber-800 mt-1">{repairRemarks || 'Vehicle is currently being repaired. We will update you once repairs are completed.'}</p>
                    <div className="flex gap-3 mt-3">
                      <button 
                        onClick={() => {
                          const remarks = prompt('Update repair status:', repairRemarks)
                          if (remarks !== null) {
                            setRepairRemarks(remarks)
                            if (remarks.toLowerCase().includes('completed')) {
                              setVehicleStatus('normal')
                            }
                          }
                        }}
                        className="text-sm text-amber-700 font-medium hover:text-amber-900"
                      >
                        Update Status
                      </button>
                      <button 
                        onClick={() => alert('Your sales representative will contact you shortly.')}
                        className="text-sm text-amber-700 font-medium hover:text-amber-900"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Print Label / QR Code Section */}
            <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Office Document Management</h3>
                  <p className="text-xs text-gray-600 mt-1">Print label for document organization</p>
                </div>
                <button
                  onClick={() => {
                    // Generate print-friendly page
                    const printWindow = window.open('', '_blank')
                    if (printWindow) {
                      const qrCodeUrl = `${window.location.origin}/dashboard/bids/${bidId}`
                      printWindow.document.write(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <title>Document Label - ${bidDetail.vehicleTitle}</title>
                          <style>
                            @page { size: A4; margin: 20mm; }
                            body { 
                              font-family: Arial, sans-serif; 
                              display: flex;
                              flex-direction: column;
                              align-items: center;
                              justify-content: center;
                              height: 100vh;
                              margin: 0;
                            }
                            .container {
                              text-align: center;
                              padding: 40px;
                              border: 3px solid #000;
                              border-radius: 10px;
                              max-width: 80%;
                            }
                            h1 { font-size: 36px; margin-bottom: 30px; }
                            .info { font-size: 24px; margin: 20px 0; text-align: left; }
                            .info strong { display: inline-block; min-width: 150px; }
                            .qr-section { margin: 40px 0; }
                            .qr-placeholder { 
                              width: 200px; 
                              height: 200px; 
                              border: 2px solid #000; 
                              margin: 0 auto 10px;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              font-size: 14px;
                            }
                            .checklist { 
                              text-align: left; 
                              margin-top: 30px; 
                              padding-top: 30px;
                              border-top: 2px solid #ccc;
                            }
                            .checklist h2 { font-size: 24px; margin-bottom: 15px; }
                            .checklist-item { 
                              font-size: 18px; 
                              margin: 10px 0;
                              display: flex;
                              align-items: center;
                            }
                            .checkbox {
                              width: 20px;
                              height: 20px;
                              border: 2px solid #000;
                              margin-right: 10px;
                              display: inline-block;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <h1>VEHICLE DOCUMENTS</h1>
                            
                            <div class="info">
                              <strong>VIN:</strong> ${bidDetail.vin}<br/>
                              <strong>Vehicle:</strong> ${bidDetail.vehicleTitle}<br/>
                              <strong>Customer:</strong> ${defaultAddress.name}<br/>
                              <strong>Address:</strong><br/>
                              ${defaultAddress.street}<br/>
                              ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.postalCode}<br/>
                              ${defaultAddress.country}<br/>
                              <strong>Phone:</strong> ${defaultAddress.phone}
                            </div>
                            
                            <div class="qr-section">
                              <div class="qr-placeholder">
                                QR Code<br/>
                                (${qrCodeUrl})
                              </div>
                              <p style="font-size: 14px;">Scan to view shipment details</p>
                            </div>
                            
                            <div class="checklist">
                              <h2>Document Checklist:</h2>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Export Certificate
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Bill of Lading
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Invoice
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Deregistration Certificate
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Insurance Documents
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Keys (Quantity: ___)
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Service Records
                              </div>
                              <div class="checklist-item">
                                <span class="checkbox"></span> Owner's Manual
                              </div>
                            </div>
                          </div>
                        </body>
                        </html>
                      `)
                      printWindow.document.close()
                      printWindow.print()
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Document Label
                </button>
              </div>
            </div>

            <ShipmentTimeline
              orderId={bidDetail.auctionId}
              stages={shipmentStages}
              onStageToggle={() => {/* Stage toggled */}}
              onTaskUpdate={() => {/* Task updated */}}
            />
          </>
        )}
        
        {/* Payment Required Message */}
        {activeTab === 'shipment' && bidDetail.status === 'won' && bidDetail.paymentStatus !== 'completed' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Required</h3>
            <p className="text-gray-600 mb-6">
              Complete your payment to access shipment tracking for this vehicle.
            </p>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="px-6 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
            >
              Complete Payment Now
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Complete Payment</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-semibold text-gray-900">{bidDetail.vehicleTitle}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Winning Bid</span>
                <span className="font-semibold text-gray-900">{formatJPY(bidDetail.winningBid || bidDetail.yourBid)}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Auction Fee (3%)</span>
                <span className="font-semibold text-gray-900">{formatJPY((bidDetail.winningBid || bidDetail.yourBid) * 0.03)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-[#FA7921]">
                    {formatJPY((bidDetail.winningBid || bidDetail.yourBid) * 1.03)}
                  </span>
                </div>
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h4>
            
            <div className="space-y-3">
              {/* Bank Transfer */}
              <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#FA7921] transition-all group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bank Transfer</p>
                      <p className="text-sm text-gray-600">Direct transfer from your bank account</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Stripe (Credit/Debit Card) */}
              <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#FA7921] transition-all group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Credit/Debit Card (Stripe)</p>
                      <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                      <div className="flex items-center gap-2 mt-1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
                        <span className="text-xs text-gray-500">Visa, Mastercard, Amex</span>
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* PayPal */}
              <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#FA7921] transition-all group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.65h7.535c2.59 0 4.71.98 5.924 2.74.63.908.926 1.943.926 3.154 0 .425-.033.845-.09 1.26-.21 1.422-.77 2.678-1.62 3.63a7.07 7.07 0 0 1-4.07 2.13 11.31 11.31 0 0 1-1.95.17H9.93c-.445 0-.834.3-.94.73l-.014.06-.934 5.92-.007.05a.64.64 0 0 1-.63.54l-.03-.004zm6.86-14.27h2.35c2.37 0 4.25 1.88 4.25 4.25s-1.88 4.25-4.25 4.25h-2.35a.64.64 0 0 1-.63-.54l1.06-6.73a.64.64 0 0 1 .63-.54l.004.02z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">PayPal</p>
                      <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Wise */}
              <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#FA7921] transition-all group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Wise (formerly TransferWise)</p>
                      <p className="text-sm text-gray-600">Low-cost international money transfer</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Best rates for international payments</span>
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
            
            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-900">Secure Payment</p>
                  <p className="text-xs text-green-700 mt-1">
                    All payment methods are secured with industry-standard encryption. Your payment information is never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium">
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Bid Modal */}
      {showChangeBidModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Change Your Bid</h3>
              <button
                onClick={() => {
                  setShowChangeBidModal(false)
                  setShowUrgentWarning(false)
                  setNewBidAmount('')
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Urgent Warning */}
            {showUrgentWarning && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">Auction Starting Soon</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      This auction is starting in less than 3 hours. There&apos;s a chance our bidding staff may not see your change in time.
                    </p>
                    <p className="text-sm text-yellow-800 mt-2 font-medium">
                      Please contact your sales person immediately after submitting this change.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Current Bid Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Current Your Bid</span>
                <span className="font-semibold text-gray-900">{formatJPY(bidDetail.yourBid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Highest Bid</span>
                <span className="font-semibold text-gray-900">{formatJPY(bidDetail.currentHighestBid)}</span>
              </div>
            </div>

            {/* New Bid Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Bid Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                <input
                  type="number"
                  value={newBidAmount}
                  onChange={(e) => setNewBidAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  placeholder="Enter new bid amount"
                  min={bidDetail.currentHighestBid + 1000}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum bid: {formatJPY(bidDetail.currentHighestBid + 1000)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowChangeBidModal(false)
                  setShowUrgentWarning(false)
                  setNewBidAmount('')
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Submit bid change
                  // Submitting bid change
                  setShowChangeBidModal(false)
                  setShowUrgentWarning(false)
                  setNewBidAmount('')
                  // Show notification that bid change is being reviewed
                  alert('Your bid change request has been submitted. You will receive a notification once it has been reviewed by our staff.')
                }}
                className="flex-1 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                disabled={!newBidAmount || parseInt(newBidAmount) <= bidDetail.currentHighestBid}
              >
                Submit Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Bid Modal */}
      {showCancelBidModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Cancel Your Bid</h3>
              <button
                onClick={() => {
                  setShowCancelBidModal(false)
                  setShowUrgentWarning(false)
                  setCancellationReason('')
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Urgent Warning */}
            {showUrgentWarning && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">Auction Starting Soon</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      This auction is starting in less than 3 hours. There&apos;s a chance our bidding staff may not see your cancellation in time.
                    </p>
                    <p className="text-sm text-yellow-800 mt-2 font-medium">
                      Please contact your sales person immediately after submitting this cancellation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Warning Message */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-red-900">Are you sure you want to cancel this bid?</p>
                  <p className="text-sm text-red-700 mt-1">
                    Cancelling your bid will remove you from this auction. This action requires staff review and approval.
                  </p>
                </div>
              </div>
            </div>

            {/* Bid Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Vehicle</p>
              <p className="font-semibold text-gray-900 mb-3">{bidDetail.vehicleTitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Your Current Bid</span>
                <span className="font-semibold text-gray-900">{formatJPY(bidDetail.yourBid)}</span>
              </div>
            </div>

            {/* Cancellation Reason */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                rows={3}
                placeholder="Please let us know why you're cancelling this bid..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelBidModal(false)
                  setShowUrgentWarning(false)
                  setCancellationReason('')
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Keep My Bid
              </button>
              <button 
                onClick={() => {
                  // Submit cancellation request
                  // Submitting cancellation
                  setShowCancelBidModal(false)
                  setShowUrgentWarning(false)
                  setCancellationReason('')
                  // Show notification that cancellation is being reviewed
                  alert('Your bid cancellation request has been submitted for review. You will receive a notification once it has been reviewed and accepted by our staff.')
                }}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Cancel My Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Management Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Shipping Address</h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Address Selection */}
            <div className="space-y-4">
              {/* Default Address */}
              {defaultAddress ? (
                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedAddress === 'default' 
                      ? 'border-[#FA7921] bg-[#FA7921]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAddress('default')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress === 'default'}
                        onChange={() => setSelectedAddress('default')}
                        className="mt-1 text-[#FA7921] focus:ring-[#FA7921]"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-gray-900">Default Address</p>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Primary</span>
                        </div>
                        <p className="text-sm text-gray-700">{defaultAddress.name}</p>
                        <p className="text-sm text-gray-600">{defaultAddress.street}</p>
                        <p className="text-sm text-gray-600">{defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}</p>
                        <p className="text-sm text-gray-600">{defaultAddress.country}</p>
                        <p className="text-sm text-gray-600 mt-1">Phone: {defaultAddress.phone}</p>
                      </div>
                    </div>
                    <button className="text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 mb-2">No default address found</p>
                  <p className="text-sm text-gray-500 mb-4">Please add an address to continue</p>
                </div>
              )}

              {/* Add New Address Option */}
              <div 
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAddress === 'new' 
                    ? 'border-[#FA7921] bg-[#FA7921]/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedAddress('new')}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={selectedAddress === 'new'}
                    onChange={() => setSelectedAddress('new')}
                    className="text-[#FA7921] focus:ring-[#FA7921]"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium text-gray-900">Ship to a different address</span>
                  </div>
                </div>

                {/* New Address Form (shown when selected) */}
                {selectedAddress === 'new' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                          placeholder="+81-3-1234-5678"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        placeholder="1-2-3 Shibuya"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                          placeholder="Tokyo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Prefecture</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                          placeholder="Tokyo"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                          placeholder="150-0002"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent">
                          <option>Japan</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Insurance Notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Shipping Insurance Included</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Comprehensive shipping insurance is automatically included with your shipment at no additional cost.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-3 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors font-medium"
                disabled={!defaultAddress && selectedAddress !== 'new'}
              >
                Confirm Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}