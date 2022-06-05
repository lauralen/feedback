import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'

import Input from './Input'

describe('Input', () => {
  it('displays placeholder', async () => {
    render(<Input placeholder="Test" />)

    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('is disabled', async () => {
    render(<Input isDisabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('allows typing value', async () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })
})
