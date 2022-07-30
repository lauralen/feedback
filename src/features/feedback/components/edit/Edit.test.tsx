import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockRequests } from 'mocks/productRequests'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import { feedbackCategoriesLabels } from 'common/consts'

import Edit from './Edit'

const ID = 1
const DATA = mockRequests[ID - 1]

const Element = (
  <MemoryRouter initialEntries={[`/feedback/${ID}`]}>
    <Routes>
      <Route path="/feedback/:id" element={<Edit />} />
    </Routes>
  </MemoryRouter>
)

const ui = {
  loader: tlsScreen.byText(/loading/i),
  goBackLink: tlsScreen.byRole('link', { name: /go back/i }),
  title: tlsScreen.byText(`Editing ${DATA.title}`),
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
  deleteButton: tlsScreen.byRole('button', { name: /delete/i }),
  submitButton: tlsScreen.byRole('button', { name: /save changes/i }),
}

describe('Edit Feedback', () => {
  it('renders correctly', async () => {
    const previousRoute = `/feedback/${ID}`

    render(Element)
    await waitForElementToBeRemoved(ui.loader.get())

    expect(ui.goBackLink.get()).toHaveAttribute('href', previousRoute)

    expect(ui.title.get()).toBeInTheDocument()
    expect(ui.titleInput.get()).toBeEnabled()
    expect(ui.categorySelect.get()).toBeEnabled()
    expect(ui.detailInput.get()).toBeEnabled()

    expect(ui.cancelLink.get()).toHaveAttribute('href', previousRoute)
    expect(ui.deleteButton.get()).toBeEnabled()
    expect(ui.submitButton.get()).toBeEnabled()
  })

  it('fills inputs with fetched data', async () => {
    render(Element)
    await waitForElementToBeRemoved(ui.loader.get())

    expect(ui.titleInput.get()).toHaveValue(DATA.title)
    expect(ui.categorySelect.get()).toHaveValue(DATA.category)
    expect(ui.detailInput.get()).toHaveValue(DATA.description)
  })

  it('handles form', async () => {
    render(Element)

    await waitForElementToBeRemoved(ui.loader.get())

    const invalidTitle = faker.random.alpha({ count: 131 })
    const mockTitle = faker.random.alpha({ count: 20 })
    const invalidDetail = faker.random.alpha({ count: 501 })
    const mockDetail = faker.random.alpha({ count: 130 })

    // title input
    userEvent.clear(ui.titleInput.get())
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
    userEvent.clear(ui.detailInput.get())
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
