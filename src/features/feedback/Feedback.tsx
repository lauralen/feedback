import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, Flex } from '@chakra-ui/react'

import Button from 'common/components/Button'
import FeedbackCard from 'common/components/FeedbackCard'
import GoBackLink from 'common/components/GoBackLink'
import Spinner from 'common/components/Spinner'
import { Feedback, Status } from 'common/types'

import { fetchRequest } from './api'

function Feedbacks() {
  let { id } = useParams()

  const [status, setStatus] = useState<Status>('loading')
  const [data, setData] = useState<Feedback>()

  useEffect(() => {
    ;(async () => {
      setStatus('loading')

      try {
        if (id) {
          const res = await fetchRequest(id)
          const data = await res.json()

          setData(data)
          setStatus('idle')
        } else {
          throw new Error('feedback id not found')
        }
      } catch {
        setStatus('failed')
      }
    })()
  }, [id])

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
                <FeedbackCard data={data as Feedback} />
                <div>Comments</div>
                <div>Add comment</div>
              </>
            ),
          }[status]
        }
      </Box>
    </>
  )
}

export default Feedbacks
