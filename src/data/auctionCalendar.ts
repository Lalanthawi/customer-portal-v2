// Auction Calendar Data

// Weekly auction schedule
export const auctionSchedule = {
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
} as const

// Specific auction location mapping
export const auctionLocationMap: { [key: string]: string } = {
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

// Auction house information with colors and statistics
export const auctionHouseInfo: { [key: string]: { color: string, avgVehicles: number } } = {
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

// Helper function to get auction house key from auction name
export const getAuctionHouseKey = (auction: string): string => {
  return Object.keys(auctionHouseInfo).find(key =>
    auction.toLowerCase().includes(key.toLowerCase())
  ) || 'Unknown'
}

// Helper function to get auction color
export const getAuctionColor = (auction: string): string => {
  const key = getAuctionHouseKey(auction)
  return auctionHouseInfo[key]?.color || '#6B7280'
}

// Helper function to get auction location
export const getAuctionLocation = (auction: string): string => {
  return auctionLocationMap[auction] || ''
}