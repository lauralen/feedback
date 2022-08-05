import { FC, useEffect, useState } from 'react'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'

import Link from 'common/components/Link'
import { Status } from 'common/types'
import { capitalizeEveryWord } from 'common/utils'

import { fetchRoadmapStatus } from './api'
import { RoadmapStatus } from './interfaces'

const statusColors = {
  planned: 'coral',
  'in-progress': 'purple',
  live: 'blue.50',
}

const RoadmapCard: FC = () => {
  const [status, setStatus] = useState<Status>('loading')
  const [data, setData] = useState<RoadmapStatus>()

  useEffect(() => {
    ;(async () => {
      setStatus('loading')

      try {
        const res = await fetchRoadmapStatus()
        const data = await res.json()
        setData(data)
        setStatus('idle')
      } catch {
        setStatus('failed')
      }
    })()
  }, [])

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

      {
        {
          loading: 'Spinner placeholder',
          // loading: <Spinner data-testid="loading-roadmap-card" />,
          failed: 'Error',
          idle: (
            <List>
              {data &&
                Object.keys(data).map((state) => (
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
                      {data[state]}
                    </Box>
                  </ListItem>
                ))}
            </List>
          ),
        }[status]
      }
    </Box>
  )
}

export default RoadmapCard
