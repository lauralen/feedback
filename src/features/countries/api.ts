import { gql } from 'graphql-request'

import { CountriesResponse, CountryResponse } from './types'

export async function fetchCountries(): Promise<CountriesResponse> {
  const query = gql`
    query Countries {
      countries {
        code
        name
        continent {
          name
        }
        native
      }
    }
  `

  const response = await fetch(
    process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    }
  )

  return await response.json()
}

export async function fetchCountry(): Promise<CountryResponse> {
  const query = gql`
    query Country {
      country(code: "LT") {
        name
        native
        continent {
          name
        }
        currency
        languages {
          name
        }
        states {
          name
        }
      }
    }
  `

  const response = await fetch(
    process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    }
  )

  return await response.json()
}
