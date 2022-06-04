import { FC } from 'react'
import { Flex } from '@chakra-ui/react'

import Card from 'common/components/Card'
import H3 from 'common/components/H3'
import Tag from 'common/components/Tag'
import Text from 'common/components/Text'

const Feedback: FC = () => {
  return (
    <Card mb="4" p="6">
      <H3>Add tags for solutions</H3>
      <Text my="2">
        Easier to search for solutions based on a specific stack.
      </Text>
      <Tag>Enhancement</Tag>
      <Flex justify="space-between">
        <div>^ 112</div>
        <div>2</div>
      </Flex>
    </Card>
  )
}

export default Feedback
