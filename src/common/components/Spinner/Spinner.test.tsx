import { screen } from '@testing-library/react'
import render from 'test/render'

import Spinner from './Spinner'

describe('Spinner', () => {
  it('renders correctly', async () => {
    render(<Spinner />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
