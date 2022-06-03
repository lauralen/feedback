import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Feedbacks from 'features/feedbacks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feedbacks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
