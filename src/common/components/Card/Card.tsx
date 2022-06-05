import { FC, ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps & {
  icon?: ReactNode
}

const Card: FC<Props> = ({ icon, children, ...rest }) => {
  return (
    <Box bg="white" borderRadius="lg" {...rest}>
      {icon && (
        <Box
          aria-hidden
          width="max-content"
          position="absolute"
          top="19"
          borderRadius="full"
          bgGradient="linear(to-tr, #28A7ED, #E84D70)"
        >
          {icon}
        </Box>
      )}
      {children}
    </Box>
  )
}

export default Card
