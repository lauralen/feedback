import { screen } from '@testing-library/react'
import render from 'test/render'

import CategoryFilter, { options } from './CategoryFilter'

describe('CategoryFilter', () => {
  it('renders correctly', async () => {
    render(<CategoryFilter />)

    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    options.forEach((option) =>
      expect(screen.getByText(option, { exact: false })).toBeInTheDocument()
    )
  })
})
