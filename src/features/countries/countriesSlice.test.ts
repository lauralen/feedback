import countriesReducer, {
  CountriesState,
  fetchCountriesAsync,
} from './countriesSlice'

const MOCK_COUNTRIES_RESPONSE = {
  data: {
    countries: [
      {
        name: 'Andorra',
        continent: { name: 'Europe' },
        native: 'Andorra',
      },
      {
        name: 'United Arab Emirates',
        continent: {
          name: 'Asia',
        },
        native: 'دولة الإمارات العربية المتحدة',
      },
    ],
  },
}

const MOCK_COUNTRIES = [
  {
    name: 'Andorra',
    continent: 'Europe',
    nativeName: 'Andorra',
  },
  {
    name: 'United Arab Emirates',
    continent: 'Asia',
    nativeName: 'دولة الإمارات العربية المتحدة',
  },
]

describe('counter reducer', () => {
  const initialState: CountriesState = {
    countries: [],
    status: 'idle',
    search: '',
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
})
