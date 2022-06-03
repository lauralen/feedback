import { Box, Button, Flex, Heading } from '@chakra-ui/react'

function Feedbacks() {
  return (
    <>
      <Box as="header" bgGradient="linear(to-tr, #28A7ED, #E84D70)">
        <Flex py="4" px="6" align="center" justify="space-between">
          <Box>
            <Heading as="h1">Frontend Mentor</Heading>
            <Heading as="h2">Feedback Board</Heading>
          </Box>
          <Button>Menu</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Feedbacks
