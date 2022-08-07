import { FC } from 'react'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'
import { useAppSelector } from 'app/hooks'

import Link from 'common/components/Link'
import RequestStatus from 'common/components/RequestStatus'
import { RoadmapState } from 'common/types'
import { getRoadmapRequests } from 'features/feedbacks/feedbacksSlice'

const RoadmapWidget: FC = () => {
  const requests = useAppSelector(getRoadmapRequests)

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
        {requests &&
          Object.keys(requests).map((key) => {
            const state = key as RoadmapState

            return (
              <ListItem
                key={state}
                display="flex"
                alignItems="center"
                mb="2"
                _last={{ mb: 0 }}
                textColor="blueGray.50"
              >
                <RequestStatus value={state} />
                <Box as="span" ml="auto" fontWeight="bold">
                  {requests[state].count}
                </Box>
              </ListItem>
            )
          })}
      </List>
    </Box>
  )
}

export default RoadmapWidget
