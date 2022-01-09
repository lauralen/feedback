export interface Country {
  name: string
}

export interface CountriesData {
  countries: Country[]
}

export interface CountriesResponse {
  data: CountriesData
}
