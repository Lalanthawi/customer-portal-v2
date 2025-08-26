'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type VehicleSource = 'auction' | 'direct' | 'export'
type VehicleStatus = 'payment_pending' | 'preparing' | 'in_transit' | 'at_port' | 'delivered' | 'completed'

interface Vehicle {
  id: string
  title: string
  image: string
  vin?: string
  chassisNumber?: string
  source: VehicleSource
  purchaseDate: Date
  status: VehicleStatus
  location?: string
  price: number
  documents: {
    invoice?: boolean
    exportCertificate?: boolean
    billOfLading?: boolean
    deregistration?: boolean
    inspection?: boolean
  }
  shipping?: {
    vessel?: string
    eta?: Date
    departurePort?: string
    arrivalPort?: string
  }
  auctionDetails?: {
    auctionHouse: string
    lotNumber: string
    auctionDate: Date
  }
  notes?: string
}

export default function MyVehiclesPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | VehicleStatus>('all')
  const [filterSource, setFilterSource] = useState<'all' | VehicleSource>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<'all' | '2024' | '2023' | '2022' | 'older'>('all')

  // Mock data - would come from API
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      title: '2018 Toyota Corolla Axio',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      vin: 'JTDBR32E820123456',
      chassisNumber: 'NZE161-3153697',
      source: 'auction',
      purchaseDate: new Date('2024-01-10'),
      status: 'in_transit',
      location: 'Pacific Ocean',
      price: 7350000,
      documents: {
        invoice: true,
        exportCertificate: true,
        billOfLading: true,
        deregistration: false,
        inspection: true
      },
      shipping: {
        vessel: 'NYK Delphinus',
        eta: new Date('2024-02-20'),
        departurePort: 'Yokohama Port',
        arrivalPort: 'Los Angeles Port'
      },
      auctionDetails: {
        auctionHouse: 'USS Tokyo',
        lotNumber: '42315',
        auctionDate: new Date('2024-01-10')
      }
    },
    {
      id: '2',
      title: '2022 Honda Vezel Hybrid',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      source: 'direct',
      purchaseDate: new Date('2024-01-05'),
      status: 'delivered',
      location: 'Customer Warehouse',
      price: 3200000,
      documents: {
        invoice: true,
        exportCertificate: true,
        billOfLading: true,
        deregistration: true,
        inspection: true
      },
      notes: 'Direct purchase from dealer stock'
    },
    {
      id: '3',
      title: '2019 Nissan Leaf',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
      source: 'export',
      purchaseDate: new Date('2023-11-15'),
      status: 'completed',
      price: 2800000,
      documents: {
        invoice: true,
        exportCertificate: true,
        billOfLading: true,
        deregistration: true,
        inspection: true
      },
      notes: 'Customer personal vehicle export'
    },
    {
      id: '4',
      title: '2020 Mazda CX-5',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      vin: 'JM3KFBDM1L0123456',
      source: 'auction',
      purchaseDate: new Date('2023-06-20'),
      status: 'completed',
      price: 4500000,
      documents: {
        invoice: true,
        exportCertificate: true,
        billOfLading: true,
        deregistration: true,
        inspection: true
      },
      auctionDetails: {
        auctionHouse: 'HAA Kobe',
        lotNumber: '78234',
        auctionDate: new Date('2023-06-20')
      }
    },
    {
      id: '5',
      title: '2021 Toyota Prius',
      image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
      chassisNumber: 'ZVW51-8234567',
      source: 'auction',
      purchaseDate: new Date('2024-01-25'),
      status: 'preparing',
      location: 'Auction Yard',
      price: 3800000,
      documents: {
        invoice: true,
        exportCertificate: false,
        billOfLading: false,
        deregistration: false,
        inspection: false
      },
      auctionDetails: {
        auctionHouse: 'TAA Yokohama',
        lotNumber: '15789',
        auctionDate: new Date('2024-01-25')
      }
    }
  ])

  const getStatusBadge = (status: VehicleStatus) => {
    const statusConfig = {
      payment_pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Payment Pending' },
      preparing: { color: 'bg-blue-100 text-blue-800', label: 'Preparing' },
      in_transit: { color: 'bg-purple-100 text-purple-800', label: 'In Transit' },
      at_port: { color: 'bg-indigo-100 text-indigo-800', label: 'At Port' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      completed: { color: 'bg-gray-100 text-gray-800', label: 'Completed' }
    }
    const config = statusConfig[status]
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getSourceBadge = (source: VehicleSource) => {
    const sourceConfig = {
      auction: { color: 'bg-orange-100 text-orange-800', label: 'Auction', icon: '🔨' },
      direct: { color: 'bg-blue-100 text-blue-800', label: 'Direct Purchase', icon: '🏪' },
      export: { color: 'bg-green-100 text-green-800', label: 'Export Service', icon: '📦' }
    }
    const config = sourceConfig[source]
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color} flex items-center gap-1`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    )
  }

  const formatJPY = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Filter vehicles
  const filteredVehicles = vehicles.filter(vehicle => {
    // Status filter
    if (filterStatus !== 'all' && vehicle.status !== filterStatus) return false
    
    // Source filter
    if (filterSource !== 'all' && vehicle.source !== filterSource) return false
    
    // Year filter
    if (selectedYear !== 'all') {
      const year = vehicle.purchaseDate.getFullYear()
      if (selectedYear === '2024' && year !== 2024) return false
      if (selectedYear === '2023' && year !== 2023) return false
      if (selectedYear === '2022' && year !== 2022) return false
      if (selectedYear === 'older' && year >= 2022) return false
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        vehicle.title.toLowerCase().includes(query) ||
        vehicle.vin?.toLowerCase().includes(query) ||
        vehicle.chassisNumber?.toLowerCase().includes(query) ||
        vehicle.auctionDetails?.lotNumber.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  // Group vehicles by status for summary
  const vehiclesByStatus = {
    active: vehicles.filter(v => ['payment_pending', 'preparing', 'in_transit', 'at_port'].includes(v.status)).length,
    delivered: vehicles.filter(v => v.status === 'delivered').length,
    completed: vehicles.filter(v => v.status === 'completed').length,
    total: vehicles.length
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Vehicles</h1>
        <p className="text-gray-600">Manage all your vehicles, documents, and shipping status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Vehicles</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">{vehiclesByStatus.total}</div>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Shipments</span>
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-blue-600">{vehiclesByStatus.active}</div>
          <p className="text-xs text-gray-500 mt-1">In progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Delivered</span>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-green-600">{vehiclesByStatus.delivered}</div>
          <p className="text-xs text-gray-500 mt-1">Ready for pickup</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completed</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">{vehiclesByStatus.completed}</div>
          <p className="text-xs text-gray-500 mt-1">Archived</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by vehicle name, VIN, chassis number, or lot number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as VehicleStatus | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="payment_pending">Payment Pending</option>
            <option value="preparing">Preparing</option>
            <option value="in_transit">In Transit</option>
            <option value="at_port">At Port</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
          </select>

          {/* Source Filter */}
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value as VehicleSource | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="all">All Sources</option>
            <option value="auction">Auction</option>
            <option value="direct">Direct Purchase</option>
            <option value="export">Export Service</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value as 'all' | '2024' | '2023' | '2022' | 'older')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="older">Before 2022</option>
          </select>
        </div>
      </div>

      {/* Vehicles List */}
      <div className="space-y-4">
        {filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Vehicle Image */}
                  <div className="relative w-full lg:w-48 h-32 lg:h-32 flex-shrink-0">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2">
                      {getSourceBadge(vehicle.source)}
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{vehicle.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          {vehicle.vin && (
                            <span className="flex items-center gap-1">
                              <span className="font-medium">VIN:</span> {vehicle.vin}
                            </span>
                          )}
                          {vehicle.chassisNumber && (
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Chassis:</span> {vehicle.chassisNumber}
                            </span>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(vehicle.status)}
                    </div>

                    {/* Purchase Info */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {vehicle.purchaseDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <p className="text-sm font-medium text-gray-900">{formatJPY(vehicle.price)}</p>
                      </div>
                      {vehicle.location && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Current Location</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.location}</p>
                        </div>
                      )}
                      {vehicle.shipping?.eta && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">ETA</p>
                          <p className="text-sm font-medium text-gray-900">
                            {vehicle.shipping.eta.toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Auction Details */}
                    {vehicle.auctionDetails && (
                      <div className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Auction:</span> {vehicle.auctionDetails.auctionHouse} • 
                        Lot #{vehicle.auctionDetails.lotNumber} • 
                        {vehicle.auctionDetails.auctionDate.toLocaleDateString()}
                      </div>
                    )}

                    {/* Shipping Info */}
                    {vehicle.shipping && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-blue-900">
                            <strong>Vessel:</strong> {vehicle.shipping.vessel} • 
                            <strong> Route:</strong> {vehicle.shipping.departurePort} → {vehicle.shipping.arrivalPort}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {vehicle.notes && (
                      <div className="text-sm text-gray-600 italic mb-4">
                        Note: {vehicle.notes}
                      </div>
                    )}

                    {/* Documents */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Documents:</span>
                        <div className="flex gap-2">
                          {vehicle.documents.invoice && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Invoice</span>
                          )}
                          {vehicle.documents.exportCertificate && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Export Cert</span>
                          )}
                          {vehicle.documents.billOfLading && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">B/L</span>
                          )}
                          {vehicle.documents.deregistration && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Dereg</span>
                          )}
                          {vehicle.documents.inspection && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Inspection</span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/bids/${vehicle.id}`}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          View Details
                        </Link>
                        <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium">
                          Documents
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Add Button for Staff */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#FA7921] text-white rounded-full shadow-lg hover:bg-[#FA7921]/90 transition-colors flex items-center justify-center group">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Add Non-Auction Vehicle
        </span>
      </button>
    </div>
  )
}