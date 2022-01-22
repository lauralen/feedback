import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'

import Select from './Select'

const OPTIONS = ['blue', 'yellow', 'green']

describe('Select', () => {
  it('is disabled', async () => {
    render(<Select disabled options={OPTIONS} />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('selects a value', async () => {
    render(<Select options={OPTIONS} />)
    const select = screen.getByRole('combobox')
    userEvent.selectOptions(select, 'blue')

    const optionBlue = screen.getByRole('option', {
      name: 'blue',
    }) as HTMLOptionElement
    const optionYellow = screen.getByRole('option', {
      name: 'yellow',
    }) as HTMLOptionElement
    const optionGreen = screen.getByRole('option', {
      name: 'green',
    }) as HTMLOptionElement

    expect(optionBlue.selected).toBe(true)
    expect(optionYellow.selected).toBe(false)
    expect(optionGreen.selected).toBe(false)

    userEvent.selectOptions(select, 'green')
    expect(optionBlue.selected).toBe(false)
    expect(optionYellow.selected).toBe(false)
    expect(optionGreen.selected).toBe(true)
  })
})
