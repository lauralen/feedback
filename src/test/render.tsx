import { FunctionComponent, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { render as testingLibraryRender } from '@testing-library/react'
import { generateStore, Store } from 'app/store'
import theme from 'theme'

export default function render(element: ReactElement, store?: Store) {
  const Wrapper: FunctionComponent<unknown> = ({ children }) => (
    <Provider store={store ?? generateStore()}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  )

  return testingLibraryRender(element, { wrapper: Wrapper })
}
