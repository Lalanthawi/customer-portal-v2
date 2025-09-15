// Vehicle detail types for the application
export interface VehicleDocument {
  id: string
  name: string
  type: 'invoice' | 'export_certificate' | 'bill_of_lading' | 'deregistration' | 'inspection_report' | 'insurance' | 'customs' | 'other'
  uploadDate: Date
  size: string
  url?: string
  status: 'available' | 'processing' | 'pending'
  required: boolean
}

export interface VehicleShipping {
  vessel?: string
  eta?: Date
  departurePort?: string
  arrivalPort?: string
  containerNumber?: string
  bookingNumber?: string
}

export interface VehicleAuctionDetails {
  auctionHouse: string
  lotNumber: string
  auctionDate: Date
  grade?: string
  sheetUrl?: string
  location?: string
}

export interface VehicleSpecifications {
  doors: number
  seats: number
  driveType: '2WD' | '4WD' | 'AWD'
  bodyType: string
  features: string[]
}

export interface VehicleDetails {
  id: string
  title: string
  images: string[]
  vin?: string
  chassisNumber?: string
  engineNumber?: string
  make: string
  model: string
  year: number
  color: string
  mileage: number
  transmission: 'automatic' | 'manual' | 'cvt'
  transmissionType?: string // FAT, 5MT, etc.
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  engineSize: string
  type?: string // Model code like GDJ250W
  grade?: string // VX, ZX, GR Sport, etc.
  source: 'auction' | 'direct' | 'export'
  purchaseDate: Date
  status: 'payment_pending' | 'preparing' | 'in_transit' | 'at_port' | 'delivered' | 'completed'
  location?: string
  price: number
  documents: VehicleDocument[]
  shipping?: VehicleShipping
  auctionDetails?: VehicleAuctionDetails
  specifications?: VehicleSpecifications
  notes?: string
}

// Mock data generator for development
export function generateMockVehicle(id: string): VehicleDetails {
  // This would be replaced with actual API call
  const isLandCruiser = id === '1' || id === 'land-cruiser-250'
  
  if (isLandCruiser) {
    return {
      id,
      title: 'Toyota Land Cruiser 250 VX 4WD',
      images: Array.from({ length: 12 }, (_, i) => `/images/singlecar/${i}.jpeg`),
      vin: 'GDJ250W-001234',
      chassisNumber: 'GDJ250W-9876543',
      engineNumber: '1GD-FTV-123456',
      make: 'Toyota',
      model: 'Land Cruiser 250',
      year: 2024,
      color: 'Brown',
      mileage: 13000,
      transmission: 'automatic',
      transmissionType: 'FAT (Full Automatic)',
      fuelType: 'diesel',
      engineSize: '2.8L Turbo',
      type: 'GDJ250W',
      grade: 'VX',
      source: 'auction',
      purchaseDate: new Date('2024-01-10'),
      status: 'in_transit',
      location: 'Pacific Ocean',
      price: 5600000,
      documents: generateMockDocuments(),
      shipping: {
        vessel: 'NYK Delphinus',
        eta: new Date('2024-02-20'),
        departurePort: 'Yokohama Port',
        arrivalPort: 'Los Angeles Port',
        containerNumber: 'NYKU1234567',
        bookingNumber: 'BK20240110001'
      },
      auctionDetails: {
        auctionHouse: 'TAA Kinki',
        location: 'Osaka',
        lotNumber: '2024-0892',
        auctionDate: new Date('2024-01-10'),
        grade: '5',
        sheetUrl: '#'
      },
      specifications: {
        doors: 5,
        seats: 7,
        driveType: '4WD',
        bodyType: 'SUV',
        features: [
          'Multi-Terrain Select',
          'Crawl Control',
          '360° Camera System',
          'JBL Premium Audio',
          'Leather Seats',
          'Power Tailgate',
          'Adaptive Cruise Control',
          'Lane Keeping Assist',
          'Pre-Collision System',
          'Blind Spot Monitor',
          'Rear Cross Traffic Alert',
          'Wireless Charging',
          'Apple CarPlay/Android Auto',
          'Heated & Ventilated Seats',
          'Panoramic Sunroof',
          '20-inch Alloy Wheels'
        ]
      }
    }
  }
  
  // Default vehicle for other IDs
  return {
    id,
    title: '2018 Toyota Corolla Axio',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800'
    ],
    vin: 'JTDBR32E820123456',
    chassisNumber: 'NZE161-3153697',
    engineNumber: '1NZ-FE-2847293',
    make: 'Toyota',
    model: 'Corolla Axio',
    year: 2018,
    color: 'Pearl White',
    mileage: 45000,
    transmission: 'automatic',
    fuelType: 'hybrid',
    engineSize: '1.5L',
    source: 'auction',
    purchaseDate: new Date('2024-01-10'),
    status: 'in_transit',
    location: 'Pacific Ocean',
    price: 7350000,
    documents: generateMockDocuments(),
    shipping: {
      vessel: 'NYK Delphinus',
      eta: new Date('2024-02-20'),
      departurePort: 'Yokohama Port',
      arrivalPort: 'Los Angeles Port',
      containerNumber: 'NYKU1234567',
      bookingNumber: 'BK20240110001'
    },
    auctionDetails: {
      auctionHouse: 'USS Tokyo',
      lotNumber: '42315',
      auctionDate: new Date('2024-01-10'),
      grade: '4.5',
      sheetUrl: '#'
    },
    specifications: {
      doors: 4,
      seats: 5,
      driveType: '2WD',
      bodyType: 'Sedan',
      features: [
        'Navigation System',
        'Backup Camera',
        'Cruise Control',
        'Keyless Entry',
        'Alloy Wheels',
        'LED Headlights'
      ]
    }
  }
}

function generateMockDocuments(): VehicleDocument[] {
  return [
    {
      id: '1',
      name: 'Commercial Invoice',
      type: 'invoice',
      uploadDate: new Date('2024-01-12'),
      size: '245 KB',
      url: '#',
      status: 'available',
      required: true
    },
    {
      id: '2',
      name: 'Export Certificate',
      type: 'export_certificate',
      uploadDate: new Date('2024-01-15'),
      size: '180 KB',
      url: '#',
      status: 'available',
      required: true
    },
    {
      id: '3',
      name: 'Bill of Lading',
      type: 'bill_of_lading',
      uploadDate: new Date('2024-01-20'),
      size: '320 KB',
      url: '#',
      status: 'available',
      required: true
    },
    {
      id: '4',
      name: 'Deregistration Certificate',
      type: 'deregistration',
      uploadDate: new Date('2024-01-18'),
      size: '150 KB',
      status: 'processing',
      required: true
    },
    {
      id: '5',
      name: 'JEVIC Inspection Report',
      type: 'inspection_report',
      uploadDate: new Date('2024-01-22'),
      size: '450 KB',
      url: '#',
      status: 'available',
      required: false
    },
    {
      id: '6',
      name: 'Port Photos',
      type: 'other',
      uploadDate: new Date('2024-01-24'),
      size: '5.6 MB',
      url: '#',
      status: 'available',
      required: false
    },
    {
      id: '7',
      name: 'Insurance Policy',
      type: 'insurance',
      uploadDate: new Date('2024-01-25'),
      size: '340 KB',
      url: '#',
      status: 'available',
      required: false
    }
  ]
}