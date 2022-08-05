import { ChakraProvider } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  mockComment,
  mockCommentWithReplies,
} from 'mocks/handlers/productRequests'
import theme from 'theme'

import Comment from './Comment'

export default {
  title: 'Feedback/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>

const Template: ComponentStory<typeof Comment> = (args) => (
  <ChakraProvider theme={theme}>
    <Comment {...args} />
  </ChakraProvider>
)

const commonArgs = {
  data: mockComment,
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}

export const WithReplies = Template.bind({})
WithReplies.args = {
  ...commonArgs,
  data: mockCommentWithReplies,
}
