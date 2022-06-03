import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'theme'

import { store } from './app/store'
import App from './App'
import * as serviceWorker from './serviceWorker'

import 'theme/styles.css'

if (process.env.REACT_APP_ENABLE_MOCKS) {
  const { worker } = require('./mocks/browser')
  worker.start({ onUnhandledRequest: 'bypass' })
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
