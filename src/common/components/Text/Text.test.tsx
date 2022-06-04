import { screen } from '@testing-library/react'
import render from 'test/render'

import Text from './Text'

describe('Text', () => {
  it('renders correctly', async () => {
    render(<Text>Test</Text>)

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
