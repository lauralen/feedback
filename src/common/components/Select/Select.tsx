import { FC, SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
}

const Select: FC<Props> = ({ placeholder, options, ...rest }) => {
  return (
    <select aria-label={placeholder} placeholder={placeholder} {...rest}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )
}

export default Select
