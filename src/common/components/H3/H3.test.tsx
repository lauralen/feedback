import { screen } from '@testing-library/react'
import render from 'test/render'

import H3 from './H3'

describe('H3', () => {
  it('renders correctly', async () => {
    render(<H3>Test</H3>)

    const el = screen.getByRole('heading', { level: 3 })

    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent('Test')
  })
})
