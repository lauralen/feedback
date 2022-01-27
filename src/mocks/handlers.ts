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
          {
            code: 'AQ',
            name: 'Antarctica',
            continent: {
              name: 'Antarctica',
            },
            native: 'Antarctica',
          },
        ],
      })
    )
  }),
  graphql.query<CountryData>('Country', (req, res, ctx) => {
    const { code } = req.variables

    if (code === 'AD') {
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
    } else if (code === 'AQ') {
      return res(
        ctx.data({
          country: {
            name: 'Antarctica',
            continent: { name: 'Antarctica' },
            languages: [],
            native: 'Antarctica',
            currency: null,
            states: [],
          },
        })
      )
    }
  }),
]
