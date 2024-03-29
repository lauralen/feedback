import { FC } from 'react'
import { Button as ButtonCU, ButtonProps } from '@chakra-ui/react'

export type Props = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'blue' | 'transparent' | 'danger'
}

const Button: FC<Props> = ({ variant = 'primary', ...rest }) => {
  return (
    <ButtonCU
      variant={variant}
      color="white"
      lineHeight="5"
      fontSize="sm"
      borderRadius="lg"
      {...rest}
    />
  )
}

export default Button
