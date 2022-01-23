import { ButtonHTMLAttributes, FC } from 'react'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...rest }) => {
  return <button {...rest} />
}

export default Button
