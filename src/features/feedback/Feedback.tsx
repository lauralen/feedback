import { useEffect, useState } from 'react'
import { Box, Center, Flex } from '@chakra-ui/react'

import Button from 'common/components/Button'
import FeedbackCard from 'common/components/FeedbackCard'
import GoBackLink from 'common/components/GoBackLink'
import Spinner from 'common/components/Spinner'
import { Status } from 'common/types'

import NoData from '../feedbacks/components/NoData'

function Feedbacks() {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    // fetch feedback by id from param
  }, [])

  return (
    <>
      <Box py="8" px="6">
        <Flex mb="6" align="center" justify="space-between">
          <GoBackLink />
          <Button variant="blue" isDisabled={status !== 'idle'}>
            Edit Feedback
          </Button>
        </Flex>
        {
          {
            loading: (
              <Center>
                <Spinner />
              </Center>
            ),
            failed: 'Error',
            idle: (
              <>
                {/* <FeedbackCard /> */}
                <div>Feedback card</div>
                <div>Comments</div>
                <div>Add comment</div>
              </>
            ),
            noData: <NoData />,
          }[status]
        }
      </Box>
    </>
  )
}

export default Feedbacks
