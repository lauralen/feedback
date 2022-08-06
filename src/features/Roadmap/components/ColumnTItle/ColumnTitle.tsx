import { FC } from 'react'
import { Box, GridItem } from '@chakra-ui/react'

type Props = {
  title: string
  description: string
}

const ColumnTitle: FC<Props> = ({ title, description }) => {
  return (
    <GridItem fontSize="sm">
      <Box textColor="blueGray.100" fontWeight="bold">
        {title}
      </Box>
      <Box textColor="blueGray.50">{description}</Box>
    </GridItem>
  )
}

export default ColumnTitle
