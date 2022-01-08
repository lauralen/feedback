import { useState } from 'react'
import cx from 'classnames'
import Header from 'layout/Header'

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

      <div className="App">App</div>
    </div>
  )
}

export default App
