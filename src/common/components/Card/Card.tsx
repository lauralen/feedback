import { FC, ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps & {
  icon?: ReactNode
}

const Card: FC<Props> = ({ icon, children, ...rest }) => {
  return (
    <Box position="relative" bg="white" borderRadius="lg" {...rest}>
      {icon && (
        <Box
          aria-hidden
          width="max-content"
          position="relative"
          top="-5"
          borderRadius="full"
        >
          {icon}
        </Box>
      )}
      {children}
    </Box>
  )
}

export default Card
