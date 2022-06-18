import { ChakraProvider } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import theme from 'theme'

import Button from './Button'

export default {
  title: 'Feedback/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <ChakraProvider theme={theme}>
    <Button {...args} />
  </ChakraProvider>
)

const commonArgs = {
  children: 'Button',
}

export const Primary = Template.bind({})
Primary.args = {
  ...commonArgs,
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...commonArgs,
  variant: 'secondary',
}

export const Blue = Template.bind({})
Blue.args = {
  ...commonArgs,
  variant: 'blue',
}

export const Danger = Template.bind({})
Danger.args = {
  ...commonArgs,
  variant: 'danger',
}

export const Transparent = Template.bind({})
Transparent.args = {
  ...commonArgs,
  variant: 'transparent',
}
