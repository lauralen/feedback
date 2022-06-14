import { screen } from '@testing-library/react'
import { mockComment } from 'mocks/productRequests'
import render from 'test/render'

import Comment from './Comment'

describe('Comment', () => {
  it('renders correctly', async () => {
    render(<Comment data={mockComment} />)

    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument()
    expect(screen.getByText(mockComment.user.username)).toBeInTheDocument()
    expect(screen.getByText(mockComment.content)).toBeInTheDocument()
  })
})
