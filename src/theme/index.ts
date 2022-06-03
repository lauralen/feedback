import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `Jost, ${baseTheme.fonts.heading}`,
    body: `Jost, ${baseTheme.fonts.body}`,
  },
  colors: {
    white: '#FFFFFF',
    purple: '#AD1FEA',
    coral: '#F49F85',
    gray: {
      50: 'F7F8FD',
      100: 'F2F4FF',
    },
    blueGray: {
      50: '647196',
      100: '3A4374',
      200: '373F68',
    },
    blue: {
      50: '62BCFA',
      100: '4661E6',
    },
  },
})

export default theme
