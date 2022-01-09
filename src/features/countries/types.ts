export interface Country {
  name: string
  continent: { name: string }
  native: string
}

export interface CountriesData {
  countries: Country[]
}

export interface CountriesResponse {
  data: CountriesData
}
