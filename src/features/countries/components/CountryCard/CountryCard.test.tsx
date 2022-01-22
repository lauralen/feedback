import { BrowserRouter } from 'react-router-dom'
import render from 'test/render'

import CountryCard from './CountryCard'

describe('CountryCard', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CountryCard
          data={{
            code: 'LT',
            name: 'Lithuania',
            continent: 'Europe',
            nativeName: 'Lietuva',
          }}
        />
      </BrowserRouter>
    )

    expect(getByText(/lithuania/i)).toBeInTheDocument()
  })
})
