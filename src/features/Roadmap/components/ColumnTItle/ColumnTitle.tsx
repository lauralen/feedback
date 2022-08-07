import { FC } from 'react'
import { Box, GridItem } from '@chakra-ui/react'

import { capitalizeEveryWord } from 'common/utils'

type Props = {
  title: string
  count: number
  description: string
}

const ColumnTitle: FC<Props> = ({ title, count, description }) => {
  return (
    <GridItem fontSize="sm">
      <Box textColor="blueGray.100" fontWeight="bold">
        {`${capitalizeEveryWord(title)} (${count})`}
      </Box>
      <Box textColor="blueGray.50">{description}</Box>
    </GridItem>
  )
}

export default ColumnTitle
