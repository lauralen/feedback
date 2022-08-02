import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockRequests, REQUEST_ENDPOINT } from 'mocks/productRequests'
import { server } from 'mocks/server'
import { rest } from 'msw'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import Feedback from './Feedback'

const ID = 1
const DATA = mockRequests[ID - 1]

const Element = (
  <MemoryRouter initialEntries={[`/feedback/${ID}`]}>
    <Routes>
      <Route path="/feedback/:id" element={<Feedback />} />
    </Routes>
  </MemoryRouter>
)

const ui = {
  spinner: tlsScreen.byText(/loading.../i),
  error: tlsScreen.byText(/error/i),
  goBackLink: tlsScreen.byRole('link', { name: /go back/i }),
  editFeedbackButton: tlsScreen.byRole('button', { name: /edit feedback/i }),
  commentInput: tlsScreen.byRole('textbox', {
    name: /comment/i,
  }),
  initialCharactersLeft: tlsScreen.byText(/250 Characters left/i),
  postCommentButton: tlsScreen.byRole('button', { name: /Post Comment/i }),
  upvoteButton: tlsScreen.byRole('button', {
    name: `Upvote request (current upvotes: ${DATA.upvotes})`,
  }),
}

describe('Feedback', () => {
  it('renders request info', async () => {
    render(Element)

    await waitForElementToBeRemoved(() => ui.spinner.get())
    expect(ui.error.query()).not.toBeInTheDocument()

    expect(ui.goBackLink.get()).toHaveAttribute('href', '/')
    expect(ui.editFeedbackButton.get()).toBeInTheDocument()

    // feedback card
    expect(
      screen.getByRole('heading', { name: DATA.title })
    ).toBeInTheDocument()
    expect(screen.getByText(DATA.description)).toBeInTheDocument()
    expect(screen.getByText(DATA.category)).toBeInTheDocument()
    expect(ui.upvoteButton.get()).toBeInTheDocument()

    // comments
    expect(
      screen.getByText(`${DATA.comments?.length} comments`)
    ).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: /User avatar/i })).toHaveLength(2)
    DATA.comments?.forEach(({ content, user }) => {
      expect(screen.getByText(user.name)).toBeInTheDocument()
      expect(screen.getByText(user.username)).toBeInTheDocument()
      expect(screen.getByText(content)).toBeInTheDocument()
    })

    // add comment form
    expect(screen.getByText(/Add Comment/i)).toBeInTheDocument()
    expect(ui.commentInput.get()).toBeInTheDocument()
    expect(ui.initialCharactersLeft.get()).toBeInTheDocument()
    expect(ui.postCommentButton.get()).toBeInTheDocument()
  })

  it('shows error message', async () => {
    server.use(
      rest.get(REQUEST_ENDPOINT, (req, res, ctx) => res(ctx.status(500)))
    )
    render(Element)

    await waitForElementToBeRemoved(() => ui.spinner.get())

    expect(ui.error.get()).toBeInTheDocument()
  })

  it('handles form', async () => {
    render(Element)

    await waitForElementToBeRemoved(() => ui.spinner.get())

    const mockComment = 'Create a filter'
    userEvent.type(ui.commentInput.get(), mockComment)
    expect(ui.commentInput.get()).toHaveValue(mockComment)
    expect(screen.getByText(/235 Characters left/i)).toBeInTheDocument()
    userEvent.click(ui.postCommentButton.get())

    await waitFor(() => expect(ui.commentInput.get()).toHaveValue(''))
    expect(ui.initialCharactersLeft.get()).toBeInTheDocument()
  })

  it('increments upvote count on upvote button click', async () => {
    render(Element)
    await waitForElementToBeRemoved(() => ui.spinner.get())

    userEvent.click(ui.upvoteButton.get())
    expect(
      screen.getByRole('button', {
        name: `Upvote request (current upvotes: ${DATA.upvotes + 1})`,
      })
    )
  })
})
