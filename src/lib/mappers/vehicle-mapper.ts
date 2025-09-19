// Map database fields to application fields
export interface DatabaseVehicle {
  lot_id: string
  date: string
  lot_date: string
  bid: number
  company: string
  model_year_en: number
  model_name_en: string
  model_detail: string
  grade_en: string
  model_type_en: string
  mileage_en: string
  mileage_num: number
  inspection_en: string
  equipment_en: string
  transmission_en: string
  awd: boolean
  left_hd: boolean
  truck: boolean
  special_num: number
  special: string
  displacement: string
  displacement_num: number
  start_price_en: string
  start_price_usd: number
  end_price_en: string
  end_price_usd: number
  average_price: number
  color_en: string
  color_basic_ref: string
  scores_en: string
  result_en: string
  result_num: number
  chassis_no: string
  company_ref: string
  model_ref: string
  auct_ref: string
  auct_system_ref: string
  auction_name: string
  pics_urls: string
}

export interface MappedVehicle {
  id: string
  lotNumber: string
  chassisNumber: string
  make: string
  model: string
  modelDetail: string
  year: number
  grade: string
  type: string
  mileage: number
  mileageDisplay: string
  transmission: string
  displacement: number
  color: string
  colorCategory: string
  isAWD: boolean
  isLeftHandDrive: boolean
  isTruck: boolean
  equipment: string[]
  inspection: string
  scores: {
    overall: number
    interior?: number
    exterior?: number
  }
  pricing: {
    startPrice: number
    startPriceUSD: number
    endPrice: number
    endPriceUSD: number
    averagePrice: number
  }
  auction: {
    name: string
    date: Date
    lotDate: Date
    result: string
    resultCode: number
    systemRef: string
  }
  images: string[]
  special: {
    code: number
    description: string
  }
}

export function mapVehicleFromDatabase(dbVehicle: DatabaseVehicle): MappedVehicle {
  // Parse scores if they're in string format
  const parseScores = (scoresStr: string) => {
    try {
      // Assuming scores come as "4.5" or "4.5/3.5/4.0" format
      const parts = scoresStr.split('/')
      if (parts.length === 3) {
        return {
          overall: parseFloat(parts[0] || '0') || 0,
          interior: parseFloat(parts[1] || '0') || 0,
          exterior: parseFloat(parts[2] || '0') || 0
        }
      }
      return {
        overall: parseFloat(scoresStr) || 0
      }
    } catch {
      return { overall: 0 }
    }
  }

  // Parse equipment string to array
  const parseEquipment = (equipmentStr: string): string[] => {
    if (!equipmentStr) return []
    return equipmentStr
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  }

  // Parse image URLs
  const parseImages = (imagesStr: string): string[] => {
    if (!imagesStr) return []
    try {
      // If it's JSON string
      if (imagesStr.startsWith('[')) {
        return JSON.parse(imagesStr)
      }
      // If it's comma-separated
      return imagesStr.split(',').map(url => url.trim()).filter(Boolean)
    } catch {
      return []
    }
  }

  return {
    id: dbVehicle.lot_id,
    lotNumber: dbVehicle.lot_id,
    chassisNumber: dbVehicle.chassis_no,
    make: dbVehicle.company,
    model: dbVehicle.model_name_en,
    modelDetail: dbVehicle.model_detail,
    year: dbVehicle.model_year_en,
    grade: dbVehicle.grade_en,
    type: dbVehicle.model_type_en,
    mileage: dbVehicle.mileage_num,
    mileageDisplay: dbVehicle.mileage_en,
    transmission: dbVehicle.transmission_en,
    displacement: dbVehicle.displacement_num,
    color: dbVehicle.color_en,
    colorCategory: dbVehicle.color_basic_ref,
    isAWD: dbVehicle.awd,
    isLeftHandDrive: dbVehicle.left_hd,
    isTruck: dbVehicle.truck,
    equipment: parseEquipment(dbVehicle.equipment_en),
    inspection: dbVehicle.inspection_en,
    scores: parseScores(dbVehicle.scores_en),
    pricing: {
      startPrice: parseInt(dbVehicle.start_price_en) || 0,
      startPriceUSD: dbVehicle.start_price_usd,
      endPrice: parseInt(dbVehicle.end_price_en) || 0,
      endPriceUSD: dbVehicle.end_price_usd,
      averagePrice: dbVehicle.average_price
    },
    auction: {
      name: dbVehicle.auction_name,
      date: new Date(dbVehicle.date),
      lotDate: new Date(dbVehicle.lot_date),
      result: dbVehicle.result_en,
      resultCode: dbVehicle.result_num,
      systemRef: dbVehicle.auct_system_ref
    },
    images: parseImages(dbVehicle.pics_urls),
    special: {
      code: dbVehicle.special_num,
      description: dbVehicle.special
    }
  }
}

// Map multiple vehicles
export function mapVehiclesFromDatabase(dbVehicles: DatabaseVehicle[]): MappedVehicle[] {
  return dbVehicles.map(mapVehicleFromDatabase)
}

// Convert mapped vehicle back to database format (for updates)
export function mapVehicleToDatabase(vehicle: Partial<MappedVehicle>): Partial<DatabaseVehicle> {
  const dbVehicle: Partial<DatabaseVehicle> = {}
  
  if (vehicle.id) dbVehicle.lot_id = vehicle.id
  if (vehicle.chassisNumber) dbVehicle.chassis_no = vehicle.chassisNumber
  if (vehicle.make) dbVehicle.company = vehicle.make
  if (vehicle.model) dbVehicle.model_name_en = vehicle.model
  if (vehicle.year) dbVehicle.model_year_en = vehicle.year
  if (vehicle.mileage) dbVehicle.mileage_num = vehicle.mileage
  if (vehicle.transmission) dbVehicle.transmission_en = vehicle.transmission
  if (vehicle.color) dbVehicle.color_en = vehicle.color
  
  // Add more mappings as needed
  
  return dbVehicle
}