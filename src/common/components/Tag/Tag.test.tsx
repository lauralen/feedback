import { screen } from '@testing-library/react'
import render from 'test/render'

import Tag from './Tag'

describe('Tag', () => {
  it('renders correctly', async () => {
    render(<Tag>Test</Tag>)

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
