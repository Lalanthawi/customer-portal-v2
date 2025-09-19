// Countries list for forms and dropdowns
export const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Japan',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Switzerland',
  'Austria',
  'Belgium',
  'Ireland',
  'Portugal',
  'Poland',
  'Czech Republic',
  'Hungary',
  'Greece',
  'New Zealand',
  'Singapore',
  'Hong Kong',
  'South Korea',
  'Taiwan',
  'Malaysia',
  'Thailand',
  'Indonesia',
  'Philippines',
  'India',
  'UAE',
  'Saudi Arabia',
  'South Africa',
  'Brazil',
  'Mexico',
  'Argentina',
  'Chile',
  'Colombia'
] as const

export type Country = typeof countries[number]

// Popular countries for quick selection
export const popularCountries = [
  'United States',
  'United Kingdom',
  'Japan',
  'Canada',
  'Australia',
  'Germany'
] as const