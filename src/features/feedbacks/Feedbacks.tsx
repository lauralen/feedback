import { Box, Flex } from '@chakra-ui/react'

import Button from 'common/components/Button'
import H1 from 'common/components/H1'
import H2 from 'common/components/H2'
import Select from 'common/components/Select'

function Feedbacks() {
  return (
    <>
      <Box as="header" bgGradient="linear(to-tr, #28A7ED, #E84D70)">
        <Flex py="4" px="6" align="center" justify="space-between">
          <Box>
            <H1 color="white">Frontend Mentor</H1>
            <H2 color="white">Feedback Board</H2>
          </Box>
          <Button>Menu</Button>
        </Flex>
      </Box>
      <Box bg="blueGray.200">
        <Flex py="4" px="6" align="center" justify="space-between">
          <Select
            border="none"
            color="white"
            maxWidth={160}
            options={[
              'Most Upvotes',
              'Least Upvotes',
              'Most Comments',
              'Least Comments',
            ]}
          >
            Select
          </Select>
          <Button>+ Add feedback</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Feedbacks
