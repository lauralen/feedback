export interface Country {
  name: string
}

export interface CountriesResponse {
  data: {
    countries: Country[]
  }
}
