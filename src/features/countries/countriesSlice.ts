import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import { fetchCountries } from './api'
import { CountriesResponse, Country } from './types'

export interface CountriesState {
  countries: Country[]
  status: 'idle' | 'loading' | 'failed'
  search: string
}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
  search: '',
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
            ({ name, continent, native }) => ({
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

export const { setSearch } = countriesSlice.actions

export const getCountries = (state: RootState) => {
  const { countries, search } = state.countries

  if (search) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(search)
    )
  } else {
    return countries
  }
}

export default countriesSlice.reducer
