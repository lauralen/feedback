import { screen } from '@testing-library/react'
import render from 'test/render'

import Content from './Content'

describe('Content', () => {
  it('renders children', async () => {
    render(
      <Content>
        <div>A component</div>
        <span>More text</span>
      </Content>
    )

    expect(screen.getByText(/a component/i)).toBeInTheDocument()
    expect(screen.getByText(/more text/i)).toBeInTheDocument()
  })
})
