import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useAppDispatch } from 'app/hooks'

import AddFeedback from 'features/addFeedback'
import Feedback from 'features/feedback'
import EditFeedback from 'features/feedback/components/edit'
import Feedbacks from 'features/feedbacks'
import { fetchRequestsAsync } from 'features/feedbacks/feedbacksSlice'
import Roadmap from 'features/Roadmap'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRequestsAsync())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Box minHeight="100vh" pt={[0, 14]} bg="gray.100">
        <Box maxWidth="5xl" mx="auto">
          <Routes>
            <Route path="/" element={<Feedbacks />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/add-feedback" element={<AddFeedback />} />
            <Route path="/feedback/:id" element={<Feedback />} />
            <Route path="/feedback/:id/edit" element={<EditFeedback />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
