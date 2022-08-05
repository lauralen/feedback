import { BrowserRouter } from 'react-router-dom'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { mockStatus } from 'mocks/handlers/roadmap'
import render from 'test/render'

import { capitalizeEveryWord } from 'common/utils'

import RoadmapCard from './RoadmapCard'

describe('RoadmapCard', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <RoadmapCard />
      </BrowserRouter>
    )

    await waitForElementToBeRemoved(() => screen.getByText(/spinner/i))

    expect(screen.getByText(/Roadmap/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view/i })).toHaveAttribute(
      'href',
      '/roadmap'
    )

    Object.keys(mockStatus).forEach((label) => {
      const count = mockStatus[label]
      expect(screen.getByText(capitalizeEveryWord(label))).toBeInTheDocument()
      expect(screen.getByText(count)).toBeInTheDocument()
    })
  })
})
