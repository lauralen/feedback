export type Status = 'idle' | 'loading' | 'failed'

export interface ResponseCountry {
  code: string
  name: string
  continent: { name: Region }
  native: string
}

export interface Country {
  code: string
  name: string
  continent: Region
  nativeName: string
}

export type Region =
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctica'

export type RegionFilter = Region | 'None'

export interface CountriesData {
  countries: ResponseCountry[]
}

export interface CountriesResponse {
  data: CountriesData
}

interface ResponseCountryDetais {
  name: string
  continent: { name: Region }
  native: string
  currency: string | null
  languages: { name: string }[]
  states: { name: string }[]
}

export interface CountryData {
  country: ResponseCountryDetais
}

export interface CountryResponse {
  data: CountryData
}
