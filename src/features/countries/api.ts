import { gql } from 'graphql-request'

import { fetchGraphQL } from 'common/api'

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

  return fetchGraphQL<CountriesResponse>({ query })
}

export async function fetchCountry(code: string): Promise<CountryResponse> {
  const query = gql`
    query Country($code: ID!) {
      country(code: $code) {
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

  const variables = { code }

  return fetchGraphQL<CountryResponse>({ query, variables })
}
