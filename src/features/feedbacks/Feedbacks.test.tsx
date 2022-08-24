import { BrowserRouter } from 'react-router-dom'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { generateStore } from 'app/store'
import { mockRequests, REQUESTS_ENDPOINT } from 'mocks/handlers/productRequests'
import { server } from 'mocks/server'
import { rest } from 'msw'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import Feedbacks from './Feedbacks'
import { fetchRequestsAsync } from './feedbacksSlice'

const ui = {
  spinner: tlsScreen.byText(/loading.../i),
  headerTitle: tlsScreen.byText(/frontend mentor/i),
  headerSubitle: tlsScreen.byText(/feedback board/i),
  sortSelect: tlsScreen.byRole('combobox'),
  addFeedbackButton: tlsScreen.byRole('button', { name: /add feedback/i }),
  error: tlsScreen.byText(/error/i),
  noDataMessage: tlsScreen.byText(/no feedback yet/i),
}

describe('Feedbacks', () => {
  it('renders a list of requests', async () => {
    const store = generateStore()
    store.dispatch(fetchRequestsAsync())

    render(
      <BrowserRouter>
        <Feedbacks />
      </BrowserRouter>,
      store
    )

    await waitForElementToBeRemoved(() => ui.spinner.get())

    expect(ui.headerTitle.get()).toBeInTheDocument()
    expect(ui.headerSubitle.get()).toBeInTheDocument()
    expect(ui.sortSelect.get()).toBeInTheDocument()
    expect(ui.addFeedbackButton.get()).toBeInTheDocument()

    expect(ui.noDataMessage.query()).not.toBeInTheDocument()
    expect(ui.error.query()).not.toBeInTheDocument()

    mockRequests.forEach(({ title }) =>
      expect(screen.getByText(title)).toBeInTheDocument()
    )
  })

  it('renders no data message', async () => {
    server.use(
      rest.get(REQUESTS_ENDPOINT, (req, res, ctx) => res(ctx.json([])))
    )
    const store = generateStore()
    store.dispatch(fetchRequestsAsync())

    render(
      <BrowserRouter>
        <Feedbacks />
      </BrowserRouter>,
      store
    )

    await waitForElementToBeRemoved(() => ui.spinner.get())

    expect(ui.headerTitle.get()).toBeInTheDocument()
    expect(ui.headerSubitle.get()).toBeInTheDocument()
    expect(ui.sortSelect.get()).toBeInTheDocument()
    expect(ui.addFeedbackButton.getAll()).toHaveLength(2)

    expect(ui.noDataMessage.get()).toBeInTheDocument()
    expect(ui.error.query()).not.toBeInTheDocument()
  })

  it('shows error message', async () => {
    server.use(
      rest.get(REQUESTS_ENDPOINT, (req, res, ctx) => res(ctx.status(500)))
    )
    const store = generateStore()
    store.dispatch(fetchRequestsAsync())

    render(
      <BrowserRouter>
        <Feedbacks />
      </BrowserRouter>,
      store
    )

    await waitForElementToBeRemoved(() => ui.spinner.get())

    expect(ui.headerTitle.get()).toBeInTheDocument()
    expect(ui.headerSubitle.get()).toBeInTheDocument()
    expect(ui.sortSelect.get()).toBeInTheDocument()
    expect(ui.addFeedbackButton.get()).toBeInTheDocument()

    expect(ui.error.get()).toBeInTheDocument()
    expect(ui.noDataMessage.query()).not.toBeInTheDocument()
  })
})
