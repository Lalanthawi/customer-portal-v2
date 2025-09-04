export const auctionHousesByDay = {
  Monday: [
    "Honda Kansai",
    "Honda Nagoya",
    "Honda Tokyo",
    "JU Tokyo",
    "TAA Kinki",
    "USS Yokohama",
    "USSR Nagoya"
  ],
  Tuesday: [
    "CAA Gifu",
    "CAA Tokyo",
    "JU Saitama",
    "TAA Hiroshima",
    "USS Kobe",
    "TAA Kinki",
    "USS Yokohama"
  ],
  Wednesday: [
    "Bay Auc Osaka",
    "CAA Chubu",
    "JAA Hyogo",
    "Mirive Saitama",
    "USS Kobe"
  ],
  Thursday: [
    "JU Aichi",
    "LUM Kobe",
    "Mirive Osaka",
    "NAA Osaka",
    "TAA Chubu",
    "TAA Kanto",
    "USS Tokyo"
  ],
  Friday: [
    "Arai Bayside",
    "JU Okayama LAA",
    "MIRIVE Aichi",
    "NAA Tokyo",
    "USS Nagoya",
    "USS Osaka",
    "USS Saitama"
  ],
  Saturday: [
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

// Get all unique auction houses
export const allAuctionHouses = Array.from(
  new Set(Object.values(auctionHousesByDay).flat())
).sort()

// Helper function to get a random auction house
export const getRandomAuctionHouse = (): string => {
  return allAuctionHouses[Math.floor(Math.random() * allAuctionHouses.length)] || 'USS Tokyo'
}

// Helper function to get auction houses for today
export const getTodayAuctionHouses = (): string[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
  const today = days[new Date().getDay()]
  const houses = auctionHousesByDay[today as keyof typeof auctionHousesByDay]
  return houses ? [...houses] : []
}