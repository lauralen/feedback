import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import { fetchCountries } from './api'
import { CountriesResponse, Country, RegionFilter, Status } from './types'

export interface CountriesState {
  countries: Country[]
  status: Status
  search: string
  regionFilter: RegionFilter
}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
  search: '',
  regionFilter: 'None',
}

export const fetchCountriesAsync = createAsyncThunk<CountriesResponse>(
  'countries/fetchCountries',
  async () => {
    return fetchCountries()
  }
)

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setRegionFilter(state, action: PayloadAction<RegionFilter>) {
      state.regionFilter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchCountriesAsync.fulfilled,
        (state, action: PayloadAction<CountriesResponse>) => {
          state.countries = action.payload.data.countries.map(
            ({ code, name, continent, native }) => ({
              code,
              name,
              continent: continent.name,
              nativeName: native,
            })
          )
          state.status = 'idle'
        }
      )
      .addCase(fetchCountriesAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setSearch, setRegionFilter } = countriesSlice.actions

export const getCountries = (state: RootState) => {
  const { countries, search, regionFilter } = state.countries
  const isRegionFilterSelected = regionFilter !== 'None'

  if (search && isRegionFilterSelected) {
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(search) &&
        country.continent === regionFilter
    )
  } else if (search) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(search)
    )
  } else if (isRegionFilterSelected) {
    return countries.filter((country) => country.continent === regionFilter)
  } else {
    return countries
  }
}

export default countriesSlice.reducer
