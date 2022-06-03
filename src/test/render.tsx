import { FunctionComponent, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { render as testingLibraryRender } from '@testing-library/react'
import { store } from 'app/store'
import theme from 'theme'

export default function render(element: ReactElement) {
  const Wrapper: FunctionComponent<{}> = ({ children }) => (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  )

  return testingLibraryRender(element, { wrapper: Wrapper })
}
