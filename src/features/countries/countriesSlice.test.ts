import countriesReducer, {
  CountriesState,
  fetchCountriesAsync,
  setRegionFilter,
  setSearch,
} from './countriesSlice'
import { CountriesResponse, Country } from './types'

const MOCK_COUNTRIES_RESPONSE: CountriesResponse = {
  data: {
    countries: [
      {
        code: 'AD',
        name: 'Andorra',
        continent: { name: 'Europe' },
        native: 'Andorra',
      },
      {
        code: 'AE',
        name: 'United Arab Emirates',
        continent: {
          name: 'Asia',
        },
        native: 'دولة الإمارات العربية المتحدة',
      },
    ],
  },
}

const MOCK_COUNTRIES: Country[] = [
  {
    code: 'AD',
    name: 'Andorra',
    continent: 'Europe',
    nativeName: 'Andorra',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    continent: 'Asia',
    nativeName: 'دولة الإمارات العربية المتحدة',
  },
]

describe('countries reducer', () => {
  const initialState: CountriesState = {
    countries: [],
    status: 'idle',
    search: '',
    regionFilter: 'None',
  }

  it('handles initial state', () => {
    expect(countriesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  it('handles pending request to fetch countries', () => {
    const action = fetchCountriesAsync.pending('123')
    const actual = countriesReducer(initialState, action)

    expect(actual).toEqual({
      ...initialState,
      status: 'loading',
    })
  })

  it('handles fulfilled request to fetch countries', () => {
    const action = fetchCountriesAsync.fulfilled(MOCK_COUNTRIES_RESPONSE, '123')
    const actual = countriesReducer(initialState, action)

    expect(actual).toEqual({
      ...initialState,
      countries: MOCK_COUNTRIES,
      status: 'idle',
    })
  })

  it('handles failed request to fetch countries', () => {
    const action = fetchCountriesAsync.rejected(
      { name: 'Error', message: 'Error message' },
      '123'
    )
    const actual = countriesReducer(initialState, action)

    expect(actual).toEqual({
      ...initialState,
      status: 'failed',
    })
  })

  it('handles setSearch', () => {
    const value = 'and'
    const actual = countriesReducer(initialState, setSearch(value))

    expect(actual).toEqual({
      ...initialState,
      search: value,
    })
  })

  it('handles setRegionFilter', () => {
    const value = 'Europe'
    const actual = countriesReducer(initialState, setRegionFilter(value))

    expect(actual).toEqual({
      ...initialState,
      regionFilter: value,
    })
  })
})
