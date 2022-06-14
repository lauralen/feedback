import { screen } from '@testing-library/react'
import render from 'test/render'

import Card from './Card'

describe('Card', () => {
  it('renders children', async () => {
    render(
      <Card>
        <div>A component</div>
        <span>More text</span>
      </Card>
    )

    expect(screen.getByText(/a component/i)).toBeInTheDocument()
    expect(screen.getByText(/more text/i)).toBeInTheDocument()
  })
})
