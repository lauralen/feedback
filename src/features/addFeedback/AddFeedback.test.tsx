import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import AddFeedback from './AddFeedback'

describe('AddFeedback', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <AddFeedback />
      </BrowserRouter>
    )

    expect(screen.getByRole('link', { name: /go back/i })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: /cancel/i })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
