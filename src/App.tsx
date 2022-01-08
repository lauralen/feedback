import { useState } from 'react'
import cx from 'classnames'

import './App.scss'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <div>
      <div
        className={cx({
          'theme-light': theme === 'light',
          'theme-dark': theme === 'dark',
        })}
      >
        <div className="App">App</div>
      </div>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
    </div>
  )
}

export default App
