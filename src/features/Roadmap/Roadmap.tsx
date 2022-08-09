import { FC } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import { useAppSelector } from 'app/hooks'

import GoBackLink from 'common/components/GoBackLink'
import { RoadmapState } from 'common/types'
import AddFeedbackButton from 'features/feedbacks/components/AddFeedbackButton'
import { getRoadmapRequests } from 'features/feedbacks/feedbacksSlice'

import ColumnTitle from './components/ColumnTitle'
import RoadmapCard from './components/RoadmapCard'

const columnTitles: {
  status: RoadmapState
  description: string
}[] = [
  {
    status: 'planned',
    description: 'Ideas prioritized for research',
  },
  {
    status: 'in-progress',
    description: 'Currently being developed',
  },
  {
    status: 'live',
    description: 'Released features',
  },
]

const Roadmap: FC = () => {
  const requests = useAppSelector(getRoadmapRequests)

  const onDragEnd = () => {
    console.log('on drag end')
  }

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

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          mx="6"
          pb="14"
          templateColumns="repeat(3, 1fr)"
          templateAreas={`"title title title"
                        "planned in-progress live"`}
          columnGap="3"
          rowGap="4"
        >
          {columnTitles.map(({ status, description }) => (
            <ColumnTitle
              key={status}
              title={status}
              count={requests[status].count}
              description={description}
            />
          ))}
          {columnTitles.map(({ status }) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <>
                  <GridItem
                    area={status}
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {requests[status].requests.map((data) => (
                      <Draggable
                        key={data.id}
                        draggableId={String(data.id)}
                        index={data.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <RoadmapCard data={data} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </GridItem>
                  {provided.placeholder}
                </>
              )}
            </Droppable>
          ))}
        </Grid>
      </DragDropContext>
    </>
  )
}

export default Roadmap
