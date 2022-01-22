import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from 'mocks/server'
import { graphql } from 'msw'
import render from 'test/render'

import Countries from './Countries'

const SEARCH_INPUT_PLACEHOLDER = 'Search for a country...'

describe('Countries', () => {
  it('renders correctly', async () => {
    const { getByText, queryByText, getAllByText, getByPlaceholderText } =
      render(<Countries />)

    expect(getByText(/countries/i)).toBeInTheDocument()
    expect(getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument())

    expect(queryByText(/error/i)).not.toBeInTheDocument()

    expect(getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER)).toBeInTheDocument()
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

  it('filters countries by search value', async () => {
    render(<Countries />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )

    userEvent.type(
      screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER),
      'unit'
    )
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()

    userEvent.clear(screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER))
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getAllByText(/andorra/i)).toHaveLength(2))
  })
})
