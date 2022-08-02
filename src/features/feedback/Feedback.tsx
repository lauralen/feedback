import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Center, Flex, List } from '@chakra-ui/react'

import Button from 'common/components/Button'
import Card from 'common/components/Card'
import Comment from 'common/components/Comment'
import CommentForm from 'common/components/CommentForm'
import FeedbackCard from 'common/components/FeedbackCard'
import GoBackLink from 'common/components/GoBackLink'
import H1 from 'common/components/H1'
import Spinner from 'common/components/Spinner'
import { Feedback, Status } from 'common/types'

import { fetchRequest } from './api'

function Feedbacks() {
  const { id } = useParams()

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

  const onUpvoteClick = () => {
    setData(
      (curr) =>
        ({
          ...curr,
          upvotes: (curr?.upvotes as number) + 1,
        } as Feedback)
    )
  }

  return (
    <>
      <Box py="8" px="6">
        <Flex mb="6" align="center" justify="space-between">
          <GoBackLink />
          <Link to="edit">
            <Button variant="blue" isDisabled={status !== 'idle'}>
              Edit Feedback
            </Button>
          </Link>
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
                <FeedbackCard
                  data={data as Feedback}
                  onUpvoteClick={() => onUpvoteClick()}
                />
                {data?.comments && (
                  <Card mb="6" py="6" px={['6', '8']}>
                    <H1>
                      {data.comments.length} comment
                      {data.comments.length > 1 && 's'}
                    </H1>
                    <List>
                      {data.comments.map((comment) => (
                        <Comment key={comment.id} data={comment} as="li" />
                      ))}
                    </List>
                  </Card>
                )}

                <Card p="6">
                  <H1 mb="6">Add Comment</H1>
                  <CommentForm />
                </Card>
              </>
            ),
          }[status]
        }
      </Box>
    </>
  )
}

export default Feedbacks
