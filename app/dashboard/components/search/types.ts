export interface SearchFilters {
  steering: {
    leftHandDrive: boolean;
  };
  basic: {
    maker: string;
    year: { min?: number; max?: number };
    mileage: { min?: number; max?: number };
    engine: { min?: number; max?: number };
    price: { min?: number; max?: number };
    lotNumbers: string[];
  };
  specific: {
    result: string;
    model: string;
    transmission: string;
    shift: string;
    modelType: string;
    chassisNumber: string;
    modification: string;
  };
  auction: {
    dateRange: {
      from: { day?: number; month?: string; year?: number };
      to: { day?: number; month?: string; year?: number };
    };
  };
  colors: string[];
  scores: string[];
  equipment: string[];
  vehicleTypes: string[];
}

export const initialFilters: SearchFilters = {
  steering: {
    leftHandDrive: false,
  },
  basic: {
    maker: '',
    year: { min: undefined, max: undefined },
    mileage: { min: undefined, max: undefined },
    engine: { min: undefined, max: undefined },
    price: { min: undefined, max: undefined },
    lotNumbers: [],
  },
  specific: {
    result: 'all',
    model: '',
    transmission: '',
    shift: '',
    modelType: '',
    chassisNumber: '',
    modification: '',
  },
  auction: {
    dateRange: {
      from: { day: undefined, month: undefined, year: undefined },
      to: { day: undefined, month: undefined, year: undefined },
    },
  },
  colors: [],
  scores: [],
  equipment: [],
  vehicleTypes: [],
};

export const MAKERS = [
  'Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi',
  'Suzuki', 'Lexus', 'Infiniti', 'Acura', 'Daihatsu', 'Isuzu',
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche',
  'Ferrari', 'Lamborghini', 'Maserati', 'Bentley', 'Rolls-Royce',
  'Ford', 'Chevrolet', 'Dodge', 'Jeep', 'Tesla'
];

export const TRANSMISSIONS = [
  'Automatic', 'Manual', 'CVT', 'Semi-Automatic', 'Dual-Clutch'
];

export const SHIFTS = [
  '4WD', '2WD', 'AWD', 'FWD', 'RWD'
];

export const COLORS = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Light Yellow', value: '#FFFFE0' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Purple', value: '#800080' },
  { name: 'Light Purple', value: '#E6E6FA' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Light Gray', value: '#D3D3D3' },
  { name: 'Gray', value: '#808080' },
  { name: 'Dark Gray', value: '#505050' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Black', value: '#000000' },
];

export const SCORES = [
  '***', '-', '1', '2', '3', '3.5', '4', '4.5', '5', '6', '7', '8', '9',
  'R', 'RA', 'S'
];

export const EQUIPMENT = [
  { code: 'AC', label: 'Air Conditioning' },
  { code: 'AW', label: 'Alloy Wheels' },
  { code: 'LE', label: 'Leather Seats' },
  { code: 'SR', label: 'Sun Roof' },
  { code: 'PW', label: 'Power Windows' },
  { code: 'PS', label: 'Power Steering' },
  { code: 'TV', label: 'Television' },
];

export const VEHICLE_TYPES = {
  trucks: [
    'WCab', 'Dump', 'Mixer', 'Tanker', 'Chassis', 
    'Loader', 'Tractorhead', 'Wrecker', 'Truck'
  ],
  special: [
    'Refrigerator', 'Thermos', 'Crane', 'Fullcrane', 
    'Camping', 'Concrete', 'Bus'
  ]
};

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const RESULTS = [
  { value: 'all', label: 'All lots' },
  { value: 'sold', label: 'Sold' },
  { value: 'unsold', label: 'Unsold' },
  { value: 'negotiating', label: 'Negotiating' },
];