import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import Link from './Link'

describe('Link', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <Link to="a-page">Test</Link>
      </BrowserRouter>
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/a-page')
  })
})
