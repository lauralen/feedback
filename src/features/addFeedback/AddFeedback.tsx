import { Box, FormControl, Input } from '@chakra-ui/react'
import { ReactComponent as PlusIcon } from 'assets/icons/icon-new-feedback.svg'

import Card from 'common/components/Card'
import FormHelper from 'common/components/FormHelper'
import FormLabel from 'common/components/FormLabel'
import GoBackLink from 'common/components/GoBackLink'
import H1 from 'common/components/H1'

function Feedbacks() {
  return (
    <Box py="8" px="6">
      <GoBackLink />
      <Card icon={<PlusIcon />} mt="12" py="10" px="6">
        <H1 mb="6">Create New Feedback</H1>
        <FormControl>
          <FormLabel htmlFor="title">Feedback Title</FormLabel>
          <FormHelper>Add a short, descriptive headline</FormHelper>
          <Input id="title" />
        </FormControl>
      </Card>
    </Box>
  )
}

export default Feedbacks
