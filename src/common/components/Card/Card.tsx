import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

const Card: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box bg="white" borderRadius="lg" {...rest}>
      {children}
    </Box>
  )
}

export default Card
