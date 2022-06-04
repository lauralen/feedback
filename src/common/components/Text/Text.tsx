import { FC } from 'react'
import { Text as TextCU, TextProps } from '@chakra-ui/react'

const Text: FC<TextProps> = ({ ...rest }) => {
  return (
    <TextCU color="blueGray.100" lineHeight="shorter" fontSize="md" {...rest} />
  )
}

export default Text
