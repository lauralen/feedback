import { graphql } from 'msw'

import { CountriesResponse } from 'features/countries/types'

export const handlers = [
  graphql.query<CountriesResponse>('Countries', (req, res, ctx) => {
    return res(ctx.data({ data: { countries: [{ name: 'Andora' }] } }))
  }),
]
