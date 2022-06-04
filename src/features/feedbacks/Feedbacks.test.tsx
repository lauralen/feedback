import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import render from 'test/render'

import Feedbacks from './Feedbacks'

const Component = (
  <BrowserRouter>
    <Feedbacks />
  </BrowserRouter>
)

describe('Feedbacks', () => {
  it('renders correctly', async () => {
    render(Component)

    expect(screen.getByText(/frontend mentor/i)).toBeInTheDocument()
    expect(screen.getByText(/feedback board/i)).toBeInTheDocument()

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /add feedback/i })
    ).toHaveLength(2)
  })
})
