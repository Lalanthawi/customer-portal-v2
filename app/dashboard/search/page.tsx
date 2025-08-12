'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  transmission: string
  fuelType: string
  color: string
  location: string
  imageUrl: string
  condition: string
  seats: number
  doors: number
  engineSize: string
  driveType: string
  bodyType: string
  features: string[]
  auctionEndTime: Date
  bids: number
  verified: boolean
  dealer: string
  rating: number
}

// Demo vehicle data
const demoVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry Hybrid',
    year: 2023,
    price: 3200000,
    mileage: 15000,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    color: 'Pearl White',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 5,
    doors: 4,
    engineSize: '2.5L',
    driveType: 'FWD',
    bodyType: 'Sedan',
    features: ['Navigation System', 'Leather Seats', 'Backup Camera', 'Bluetooth', 'Apple CarPlay'],
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    bids: 12,
    verified: true,
    dealer: 'Tokyo Premium Motors',
    rating: 4.8
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: 2800000,
    mileage: 28000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Metallic Gray',
    location: 'Osaka',
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 7,
    doors: 5,
    engineSize: '1.5L Turbo',
    driveType: 'AWD',
    bodyType: 'SUV',
    features: ['Sunroof', 'Heated Seats', 'Android Auto', 'Parking Sensors', 'Cruise Control'],
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    bids: 8,
    verified: true,
    dealer: 'Osaka Auto Gallery',
    rating: 4.6
  },
  {
    id: 3,
    make: 'Mazda',
    model: 'MX-5',
    year: 2021,
    price: 2500000,
    mileage: 12000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    color: 'Soul Red',
    location: 'Yokohama',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 2,
    doors: 2,
    engineSize: '2.0L',
    driveType: 'RWD',
    bodyType: 'Convertible',
    features: ['Premium Audio', 'Bluetooth', 'Keyless Entry', 'Adaptive Cruise'],
    auctionEndTime: new Date(Date.now() + 86400000 * 1),
    bids: 15,
    verified: false,
    dealer: 'Sports Car Specialist',
    rating: 4.9
  },
  {
    id: 4,
    make: 'Nissan',
    model: 'Leaf',
    year: 2023,
    price: 3500000,
    mileage: 5000,
    transmission: 'Automatic',
    fuelType: 'Electric',
    color: 'Arctic Blue',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    condition: 'New',
    seats: 5,
    doors: 5,
    engineSize: 'Electric',
    driveType: 'FWD',
    bodyType: 'Hatchback',
    features: ['360 Camera', 'Navigation System', 'Apple CarPlay', 'Lane Departure', 'Blind Spot Monitor'],
    auctionEndTime: new Date(Date.now() + 86400000 * 5),
    bids: 6,
    verified: true,
    dealer: 'EV Specialists Japan',
    rating: 4.7
  },
  {
    id: 5,
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2022,
    price: 5800000,
    mileage: 18000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Obsidian Black',
    location: 'Nagoya',
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 5,
    doors: 4,
    engineSize: '2.0L Turbo',
    driveType: 'RWD',
    bodyType: 'Sedan',
    features: ['Leather Seats', 'Sunroof', 'Navigation System', 'Premium Audio', 'Heated Seats', 'Adaptive Cruise'],
    auctionEndTime: new Date(Date.now() + 86400000 * 4),
    bids: 10,
    verified: true,
    dealer: 'Luxury Auto Import',
    rating: 4.9
  },
  {
    id: 6,
    make: 'BMW',
    model: 'X3',
    year: 2021,
    price: 4200000,
    mileage: 32000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    color: 'Alpine White',
    location: 'Kobe',
    imageUrl: 'https://images.unsplash.com/photo-1555215858-9dc53c228bec?w=800&h=600&fit=crop',
    condition: 'Good',
    seats: 5,
    doors: 5,
    engineSize: '2.0L Turbo',
    driveType: 'AWD',
    bodyType: 'SUV',
    features: ['Panoramic Sunroof', 'Leather Seats', 'Apple CarPlay', 'Parking Sensors', 'Backup Camera'],
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    bids: 7,
    verified: true,
    dealer: 'Bavaria Motors',
    rating: 4.5
  },
  {
    id: 7,
    make: 'Subaru',
    model: 'WRX STI',
    year: 2020,
    price: 3800000,
    mileage: 25000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    color: 'WR Blue',
    location: 'Sapporo',
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 5,
    doors: 4,
    engineSize: '2.5L Turbo',
    driveType: 'AWD',
    bodyType: 'Sedan',
    features: ['Premium Audio', 'Bluetooth', 'Keyless Entry', 'Performance Brakes'],
    auctionEndTime: new Date(Date.now() + 86400000 * 6),
    bids: 18,
    verified: false,
    dealer: 'Performance Auto',
    rating: 4.8
  },
  {
    id: 8,
    make: 'Lexus',
    model: 'RX 450h',
    year: 2023,
    price: 6500000,
    mileage: 8000,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    color: 'Moonbeam Beige',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 7,
    doors: 5,
    engineSize: '3.5L V6',
    driveType: 'AWD',
    bodyType: 'SUV',
    features: ['Mark Levinson Audio', 'Leather Seats', 'Sunroof', '360 Camera', 'Heated & Cooled Seats', 'Navigation System'],
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    bids: 14,
    verified: true,
    dealer: 'Lexus Premium Selection',
    rating: 5.0
  },
  {
    id: 9,
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: 2022,
    price: 3200000,
    mileage: 19000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Tornado Red',
    location: 'Kyoto',
    imageUrl: 'https://images.unsplash.com/photo-1572348844829-ef6b482e5f94?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 5,
    doors: 5,
    engineSize: '2.0L Turbo',
    driveType: 'FWD',
    bodyType: 'Hatchback',
    features: ['Digital Cockpit', 'Apple CarPlay', 'Android Auto', 'Performance Seats', 'Adaptive Cruise'],
    auctionEndTime: new Date(Date.now() + 86400000 * 4),
    bids: 11,
    verified: true,
    dealer: 'European Motors',
    rating: 4.6
  },
  {
    id: 10,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 4800000,
    mileage: 3000,
    transmission: 'Automatic',
    fuelType: 'Electric',
    color: 'Midnight Silver',
    location: 'Osaka',
    imageUrl: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&h=600&fit=crop',
    condition: 'New',
    seats: 5,
    doors: 4,
    engineSize: 'Electric',
    driveType: 'RWD',
    bodyType: 'Sedan',
    features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Wireless Charging', 'Over-the-air Updates'],
    auctionEndTime: new Date(Date.now() + 86400000 * 7),
    bids: 22,
    verified: true,
    dealer: 'Tesla Certified',
    rating: 4.9
  },
  {
    id: 11,
    make: 'Audi',
    model: 'Q5',
    year: 2021,
    price: 4100000,
    mileage: 27000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Glacier White',
    location: 'Fukuoka',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    condition: 'Good',
    seats: 5,
    doors: 5,
    engineSize: '2.0L TFSI',
    driveType: 'Quattro',
    bodyType: 'SUV',
    features: ['Virtual Cockpit', 'Leather Seats', 'Navigation System', 'Bang & Olufsen Audio', 'Matrix LED Lights'],
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    bids: 9,
    verified: true,
    dealer: 'Audi Approved',
    rating: 4.7
  },
  {
    id: 12,
    make: 'Porsche',
    model: '718 Cayman',
    year: 2022,
    price: 7200000,
    mileage: 11000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    color: 'Guards Red',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 2,
    doors: 2,
    engineSize: '2.0L Turbo',
    driveType: 'RWD',
    bodyType: 'Coupe',
    features: ['Sport Chrono', 'PASM', 'Bose Audio', 'Sport Seats', 'Track Mode'],
    auctionEndTime: new Date(Date.now() + 86400000 * 5),
    bids: 16,
    verified: true,
    dealer: 'Porsche Center',
    rating: 5.0
  },
  {
    id: 13,
    make: 'Mitsubishi',
    model: 'Outlander PHEV',
    year: 2023,
    price: 4500000,
    mileage: 7000,
    transmission: 'Automatic',
    fuelType: 'Plug-in Hybrid',
    color: 'White Diamond',
    location: 'Nagoya',
    imageUrl: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 7,
    doors: 5,
    engineSize: '2.4L',
    driveType: '4WD',
    bodyType: 'SUV',
    features: ['Navigation System', 'Leather Seats', '360 Camera', 'Heated Seats', 'Apple CarPlay'],
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    bids: 9,
    verified: true,
    dealer: 'Mitsubishi Official',
    rating: 4.5
  },
  {
    id: 14,
    make: 'Ferrari',
    model: '488 GTB',
    year: 2020,
    price: 28000000,
    mileage: 8000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Rosso Corsa',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 2,
    doors: 2,
    engineSize: '3.9L V8 Turbo',
    driveType: 'RWD',
    bodyType: 'Sports',
    features: ['Carbon Fiber Interior', 'Racing Seats', 'Premium Audio', 'Track Telemetry', 'Lifting System'],
    auctionEndTime: new Date(Date.now() + 86400000 * 10),
    bids: 32,
    verified: true,
    dealer: 'Ferrari Tokyo',
    rating: 5.0
  },
  {
    id: 15,
    make: 'Jeep',
    model: 'Wrangler Unlimited',
    year: 2021,
    price: 5200000,
    mileage: 22000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Granite Crystal',
    location: 'Osaka',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
    condition: 'Good',
    seats: 5,
    doors: 4,
    engineSize: '3.6L V6',
    driveType: '4WD',
    bodyType: 'SUV',
    features: ['Removable Top', 'Trail Rated', 'Apple CarPlay', 'All-Terrain Tires', 'Rock Rails'],
    auctionEndTime: new Date(Date.now() + 86400000 * 4),
    bids: 11,
    verified: false,
    dealer: 'American Auto Import',
    rating: 4.4
  },
  {
    id: 16,
    make: 'Mini',
    model: 'Cooper S',
    year: 2022,
    price: 3400000,
    mileage: 14000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'British Racing Green',
    location: 'Kyoto',
    imageUrl: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 4,
    doors: 3,
    engineSize: '2.0L Turbo',
    driveType: 'FWD',
    bodyType: 'Hatchback',
    features: ['Harman Kardon Audio', 'Panoramic Sunroof', 'LED Headlights', 'Sport Mode', 'Navigation System'],
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    bids: 8,
    verified: true,
    dealer: 'MINI Kyoto',
    rating: 4.6
  },
  {
    id: 17,
    make: 'Range Rover',
    model: 'Sport HSE',
    year: 2023,
    price: 9800000,
    mileage: 5000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    color: 'Santorini Black',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1606611013016-969c19ba43e2?w=800&h=600&fit=crop',
    condition: 'New',
    seats: 7,
    doors: 5,
    engineSize: '3.0L Turbo',
    driveType: 'AWD',
    bodyType: 'SUV',
    features: ['Meridian Audio', 'Air Suspension', 'Terrain Response', 'Matrix LED', 'Heated Steering'],
    auctionEndTime: new Date(Date.now() + 86400000 * 8),
    bids: 19,
    verified: true,
    dealer: 'Land Rover Premium',
    rating: 4.9
  },
  {
    id: 18,
    make: 'Hyundai',
    model: 'Ioniq 5',
    year: 2023,
    price: 5500000,
    mileage: 3000,
    transmission: 'Automatic',
    fuelType: 'Electric',
    color: 'Cyber Gray',
    location: 'Yokohama',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 5,
    doors: 5,
    engineSize: 'Electric',
    driveType: 'AWD',
    bodyType: 'Crossover',
    features: ['Highway Driving Assist', 'V2L', 'Augmented Reality HUD', 'Relaxation Seats', 'Solar Roof'],
    auctionEndTime: new Date(Date.now() + 86400000 * 6),
    bids: 24,
    verified: true,
    dealer: 'Hyundai EV Center',
    rating: 4.8
  },
  {
    id: 19,
    make: 'Alfa Romeo',
    model: 'Giulia Quadrifoglio',
    year: 2021,
    price: 6800000,
    mileage: 16000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Rosso Competizione',
    location: 'Kobe',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 5,
    doors: 4,
    engineSize: '2.9L V6 Turbo',
    driveType: 'RWD',
    bodyType: 'Sedan',
    features: ['Carbon Fiber Trim', 'Sparco Seats', 'Race Mode', 'Akrapovic Exhaust', 'Limited Slip Diff'],
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    bids: 14,
    verified: true,
    dealer: 'Italian Motors',
    rating: 4.7
  },
  {
    id: 20,
    make: 'Volvo',
    model: 'XC90 T8',
    year: 2022,
    price: 7200000,
    mileage: 18000,
    transmission: 'Automatic',
    fuelType: 'Plug-in Hybrid',
    color: 'Crystal White',
    location: 'Fukuoka',
    imageUrl: 'https://images.unsplash.com/photo-1557254995-0c1ba16b4911?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 7,
    doors: 5,
    engineSize: '2.0L + Electric',
    driveType: 'AWD',
    bodyType: 'SUV',
    features: ['Bowers & Wilkins', 'Pilot Assist', 'Air Purifier', 'Crystal Gear Shift', 'Massage Seats'],
    auctionEndTime: new Date(Date.now() + 86400000 * 5),
    bids: 12,
    verified: true,
    dealer: 'Volvo Cars Fukuoka',
    rating: 4.8
  },
  {
    id: 21,
    make: 'Maserati',
    model: 'Levante Trofeo',
    year: 2021,
    price: 12500000,
    mileage: 13000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Blu Emozione',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 5,
    doors: 5,
    engineSize: '3.8L V8 Turbo',
    driveType: 'AWD',
    bodyType: 'SUV',
    features: ['Ferrari Engine', 'Corsa Mode', 'Carbon Fiber Package', 'Harman Kardon', 'Sport Exhaust'],
    auctionEndTime: new Date(Date.now() + 86400000 * 7),
    bids: 18,
    verified: true,
    dealer: 'Maserati Japan',
    rating: 4.9
  },
  {
    id: 22,
    make: 'Kia',
    model: 'Stinger GT',
    year: 2022,
    price: 4800000,
    mileage: 21000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Ceramic Silver',
    location: 'Nagoya',
    imageUrl: 'https://images.unsplash.com/photo-1609788063095-d71bf3c1f01f?w=800&h=600&fit=crop',
    condition: 'Good',
    seats: 5,
    doors: 5,
    engineSize: '3.3L V6 Turbo',
    driveType: 'RWD',
    bodyType: 'Hatchback',
    features: ['Drift Mode', 'Launch Control', 'Brembo Brakes', 'Limited Slip Diff', 'HUD Display'],
    auctionEndTime: new Date(Date.now() + 86400000 * 2),
    bids: 10,
    verified: false,
    dealer: 'Korean Auto Gallery',
    rating: 4.3
  },
  {
    id: 23,
    make: 'Bentley',
    model: 'Continental GT',
    year: 2020,
    price: 18500000,
    mileage: 9000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Onyx Black',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 4,
    doors: 2,
    engineSize: '6.0L W12 Turbo',
    driveType: 'AWD',
    bodyType: 'Coupe',
    features: ['Naim Audio', 'Rotating Display', 'Diamond Quilting', 'Night Vision', 'Bentley Dynamic Ride'],
    auctionEndTime: new Date(Date.now() + 86400000 * 9),
    bids: 27,
    verified: true,
    dealer: 'Bentley Tokyo',
    rating: 5.0
  },
  {
    id: 24,
    make: 'Genesis',
    model: 'G90',
    year: 2023,
    price: 8200000,
    mileage: 4000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Cavendish Red',
    location: 'Osaka',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
    condition: 'New',
    seats: 5,
    doors: 4,
    engineSize: '3.5L V6 Turbo',
    driveType: 'AWD',
    bodyType: 'Sedan',
    features: ['Bang & Olufsen', 'Ergo Motion Seats', 'Remote Parking', 'Fingerprint Auth', 'Mood Curator'],
    auctionEndTime: new Date(Date.now() + 86400000 * 4),
    bids: 15,
    verified: true,
    dealer: 'Genesis Studio',
    rating: 4.7
  },
  {
    id: 25,
    make: 'Peugeot',
    model: '3008 GT',
    year: 2022,
    price: 3900000,
    mileage: 17000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    color: 'Pearl White',
    location: 'Sapporo',
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 5,
    doors: 5,
    engineSize: '2.0L Turbo',
    driveType: 'FWD',
    bodyType: 'SUV',
    features: ['i-Cockpit', 'Focal Audio', 'Night Vision', 'Massage Seats', 'Hands-free Tailgate'],
    auctionEndTime: new Date(Date.now() + 86400000 * 3),
    bids: 7,
    verified: false,
    dealer: 'French Auto Import',
    rating: 4.2
  },
  {
    id: 26,
    make: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2021,
    price: 32000000,
    mileage: 6000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Verde Mantis',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 2,
    doors: 2,
    engineSize: '5.2L V10',
    driveType: 'AWD',
    bodyType: 'Sports',
    features: ['LDVI System', 'Magneto Suspension', 'Carbon Ceramic Brakes', 'Telemetry', 'Launch Control'],
    auctionEndTime: new Date(Date.now() + 86400000 * 11),
    bids: 41,
    verified: true,
    dealer: 'Lamborghini Tokyo',
    rating: 5.0
  },
  {
    id: 27,
    make: 'Rolls-Royce',
    model: 'Ghost',
    year: 2022,
    price: 45000000,
    mileage: 2000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'English White',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&h=600&fit=crop',
    condition: 'New',
    seats: 5,
    doors: 4,
    engineSize: '6.75L V12 Turbo',
    driveType: 'AWD',
    bodyType: 'Sedan',
    features: ['Starlight Headliner', 'Champagne Cooler', 'Bespoke Audio', 'Magic Carpet Ride', 'Spirit of Ecstasy'],
    auctionEndTime: new Date(Date.now() + 86400000 * 15),
    bids: 8,
    verified: true,
    dealer: 'Rolls-Royce Motor Cars Tokyo',
    rating: 5.0
  },
  {
    id: 28,
    make: 'McLaren',
    model: '720S',
    year: 2020,
    price: 28500000,
    mileage: 7500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Papaya Spark',
    location: 'Osaka',
    imageUrl: 'https://images.unsplash.com/photo-1622741524350-9f81a5cdbc81?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 2,
    doors: 2,
    engineSize: '4.0L V8 Turbo',
    driveType: 'RWD',
    bodyType: 'Sports',
    features: ['Variable Drift Control', 'Folding Driver Display', 'Track Telemetry', 'Proactive Chassis', 'Lift System'],
    auctionEndTime: new Date(Date.now() + 86400000 * 8),
    bids: 35,
    verified: true,
    dealer: 'McLaren Osaka',
    rating: 5.0
  },
  {
    id: 29,
    make: 'Aston Martin',
    model: 'DB11',
    year: 2021,
    price: 21000000,
    mileage: 11000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Magnetic Silver',
    location: 'Kyoto',
    imageUrl: 'https://images.unsplash.com/photo-1618563833017-943c0df5c3a8?w=800&h=600&fit=crop',
    condition: 'Excellent',
    seats: 4,
    doors: 2,
    engineSize: '5.2L V12 Turbo',
    driveType: 'RWD',
    bodyType: 'Coupe',
    features: ['Bang & Olufsen', 'Adaptive Damping', 'Torque Vectoring', 'Garage Door Opener', 'Alcantara Headliner'],
    auctionEndTime: new Date(Date.now() + 86400000 * 6),
    bids: 22,
    verified: true,
    dealer: 'Aston Martin Kyoto',
    rating: 4.9
  },
  {
    id: 30,
    make: 'Cadillac',
    model: 'Escalade ESV',
    year: 2023,
    price: 11500000,
    mileage: 6000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: 'Black Raven',
    location: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1563720360906-04085c5a7fd5?w=800&h=600&fit=crop',
    condition: 'Like New',
    seats: 8,
    doors: 5,
    engineSize: '6.2L V8',
    driveType: '4WD',
    bodyType: 'SUV',
    features: ['AKG Studio Audio', 'Super Cruise', 'Curved OLED Display', 'Air Ride Suspension', 'Night Vision'],
    auctionEndTime: new Date(Date.now() + 86400000 * 5),
    bids: 13,
    verified: true,
    dealer: 'Cadillac Japan',
    rating: 4.6
  }
]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>(demoVehicles)
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(demoVehicles)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [yearRange, setYearRange] = useState<[number, number]>([2015, 2024])
  const [mileageMax, setMileageMax] = useState(200000)
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([])
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedDoors, setSelectedDoors] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [engineSizeRange, setEngineSizeRange] = useState<[number, number]>([0, 5000])
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  // Get search query from URL
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    // Apply filters
    let filtered = [...vehicles]
    
    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(v => 
        v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price range filter
    filtered = filtered.filter(v => v.price >= priceRange[0] && v.price <= priceRange[1])

    // Year range filter
    filtered = filtered.filter(v => v.year >= yearRange[0] && v.year <= yearRange[1])

    // Mileage filter
    filtered = filtered.filter(v => v.mileage <= mileageMax)

    // Make filter
    if (selectedMakes.length > 0) {
      filtered = filtered.filter(v => selectedMakes.includes(v.make))
    }

    // Body type filter
    if (selectedBodyTypes.length > 0) {
      filtered = filtered.filter(v => selectedBodyTypes.includes(v.bodyType))
    }

    // Fuel type filter
    if (selectedFuelTypes.length > 0) {
      filtered = filtered.filter(v => selectedFuelTypes.includes(v.fuelType))
    }

    // Transmission filter
    if (selectedTransmissions.length > 0) {
      filtered = filtered.filter(v => selectedTransmissions.includes(v.transmission))
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(v => selectedColors.some(color => 
        v.color.toLowerCase().includes(color.toLowerCase())
      ))
    }

    // Drive type filter
    if (selectedDriveTypes.length > 0) {
      filtered = filtered.filter(v => selectedDriveTypes.includes(v.driveType))
    }

    // Condition filter
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(v => selectedConditions.includes(v.condition))
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(v => selectedLocations.includes(v.location))
    }

    // Seats filter
    if (selectedSeats.length > 0) {
      filtered = filtered.filter(v => selectedSeats.includes(v.seats.toString()))
    }

    // Doors filter
    if (selectedDoors.length > 0) {
      filtered = filtered.filter(v => selectedDoors.includes(v.doors.toString()))
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(v => 
        selectedFeatures.every(feature => v.features.includes(feature))
      )
    }

    // Engine size filter
    filtered = filtered.filter(v => {
      const engineSizeNum = parseInt(v.engineSize.replace(/[^0-9]/g, '')) * 1000 || 0
      return engineSizeNum >= engineSizeRange[0] && engineSizeNum <= engineSizeRange[1]
    })

    // Verified only filter
    if (verifiedOnly) {
      filtered = filtered.filter(v => v.verified)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage)
        break
      case 'ending-soon':
        filtered.sort((a, b) => a.auctionEndTime.getTime() - b.auctionEndTime.getTime())
        break
    }

    setFilteredVehicles(filtered)
  }, [searchQuery, priceRange, yearRange, mileageMax, selectedMakes, selectedBodyTypes, 
      selectedFuelTypes, selectedTransmissions, selectedColors, selectedDriveTypes, 
      selectedConditions, selectedLocations, selectedSeats, selectedDoors, 
      selectedFeatures, engineSizeRange, verifiedOnly, sortBy, vehicles])

  const formatPrice = (price: number) => {
    return `¥${(price / 1000000).toFixed(1)}M`
  }

  const getTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  return (
    <div className="w-full -mt-6">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#002233] to-[#003344] text-white rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Vehicles'}
            </h1>
            <p className="text-gray-300">
              Found {filteredVehicles.length} vehicles matching your criteria
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/explore')}
            className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            defaultValue={searchQuery}
            placeholder="Refine your search..."
            className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-md rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7921]"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#FA7921] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#FA7921] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year-new">Year: Newest First</option>
            <option value="mileage-low">Mileage: Low to High</option>
            <option value="ending-soon">Ending Soon</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Expanded */}
        {showFilters && (
          <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <span className="text-xs text-gray-500">{filteredVehicles.length} results</span>
              </div>
            </div>
            
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Verified Only Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                  <span className="text-sm font-medium text-gray-700">Verified Dealers Only</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#FA7921]"
                />
              </div>

              {/* Year Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Year</label>
                <div className="flex gap-2">
                  <select
                    value={yearRange[0]}
                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <span className="text-gray-400 self-center">to</span>
                  <select
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mileage */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Max Mileage: {mileageMax.toLocaleString()} km
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="10000"
                  value={mileageMax}
                  onChange={(e) => setMileageMax(parseInt(e.target.value))}
                  className="w-full accent-[#FA7921]"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>0 km</span>
                  <span>200,000 km</span>
                </div>
              </div>

              {/* Make Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Make</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {Array.from(new Set(vehicles.map(v => v.make))).sort().map(make => (
                    <label key={make} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMakes.includes(make)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMakes([...selectedMakes, make])
                          } else {
                            setSelectedMakes(selectedMakes.filter(m => m !== make))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">{make}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Body Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Body Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from(new Set(vehicles.map(v => v.bodyType))).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (selectedBodyTypes.includes(type)) {
                          setSelectedBodyTypes(selectedBodyTypes.filter(t => t !== type))
                        } else {
                          setSelectedBodyTypes([...selectedBodyTypes, type])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedBodyTypes.includes(type)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Transmission</label>
                <div className="space-y-2">
                  {['Automatic', 'Manual', 'CVT', 'Semi-Auto'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTransmissions.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTransmissions([...selectedTransmissions, type])
                          } else {
                            setSelectedTransmissions(selectedTransmissions.filter(t => t !== type))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Fuel Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from(new Set(vehicles.map(v => v.fuelType))).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (selectedFuelTypes.includes(type)) {
                          setSelectedFuelTypes(selectedFuelTypes.filter(t => t !== type))
                        } else {
                          setSelectedFuelTypes([...selectedFuelTypes, type])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedFuelTypes.includes(type)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drive Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Drive Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['FWD', 'RWD', 'AWD', '4WD', 'Quattro'].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (selectedDriveTypes.includes(type)) {
                          setSelectedDriveTypes(selectedDriveTypes.filter(t => t !== type))
                        } else {
                          setSelectedDriveTypes([...selectedDriveTypes, type])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDriveTypes.includes(type)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Pearl', 'Beige'].map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        if (selectedColors.includes(color)) {
                          setSelectedColors(selectedColors.filter(c => c !== color))
                        } else {
                          setSelectedColors([...selectedColors, color])
                        }
                      }}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedColors.includes(color)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Condition</label>
                <div className="space-y-2">
                  {['New', 'Like New', 'Excellent', 'Good', 'Fair'].map(condition => (
                    <label key={condition} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedConditions([...selectedConditions, condition])
                          } else {
                            setSelectedConditions(selectedConditions.filter(c => c !== condition))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Seats */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Number of Seats</label>
                <div className="grid grid-cols-3 gap-2">
                  {['2', '4', '5', '7', '8+'].map(seats => (
                    <button
                      key={seats}
                      onClick={() => {
                        if (selectedSeats.includes(seats)) {
                          setSelectedSeats(selectedSeats.filter(s => s !== seats))
                        } else {
                          setSelectedSeats([...selectedSeats, seats])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedSeats.includes(seats)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {seats}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Doors */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Number of Doors</label>
                <div className="grid grid-cols-4 gap-2">
                  {['2', '3', '4', '5'].map(doors => (
                    <button
                      key={doors}
                      onClick={() => {
                        if (selectedDoors.includes(doors)) {
                          setSelectedDoors(selectedDoors.filter(d => d !== doors))
                        } else {
                          setSelectedDoors([...selectedDoors, doors])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDoors.includes(doors)
                          ? 'bg-[#FA7921] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {doors}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Kobe', 'Kyoto', 'Fukuoka', 'Sapporo'].map(location => (
                    <label key={location} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLocations([...selectedLocations, location])
                          } else {
                            setSelectedLocations(selectedLocations.filter(l => l !== location))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-sm text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Engine Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Engine Size: {engineSizeRange[0]}cc - {engineSizeRange[1]}cc
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={engineSizeRange[1]}
                  onChange={(e) => setEngineSizeRange([engineSizeRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#FA7921]"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>0cc</span>
                  <span>5000cc</span>
                </div>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {[
                    'Navigation System', 'Leather Seats', 'Sunroof', 'Backup Camera',
                    'Bluetooth', 'Heated Seats', 'Keyless Entry', 'Cruise Control',
                    'Apple CarPlay', 'Android Auto', 'Parking Sensors', 'Blind Spot Monitor',
                    'Lane Departure', 'Adaptive Cruise', '360 Camera', 'Premium Audio'
                  ].map(feature => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFeatures([...selectedFeatures, feature])
                          } else {
                            setSelectedFeatures(selectedFeatures.filter(f => f !== feature))
                          }
                        }}
                        className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                      />
                      <span className="text-xs text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, 10000000])
                  setYearRange([2015, 2024])
                  setMileageMax(200000)
                  setSelectedMakes([])
                  setSelectedBodyTypes([])
                  setSelectedFuelTypes([])
                  setSelectedTransmissions([])
                  setSelectedColors([])
                  setSelectedDriveTypes([])
                  setSelectedConditions([])
                  setSelectedLocations([])
                  setSelectedSeats([])
                  setSelectedDoors([])
                  setSelectedFeatures([])
                  setEngineSizeRange([0, 5000])
                  setVerifiedOnly(false)
                }}
                className="w-full px-4 py-2 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Grid/List */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={vehicle.imageUrl}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {vehicle.verified && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-sm rounded-full">
                      {getTimeRemaining(vehicle.auctionEndTime)} left
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-[#FA7921] transition-colors cursor-pointer">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500">{vehicle.condition} • {vehicle.location}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Price and Bids */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-[#FA7921]">{formatPrice(vehicle.price)}</p>
                        <p className="text-xs text-gray-500">{vehicle.bids} bids</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{vehicle.mileage.toLocaleString()} km</p>
                        <p className="text-xs text-gray-500">{vehicle.transmission}</p>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <svg className="w-4 h-4 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <p className="text-xs text-gray-600">{vehicle.fuelType}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <svg className="w-4 h-4 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <p className="text-xs text-gray-600">{vehicle.driveType}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <svg className="w-4 h-4 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-xs text-gray-600">{vehicle.seats} Seats</p>
                      </div>
                    </div>

                    {/* Dealer Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">
                            {vehicle.dealer.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{vehicle.dealer}</p>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-gray-600">{vehicle.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/dashboard/vehicle/${vehicle.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={vehicle.imageUrl}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Link href={`/dashboard/vehicle/${vehicle.id}`}>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-[#FA7921] transition-colors cursor-pointer">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{vehicle.condition}</span>
                            <span>•</span>
                            <span>{vehicle.location}</span>
                            <span>•</span>
                            <span>{vehicle.mileage.toLocaleString()} km</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#FA7921]">{formatPrice(vehicle.price)}</p>
                          <p className="text-sm text-gray-500">{vehicle.bids} bids • {getTimeRemaining(vehicle.auctionEndTime)} left</p>
                        </div>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-6 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Transmission</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.transmission}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Fuel</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.fuelType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Drive</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.driveType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Engine</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.engineSize}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Seats</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.seats}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Color</p>
                          <p className="text-sm font-medium text-gray-900">{vehicle.color}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.slice(0, 5).map(feature => (
                          <span key={feature} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-lg">
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-lg">
                            +{vehicle.features.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-gray-600">
                                {vehicle.dealer.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{vehicle.dealer}</p>
                              <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-xs text-gray-600">{vehicle.rating}</span>
                              </div>
                            </div>
                          </div>
                          {vehicle.verified && (
                            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <Link
                            href={`/dashboard/vehicle/${vehicle.id}`}
                            className="px-6 py-2 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white font-medium rounded-lg hover:shadow-lg transition-all"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* No Results */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  )
}