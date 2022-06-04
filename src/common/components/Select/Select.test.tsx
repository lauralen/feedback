import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from 'test/render'

import Select from './Select'

const blueOption = { value: 'blue', label: 'Blue color' }
const yellowOption = { value: 'yellow', label: 'Yellow color' }
const greenOption = { value: 'green', label: 'Green color' }
const OPTIONS = [blueOption, yellowOption, greenOption]

describe('Select', () => {
  it('is disabled', async () => {
    render(<Select isDisabled options={OPTIONS} />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('selects a value', async () => {
    render(<Select options={OPTIONS} />)
    const select = screen.getByRole('combobox')
    userEvent.selectOptions(select, blueOption.value)

    const optionBlue = screen.getByRole('option', {
      name: blueOption.label,
    }) as HTMLOptionElement
    const optionYellow = screen.getByRole('option', {
      name: yellowOption.label,
    }) as HTMLOptionElement
    const optionGreen = screen.getByRole('option', {
      name: greenOption.label,
    }) as HTMLOptionElement

    expect(optionBlue.selected).toBe(true)
    expect(optionYellow.selected).toBe(false)
    expect(optionGreen.selected).toBe(false)

    userEvent.selectOptions(select, greenOption.value)
    expect(optionBlue.selected).toBe(false)
    expect(optionYellow.selected).toBe(false)
    expect(optionGreen.selected).toBe(true)
  })
})
