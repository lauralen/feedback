import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import RoadmapCard from './RoadmapCard'

describe('RoadmapCard', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <RoadmapCard />
      </BrowserRouter>
    )

    expect(screen.getByText(/Roadmap/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view/i })).toHaveAttribute(
      'href',
      '/roadmap'
    )

    expect(screen.getByText(/Planned/i)).toBeInTheDocument()
    expect(screen.getByText(/In-progress/i)).toBeInTheDocument()
    expect(screen.getByText(/Live/i)).toBeInTheDocument()
    expect(screen.getAllByText(/2/i)).toHaveLength(3)
  })
})
