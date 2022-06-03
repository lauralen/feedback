import { screen } from '@testing-library/react'
import render from 'test/render'

import H2 from './H2'

describe('H2', () => {
  it('renders correctly', async () => {
    render(<H2>Test</H2>)

    const el = screen.getByRole('heading', { level: 2 })

    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent('Test')
  })
})
