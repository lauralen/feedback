export interface ResponseCountry {
  name: string
  continent: { name: string }
  native: string
}

export interface Country {
  name: string
  continent: string
  nativeName: string
}

export interface CountriesData {
  countries: ResponseCountry[]
}

export interface CountriesResponse {
  data: CountriesData
}
