import { screen } from '@testing-library/react'
import { mockComment, mockCommentWithReplies } from 'mocks/productRequests'
import render from 'test/render'

import Comment from './Comment'

describe('Comment', () => {
  it('renders correctly', async () => {
    render(<Comment data={mockComment} />)

    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument()
    expect(screen.getByText(mockComment.user.username)).toBeInTheDocument()
    expect(screen.getByText(mockComment.content)).toBeInTheDocument()
  })

  it('renders replies', async () => {
    render(<Comment data={mockCommentWithReplies} />)

    expect(
      screen.getByText(mockCommentWithReplies.user.name)
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(mockCommentWithReplies.user.username)
    ).toHaveLength(2)
    expect(screen.getByText(mockCommentWithReplies.content)).toBeInTheDocument()

    mockCommentWithReplies.replies?.forEach(({ content, user }, index) => {
      expect(screen.getByText(user.name)).toBeInTheDocument()
      if (index === 1) {
        expect(screen.getByText(user.username)).toBeInTheDocument()
      } else {
        // second reply is to first reply
        expect(screen.getAllByText(user.username)).toHaveLength(2)
      }
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })
})
