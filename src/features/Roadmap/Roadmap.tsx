import { FC } from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'

import GoBackLink from 'common/components/GoBackLink'
import AddFeedbackButton from 'features/feedbacks/components/AddFeedbackButton'

import ColumnTItle from './components/ColumnTItle'
import RoadmapCard from './components/RoadmapCard'

const columnTitles = [
  { title: 'Planned (2)', description: 'Ideas prioritized for research' },
  { title: 'In-Progress (3)', description: 'Currently being developed' },
  { title: 'Live (1)', description: 'Released features' },
]

const Roadmap: FC = () => {
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

      <Grid mx="6" templateColumns="repeat(3, 1fr)" columnGap="2" rowGap="4">
        {columnTitles.map(({ title, description }) => (
          <ColumnTItle key={title} title={title} description={description} />
        ))}
        <RoadmapCard />
      </Grid>
    </>
  )
}

export default Roadmap
