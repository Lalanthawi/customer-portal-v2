'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ShipmentTimeline from '../../components/ShipmentTimeline'
import { TimelineStage } from '../../components/types'

interface BidDetail {
  id: string
  auctionId: string
  vehicleTitle: string
  vehicleImage: string
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
  seller: {
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
  
  const [activeTab, setActiveTab] = useState<'overview' | 'bidding' | 'shipment'>('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  
  // Mock data - In production, fetch from API based on bidId
  const [bidDetail] = useState<BidDetail>({
    id: bidId,
    auctionId: 'AUC-2024-0892',
    vehicleTitle: '2018 Toyota Corolla Axio',
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
    seller: {
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

  // Shipment timeline stages (only for won auctions)
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
      status: 'in-progress',
      progress: 25,
      tasksCompleted: 1,
      totalTasks: 4,
      estimatedDate: new Date('2024-01-17T17:00:00'),
      isExpandable: true,
      details: [
        {
          id: 'payment-1',
          title: 'Submit payment (¥7,350,000)',
          status: 'completed',
          description: 'Bank transfer or credit card',
          completedDate: new Date('2024-01-11T10:15:00')
        },
        {
          id: 'payment-2',
          title: 'Sign purchase agreement',
          status: 'pending',
          description: 'Digital signature required',
          dueDate: new Date('2024-01-13T17:00:00')
        },
        {
          id: 'payment-3',
          title: 'Provide shipping information',
          status: 'pending',
          description: 'Destination port and address',
          dueDate: new Date('2024-01-14T17:00:00')
        },
        {
          id: 'payment-4',
          title: 'Purchase shipping insurance',
          status: 'pending',
          description: 'Optional but recommended',
          dueDate: new Date('2024-01-15T17:00:00')
        }
      ]
    },
    {
      id: 'shipping-preparation',
      title: 'Shipping Preparation',
      description: 'Vehicle inspection and preparation',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 2,
      estimatedDate: new Date('2024-01-20T17:00:00'),
      isExpandable: false
    },
    {
      id: 'in-transit',
      title: 'In Transit',
      description: 'Vehicle is being shipped',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 1,
      estimatedDate: new Date('2024-02-15T17:00:00'),
      isExpandable: false
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Vehicle delivered to destination',
      status: 'pending',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 1,
      estimatedDate: new Date('2024-02-20T17:00:00'),
      isExpandable: false
    }
  ])

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
    } else if (bidDetail.status === 'active' || bidDetail.status === 'outbid') {
      setActiveTab('bidding')
    } else if (bidDetail.status === 'won') {
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
            <button
              onClick={() => setActiveTab('bidding')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'bidding'
                  ? 'border-[#FA7921] text-[#FA7921]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bidding History
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

              {/* Seller Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Seller Information</h3>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{bidDetail.seller.name}</p>
                      {bidDetail.seller.verified && (
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(bidDetail.seller.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({bidDetail.seller.rating})</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{bidDetail.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bidding History Tab */}
        {activeTab === 'bidding' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bidding History</h2>
            
            <div className="space-y-3">
              {bidDetail.bidHistory?.map((bid, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    bid.isYou ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === bidDetail.bidHistory!.length - 1 ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      {index === bidDetail.bidHistory!.length - 1 ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {bid.bidder}
                        {bid.isYou && <span className="ml-2 text-sm text-blue-600">(You)</span>}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(bid.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatJPY(bid.amount)}</p>
                    {index === bidDetail.bidHistory!.length - 1 && (
                      <p className="text-sm text-green-600">Winning Bid</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipment Tracking Tab */}
        {activeTab === 'shipment' && bidDetail.status === 'won' && bidDetail.paymentStatus === 'completed' && (
          <ShipmentTimeline
            orderId={bidDetail.auctionId}
            stages={shipmentStages}
            onStageToggle={(stageId) => console.log('Stage toggled:', stageId)}
            onTaskUpdate={(stageId, taskId) => console.log('Task updated:', stageId, taskId)}
          />
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
    </div>
  )
}