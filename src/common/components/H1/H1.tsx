import { FC } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

const H1: FC<HeadingProps> = ({ ...rest }) => {
  return (
    <Heading
      as="h1"
      color="blueGray.100"
      lineHeight="9"
      fontSize="2xl"
      {...rest}
    />
  )
}

export default H1
