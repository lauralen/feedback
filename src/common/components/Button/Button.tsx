import { FC } from 'react'
import { Button as ButtonCU, ButtonProps } from '@chakra-ui/react'

type Props = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'blue'
}

const Button: FC<Props> = ({ variant = 'primary', ...rest }) => {
  return (
    <ButtonCU
      variant={variant}
      color="white"
      lineHeight="5"
      fontSize="sm"
      px="10"
      borderRadius="lg"
      {...rest}
    />
  )
}

export default Button
