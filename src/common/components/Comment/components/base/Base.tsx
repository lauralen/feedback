import { FC, useState } from 'react'
import { Box, BoxProps, Flex, Image } from '@chakra-ui/react'

import Button from 'common/components/Button'
import CommentForm from 'common/components/CommentForm'
import H2 from 'common/components/H2'
import Text from 'common/components/Text'
import Username from 'common/components/Username'
import { Comment as CommentType, Reply } from 'common/types'

type Props = BoxProps & {
  data: CommentType | Reply
}

const Comment: FC<Props> = ({ data, ...rest }) => {
  const { user, content } = data
  const isReply = !!data.replyingTo

  const [isCommentFormVisible, setIsCommentFormVisible] =
    useState<boolean>(false)

  return (
    <Box
      pt={isReply ? undefined : ['6', '8']}
      pb={['6', '8']}
      _notFirst={
        isReply
          ? undefined
          : {
              borderTop: '2px',
              borderColor: 'gray.100',
            }
      }
      pl={isReply ? '6' : undefined}
      borderLeft={isReply ? '2px' : undefined}
      borderColor="gray.100"
      {...rest}
    >
      <Flex align="center" justify="space-between" mb="4">
        <Flex>
          <Image
            mr={['4', '6']}
            w="12"
            h="12"
            borderRadius="full"
            src={user.image}
            alt="User avatar"
          />
          <Flex direction="column">
            <H2 fontSize="md">{user.name}</H2>
            <Username>{user.username}</Username>
          </Flex>
        </Flex>
        <Button
          variant="transparent"
          textColor="blue.100"
          onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
        >
          Reply
        </Button>
      </Flex>
      <Text ml={['0', '18']}>
        {isReply && (
          <Username
            as="span"
            marginRight="1"
            color="purple"
            fontSize="md"
            fontWeight="bold"
          >
            {data.replyingTo}
          </Username>
        )}
        {content}
      </Text>

      {isCommentFormVisible && (
        <Box mt="4" ml={['0', '18']}>
          <CommentForm />
        </Box>
      )}
    </Box>
  )
}

export default Comment
