import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'

import TextArea from './TextArea'

describe('TextArea', () => {
  it('displays placeholder', async () => {
    render(<TextArea placeholder="Test" />)

    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('is disabled', async () => {
    render(<TextArea isDisabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('allows typing value', async () => {
    render(<TextArea />)
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })
})
