import { graphql } from 'msw'

import { CountriesData } from 'features/countries/types'

export const handlers = [
  graphql.query<CountriesData>('Countries', (req, res, ctx) => {
    return res(
      ctx.data({
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
      })
    )
  }),
]
