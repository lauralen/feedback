import { screen } from '@testing-library/react'
import render from 'test/render'

import UpvoteButton from './UpvoteButton'

describe('UpvoteButton', () => {
  it('renders correctly', () => {
    render(<UpvoteButton upvotes={123} />)

    expect(
      screen.getByRole('button', {
        name: /upvote request \(current upvotes: 123\)/i,
      })
    ).toBeInTheDocument()
  })
})
