import { waitFor } from '@testing-library/react'
import render from 'test/render'

import Countries from './Countries'

describe('Countries', () => {
  it('renders correctly', async () => {
    const { getByText, queryByText } = render(<Countries />)

    expect(getByText(/countries/i)).toBeInTheDocument()
    expect(getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument())

    expect(queryByText(/error/i)).not.toBeInTheDocument()
    expect(getByText(/andorra/i)).toBeInTheDocument()
    expect(getByText(/united arab emirates/i)).toBeInTheDocument()
  })
})
