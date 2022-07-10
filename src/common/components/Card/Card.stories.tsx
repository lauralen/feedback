import { ChakraProvider } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReactComponent as PlusIcon } from 'assets/icons/icon-new-feedback.svg'
import theme from 'theme'

import Card from './Card'

export default {
  title: 'Feedback/Card',
  component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => (
  <ChakraProvider theme={theme}>
    <Card {...args} />
  </ChakraProvider>
)

const commonArgs = {
  children: 'Card Content',
}

export const Default = Template.bind({})
Default.args = {
  ...commonArgs,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  ...commonArgs,
  icon: <PlusIcon />,
}
