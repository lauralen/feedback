import { Link } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { ReactComponent as PlusIcon } from 'assets/icons/icon-new-feedback.svg'
import { Field, Formik } from 'formik'

import Button from 'common/components/Button'
import Card from 'common/components/Card'
import FormControl from 'common/components/FormControl'
import FormHelper from 'common/components/FormHelper'
import FormLabel from 'common/components/FormLabel'
import GoBackLink from 'common/components/GoBackLink'
import H1 from 'common/components/H1'
import Input from 'common/components/Input'
import Select from 'common/components/Select'
import TextArea from 'common/components/TextArea'

function Feedbacks() {
  return (
    <Box py="8" px="6">
      <GoBackLink />
      <Card icon={<PlusIcon />} mt="12" py="10" px="6">
        <H1 mb="6">Create New Feedback</H1>
        <Formik
          initialValues={{ title: '', category: '', details: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="title">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="title">Feedback Title</FormLabel>
                    <FormHelper>Add a short, descriptive headline</FormHelper>
                    <Input {...field} id="title" />
                  </FormControl>
                )}
              </Field>

              <Field name="category">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormHelper>Choose a category for your feedback</FormHelper>
                    <Select
                      {...field}
                      onChange={(e) => field.onChange(e)}
                      id="category"
                      options={[
                        { value: 'feature', label: 'Feature' },
                        { value: 'feature2', label: 'Feature2' },
                      ]}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="details">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="details">Feedback Detail</FormLabel>
                    <FormHelper>
                      Include any specific comments on what should be improved,
                      added, etc.
                    </FormHelper>
                    <TextArea {...field} id="details" />
                  </FormControl>
                )}
              </Field>

              <Flex mt="10" direction="column" align="stretch">
                <Button mb="4" type="submit">
                  Add Feedback
                </Button>
                <Link to="/">
                  <Button variant="secondary" w="100%">
                    Cancel
                  </Button>
                </Link>
              </Flex>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  )
}

export default Feedbacks
