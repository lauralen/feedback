import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import cx from 'classnames'
import Content from 'layout/Content'
import Header from 'layout/Header'

import Button from 'common/components/Button'
import Countries from 'features/countries/Countries'
import Country from 'features/countries/Country'

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
          <Link to="/">
            <h1>Where in the world?</h1>
          </Link>
          <Button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Toggle theme
          </Button>
        </Header>

        <Routes>
          <Route
            path="/"
            element={
              <Content>
                <Countries />
              </Content>
            }
          />
          <Route
            path="/country/:code"
            element={
              <Content>
                <Country />
              </Content>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
