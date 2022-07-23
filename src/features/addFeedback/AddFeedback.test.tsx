import { BrowserRouter } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import { feedbackCategoriesLabels } from 'common/consts'

import AddFeedback from './AddFeedback'

const Element = (
  <BrowserRouter>
    <AddFeedback />
  </BrowserRouter>
)

const ui = {
  goBackLink: tlsScreen.byRole('link', { name: /go back/i }),
  title: tlsScreen.byText(/Create New Feedback/i),
  titleInput: tlsScreen.byRole('textbox', {
    name: /feedback title/i,
    description: /Add a short, descriptive headline/i,
  }),
  titleTooLongError: tlsScreen.byText(/Can't be longer than 130 characters/i),
  emptyInputError: tlsScreen.byText(/Can't be empty/i),
  categorySelect: tlsScreen.byRole('combobox', {
    name: /category/i,
    description: /Choose a category for your feedback/i,
  }),
  detailInput: tlsScreen.byRole('textbox', {
    name: /feedback detail/i,
    description:
      /Include any specific comments on what should be improved, added, etc./i,
  }),
  detailTooLongError: tlsScreen.byText(/Can't be longer than 500 characters/i),
  cancelLink: tlsScreen.byRole('link', { name: /cancel/i }),
  submitButton: tlsScreen.byRole('button', { name: /add feedback/i }),
}

describe('AddFeedback', () => {
  it('renders correctly', () => {
    render(Element)

    expect(ui.goBackLink.get()).toHaveAttribute('href', '/')

    expect(ui.title.get()).toBeInTheDocument()
    expect(ui.titleInput.get()).toBeEnabled()
    expect(ui.categorySelect.get()).toBeEnabled()
    expect(ui.detailInput.get()).toBeEnabled()

    expect(ui.cancelLink.get()).toHaveAttribute('href', '/')
    expect(ui.submitButton.get()).toBeInTheDocument()
  })

  it('handles form', async () => {
    render(Element)

    const invalidTitle = faker.random.alpha({ count: 131 })
    const mockTitle = faker.random.alpha({ count: 20 })
    const invalidDetail = faker.random.alpha({ count: 501 })
    const mockDetail = faker.random.alpha({ count: 130 })

    // title input
    userEvent.type(ui.titleInput.get(), invalidTitle)
    await waitFor(() => expect(ui.titleInput.get()).toHaveValue(invalidTitle))
    fireEvent.blur(ui.titleInput.get())
    await waitFor(() => expect(ui.titleTooLongError.get()).toBeInTheDocument())

    userEvent.clear(ui.titleInput.get())
    await waitFor(() => expect(ui.emptyInputError.get()).toBeInTheDocument())
    await waitFor(() =>
      expect(ui.titleTooLongError.query()).not.toBeInTheDocument()
    )
    userEvent.type(ui.titleInput.get(), mockTitle)
    await waitFor(() => expect(ui.titleInput.get()).toHaveValue(mockTitle))
    await waitFor(() =>
      expect(ui.emptyInputError.query()).not.toBeInTheDocument()
    )

    // category select
    feedbackCategoriesLabels.forEach((option) =>
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument()
    )
    expect(ui.categorySelect.get()).toHaveValue('enhancement')
    userEvent.selectOptions(ui.categorySelect.get(), 'bug')
    expect(ui.categorySelect.get()).toHaveValue('bug')

    // detail input
    userEvent.type(ui.detailInput.get(), invalidDetail)
    await waitFor(() => expect(ui.detailInput.get()).toHaveValue(invalidDetail))
    fireEvent.blur(ui.detailInput.get())
    await waitFor(() => expect(ui.detailTooLongError.get()).toBeInTheDocument())

    userEvent.clear(ui.detailInput.get())
    await waitFor(() => expect(ui.emptyInputError.get()).toBeInTheDocument())
    await waitFor(() =>
      expect(ui.detailTooLongError.query()).not.toBeInTheDocument()
    )
    userEvent.type(ui.detailInput.get(), mockDetail)
    await waitFor(() => expect(ui.detailInput.get()).toHaveValue(mockDetail))
    await waitFor(() =>
      expect(ui.emptyInputError.query()).not.toBeInTheDocument()
    )
  }, 30000)
})
