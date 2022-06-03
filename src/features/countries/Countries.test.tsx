import { BrowserRouter } from 'react-router-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from 'mocks/server'
import { graphql } from 'msw'
import render from 'test/render'

import Countries from './Countries'

const SEARCH_INPUT_PLACEHOLDER = 'Search for a country...'

const Component = (
  <BrowserRouter>
    <Countries />
  </BrowserRouter>
)

describe('Countries', () => {
  it('renders correctly', async () => {
    render(Component)

    expect(screen.getByText(/countries/i)).toBeInTheDocument()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()

    const REGION_SELECT = screen.getByLabelText(/Filter by Region/i)
    expect(screen.getByText(/countries/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER)
    ).toBeInTheDocument()
    expect(REGION_SELECT).toBeInTheDocument()
    expect(REGION_SELECT).toHaveValue('None')
    expect(screen.getAllByText(/andorra/i)).toHaveLength(2)
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
  })

  it('shows error message if countries request fails', async () => {
    server.use(
      graphql.query('Countries', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(Component)

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )
    expect(screen.getByText(/error/i)).toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText(SEARCH_INPUT_PLACEHOLDER)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText(/Filter by Region/i)
    ).not.toBeInTheDocument()
  })

  it('filters countries by search value', async () => {
    render(Component)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )

    const searchInput = screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER)

    userEvent.type(searchInput, 'unit')
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()

    userEvent.clear(searchInput)
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    expect(screen.getAllByText(/andorra/i)).toHaveLength(2)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()

    userEvent.type(searchInput, 'me')
    expect(screen.queryByText(/united arab emirates/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.getByText(/no countries match/i)).toBeInTheDocument()
    userEvent.clear(searchInput)
  })

  it('renders region select', async () => {
    render(Component)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )

    const defaultOption = screen.getByRole('option', {
      name: /none/i,
    }) as HTMLOptionElement
    const asiaOption = screen.getByRole('option', {
      name: /asia/i,
    }) as HTMLOptionElement
    const africaOption = screen.getByRole('option', {
      name: /africa/i,
    }) as HTMLOptionElement
    const northAmericaOption = screen.getByRole('option', {
      name: /north america/i,
    }) as HTMLOptionElement
    const southAmericaOption = screen.getByRole('option', {
      name: /south america/i,
    }) as HTMLOptionElement
    const europeOption = screen.getByRole('option', {
      name: /europe/i,
    }) as HTMLOptionElement
    const oceaniaOption = screen.getByRole('option', {
      name: /oceania/i,
    }) as HTMLOptionElement

    expect(screen.getByLabelText(/filter by region/i)).toBeInTheDocument()
    expect(defaultOption.selected).toBe(true)
    expect(asiaOption.selected).toBe(false)
    expect(africaOption.selected).toBe(false)
    expect(northAmericaOption.selected).toBe(false)
    expect(southAmericaOption.selected).toBe(false)
    expect(europeOption.selected).toBe(false)
    expect(oceaniaOption.selected).toBe(false)
  })

  it('handles filtering by region', async () => {
    render(Component)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )

    const regionSelect = screen.getByLabelText(/filter by region/i)
    const asiaOption = screen.getByRole('option', {
      name: /asia/i,
    }) as HTMLOptionElement
    const noneOption = screen.getByRole('option', {
      name: /none/i,
    }) as HTMLOptionElement
    const europeOption = screen.getByRole('option', {
      name: /europe/i,
    }) as HTMLOptionElement

    userEvent.selectOptions(regionSelect, asiaOption)
    expect(asiaOption.selected).toBe(true)
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()

    userEvent.selectOptions(regionSelect, noneOption)
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    expect(screen.getAllByText(/andorra/i)).toHaveLength(2)
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()

    userEvent.selectOptions(regionSelect, europeOption)
    expect(screen.queryByText(/united arab emirates/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/andorra/i)).toHaveLength(2)
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })

  it('handles filtering by search and selected region', async () => {
    render(Component)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    )

    const searchInput = screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER)
    const regionSelect = screen.getByLabelText(/filter by region/i)
    const europeOption = screen.getByRole('option', {
      name: /europe/i,
    }) as HTMLOptionElement
    const asiaOption = screen.getByRole('option', {
      name: /asia/i,
    }) as HTMLOptionElement

    userEvent.selectOptions(regionSelect, europeOption)
    expect(europeOption.selected).toBe(true)

    userEvent.type(searchInput, 'and')
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/united arab emirates/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/andorra/i)).toHaveLength(2)

    userEvent.type(searchInput, '1')
    expect(screen.getByText(/no countries match/i)).toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/united arab emirates/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()

    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'an')
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/united arab emirates/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/andorra/i)).toHaveLength(2)

    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'un')
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.getByText(/no countries match/i)).toBeInTheDocument()
    expect(screen.queryByText(/united arab emirates/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()

    userEvent.selectOptions(regionSelect, asiaOption)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/no countries match/i)).not.toBeInTheDocument()
    expect(screen.getByText(/united arab emirates/i)).toBeInTheDocument()
    expect(screen.queryByText(/andorra/i)).not.toBeInTheDocument()
  })
})
