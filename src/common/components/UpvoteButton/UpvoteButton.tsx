import { FC } from 'react'
import { Box, Button as ButtonCU, ButtonProps } from '@chakra-ui/react'
import { ReactComponent as UpArrowIcon } from 'assets/icons/icon-arrow-up.svg'

const UpvoteButton: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ButtonCU
      py="1"
      px="4"
      color="blueGray.100"
      bg="gray.100"
      lineHeight="shorter"
      fontSize="sm"
      fontWeight="bold"
      {...rest}
    >
      <UpArrowIcon />
      <Box as="span" ml="2">
        {children}
      </Box>
    </ButtonCU>
  )
}

export default UpvoteButton
