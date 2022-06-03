import { screen } from '@testing-library/react'
import render from 'test/render'

import H1 from './H1'

describe('H1', () => {
  it('renders correctly', async () => {
    render(<H1>Test</H1>)

    const el = screen.getByRole('heading', { level: 1 })

    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent('Test')
  })
})
