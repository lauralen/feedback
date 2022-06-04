import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import { fetchRequests } from './api'
import { Feedback, Status } from './types'

export interface FeedbacksState {
  requests: Feedback[]
  status: Status
}

const initialState: FeedbacksState = {
  requests: [],
  status: 'idle',
}

export const fetchRequestsAsync = createAsyncThunk<any>(
  'countries/fetchRequests',
  async () => {
    const res = await fetchRequests()
    return await res.json()
  }
)

export const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchRequestsAsync.fulfilled,
        (state, action: PayloadAction<Feedback[]>) => {
          state.requests = action.payload
          state.status = 'idle'
        }
      )
      .addCase(fetchRequestsAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const getRequests = (state: RootState) => {
  const { requests } = state.feedbacks
  return requests
}

export default feedbacksSlice.reducer
