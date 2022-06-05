import { screen } from '@testing-library/react'
import { mockRequests } from 'mocks/productRequests'
import render from 'test/render'

import FeedbackCard from './FeedbackCard'

describe('FeedbackCard', () => {
  it('renders correctly', async () => {
    const data = mockRequests[0]
    render(<FeedbackCard data={data} />)

    expect(
      screen.getByRole('heading', { name: data.title })
    ).toBeInTheDocument()
    expect(screen.getByText(data.description)).toBeInTheDocument()
  })
})
