import { screen } from '@testing-library/react'
import render from 'test/render'

import NoData from './NoData'

describe('NoData', () => {
  it('renders correctly', async () => {
    render(<NoData />)

    expect(screen.getByText(/no feedback/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add feedback/i })
    ).toBeInTheDocument()
  })
})
