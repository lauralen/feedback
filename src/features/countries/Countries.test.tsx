import render from 'test/render'

import Countries from './Countries'

describe('Countries', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<Countries />)

    expect(getByText(/countries/i)).toBeInTheDocument()
  })
})
