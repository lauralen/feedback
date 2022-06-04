import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comments.svg'

import Card from 'common/components/Card'
import H3 from 'common/components/H3'
import Tag from 'common/components/Tag'
import Text from 'common/components/Text'
import UpvoteButton from 'common/components/UpvoteButton'
import { Feedback as Data } from 'features/feedbacks/types'

type Props = {
  data: Data
}

const Feedback: FC<Props> = ({ data }) => {
  const { title, description, category, upvotes, comments } = data
  const commentsCount = comments?.length

  return (
    <Card as="li" mb="4" p="6">
      <H3>{title}</H3>
      <Text my="2">{description}</Text>
      <Tag mb="4">{category}</Tag>
      <Flex justify="space-between">
        <UpvoteButton>{upvotes}</UpvoteButton>
        {commentsCount && (
          <>
            <Flex
              align="center"
              color="blueGray.100"
              fontSize="sm"
              fontWeight="bold"
            >
              <CommentIcon />
              <Box as="span" ml="2">
                {commentsCount}
              </Box>
            </Flex>
          </>
        )}
      </Flex>
    </Card>
  )
}

export default Feedback
