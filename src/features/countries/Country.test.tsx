import { BrowserRouter } from 'react-router-dom'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { server } from 'mocks/server'
import { graphql } from 'msw'
import render from 'test/render'

import Country from './Country'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ code: 'AD' }),
}))

const Component = (
  <BrowserRouter>
    <Country />
  </BrowserRouter>
)

describe('Country', () => {
  it('displays data', async () => {
    render(Component)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.getAllByText(/Andorra/i)).toHaveLength(2)
    expect(screen.getByText(/Europe/i)).toBeInTheDocument()
    expect(screen.getByText('EUR')).toBeInTheDocument()
  })

  it('shows error message when request fails', async () => {
    server.use(
      graphql.query('Country', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(Component)

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
