import render from 'test/render'

import Drawer from './Drawer'

describe('Drawer', () => {
  it('renders children', async () => {
    const { getByText } = render(
      <Drawer isOpen onClose={jest.fn}>
        <div>A component</div>
        <span>More text</span>
      </Drawer>
    )

    expect(getByText(/a component/i)).toBeInTheDocument()
    expect(getByText(/more text/i)).toBeInTheDocument()
  })
})
