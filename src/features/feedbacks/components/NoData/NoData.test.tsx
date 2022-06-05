import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import NoData from './NoData'

describe('NoData', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <NoData />
      </BrowserRouter>
    )

    expect(screen.getByText(/no feedback/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add feedback/i })
    ).toBeInTheDocument()
  })
})
