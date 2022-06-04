import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchRequests } from './api'
import { Feedback, Status } from './types'

export interface FeedbacksState {
  feedbacks: Feedback[]
  status: Status
}

const initialState: FeedbacksState = {
  feedbacks: [],
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
          state.feedbacks = action.payload
          state.status = 'idle'
        }
      )
      .addCase(fetchRequestsAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default feedbacksSlice.reducer
