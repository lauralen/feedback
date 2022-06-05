import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import GoBackLink from './GoBackLink'

describe('GoBackLink', () => {
  it('has link to provided route', async () => {
    render(
      <BrowserRouter>
        <GoBackLink to="mock-route">Test</GoBackLink>
      </BrowserRouter>
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/mock-route')
  })

  it('has link to main page', async () => {
    render(
      <BrowserRouter>
        <GoBackLink>Test</GoBackLink>
      </BrowserRouter>
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
