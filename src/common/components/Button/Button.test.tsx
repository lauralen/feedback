import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'

import Button from './Button'

describe('Button', () => {
  it('renders correctly', async () => {
    render(<Button>Test</Button>)

    const button = screen.getByRole('button', { name: 'Test' })

    expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument()
    expect(button).toBeEnabled()
  })

  it('is disabled', async () => {
    render(<Button disabled>Test</Button>)

    expect(screen.getByRole('button', { name: 'Test' })).toBeDisabled()
  })

  it('calls onClick', async () => {
    const mockFn = jest.fn()
    render(<Button onClick={mockFn}>Test</Button>)

    const button = screen.getByRole('button', { name: 'Test' })

    userEvent.click(button)
    expect(mockFn).toBeCalledTimes(1)
  })
})
