import { BrowserRouter } from 'react-router-dom'
import render from 'test/render'
import * as tlsScreen from 'testing-library-selector'

import Roadmap from './Roadmap'

const Element = (
  <BrowserRouter>
    <Roadmap />
  </BrowserRouter>
)

const ui = {
  headerTitle: tlsScreen.byText(/roadmap/i),
  addFeedbackButton: tlsScreen.byRole('button', { name: /add feedback/i }),
  goBackButton: tlsScreen.byRole('button', { name: /go back/i }),
  // spinner: tlsScreen.byText(/loading.../i),
  // error: tlsScreen.byText(/error/i),
}

describe('Roadmap', () => {
  it('renders correctly', async () => {
    render(Element)

    expect(ui.headerTitle.get()).toBeInTheDocument()
    expect(ui.addFeedbackButton.get()).toBeInTheDocument()
    expect(ui.goBackButton.get()).toBeEnabled()
  })
})
