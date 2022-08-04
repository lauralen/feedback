import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import GoBackLink from 'common/components/GoBackLink'
import AddFeedbackButton from 'features/feedbacks/components/AddFeedbackButton'

const Roadmap: FC = () => {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        mx={[0, 6]}
        p="6"
        borderRadius={['none', 'lg']}
        fontSize="lg"
        textColor="white"
        fontWeight="bold"
        bg="blueGray.200"
      >
        <Flex direction="column">
          <GoBackLink textColor="white" />
          <Box mt="2">Roadmap</Box>
        </Flex>
        <AddFeedbackButton />
      </Flex>
    </>
  )
}

export default Roadmap
