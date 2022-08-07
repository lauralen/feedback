import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import CommentsCount from 'common/components/FeedbackCard/components/CommentsCount'
import RequestStatus from 'common/components/RequestStatus'
import Tag from 'common/components/Tag'
import UpvoteButton from 'common/components/UpvoteButton'
import { RoadmapFeedback } from 'common/types'
import { statusColors } from 'common/utils'

type Props = {
  data: RoadmapFeedback
}

const RoadmapCard: FC<Props> = ({ data }) => {
  const { status, title, description, category, comments, upvotes } = data
  const commentsCount = comments?.length ?? 0

  return (
    <Box
      px="5"
      py="6"
      fontSize="sm"
      bgColor="white"
      borderTop="6px solid"
      borderColor={statusColors[status]}
      borderRadius="4"
    >
      <RequestStatus value={status} />
      <Box mt="3" mb="2" textColor="blueGray.100" fontWeight="bold">
        {title}
      </Box>
      <Box mb="6" textColor="blueGray.50">
        {description}
      </Box>
      <Tag mb="4" textTransform="capitalize">
        {category}
      </Tag>
      <Flex justify="space-between">
        <UpvoteButton upvotes={upvotes} />
        <CommentsCount>{commentsCount}</CommentsCount>
      </Flex>
    </Box>
  )
}

export default RoadmapCard
