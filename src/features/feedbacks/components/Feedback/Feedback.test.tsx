import { screen } from '@testing-library/react'
import render from 'test/render'

import Feedback from './Feedback'

describe('Feedback', () => {
  it('renders correctly', async () => {
    render(<Feedback />)

    expect(
      screen.getByRole('heading', { name: /Add tags for solutions/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Easier to search for solutions based on a specific stack.'
      )
    ).toBeInTheDocument()
  })
})
