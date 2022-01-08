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

  const response = await fetch('https://countries.trevorblades.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })

  return await response.json()
}
