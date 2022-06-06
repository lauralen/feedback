import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, Flex, Image, List } from '@chakra-ui/react'

import Button from 'common/components/Button'
import Card from 'common/components/Card'
import FeedbackCard from 'common/components/FeedbackCard'
import GoBackLink from 'common/components/GoBackLink'
import H1 from 'common/components/H1'
import H2 from 'common/components/H2'
import Spinner from 'common/components/Spinner'
import Text from 'common/components/Text'
import TextArea from 'common/components/TextArea'
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
                {data?.comments && (
                  <Card mb="6" p="6">
                    <H1>
                      {data.comments.length} comment
                      {data.comments.length > 1 && 's'}
                    </H1>
                    <List>
                      {data.comments.map(({ id, user, content }) => (
                        <Box
                          as="li"
                          key={id}
                          my="6"
                          _notLast={{
                            borderBottom: '2px',
                            borderColor: 'gray.100',
                          }}
                        >
                          <Flex mb="4">
                            <Image
                              mr="4"
                              w="12"
                              h="12"
                              borderRadius="full"
                              src={user.image}
                              alt="User profile"
                            />
                            <Flex direction="column">
                              <H2 fontSize="md">{user.name}</H2>
                              <Text
                                fontSize="sm"
                                _before={{
                                  content: '"@"',
                                }}
                              >
                                {user.username}
                              </Text>
                            </Flex>
                          </Flex>
                          <Text mb="6">{content}</Text>
                        </Box>
                      ))}
                    </List>
                  </Card>
                )}

                <Card p="6">
                  <H1 mb="6">Add Comment</H1>
                  <TextArea mb="4" placeholder="Type your comment here" />
                  <Flex align="center" justify="space-between">
                    <Text>250 Characters left</Text>
                    <Button>Post Comment</Button>
                  </Flex>
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
