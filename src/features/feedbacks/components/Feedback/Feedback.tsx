import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comments.svg'

import Card from 'common/components/Card'
import H3 from 'common/components/H3'
import Tag from 'common/components/Tag'
import Text from 'common/components/Text'
import UpvoteButton from 'common/components/UpvoteButton'

const Feedback: FC = () => {
  return (
    <Card mb="4" p="6">
      <H3>Add tags for solutions</H3>
      <Text my="2">
        Easier to search for solutions based on a specific stack.
      </Text>
      <Tag mb="4">Enhancement</Tag>
      <Flex justify="space-between">
        <UpvoteButton>112</UpvoteButton>
        <Flex
          align="center"
          color="blueGray.100"
          fontSize="sm"
          fontWeight="bold"
        >
          <CommentIcon />
          <Box as="span" ml="2">
            2
          </Box>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Feedback
