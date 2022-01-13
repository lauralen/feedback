import render from 'test/render'

import Input from './Input'

describe('Input', () => {
  it('renders correctly', async () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test" />)

    expect(getByPlaceholderText('Test')).toBeInTheDocument()
  })
})
