'use client'

import { useState } from 'react'
import { BidGroup, GroupBidSummary } from '@/app/dashboard/group-bidding/types'

// Mock data for demonstration
const mockGroups: BidGroup[] = [
  {
    groupId: 'A',
    name: 'Group A - Premium Sedans',
    description: 'Buy any 2 cars from this selection',
    requiredWins: 2,
    totalVehicles: 3,
    status: 'active',
    createdAt: new Date(),
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    vehicles: [
      {
        id: 'v1',
        vehicleId: 'crown-001',
        title: 'Toyota Crown 2021',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        specs: { year: 2021, mileage: '25,000 km', transmission: 'Automatic' },
        startingPrice: 2000000,
        currentHighestBid: 2500000,
        yourBid: 2500000,
        bidStatus: 'winning',
        auctionEndTime: new Date(Date.now() + 12 * 60 * 60 * 1000)
      },
      {
        id: 'v2',
        vehicleId: 'rx7-001',
        title: 'Mazda RX-7 1999',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
        specs: { year: 1999, mileage: '68,000 km', transmission: 'Manual' },
        startingPrice: 8000000,
        currentHighestBid: 9000000,
        yourBid: 9000000,
        bidStatus: 'winning',
        auctionEndTime: new Date(Date.now() + 14 * 60 * 60 * 1000)
      },
      {
        id: 'v3',
        vehicleId: 'hiace-001',
        title: 'Toyota Hiace 2020',
        image: 'https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=400',
        specs: { year: 2020, mileage: '45,000 km', transmission: 'Automatic' },
        startingPrice: 2000000,
        currentHighestBid: 2500000,
        yourBid: 2500000,
        bidStatus: 'winning',
        auctionEndTime: new Date(Date.now() + 16 * 60 * 60 * 1000)
      }
    ]
  },
  {
    groupId: 'B',
    name: 'Group B - Economy Selection',
    description: 'Buy any 3 cars from this selection',
    requiredWins: 3,
    totalVehicles: 6,
    status: 'active',
    createdAt: new Date(),
    endTime: new Date(Date.now() + 36 * 60 * 60 * 1000),
    vehicles: [
      {
        id: 'v4',
        vehicleId: 'crown-002',
        title: 'Toyota Crown 2018',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
        specs: { year: 2018, mileage: '55,000 km', transmission: 'Automatic' },
        startingPrice: 1400000,
        currentHighestBid: 1600000,
        yourBid: 1600000,
        bidStatus: 'winning',
        auctionEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000)
      },
      {
        id: 'v5',
        vehicleId: 'crown-003',
        title: 'Toyota Crown 2016',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
        specs: { year: 2016, mileage: '78,000 km', transmission: 'Automatic' },
        startingPrice: 700000,
        currentHighestBid: 750000,
        yourBid: 750000,
        bidStatus: 'winning',
        auctionEndTime: new Date(Date.now() + 20 * 60 * 60 * 1000)
      },
      {
        id: 'v6',
        vehicleId: 'prius-001',
        title: 'Toyota Prius 2019',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400',
        specs: { year: 2019, mileage: '32,000 km', transmission: 'CVT' },
        startingPrice: 1200000,
        currentHighestBid: 1300000,
        yourBid: 1300000,
        bidStatus: 'winning',
        auctionEndTime: new Date(Date.now() + 22 * 60 * 60 * 1000)
      },
      {
        id: 'v7',
        vehicleId: 'prius-002',
        title: 'Toyota Prius 2020',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400',
        specs: { year: 2020, mileage: '28,000 km', transmission: 'CVT' },
        startingPrice: 1350000,
        currentHighestBid: 1450000,
        yourBid: undefined,
        bidStatus: undefined,
        auctionEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: 'v8',
        vehicleId: 'belta-001',
        title: 'Toyota Belta 2021',
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
        specs: { year: 2021, mileage: '15,000 km', transmission: 'Automatic' },
        startingPrice: 1100000,
        currentHighestBid: 1200000,
        yourBid: 1200000,
        bidStatus: 'outbid',
        auctionEndTime: new Date(Date.now() + 26 * 60 * 60 * 1000)
      },
      {
        id: 'v9',
        vehicleId: 'yaris-001',
        title: 'Toyota Yaris 2022',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400',
        specs: { year: 2022, mileage: '8,000 km', transmission: 'Automatic' },
        startingPrice: 2500000,
        currentHighestBid: 2700000,
        yourBid: undefined,
        bidStatus: undefined,
        auctionEndTime: new Date(Date.now() + 28 * 60 * 60 * 1000)
      }
    ]
  }
]

