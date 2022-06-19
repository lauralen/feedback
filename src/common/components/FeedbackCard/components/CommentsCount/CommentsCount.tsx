import { FC } from 'react'
import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comments.svg'

type Props = BoxProps

const CommentsCount: FC<Props> = ({ children }) => {
  return (
    <Flex align="center" color="blueGray.100" fontSize="sm" fontWeight="bold">
      <CommentIcon />
      <Box as="span" ml="2">
        {children}
      </Box>
    </Flex>
  )
}

export default CommentsCount
