import { FC } from 'react'
import { Box, Flex, GridItem } from '@chakra-ui/react'

import CommentsCount from 'common/components/FeedbackCard/components/CommentsCount'
import RequestStatus from 'common/components/RequestStatus'
import Tag from 'common/components/Tag'
import UpvoteButton from 'common/components/UpvoteButton'

// type Props = {}

// const RoadmapCard: FC<Props> = () => {
const RoadmapCard: FC = () => {
  return (
    <GridItem
      px="5"
      py="6"
      fontSize="sm"
      bgColor="white"
      borderTop="6px solid coral"
      borderRadius="4"
    >
      <RequestStatus value="live" />
      <Box mb="2" textColor="blueGray.100" fontWeight="bold">
        More comprehensive reports
      </Box>
      <Box mb="6" textColor="blueGray.50">
        It would be great to see a more detailed breakdown of solutions.
      </Box>
      <Tag mb="4" textTransform="capitalize">
        Feature
      </Tag>
      <Flex justify="space-between">
        <UpvoteButton upvotes={123} />
        <CommentsCount>2</CommentsCount>
      </Flex>
    </GridItem>
  )
}

export default RoadmapCard
