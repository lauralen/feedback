import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Flex, FormErrorMessage, useToast } from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'

import Button from 'common/components/Button'
import FormControl from 'common/components/FormControl'
import Text from 'common/components/Text'
import TextArea from 'common/components/TextArea'
import { postComment } from 'features/feedback/api'

type FormValues = { comment: string }

const COMMENT_CHAR_LIMIT = 250

const getRemainingCharactersCount = (value: string, limit: number): number => {
  const result = limit - value.length
  return result > 0 ? result : 0
}

const CommentForm: FC = () => {
  const toast = useToast()
  const { id } = useParams()

  const validateComment = (value: string): string | undefined => {
    if (!value) {
      return "Can't be empty"
    } else if (value.length > COMMENT_CHAR_LIMIT) {
      return `Can't be longer than ${COMMENT_CHAR_LIMIT} characters`
    }
  }

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      if (id) {
        await postComment({
          ...values,
          feedbackId: id,
          username: 'you',
        })

        toast({
          title: 'Comment posted successfully',
          status: 'success',
          isClosable: true,
        })
        actions.resetForm()
      } else {
        throw new Error('feedback id not found')
      }
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
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="comment" validate={validateComment}>
            {({ field }) => (
              <FormControl isInvalid={!!(errors.comment && touched.comment)}>
                <TextArea
                  {...field}
                  aria-label="comment"
                  name="comment"
                  mb="4"
                  placeholder="Type your comment here"
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Flex align="center" justify="space-between">
            <Text>
              {getRemainingCharactersCount(values.comment, COMMENT_CHAR_LIMIT)}{' '}
              Characters left
            </Text>
            <Button type="submit" isLoading={isSubmitting}>
              Post Comment
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  )
}

export default CommentForm
