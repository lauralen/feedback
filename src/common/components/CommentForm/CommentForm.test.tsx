import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import CommentForm from './CommentForm'

const Element = (
  <MemoryRouter initialEntries={[`/feedback/1`]}>
    <Routes>
      <Route path="/feedback/:id" element={<CommentForm />} />
    </Routes>
  </MemoryRouter>
)

const ui = {
  input: tlsScreen.byRole('textbox', {
    name: /comment/i,
  }),
  emptyInputError: tlsScreen.byText(/Can't be empty/i),
  tooLongError: tlsScreen.byText(/Can't be longer than 250 characters/i),
  submitButton: tlsScreen.byRole('button', { name: /post comment/i }),
  charCount: tlsScreen.byText(/250 Characters left/i),
}

describe('AddFeedback', () => {
  it('renders correctly', () => {
    render(Element)

    expect(ui.input.get()).toBeEnabled()
    expect(ui.charCount.get()).toBeInTheDocument()
    expect(ui.submitButton.get()).toBeInTheDocument()

    expect(ui.emptyInputError.query()).not.toBeInTheDocument()
    expect(ui.tooLongError.query()).not.toBeInTheDocument()
  })

  it('handles form', async () => {
    render(Element)

    const invalidComment = faker.random.alpha({ count: 255 })
    const mockComment = faker.random.alpha({ count: 150 })

    userEvent.type(ui.input.get(), invalidComment)
    await waitFor(() => expect(ui.input.get()).toHaveValue(invalidComment))
    fireEvent.blur(ui.input.get())
    await waitFor(() => expect(ui.tooLongError.get()).toBeInTheDocument())
    expect(screen.getByText(/0 Characters left/i))

    userEvent.clear(ui.input.get())
    await waitFor(() => expect(ui.emptyInputError.get()).toBeInTheDocument())
    await waitFor(() => expect(ui.tooLongError.query()).not.toBeInTheDocument())
    expect(ui.charCount.get()).toBeInTheDocument()

    userEvent.type(ui.input.get(), mockComment)
    await waitFor(() => expect(ui.input.get()).toHaveValue(mockComment))
    await waitFor(() =>
      expect(ui.emptyInputError.query()).not.toBeInTheDocument()
    )
    expect(screen.getByText(/100 Characters left/i))

    userEvent.click(ui.submitButton.get())
    await waitFor(() => expect(ui.input.get()).toHaveValue(''))
    expect(ui.charCount.get()).toBeInTheDocument()
  })
})
