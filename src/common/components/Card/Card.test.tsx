import render from 'test/render'

import Card from './Card'

describe('Card', () => {
  it('renders children', async () => {
    const { getByText } = render(
      <Card>
        <div>A component</div>
        <span>More text</span>
      </Card>
    )

    expect(getByText(/a component/i)).toBeInTheDocument()
    expect(getByText(/more text/i)).toBeInTheDocument()
  })
})
