import { gql } from 'graphql-request'

import { CountriesResponse } from './types'

export async function fetchCountries(): Promise<CountriesResponse> {
  const query = gql`
    query Countries {
      countries {
        name
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
