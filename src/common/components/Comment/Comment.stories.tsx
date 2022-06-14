import { ChakraProvider } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { mockComment } from 'mocks/productRequests'
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
