import { FC } from 'react'
import { Textarea as TextAreaCU, TextareaProps } from '@chakra-ui/react'

const TextArea: FC<TextareaProps> = ({ ...rest }) => {
  return (
    <TextAreaCU
      color="blueGray.100"
      borderColor="transparent"
      bg="gray.50"
      _focus={{ borderColor: 'blue.100' }}
      {...rest}
    />
  )
}

export default TextArea
