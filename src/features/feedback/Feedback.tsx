import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Center,
  Flex,
  FormErrorMessage,
  Image,
  List,
  useToast,
} from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'

import Button from 'common/components/Button'
import Card from 'common/components/Card'
import FeedbackCard from 'common/components/FeedbackCard'
import FormControl from 'common/components/FormControl'
import GoBackLink from 'common/components/GoBackLink'
import H1 from 'common/components/H1'
import H2 from 'common/components/H2'
import Spinner from 'common/components/Spinner'
import Text from 'common/components/Text'
import TextArea from 'common/components/TextArea'
import { Feedback, Status } from 'common/types'

import { fetchRequest, postComment } from './api'
import { PostCommentBody } from './types'

const COMMENT_CHAR_LIMIT = 250

const getRemainingCharactersCount = (value: string, limit: number): number => {
  const result = limit - value.length
  return result > 0 ? result : 0
}

function Feedbacks() {
  const toast = useToast()
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

  const validateComment = (value: string): string | undefined => {
    if (!value) {
      return "Can't be empty"
    } else if (value.length > COMMENT_CHAR_LIMIT) {
      return `Can't be longer than ${COMMENT_CHAR_LIMIT} characters`
    }
  }

  const onSubmit = async (
    values: PostCommentBody,
    actions: FormikHelpers<PostCommentBody>
  ) => {
    try {
      await postComment(values)

      toast({
        title: 'Comment posted successfully',
        status: 'success',
        isClosable: true,
      })
      actions.resetForm()
    } catch {
      toast({
        title: 'Failed to post comment',
        status: 'error',
        isClosable: true,
      })
    } finally {
      actions.setSubmitting(false)
    }
  }

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
                  <Formik
                    initialValues={{
                      comment: '',
                    }}
                    onSubmit={onSubmit}
                  >
                    {({
                      handleSubmit,
                      errors,
                      touched,
                      isSubmitting,
                      values,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Field name="comment" validate={validateComment}>
                          {({ field }) => (
                            <FormControl
                              isInvalid={!!(errors.comment && touched.comment)}
                            >
                              <TextArea
                                {...field}
                                aria-label="comment"
                                name="comment"
                                mb="4"
                                placeholder="Type your comment here"
                              />
                              <FormErrorMessage>
                                {errors.comment}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Flex align="center" justify="space-between">
                          <Text>
                            {getRemainingCharactersCount(
                              values.comment,
                              COMMENT_CHAR_LIMIT
                            )}{' '}
                            Characters left
                          </Text>
                          <Button type="submit" isLoading={isSubmitting}>
                            Post Comment
                          </Button>
                        </Flex>
                      </form>
                    )}
                  </Formik>
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
