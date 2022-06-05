import { useEffect, useState } from 'react'
import { Box, Center } from '@chakra-ui/react'

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
