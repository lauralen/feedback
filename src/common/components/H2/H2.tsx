import { FC } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

const H2: FC<HeadingProps> = ({ ...rest }) => {
  return (
    <Heading
      as="h2"
      color="blueGray.100"
      lineHeight="7"
      fontSize="xl"
      letterSpacing="tight"
      {...rest}
    />
  )
}

export default H2
