import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import AddFeedback from 'features/addFeedback'
import Feedbacks from 'features/feedbacks'

function App() {
  return (
    <BrowserRouter>
      <Box minHeight="100vh" bg="gray.100">
        <Routes>
          <Route path="/" element={<Feedbacks />} />
          <Route path="/add-feedback" element={<AddFeedback />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
