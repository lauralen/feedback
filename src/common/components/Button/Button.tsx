import { ButtonHTMLAttributes, FC } from 'react'
import { Button as ButtonCU } from '@chakra-ui/react'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...rest }) => {
  return (
    <ButtonCU
      bg="purple"
      color="white"
      lineHeight="5"
      fontSize="sm"
      px="10"
      borderRadius="lg"
      _hover={{
        background: '#C75AF6',
      }}
      {...rest}
    />
  )
}

export default Button