export default function GroupBiddingPanel() {
  const [activeGroups] = useState<BidGroup[]>(mockGroups)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [,] = useState<string | null>(null)

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const getGroupSummary = (group: BidGroup): GroupBidSummary => {
    const vehicleBids = group.vehicles
      .filter(v => v.yourBid)
      .map(v => ({
        id: `bid-${v.vehicleId}`,
        groupId: group.groupId,
        vehicleId: v.vehicleId,
        bidAmount: v.yourBid!,
        status: v.bidStatus || 'pending',
        placedAt: new Date(),
        lastUpdated: new Date()
      }))

    const currentWins = group.vehicles.filter(v => v.bidStatus === 'winning' || v.bidStatus === 'won').length
    const potentialWins = group.vehicles.filter(v => v.yourBid && (v.bidStatus === 'winning' || v.bidStatus === 'pending')).length
    const totalBidAmount = group.vehicles.reduce((sum, v) => sum + (v.yourBid || 0), 0)

    let status: GroupBidSummary['status'] = 'in-progress'
    if (currentWins >= group.requiredWins) {
      status = 'requirement-met'
    } else if (potentialWins < group.requiredWins) {
      status = 'requirement-not-met'
    }

    return {
      groupId: group.groupId,
      groupName: group.name,
      requiredWins: group.requiredWins,
      totalVehicles: group.totalVehicles,
      vehicleBids,
      currentWins,
      potentialWins,
      totalBidAmount,
      status
    }
  }

  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Bidding</h1>
            <p className="text-sm text-gray-600 mt-1">
              Select vehicles from groups and meet the minimum purchase requirements
            </p>
          </div>

          {/* Explanation Banner */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  How Group Bidding Works
                </p>
                <p className="text-sm text-yellow-800 mt-1">
                  When bidding on vehicles in a group, you must win the specified minimum number of vehicles from that group. 
                  For example, &quot;Buy any 2 from Group A&quot; means you need to win at least 2 vehicles from the available options in Group A.
                  You can bid different amounts on each vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {activeGroups.map(group => {
            const summary = getGroupSummary(group)
            const isExpanded = expandedGroups.includes(group.groupId)
            
            return (
              <div key={group.groupId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Group Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleGroupExpansion(group.groupId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-[#FA7921] text-white font-bold rounded-lg">
                          {group.groupId}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-600 mt-0.5">{group.description}</p>
                        </div>
                      </div>
                      
                      {/* Summary Stats */}
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Requirement:</span>
                          <span className="text-sm font-semibold text-gray-900">
                            Win {group.requiredWins} of {group.totalVehicles} vehicles
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Your Progress:</span>
                          <div className="flex items-center gap-1">
                            <span className={`text-sm font-semibold ${
                              summary.status === 'requirement-met' ? 'text-green-600' :
                              summary.status === 'requirement-not-met' ? 'text-red-600' :
                              'text-blue-600'
                            }`}>
                              {summary.currentWins} winning
                            </span>
                            <span className="text-sm text-gray-400">/</span>
                            <span className="text-sm text-gray-600">
                              {summary.vehicleBids.length} bids placed
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Total Bid:</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(summary.totalBidAmount)}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mt-3">
                        {summary.status === 'requirement-met' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Requirement Met
                          </span>
                        )}
                        {summary.status === 'requirement-not-met' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            ⚠ Need more bids to meet requirement
                          </span>
                        )}
                        {summary.status === 'in-progress' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className="ml-4">
                      <svg 
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Vehicle List */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.vehicles.map(vehicle => (
                        <div key={vehicle.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          {/* Vehicle Image */}
                          <div className="relative h-40 bg-gray-100">
                            <img 
                              src={vehicle.image} 
                              alt={vehicle.title}
                              className="w-full h-full object-cover"
                            />
                            {vehicle.bidStatus && (
                              <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                                vehicle.bidStatus === 'winning' || vehicle.bidStatus === 'won' 
                                  ? 'bg-green-100 text-green-800' 
                                  : vehicle.bidStatus === 'outbid' 
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {vehicle.bidStatus === 'winning' ? 'Winning' :
                                 vehicle.bidStatus === 'won' ? 'Won' :
                                 vehicle.bidStatus === 'outbid' ? 'Outbid' :
                                 'Pending'}
                              </span>
                            )}
                          </div>
                          
                          {/* Vehicle Details */}
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900">{vehicle.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span>{vehicle.specs.year}</span>
                              <span>•</span>
                              <span>{vehicle.specs.mileage}</span>
                              <span>•</span>
                              <span>{vehicle.specs.transmission}</span>
                            </div>
                            
                            {/* Bidding Info */}
                            <div className="mt-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Current Highest:</span>
                                <span className="font-semibold text-gray-900">
                                  {formatPrice(vehicle.currentHighestBid)}
                                </span>
                              </div>
                              
                              {vehicle.yourBid ? (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Your Bid:</span>
                                  <span className={`font-semibold ${
                                    vehicle.bidStatus === 'winning' || vehicle.bidStatus === 'won' 
                                      ? 'text-green-600' 
                                      : vehicle.bidStatus === 'outbid' 
                                      ? 'text-red-600'
                                      : 'text-blue-600'
                                  }`}>
                                    {formatPrice(vehicle.yourBid)}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Your Bid:</span>
                                  <span className="text-gray-400">Not placed</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Bid Actions */}
                            <div className="mt-4">
                              {vehicle.yourBid ? (
                                vehicle.bidStatus === 'outbid' ? (
                                  <button className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                                    Increase Bid
                                  </button>
                                ) : (
                                  <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                    Update Bid
                                  </button>
                                )
                              ) : (
                                <button className="w-full px-3 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-sm font-medium">
                                  Place Bid
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}