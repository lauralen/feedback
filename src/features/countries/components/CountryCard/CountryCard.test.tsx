import render from 'test/render'

import CountryCard from './CountryCard'

describe('CountryCard', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <CountryCard
        data={{
          name: 'Lithuania',
          continent: 'Europe',
          nativeName: 'Lietuva',
        }}
      />
    )

    expect(getByText(/lithuania/i)).toBeInTheDocument()
  })
})
