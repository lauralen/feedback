import { useState } from 'react'
import cx from 'classnames'
import Header from 'layout/Header'

import Countries from 'features/countries/Countries'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <div
      className={cx({
        'theme-light': theme === 'light',
        'theme-dark': theme === 'dark',
      })}
    >
      <Header>
        <h1>Where in the world?</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle theme
        </button>
      </Header>

      <Countries />
    </div>
  )
}

export default App
