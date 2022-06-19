import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import AddFeedback from 'features/addFeedback'
import Feedback from 'features/feedback'
import EditFeedback from 'features/feedback/components/edit'
import Feedbacks from 'features/feedbacks'

function App() {
  return (
    <BrowserRouter>
      <Box minHeight="100vh" pt={[0, 14]} bg="gray.100">
        <Routes>
          <Route path="/" element={<Feedbacks />} />
          <Route path="/add-feedback" element={<AddFeedback />} />
          <Route path="/feedback/:id" element={<Feedback />} />
          <Route path="/feedback/:id/edit" element={<EditFeedback />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
