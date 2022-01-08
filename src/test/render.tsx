import { FunctionComponent, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { render as testingLibraryRender } from '@testing-library/react'
import { store } from 'app/store'

export default function render(element: ReactElement) {
  const Wrapper: FunctionComponent<{}> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return testingLibraryRender(element, { wrapper: Wrapper })
}
