import { screen } from '@testing-library/react'
import { mockRequests } from 'mocks/handlers/productRequests'
import render from 'test/render'

import { formatFeedbacks } from 'features/feedbacks/feedbacksSlice'

import FeedbackCard from './FeedbackCard'

describe('FeedbackCard', () => {
  it('renders correctly', async () => {
    const data = formatFeedbacks(mockRequests)[0]
    render(<FeedbackCard data={data} onUpvoteClick={jest.fn} />)

    expect(
      screen.getByRole('heading', { name: data.title })
    ).toBeInTheDocument()
    expect(screen.getByText(data.description)).toBeInTheDocument()
    expect(screen.getByText(data.category)).toBeInTheDocument()
    expect(screen.getByText(data.upvotes)).toBeInTheDocument()
    expect(
      screen.getByText(String(data.comments?.length as number))
    ).toBeInTheDocument()
  })
})
