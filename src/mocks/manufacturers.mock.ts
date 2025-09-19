// Manufacturers Data (for auctions page)
export interface Manufacturer {
  id: string
  name: string
  vehicleCount: number
  popular?: boolean
}

export const mockManufacturers: Manufacturer[] = [
  // Japanese
  { id: 'toyota', name: 'Toyota', vehicleCount: 245, popular: true },
  { id: 'lexus', name: 'Lexus', vehicleCount: 156, popular: true },
  { id: 'honda', name: 'Honda', vehicleCount: 198, popular: true },
  { id: 'nissan', name: 'Nissan', vehicleCount: 167, popular: true },
  { id: 'mazda', name: 'Mazda', vehicleCount: 145, popular: true },
  { id: 'subaru', name: 'Subaru', vehicleCount: 134 },
  { id: 'suzuki', name: 'Suzuki', vehicleCount: 156 },
  { id: 'mitsubishi', name: 'Mitsubishi', vehicleCount: 98 },
  { id: 'daihatsu', name: 'Daihatsu', vehicleCount: 67 },
  { id: 'infiniti', name: 'Infiniti', vehicleCount: 54 },
  { id: 'acura', name: 'Acura', vehicleCount: 43 },
  { id: 'isuzu', name: 'Isuzu', vehicleCount: 38 },

  // German
  { id: 'mercedes', name: 'Mercedes-Benz', vehicleCount: 134 },
  { id: 'bmw', name: 'BMW', vehicleCount: 145, popular: true },
  { id: 'audi', name: 'Audi', vehicleCount: 123 },
  { id: 'volkswagen', name: 'Volkswagen', vehicleCount: 112 },
  { id: 'porsche', name: 'Porsche', vehicleCount: 89, popular: true },
  { id: 'mini', name: 'MINI', vehicleCount: 56 },
  { id: 'smart', name: 'Smart', vehicleCount: 23 },
  { id: 'opel', name: 'Opel', vehicleCount: 31 },

  // American
  { id: 'tesla', name: 'Tesla', vehicleCount: 45, popular: true },
  { id: 'ford', name: 'Ford', vehicleCount: 178 },
  { id: 'chevrolet', name: 'Chevrolet', vehicleCount: 134 },
  { id: 'jeep', name: 'Jeep', vehicleCount: 92 },
  { id: 'dodge', name: 'Dodge', vehicleCount: 78 },
  { id: 'cadillac', name: 'Cadillac', vehicleCount: 34 },
  { id: 'gmc', name: 'GMC', vehicleCount: 67 },
  { id: 'chrysler', name: 'Chrysler', vehicleCount: 29 },
  { id: 'lincoln', name: 'Lincoln', vehicleCount: 21 },
  { id: 'ram', name: 'RAM', vehicleCount: 45 },
  { id: 'hummer', name: 'Hummer', vehicleCount: 12 },

  // British
  { id: 'jaguar', name: 'Jaguar', vehicleCount: 67 },
  { id: 'land-rover', name: 'Land Rover', vehicleCount: 78 },
  { id: 'bentley', name: 'Bentley', vehicleCount: 7 },
  { id: 'rolls-royce', name: 'Rolls-Royce', vehicleCount: 5 },
  { id: 'aston-martin', name: 'Aston Martin', vehicleCount: 9 },
  { id: 'mclaren', name: 'McLaren', vehicleCount: 6 },
  { id: 'lotus', name: 'Lotus', vehicleCount: 11 },
  { id: 'mg', name: 'MG', vehicleCount: 24 },

  // Korean
  { id: 'hyundai', name: 'Hyundai', vehicleCount: 189 },
  { id: 'kia', name: 'Kia', vehicleCount: 145 },
  { id: 'genesis', name: 'Genesis', vehicleCount: 23 },
  { id: 'ssangyong', name: 'SsangYong', vehicleCount: 18 },

  // Italian
  { id: 'ferrari', name: 'Ferrari', vehicleCount: 12 },
  { id: 'lamborghini', name: 'Lamborghini', vehicleCount: 8 },
  { id: 'maserati', name: 'Maserati', vehicleCount: 15 },
  { id: 'alfa-romeo', name: 'Alfa Romeo', vehicleCount: 19 },
  { id: 'fiat', name: 'Fiat', vehicleCount: 28 },
  { id: 'lancia', name: 'Lancia', vehicleCount: 14 },

  // French
  { id: 'peugeot', name: 'Peugeot', vehicleCount: 67 },
  { id: 'renault', name: 'Renault', vehicleCount: 54 },
  { id: 'citroen', name: 'Citroen', vehicleCount: 41 },
  { id: 'alpine', name: 'Alpine', vehicleCount: 3 },
  { id: 'bugatti', name: 'Bugatti', vehicleCount: 2 },

  // Swedish
  { id: 'volvo', name: 'Volvo', vehicleCount: 89 },
  { id: 'polestar', name: 'Polestar', vehicleCount: 12 },
  { id: 'koenigsegg', name: 'Koenigsegg', vehicleCount: 1 },

  // Other
  { id: 'pagani', name: 'Pagani', vehicleCount: 2 },
  { id: 'rimac', name: 'Rimac', vehicleCount: 1 },
  { id: 'lucid', name: 'Lucid', vehicleCount: 8 },
  { id: 'rivian', name: 'Rivian', vehicleCount: 14 },
]