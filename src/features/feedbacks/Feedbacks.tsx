import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import H1 from 'common/components/H1'

function Feedbacks() {
  return (
    <>
      <Box as="header" bgGradient="linear(to-tr, #28A7ED, #E84D70)">
        <Flex py="4" px="6" align="center" justify="space-between">
          <Box>
            <H1 color="white">Frontend Mentor</H1>
            <Heading as="h2">Feedback Board</Heading>
          </Box>
          <Button>Menu</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Feedbacks
