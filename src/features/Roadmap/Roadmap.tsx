import { FC, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import GoBackLink from 'common/components/GoBackLink'
import { RoadmapState, State } from 'common/types'
import AddFeedbackButton from 'features/feedbacks/components/AddFeedbackButton'
import {
  changeRequestStatus,
  getRoadmapRequests,
} from 'features/feedbacks/feedbacksSlice'

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

// fix reordering
// https://github.com/atlassian/react-beautiful-dnd/issues/374
const getStyle = (style, snapshot) => {
  if (!snapshot.isDragging) {
    return {}
  }
  if (!snapshot.isDropAnimating) {
    return style
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  }
}

const Roadmap: FC = () => {
  const dispatch = useAppDispatch()
  const requests = useAppSelector(getRoadmapRequests)

  const [draggedCardStatus, setDraggedCardStatus] = useState<RoadmapState>()

  const onDragStart = (initial: DragStart) => {
    setDraggedCardStatus(initial.source.droppableId as RoadmapState)
  }

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination } = result

    if (destination?.droppableId) {
      dispatch(
        changeRequestStatus({
          requestId: Number(draggableId),
          status: destination.droppableId as State,
        })
      )
    }
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

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
            <Droppable
              key={status}
              droppableId={status}
              isDropDisabled={status === draggedCardStatus}
            >
              {(provided, snapshot) => (
                <>
                  <GridItem
                    area={status}
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    ref={provided.innerRef}
                    padding={snapshot.isDraggingOver ? 2 : 0}
                    border={snapshot.isDraggingOver ? '2px' : ''}
                    borderColor="purple"
                    borderRadius="md"
                    borderStyle="dashed"
                    transition="all 0.2s"
                    opacity={snapshot.isDraggingOver ? '50%' : ''}
                    {...provided.droppableProps}
                  >
                    {requests[status].requests.map((data, index) => (
                      <Draggable
                        key={data.id}
                        draggableId={String(data.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getStyle(
                              provided.draggableProps.style,
                              snapshot
                            )}
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
