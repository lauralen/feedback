import { FC } from 'react'
import { Input as InputCU, InputProps } from '@chakra-ui/react'

const Input: FC<InputProps> = ({ ...rest }) => {
  return (
    <InputCU
      color="blueGray.100"
      borderColor="transparent"
      bg="gray.50"
      _focus={{ borderColor: 'blue.100' }}
      {...rest}
    />
  )
}

export default Input
