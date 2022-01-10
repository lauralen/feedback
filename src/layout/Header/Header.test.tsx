import render from 'test/render'

import Header from './Header'

describe('Header', () => {
  it('renders children', async () => {
    const { getByText } = render(
      <Header>
        <div>A component</div>
        <span>More text</span>
      </Header>
    )

    expect(getByText(/a component/i)).toBeInTheDocument()
    expect(getByText(/more text/i)).toBeInTheDocument()
  })
})
