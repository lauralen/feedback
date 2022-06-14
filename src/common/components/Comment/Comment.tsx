import { FC } from 'react'
import { Box, BoxProps, Flex, Image } from '@chakra-ui/react'

import H2 from 'common/components/H2'
import Text from 'common/components/Text'
import Username from 'common/components/Username'
import { Comment as CommentType, Reply } from 'common/types'

type Props = BoxProps & {
  data: CommentType | Reply
}

const Comment: FC<Props> = ({ data, ...rest }) => {
  const { user, content } = data

  return (
    <Box
      my="6"
      _notLast={{
        borderBottom: '2px',
        borderColor: 'gray.100',
      }}
      {...rest}
    >
      <Flex mb="4">
        <Image
          mr="4"
          w="12"
          h="12"
          borderRadius="full"
          src={user.image}
          alt="User profile"
        />
        <Flex direction="column">
          <H2 fontSize="md">{user.name}</H2>
          <Username>{user.username}</Username>
        </Flex>
      </Flex>
      <Text mb="6">{content}</Text>
    </Box>
  )
}

export default Comment