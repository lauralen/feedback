import { FC } from 'react'
import { Box, Button as ButtonCU, ButtonProps } from '@chakra-ui/react'
import { ReactComponent as UpArrowIcon } from 'assets/icons/icon-arrow-up.svg'

const UpvoteButton: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ButtonCU
      height={['10', 'min-content']}
      display="flex"
      flexDirection={['row', 'column']}
      gap="2"
      py={['1', '2']}
      px={['4', '2']}
      color="blueGray.100"
      bg="gray.100"
      lineHeight="shorter"
      fontSize="sm"
      fontWeight="bold"
      {...rest}
    >
      <UpArrowIcon />
      <Box>{children}</Box>
    </ButtonCU>
  )
}

export default UpvoteButton
