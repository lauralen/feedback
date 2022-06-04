import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react'

import Button from 'common/components/Button'
import H1 from 'common/components/H1'
import H2 from 'common/components/H2'
import Select from 'common/components/Select'

import AddFeedbackButton from './components/AddFeedbackButton'
import Feedback from './components/Feedback'
import NoData from './components/NoData'

function Feedbacks() {
  return (
    <Box height="100vh">
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
          <FormControl color="white" display="flex" alignItems="center">
            <FormLabel htmlFor="sort-by" m="0">
              Sort by:
            </FormLabel>
            <Select
              name="sort-by"
              border="none"
              fontWeight="semibold"
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
          </FormControl>
          <AddFeedbackButton />
        </Flex>
      </Box>
      <Box as="main" h="100%" bg="gray.100" py="8" px="6">
        <Feedback />
        <NoData />
      </Box>
    </Box>
  )
}

export default Feedbacks
