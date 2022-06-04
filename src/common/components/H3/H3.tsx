import { FC } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

const H3: FC<HeadingProps> = ({ ...rest }) => {
  return (
    <Heading
      as="h3"
      color="blueGray.100"
      lineHeight="base"
      fontSize="md"
      letterSpacing="tighter"
      {...rest}
    />
  )
}

export default H3
