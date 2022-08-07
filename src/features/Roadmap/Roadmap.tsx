import { FC } from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import { useAppSelector } from 'app/hooks'

import GoBackLink from 'common/components/GoBackLink'
import AddFeedbackButton from 'features/feedbacks/components/AddFeedbackButton'
import { getRoadmapRequests } from 'features/feedbacks/feedbacksSlice'

import ColumnTitle from './components/ColumnTitle'
import RoadmapCard from './components/RoadmapCard'

const columnTitles = [
  { title: 'Planned (2)', description: 'Ideas prioritized for research' },
  { title: 'In-Progress (3)', description: 'Currently being developed' },
  { title: 'Live (1)', description: 'Released features' },
]

const Roadmap: FC = () => {
  const requests = useAppSelector(getRoadmapRequests)

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        mx={[0, 6]}
        mb="6"
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

      <Grid
        mx="6"
        pb="14"
        templateColumns="repeat(3, 1fr)"
        columnGap="3"
        rowGap="4"
      >
        {columnTitles.map(({ title, description }) => (
          <ColumnTitle key={title} title={title} description={description} />
        ))}
        {requests.map((data) => (
          <RoadmapCard key={data.id} data={data} />
        ))}
      </Grid>
    </>
  )
}

export default Roadmap
