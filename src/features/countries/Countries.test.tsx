import { waitFor } from '@testing-library/react'
import { server } from 'mocks/server'
import { graphql } from 'msw'
import render from 'test/render'

import Countries from './Countries'

describe('Countries', () => {
  it('renders correctly', async () => {
    const { getByText, queryByText, getAllByText, getByPlaceholderText } =
      render(<Countries />)

    expect(getByText(/countries/i)).toBeInTheDocument()
    expect(getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument())

    expect(queryByText(/error/i)).not.toBeInTheDocument()

    expect(getByPlaceholderText('Search for a country...')).toBeInTheDocument()
    expect(getAllByText(/andorra/i)).toHaveLength(2)
    expect(getByText(/united arab emirates/i)).toBeInTheDocument()
  })

  it('shows error message if countries request fails', async () => {
    server.use(
      graphql.query('Countries', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { getByText, queryByText } = render(<Countries />)

    await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument())
    expect(getByText(/error/i)).toBeInTheDocument()
  })
})
