import { screen } from '@testing-library/react'
import render from 'test/render'

import Username from './Username'

describe('Username', () => {
  it('renders correctly', async () => {
    render(<Username>laura5525</Username>)

    expect(screen.getByText('laura5525')).toBeInTheDocument()
  })
})
