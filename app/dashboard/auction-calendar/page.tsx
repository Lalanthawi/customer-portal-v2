'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin,
  ChevronRight
} from 'lucide-react'

const auctionSchedule = {
  "Monday": [
    "Honda Kansai",
    "Honda Nagoya", 
    "Honda Tokyo",
    "JU Tokyo",
    "TAA Kinki",
    "USS Yokohama",
    "USSR Nagoya"
  ],
  "Tuesday": [
    "CAA Gifu",
    "CAA Tokyo",
    "JU Saitama",
    "TAA Hiroshima",
    "USS Kobe",
    "TAA Kinki",
    "USS Yokohama"
  ],
  "Wednesday": [
    "Bay Auc Osaka",
    "CAA Chubu",
    "JAA Hyogo",
    "Mirive Saitama",
    "USS Kobe"
  ],
  "Thursday": [
    "JU Aichi",
    "LUM Kobe",
    "Mirive Osaka",
    "NAA Osaka",
    "TAA Chubu",
    "TAA Kanto",
    "USS Tokyo"
  ],
  "Friday": [
    "Arai Bayside",
    "JU Okayama LAA",
    "MIRIVE Aichi",
    "NAA Tokyo",
    "USS Nagoya",
    "USS Osaka",
    "USS Saitama"
  ],
  "Saturday": [
    "Arai VT",
    "HAA Kobe",
    "JU Gifu",
    "TAA Hygo",
    "TAA Yokohama",
    "USS Gunma",
    "USS Kyushu",
    "USS Okayama",
    "USS Shizuoka",
    "ZIP Tokyo"
  ]
}

// Specific auction location mapping
const auctionLocationMap: { [key: string]: string } = {
  // CAA auctions
  'CAA Gifu': 'Gifu Prefecture',
  'CAA Tokyo': 'Chiba Prefecture',
  'CAA Chubu': 'Chubu Region',

  // JU auctions
  'JU Saitama': 'Saitama Prefecture',
  'JU Tokyo': 'Tokyo Metropolitan Area',
  'JU Aichi': 'Aichi Prefecture',
  'JU Okayama LAA': 'Okayama Prefecture',
  'JU Gifu': 'Gifu Prefecture',

  // TAA auctions
  'TAA Kinki': 'Kansai Region',
  'TAA Hiroshima': 'Hiroshima Prefecture',
  'TAA Chubu': 'Chubu Region',
  'TAA Kanto': 'Kanto Region',
  'TAA Hygo': 'Hyogo Prefecture',
  'TAA Yokohama': 'Kanagawa Prefecture',

  // USS auctions
  'USS Yokohama': 'Kanagawa Prefecture',
  'USS Kobe': 'Hyogo Prefecture',
  'USS Tokyo': 'Tokyo Metropolitan Area',
  'USS Nagoya': 'Aichi Prefecture',
  'USS Osaka': 'Osaka Prefecture',
  'USS Saitama': 'Saitama Prefecture',
  'USS Gunma': 'Gunma Prefecture',
  'USS Kyushu': 'Kyushu Region',
  'USS Okayama': 'Okayama Prefecture',
  'USS Shizuoka': 'Shizuoka Prefecture',

  // Honda auctions
  'Honda Kansai': 'Kansai Region',
  'Honda Nagoya': 'Aichi Prefecture',
  'Honda Tokyo': 'Tokyo Metropolitan Area',

  // NAA auctions
  'NAA Osaka': 'Osaka Prefecture',
  'NAA Tokyo': 'Tokyo Metropolitan Area',

  // Other auctions
  'Bay Auc Osaka': 'Osaka Prefecture',
  'JAA Hyogo': 'Hyogo Prefecture',
  'Mirive Saitama': 'Saitama Prefecture',
  'Mirive Osaka': 'Osaka Prefecture',
  'MIRIVE Aichi': 'Aichi Prefecture',
  'LUM Kobe': 'Hyogo Prefecture',
  'HAA Kobe': 'Hyogo Prefecture',
  'Arai Bayside': 'Chiba Prefecture',
  'Arai VT': 'Chiba Prefecture',
  'ZIP Tokyo': 'Tokyo Metropolitan Area',
  'USSR Nagoya': 'Aichi Prefecture'
}

