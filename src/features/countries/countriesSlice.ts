import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchCountries } from './api'
import { CountriesResponse, Country } from './types'

export interface CountriesState {
  countries: Country[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
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
  reducers: {},
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

export const {} = countriesSlice.actions

export default countriesSlice.reducer
