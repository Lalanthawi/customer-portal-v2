'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface AuctionResult {
  date: string
  lotNumber: string
  grade: string
  mileage: number
  color: string
  equipment: string
  startPrice: number
  finalPrice: number
  status: 'SOLD' | 'UNSOLD' | 'NEGOTIATING'
  location: string
}

interface PriceStatistics {
  average: number
  median: number
  min: number
  max: number
  count: number
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
}

interface MarketData {
  month: string
  averagePrice: number
  volume: number
  soldRate: number
}

export default function StatisticsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get parameters from URL
  const make = searchParams.get('make') || 'Toyota'
  const model = searchParams.get('model') || 'Corolla Axio'
  const year = searchParams.get('year') || '2018'
  const type = searchParams.get('type') || '1.5L Hybrid'
  
  const [selectedPeriod, setSelectedPeriod] = useState('6m')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table')

  // Mock auction results data
  const auctionResults: AuctionResult[] = [
    {
      date: '2024-01-15',
      lotNumber: 'LOT-2024-0892',
      grade: '4.5',
      mileage: 42360,
      color: 'Pearl White',
      equipment: 'Full Option',
      startPrice: 5200000,
      finalPrice: 7350000,
      status: 'SOLD',
      location: 'Tokyo'
    },
    {
      date: '2024-01-14',
      lotNumber: 'LOT-2024-0875',
      grade: '4.0',
      mileage: 38500,
      color: 'Black',
      equipment: 'Standard',
      startPrice: 5000000,
      finalPrice: 7100000,
      status: 'SOLD',
      location: 'Osaka'
    },
    {
      date: '2024-01-13',
      lotNumber: 'LOT-2024-0862',
      grade: '4.5',
      mileage: 45000,
      color: 'Silver',
      equipment: 'Navigation',
      startPrice: 4800000,
      finalPrice: 6900000,
      status: 'SOLD',
      location: 'Nagoya'
    },
    {
      date: '2024-01-12',
      lotNumber: 'LOT-2024-0845',
      grade: '3.5',
      mileage: 52000,
      color: 'White',
      equipment: 'Basic',
      startPrice: 4500000,
      finalPrice: 0,
      status: 'UNSOLD',
      location: 'Tokyo'
    },
    {
      date: '2024-01-11',
      lotNumber: 'LOT-2024-0832',
      grade: '4.0',
      mileage: 35000,
      color: 'Gray',
      equipment: 'Full Option',
      startPrice: 5500000,
      finalPrice: 7800000,
      status: 'SOLD',
      location: 'Yokohama'
    },
    {
      date: '2024-01-10',
      lotNumber: 'LOT-2024-0821',
      grade: '4.5',
      mileage: 28000,
      color: 'Pearl White',
      equipment: 'Leather',
      startPrice: 5800000,
      finalPrice: 8200000,
      status: 'SOLD',
      location: 'Kobe'
    },
    {
      date: '2024-01-09',
      lotNumber: 'LOT-2024-0815',
      grade: '3.5',
      mileage: 68000,
      color: 'Blue',
      equipment: 'Standard',
      startPrice: 4200000,
      finalPrice: 6500000,
      status: 'NEGOTIATING',
      location: 'Tokyo'
    },
    {
      date: '2024-01-08',
      lotNumber: 'LOT-2024-0803',
      grade: '4.0',
      mileage: 41000,
      color: 'Red',
      equipment: 'Navigation',
      startPrice: 5100000,
      finalPrice: 7200000,
      status: 'SOLD',
      location: 'Fukuoka'
    }
  ]

  // Calculate statistics
  const soldResults = auctionResults.filter(r => r.status === 'SOLD')
  const priceStats: PriceStatistics = {
    average: soldResults.reduce((sum, r) => sum + r.finalPrice, 0) / soldResults.length || 0,
    median: soldResults.length > 0 ? soldResults[Math.floor(soldResults.length / 2)].finalPrice : 0,
    min: Math.min(...soldResults.map(r => r.finalPrice)),
    max: Math.max(...soldResults.map(r => r.finalPrice)),
    count: soldResults.length,
    trend: 'up',
    trendPercentage: 5.2
  }

  // Mock market trend data
  const marketData: MarketData[] = [
    { month: 'Aug 2023', averagePrice: 6800000, volume: 142, soldRate: 78 },
    { month: 'Sep 2023', averagePrice: 6900000, volume: 156, soldRate: 82 },
    { month: 'Oct 2023', averagePrice: 7000000, volume: 168, soldRate: 80 },
    { month: 'Nov 2023', averagePrice: 7100000, volume: 175, soldRate: 85 },
    { month: 'Dec 2023', averagePrice: 7150000, volume: 182, soldRate: 83 },
    { month: 'Jan 2024', averagePrice: 7260000, volume: 195, soldRate: 87 }
  ]

  const formatJPY = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  // Chart visualization (simplified bars)
  const maxPrice = Math.max(...marketData.map(d => d.averagePrice))
  const getBarHeight = (price: number) => (price / maxPrice) * 100

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
                  Consolidated Market Statistics
                </h1>
                <p className="text-sm text-gray-700">
                  {year} {make} {model} • {type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
              <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-700">Average Price</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatJPY(priceStats.average)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {priceStats.trend === 'up' ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  <span className={`text-sm font-medium ${priceStats.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {priceStats.trendPercentage}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-700">Price Range</p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {formatJPY(priceStats.min)} - {formatJPY(priceStats.max)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Median: {formatJPY(priceStats.median)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-700">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{marketData[marketData.length - 1].volume}</p>
                <p className="text-sm text-gray-600 mt-2">Last 30 days</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-700">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{marketData[marketData.length - 1].soldRate}%</p>
                <p className="text-sm text-gray-600 mt-2">Vehicles sold</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Period:</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Grade:</label>
              <select 
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="all">All Grades</option>
                <option value="4.5+">4.5 and above</option>
                <option value="4.0+">4.0 and above</option>
                <option value="3.5+">3.5 and above</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Location:</label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="tokyo">Tokyo</option>
                <option value="osaka">Osaka</option>
                <option value="nagoya">Nagoya</option>
                <option value="yokohama">Yokohama</option>
              </select>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-[#FA7921] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'chart' 
                    ? 'bg-[#FA7921] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Chart View
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Trend Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Price Trend Analysis</h2>
              
              {viewMode === 'chart' ? (
                <div>
                  <div className="h-64 flex items-end justify-between gap-4 mb-4">
                    {marketData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: `${getBarHeight(data.averagePrice)}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                            ¥{(data.averagePrice / 1000000).toFixed(1)}M
                          </div>
                          <div className="w-full h-full bg-gradient-to-t from-[#FA7921] to-[#FFB956] rounded-t-lg"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    {marketData.map((data, index) => (
                      <div key={index} className="flex-1 text-center">
                        {data.month.split(' ')[0]}<br/>{data.month.split(' ')[1]}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Period</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Avg Price</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Volume</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Sold Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-700">{data.month}</td>
                          <td className="py-3 px-4 text-right font-medium">{formatJPY(data.averagePrice)}</td>
                          <td className="py-3 px-4 text-right">{data.volume}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              data.soldRate >= 85 ? 'bg-green-100 text-green-800' :
                              data.soldRate >= 75 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {data.soldRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Auction Results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Auction Results</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Date</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Lot #</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Grade</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-900 text-sm">Mileage</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Color</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-900 text-sm">Start</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-900 text-sm">Final</th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-900 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctionResults.map((result, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm text-gray-700">{result.date}</td>
                        <td className="py-3 px-2 text-sm">
                          <Link href={`/dashboard/vehicle/${result.lotNumber}`} className="text-[#FA7921] hover:underline">
                            {result.lotNumber}
                          </Link>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                            {result.grade}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-right">{formatNumber(result.mileage)} km</td>
                        <td className="py-3 px-2 text-sm text-gray-700">{result.color}</td>
                        <td className="py-3 px-2 text-sm text-right font-medium">¥{(result.startPrice / 1000000).toFixed(1)}M</td>
                        <td className="py-3 px-2 text-sm text-right font-bold">
                          {result.status === 'SOLD' ? `¥${(result.finalPrice / 1000000).toFixed(1)}M` : '-'}
                        </td>
                        <td className="py-3 px-2 text-sm text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            result.status === 'SOLD' ? 'bg-green-100 text-green-800' :
                            result.status === 'UNSOLD' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing {auctionResults.length} of {auctionResults.length} results
                </p>
                <button className="text-sm text-[#FA7921] hover:underline font-medium">
                  Load More Results →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Distribution</h3>
              
              <div className="space-y-3">
                {[
                  { grade: '4.5', count: 3, percentage: 37.5 },
                  { grade: '4.0', count: 3, percentage: 37.5 },
                  { grade: '3.5', count: 2, percentage: 25 }
                ].map((item) => (
                  <div key={item.grade}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Grade {item.grade}</span>
                      <span className="text-sm text-gray-600">{item.count} vehicles</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FA7921] to-[#FFB956] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Colors</h3>
              
              <div className="space-y-2">
                {[
                  { color: 'Pearl White', count: 2, hex: '#F8F8FF' },
                  { color: 'Black', count: 1, hex: '#000000' },
                  { color: 'Silver', count: 1, hex: '#C0C0C0' },
                  { color: 'Gray', count: 1, hex: '#808080' },
                  { color: 'White', count: 1, hex: '#FFFFFF' },
                  { color: 'Blue', count: 1, hex: '#0000FF' },
                  { color: 'Red', count: 1, hex: '#FF0000' }
                ].map((item) => (
                  <div key={item.color} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: item.hex }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.color}</span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Common Equipment</h3>
              
              <div className="flex flex-wrap gap-2">
                {[
                  'Navigation', 'Full Option', 'Leather', 'Standard', 'Basic'
                ].map((equipment) => (
                  <span 
                    key={equipment}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {equipment}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Insights</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-700 mb-1">Best Value Range</p>
                  <p className="font-semibold text-gray-900">¥6.5M - ¥7.5M</p>
                  <p className="text-xs text-gray-700 mt-1">Most vehicles sold in this range</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-700 mb-1">Price vs Mileage</p>
                  <p className="text-sm text-gray-700">
                    Every 10,000km reduces price by approximately ¥200,000
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-700 mb-1">Best Time to Buy</p>
                  <p className="font-semibold text-gray-900">End of Month</p>
                  <p className="text-xs text-gray-700 mt-1">Prices typically 3-5% lower</p>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-gradient-to-r from-[#FA7921] to-[#FFB956] rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Get Full Report</h3>
              <p className="text-sm text-white/90 mb-4">
                Download comprehensive analysis with historical data and predictions
              </p>
              <button className="w-full py-2 bg-white text-[#FA7921] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Download PDF Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}