import { graphql } from 'msw'

import { CountriesData, CountryData } from 'features/countries/types'

export const handlers = [
  graphql.query<CountriesData>('Countries', (req, res, ctx) => {
    return res(
      ctx.data({
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
      })
    )
  }),
  graphql.query<CountryData>('Country', (req, res, ctx) => {
    return res(
      ctx.data({
        country: {
          name: 'Andorra',
          continent: { name: 'Europe' },
          languages: [{ name: 'Catalan' }],
          native: 'Andorra',
          currency: 'EUR',
          states: [],
        },
      })
    )
  }),
]
