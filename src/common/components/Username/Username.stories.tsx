import { ChakraProvider } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import theme from 'theme'

import Username from './Username'

export default {
  title: 'Feedback/Username',
  component: Username,
} as ComponentMeta<typeof Username>

const Template: ComponentStory<typeof Username> = (args) => (
  <ChakraProvider theme={theme}>
    <Username {...args} />
  </ChakraProvider>
)

const commonArgs = {
  children: 'laura552',
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}
