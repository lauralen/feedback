import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { RoadmapState } from 'common/types'
import { capitalizeEveryWord, statusColors } from 'common/utils'

type Props = {
  value: RoadmapState
}

const RequestStatus: FC<Props> = ({ value }) => {
  return (
    <Flex alignItems="center" fontSize="md" textColor="blueGray.50">
      <Box
        aria-hidden
        w="2"
        h="2"
        mr="4"
        borderRadius={50}
        bgColor={statusColors[value]}
      />
      <Box>{capitalizeEveryWord(value)}</Box>
    </Flex>
  )
}

export default RequestStatus
