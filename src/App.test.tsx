import { screen } from '@testing-library/react'
import render from 'test/render'

import App from './App'

const Component = <App />

describe('App', () => {
  it('renders correctly', async () => {
    render(Component)

    expect(screen.getByText(/feedback board/i)).toBeInTheDocument()
  })
})
