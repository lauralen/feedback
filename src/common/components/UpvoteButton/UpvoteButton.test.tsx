import { screen } from '@testing-library/react'
import render from 'test/render'

import UpvoteButton from './UpvoteButton'

describe('UpvoteButton', () => {
  it('renders correctly', async () => {
    render(<UpvoteButton>Test</UpvoteButton>)

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
