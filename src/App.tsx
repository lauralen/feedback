import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Button from 'common/components/Button'
import Countries from 'features/countries/Countries'
import Country from 'features/countries/Country'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <h1>Where in the world?</h1>
        </Link>
        <Button onClick={() => {}}>Button text</Button>

        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/country/:code" element={<Country />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
