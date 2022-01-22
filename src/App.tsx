import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import cx from 'classnames'
import Header from 'layout/Header'

import Countries from 'features/countries/Countries'

type Theme = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <BrowserRouter>
      <div
        className={cx({
          'theme-light': theme === 'light',
          'theme-dark': theme === 'dark',
        })}
      >
        <Header>
          <h1>Where in the world?</h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Toggle theme
          </button>
        </Header>

        <Routes>
          <Route path="/" element={<Countries />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
