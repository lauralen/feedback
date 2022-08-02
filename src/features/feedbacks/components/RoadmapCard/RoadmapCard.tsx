import { FC } from 'react'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'

import Link from 'common/components/Link'
import { feedbackStates } from 'common/consts'
import { capitalizeEveryWord } from 'common/utils'

const options = feedbackStates.filter((state) => state !== 'suggestion')

const statusColors = {
  planned: 'coral',
  'in-progress': 'purple',
  live: 'blue.50',
}

const RoadmapCard: FC = () => {
  return (
    <Box>
      <Flex
        mb="6"
        justify="space-between"
        align="center"
        fontSize="lg"
        textColor="blueGray.100"
        fontWeight="bold"
      >
        <Box>Roadmap</Box>
        <Link to="/roadmap" textColor="blue.100">
          View
        </Link>
      </Flex>

      <List>
        {options.map((state) => (
          <ListItem
            key={state}
            display="flex"
            alignItems="center"
            mb="2"
            _last={{ mb: 0 }}
            textColor="blueGray.50"
          >
            <Box
              as="span"
              aria-hidden
              w="2"
              h="2"
              mr="4"
              borderRadius={50}
              bgColor={statusColors[state]}
            />
            <Box as="span">{capitalizeEveryWord(state)}</Box>
            <Box as="span" ml="auto" fontWeight="bold">
              2
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default RoadmapCard
