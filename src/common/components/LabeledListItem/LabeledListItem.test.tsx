import render from 'test/render'

import LabeledListItem from './LabeledListItem'

describe('LabeledListItem', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <LabeledListItem label="fruit" value="orange" />
    )

    expect(getByText(/fruit:/i)).toBeInTheDocument()
    expect(getByText(/orange/i)).toBeInTheDocument()
  })

  it('displays a dash for value if it is undefined', () => {
    const { getByText } = render(
      <LabeledListItem label="fruit" value={undefined} />
    )

    expect(getByText(/fruit:/i)).toBeInTheDocument()
    expect(getByText(/-/i)).toBeInTheDocument()
  })
})
