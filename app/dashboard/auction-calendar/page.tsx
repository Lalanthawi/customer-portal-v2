'use client'

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

export default function AuctionCalendarPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  
  // Get unique auction houses count
  const getUniqueAuctionHouses = () => {
    const houses = new Set<string>()
    Object.values(auctionSchedule).forEach(auctions => {
      auctions.forEach(auction => {
        const house = auction.split(' ')[0]
        if (house) {
          houses.add(house)
        }
      })
    })
    return houses.size
  }

  const uniqueHousesCount = getUniqueAuctionHouses()

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-gray-900 tracking-[-0.02em] mb-2">
          Auction Calendar
        </h1>
        <p className="text-[16px] text-gray-600">
          Weekly auction schedule • Japan Standard Time (JST)
        </p>
      </div>

      {/* Table View */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-[13px] font-semibold text-gray-900 w-32">
                Day
              </th>
              <th className="text-left px-6 py-4 text-[13px] font-semibold text-gray-900">
                Auctions
              </th>
              <th className="text-center px-6 py-4 text-[13px] font-semibold text-gray-900 w-20">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(auctionSchedule).map(([day, auctions]) => {
              const isToday = day === today
              
              return (
                <tr 
                  key={day} 
                  className={`border-b border-gray-100 transition-colors ${
                    isToday ? 'bg-[#FA7921]/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`text-[14px] font-medium ${
                      isToday ? 'text-[#FA7921]' : 'text-gray-900'
                    }`}>
                      {day}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {auctions.map((auction, i) => (
                        <span 
                          key={i}
                          className={`px-2.5 py-1 rounded-md text-[12px] font-medium ${
                            isToday 
                              ? 'bg-[#FA7921]/10 text-[#FA7921]' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {auction}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[14px] font-semibold ${
                      isToday ? 'text-[#FA7921]' : 'text-gray-600'
                    }`}>
                      {auctions.length}
                    </span>
                  </td>
                </tr>
              )
            })}
            {/* Total Row */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-semibold text-[13px] text-gray-900">
                Total
              </td>
              <td className="px-6 py-4">
                <span className="text-[12px] text-gray-600">
                  {uniqueHousesCount} unique auction houses
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-[14px] font-bold text-gray-900">
                  {Object.values(auctionSchedule).flat().length}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-8 text-[13px] text-gray-600">
          <div>
            <span className="font-medium text-gray-900">43</span> auctions per week
          </div>
          <div>
            <span className="font-medium text-gray-900">10:00 AM</span> JST start time
          </div>
          <div>
            <span className="font-medium text-gray-900">1 hour</span> before auction bidding closes
          </div>
        </div>
      </div>
    </div>
  )
}