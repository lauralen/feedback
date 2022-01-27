import { screen } from '@testing-library/react'
import render from 'test/render'

import App from './App'

const Component = <App />

describe('App', () => {
  it('renders correctly', async () => {
    render(Component)

    expect(
      screen.getByRole('link', { name: /where in the world/i })
    ).toHaveAttribute('href', '/')
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeEnabled()
    expect(screen.getByText(/countries/i)).toBeInTheDocument()
  })
})
