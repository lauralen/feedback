import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import AddFeedback from './AddFeedback'

describe('AddFeedback', () => {
  it('has link to provided route', async () => {
    render(
      <BrowserRouter>
        <AddFeedback />
      </BrowserRouter>
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