// Auction house information with colors
const auctionHouseInfo: { [key: string]: { color: string, avgVehicles: number } } = {
  'USS': { color: '#3B82F6', avgVehicles: 15000 },
  'TAA': { color: '#10B981', avgVehicles: 8000 },
  'HAA': { color: '#8B5CF6', avgVehicles: 12000 },
  'JU': { color: '#F97316', avgVehicles: 6000 },
  'CAA': { color: '#EF4444', avgVehicles: 4000 },
  'NAA': { color: '#6366F1', avgVehicles: 3000 },
  'Honda': { color: '#64748B', avgVehicles: 5000 },
  'MIRIVE': { color: '#14B8A6', avgVehicles: 2500 },
  'Arai': { color: '#EC4899', avgVehicles: 2000 },
  'Bay': { color: '#06B6D4', avgVehicles: 1500 },
  'JAA': { color: '#F59E0B', avgVehicles: 1800 },
  'LUM': { color: '#84CC16', avgVehicles: 1200 },
  'ZIP': { color: '#F43F5E', avgVehicles: 2200 },
  'USSR': { color: '#6B7280', avgVehicles: 1000 }
}

export default function AuctionCalendarPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  
  // Calculate statistics

  const getAuctionHouseKey = (auction: string): string => {
    return Object.keys(auctionHouseInfo).find(key => 
      auction.toLowerCase().includes(key.toLowerCase())
    ) || 'Unknown'
  }

  const getAuctionColor = (auction: string): string => {
    const key = getAuctionHouseKey(auction)
    return auctionHouseInfo[key]?.color || '#6B7280'
  }

  const getAuctionLocation = (auction: string): string => {
    return auctionLocationMap[auction] || ''
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-gray-900 tracking-[-0.02em] mb-2">
          Auction Calendar
        </h1>
        <p className="text-[16px] text-gray-600">
          Weekly auction schedule across Japan • All times in JST
        </p>
      </div>

      {/* Main Calendar Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
        {Object.entries(auctionSchedule).map(([day, auctions]) => {
          const isToday = day === today
          const isSelected = selectedDay === day
          
          return (
            <Card 
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={`
                relative overflow-hidden cursor-pointer transition-all duration-300
                ${isToday ? 'ring-1 sm:ring-2 ring-[#FA7921] shadow-md sm:shadow-lg' : 'hover:shadow-md'}
                ${isSelected ? 'bg-gray-50' : 'bg-white'}
              `}
            >
              <CardHeader className={`p-2 sm:p-3 lg:p-4 pb-2 sm:pb-3 ${isToday ? 'bg-gradient-to-r from-[#FA7921]/10 to-transparent' : ''}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs sm:text-sm font-semibold ${isToday ? 'text-[#FA7921]' : 'text-gray-900'}`}>
                    {day.substring(0, 3).toUpperCase()}
                  </h3>
                  {isToday && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FA7921] rounded-full animate-pulse" />
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{auctions.length} auctions</p>
              </CardHeader>
              <CardContent className="p-2 sm:p-3 lg:p-4 pt-1 sm:pt-2">
                <div className="space-y-1 sm:space-y-1.5">
                  {/* Show fewer items on mobile */}
                  {auctions.slice(0, 2).map((auction, i) => {
                    const color = getAuctionColor(auction)
                    return (
                      <div key={i} className="flex items-center gap-1 sm:gap-2">
                        <div 
                          className="w-0.5 sm:w-1 h-3 sm:h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] sm:text-[11px] text-gray-700 truncate">
                          {auction}
                        </span>
                      </div>
                    )
                  })}
                  {auctions.length > 2 && (
                    <p className="text-[9px] sm:text-[10px] text-gray-500 pl-2 sm:pl-3">
                      +{auctions.length - 2} more
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Schedule Table - Mobile Optimized */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <CardHeader className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
                {selectedDay ? `${selectedDay} Schedule` : 'Weekly Schedule'}
              </CardTitle>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                {selectedDay 
                  ? `${auctionSchedule[selectedDay as keyof typeof auctionSchedule]?.length || 0} auctions scheduled`
                  : 'Tap a day to filter • Bidding closes 1 hour before'
                }
              </p>
            </div>
            {selectedDay && (
              <button
                onClick={() => setSelectedDay(null)}
                className="text-[11px] sm:text-xs text-gray-500 hover:text-gray-700 self-start sm:self-auto"
              >
                Show all days
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-[12px] font-semibold text-gray-600 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="text-left px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-[12px] font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Time
                  </th>
                  <th className="text-left px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-[12px] font-semibold text-gray-600 uppercase tracking-wider">
                    Auction
                  </th>
                  <th className="text-left px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-[12px] font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Location
                  </th>
                  <th className="text-right px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-[12px] font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Est. Vehicles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(auctionSchedule)
                  .filter(([day]) => !selectedDay || day === selectedDay)
                  .map(([day, auctions]) => {
                    const isToday = day === today
                    
                    return auctions.map((auction, index) => {
                      const houseKey = getAuctionHouseKey(auction)
                      const info = auctionHouseInfo[houseKey]
                      const color = info?.color || '#6B7280'
                      
                      return (
                        <tr 
                          key={`${day}-${index}`}
                          className={`transition-colors ${
                            isToday ? 'bg-[#FA7921]/5' : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                            {index === 0 && (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className={`text-[11px] sm:text-[13px] font-medium ${
                                  isToday ? 'text-[#FA7921]' : 'text-gray-900'
                                }`}>
                                  {day.substring(0, 3)}
                                </span>
                                {isToday && (
                                  <Badge className="bg-[#FA7921] text-white text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5">
                                    TODAY
                                  </Badge>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-3 text-[11px] sm:text-[13px] text-gray-600 hidden sm:table-cell">
                            10:00 AM
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-3">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div 
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-[11px] sm:text-[13px] font-medium text-gray-900 break-words">
                                {auction}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-3 hidden md:table-cell">
                            {getAuctionLocation(auction) && (
                              <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-600">
                                <MapPin className="w-3 h-3" />
                                {getAuctionLocation(auction)}
                              </div>
                            )}
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-3 text-right hidden lg:table-cell">
                            <span className="text-[11px] sm:text-[13px] text-gray-600">
                              ~{info?.avgVehicles.toLocaleString() || '1,000'}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  }).flat()}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Major Auction Houses - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
        {['USS', 'TAA', 'HAA'].map(house => {
          const info = auctionHouseInfo[house]
          const auctionCount = Object.values(auctionSchedule).flat().filter(a => 
            a.toLowerCase().includes(house.toLowerCase())
          ).length
          
          return (
            <Card key={house} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-3 sm:p-4 pb-2.5 sm:pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: info?.color || '#6B7280' }}
                    />
                    <CardTitle className="text-[13px] sm:text-sm font-semibold text-gray-900">{house}</CardTitle>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-2.5 sm:pt-3 space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-[11px] text-gray-600">Weekly auctions</span>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-gray-900">{auctionCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-[11px] text-gray-600">Avg. vehicles</span>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-gray-900">~{info?.avgVehicles?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-[11px] text-gray-600">Locations</span>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-gray-900">Multiple</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer Info - Mobile Optimized */}
      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-[11px] sm:text-[12px] mb-1">Auction Times</p>
            <p className="text-gray-600 text-[10px] sm:text-[11px]">Most auctions start at 10:00 AM JST</p>
            <p className="text-gray-600 text-[10px] sm:text-[11px]">Bidding closes 1 hour before start</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-[11px] sm:text-[12px] mb-1">How to Participate</p>
            <p className="text-gray-600 text-[10px] sm:text-[11px]">Submit bids through our platform</p>
            <p className="text-gray-600 text-[10px] sm:text-[11px]">Get instant notifications on bid status</p>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-semibold text-gray-900 text-[11px] sm:text-[12px] mb-1">Need Help?</p>
            <p className="text-gray-600 text-[10px] sm:text-[11px]">Contact your sales representative</p>
            <p className="text-gray-600 text-[10px] sm:text-[11px]">Available Mon-Sat, 9:00 AM - 6:00 PM JST</p>
          </div>
        </div>
      </div>
    </div>
  )
}