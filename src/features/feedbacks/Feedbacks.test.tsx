import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { mockRequests, REQUESTS_ENDPOINT } from 'mocks/productRequests'
import { server } from 'mocks/server'
import { rest } from 'msw'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import Feedbacks from './Feedbacks'

const Component = <Feedbacks />

const ui = {
  spinner: tlsScreen.byText(/loading/i),
  headerTitle: tlsScreen.byText(/frontend mentor/i),
  headerSubitle: tlsScreen.byText(/feedback board/i),
  sortSelect: tlsScreen.byRole('combobox'),
  addFeedbackButton: tlsScreen.byRole('button', { name: /add feedback/i }),
  error: tlsScreen.byText(/error/i),
  noDataMessage: tlsScreen.byText(/no feedback yet/i),
}

describe('Feedbacks', () => {
  it('renders a list of requests', async () => {
    render(Component)

    await waitForElementToBeRemoved(() => ui.spinner.get())

    expect(ui.headerTitle.get()).toBeInTheDocument()
    expect(ui.headerSubitle.get()).toBeInTheDocument()
    expect(ui.sortSelect.get()).toBeInTheDocument()
    expect(ui.addFeedbackButton.get()).toBeInTheDocument()

    expect(ui.noDataMessage.query()).not.toBeInTheDocument()
    expect(ui.error.query()).not.toBeInTheDocument()

    // mockRequests.forEach(({ title }) =>
    //   expect(screen.getByText(title)).toBeInTheDocument()
    // )
  })

  it('renders no data message', async () => {
    server.use(
      rest.get(REQUESTS_ENDPOINT, (req, res, ctx) => res(ctx.json([])))
    )
    render(Component)

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
    render(Component)

    await waitForElementToBeRemoved(() => ui.spinner.get())

    expect(ui.headerTitle.get()).toBeInTheDocument()
    expect(ui.headerSubitle.get()).toBeInTheDocument()
    expect(ui.sortSelect.get()).toBeInTheDocument()
    expect(ui.addFeedbackButton.get()).toBeInTheDocument()

    expect(ui.error.get()).toBeInTheDocument()
    expect(ui.noDataMessage.query()).not.toBeInTheDocument()
  })
})
