import { screen } from '@testing-library/react'
import { mockRequests } from 'mocks/productRequests'
import render from 'test/render'

import Feedback from './Feedback'

describe('Feedback', () => {
  it('renders correctly', async () => {
    const data = mockRequests[0]
    render(<Feedback data={data} />)

    expect(
      screen.getByRole('heading', { name: data.title })
    ).toBeInTheDocument()
    expect(screen.getByText(data.description)).toBeInTheDocument()
  })
})
