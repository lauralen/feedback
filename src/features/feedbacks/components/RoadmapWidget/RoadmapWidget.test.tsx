import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import RoadmapWidget from './RoadmapWidget'

describe('RoadmapWidget', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <RoadmapWidget />
      </BrowserRouter>
    )

    expect(screen.getByText(/Roadmap/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view/i })).toHaveAttribute(
      'href',
      '/roadmap'
    )

    expect(screen.getByText(/planned/i)).toBeInTheDocument()
    expect(screen.getByText(/in-progress/i)).toBeInTheDocument()
    expect(screen.getByText(/live/i)).toBeInTheDocument()
    expect(screen.getAllByText(0)).toHaveLength(3)
  })
})
