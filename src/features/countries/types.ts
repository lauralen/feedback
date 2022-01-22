export interface ResponseCountry {
  code: string
  name: string
  continent: { name: string }
  native: string
}

export interface Country {
  code: string
  name: string
  continent: string
  nativeName: string
}

type Region =
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Asia'
  | 'Europe'
  | 'Oceania'

export type RegionFilter = Region | 'None'

export interface CountriesData {
  countries: ResponseCountry[]
}

export interface CountriesResponse {
  data: CountriesData
}
