import { FC } from 'react'
import { ReactComponent as Illustration } from 'assets/illustration-empty.svg'

import Card from 'common/components/Card'
import H3 from 'common/components/H3'
import Text from 'common/components/Text'

import AddFeedbackButton from '../AddFeedbackButton'

const NoData: FC = () => {
  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      px="6"
      py="20"
    >
      <Illustration />
      <H3 mt="10">There is no feedback yet.</H3>
      <Text mt="3.5" mb="6">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </Text>
      <AddFeedbackButton />
    </Card>
  )
}

export default NoData
