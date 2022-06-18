import { useEffect, useState } from 'react'
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Center, Flex, FormErrorMessage, useToast } from '@chakra-ui/react'
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit-feedback.svg'
import { Field, Formik, FormikHelpers } from 'formik'

import Button from 'common/components/Button'
import Card from 'common/components/Card'
import FormControl from 'common/components/FormControl'
import FormHelper from 'common/components/FormHelper'
import FormLabel from 'common/components/FormLabel'
import GoBackLink from 'common/components/GoBackLink'
import H1 from 'common/components/H1'
import Input from 'common/components/Input'
import Select from 'common/components/Select'
import Spinner from 'common/components/Spinner'
import TextArea from 'common/components/TextArea'
import { feedbackCategories, feedbackStates } from 'common/consts'
import { State } from 'common/types'
import { Feedback, Status } from 'common/types'
import { capitalizeEveryWord } from 'common/utils'

import { fetchRequest } from '../../api'

import { editRequest } from './api'
import { RequestData } from './types'

function Edit() {
  const toast = useToast()
  const navigate = useNavigate()
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

  const validateTitle = (value: string): string | undefined => {
    if (!value) {
      return "Can't be empty"
    } else if (value.length > 130) {
      return "Can't be longer than 130 characters"
    }
  }

  const validateDetails = (value: string): string | undefined => {
    if (!value) {
      return "Can't be empty"
    } else if (value.length > 10000) {
      return "Can't be longer than 10000 characters"
    }
  }

  const onSubmit = async (
    values: RequestData & {
      status: State
    },
    actions: FormikHelpers<RequestData>
  ) => {
    try {
      await editRequest(values)

      toast({
        title: 'Feedback posted successfully',
        status: 'success',
        isClosable: true,
      })
      navigate('/')
    } catch {
      toast({
        title: 'Failed to post feedback',
        status: 'error',
        isClosable: true,
      })
    } finally {
      actions.setSubmitting(false)
    }
  }

  const previousUrl = generatePath('/feedback/:id', { id })

  return (
    <Box py="8" px="6">
      <GoBackLink to={previousUrl} />
      <Card icon={<EditIcon />} mt="12" py="10" px="6">
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
                <H1 mb="6">Editing {data?.title}</H1>
                <Formik
                  initialValues={
                    {
                      title: data?.title,
                      category: data?.category,
                      status: data?.status,
                      details: data?.description,
                    } as RequestData
                  }
                  onSubmit={onSubmit}
                >
                  {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <Field name="title" validate={validateTitle}>
                        {({ field }) => (
                          <FormControl
                            isInvalid={!!(errors.title && touched.title)}
                          >
                            <FormLabel htmlFor="title">
                              Feedback Title
                            </FormLabel>
                            <FormHelper>
                              Add a short, descriptive headline
                            </FormHelper>
                            <Input {...field} id="title" />
                            <FormErrorMessage>{errors.title}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="category">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="category">Category</FormLabel>
                            <FormHelper>
                              Choose a category for your feedback
                            </FormHelper>
                            <Select
                              {...field}
                              onChange={(e) => field.onChange(e)}
                              id="category"
                              options={feedbackCategories.map((option) => ({
                                value: option,
                                label: capitalizeEveryWord(option),
                              }))}
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="status">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="status">
                              Update Status
                            </FormLabel>
                            <FormHelper>Change feature state</FormHelper>
                            <Select
                              {...field}
                              onChange={(e) => field.onChange(e)}
                              id="status"
                              options={feedbackStates.map((option) => ({
                                value: option,
                                label: capitalizeEveryWord(option),
                              }))}
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="details" validate={validateDetails}>
                        {({ field }) => (
                          <FormControl
                            isInvalid={!!(errors.details && touched.details)}
                          >
                            <FormLabel htmlFor="details">
                              Feedback Detail
                            </FormLabel>
                            <FormHelper>
                              Include any specific comments on what should be
                              improved, added, etc.
                            </FormHelper>
                            <TextArea {...field} id="details" />
                            <FormErrorMessage>
                              {errors.details}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Flex mt="10" direction="column" align="stretch">
                        <Button mb="4" type="submit" isLoading={isSubmitting}>
                          Save Changes
                        </Button>
                        <Link to={previousUrl}>
                          <Button variant="secondary" w="100%">
                            Cancel
                          </Button>
                        </Link>
                        <Button variant="danger" mt="4">
                          Delete
                        </Button>
                      </Flex>
                    </form>
                  )}
                </Formik>
              </>
            ),
          }[status]
        }
      </Card>
    </Box>
  )
}

export default Edit
