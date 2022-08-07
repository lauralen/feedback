import { screen } from '@testing-library/react'
import render from 'test/render'

import RequestStatus from './RequestStatus'

describe('RequestStatus', () => {
  it('renders correctly when status is planned', () => {
    render(<RequestStatus value="planned" />)

    expect(screen.getByText('Planned')).toBeInTheDocument()
  })

  it('renders correctly when status is in-progress', () => {
    render(<RequestStatus value="in-progress" />)

    expect(screen.getByText('In-progress')).toBeInTheDocument()
  })

  it('renders correctly when status is live', () => {
    render(<RequestStatus value="live" />)

    expect(screen.getByText('Live')).toBeInTheDocument()
  })
})
