import { graphql } from 'msw'

import { CountriesData } from 'features/countries/types'

export const handlers = [
  graphql.query<CountriesData>('Countries', (req, res, ctx) => {
    return res(ctx.data({ countries: [{ name: 'Andora' }] }))
  }),
]
