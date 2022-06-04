import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

const Card: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box px="6" py="20" bg="white" borderRadius="lg" {...rest}>
      {children}
    </Box>
  )
}

export default Card
