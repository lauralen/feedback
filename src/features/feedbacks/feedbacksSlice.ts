import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import { fetchRequests } from './api'
import { CategoryFilter, Feedback, SortBy, Status } from './types'

export interface FeedbacksState {
  requests: Feedback[]
  status: Status
  sortBy: SortBy
  categoryFilter: CategoryFilter
}

const initialState: FeedbacksState = {
  requests: [],
  status: 'idle',
  sortBy: 'most upvotes',
  categoryFilter: 'all',
}

export const fetchRequestsAsync = createAsyncThunk<Feedback[]>(
  'countries/fetchRequests',
  async () => {
    const res = await fetchRequests()
    return await res.json()
  }
)

export const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload
    },
    selectCategoryFilter(state, action: PayloadAction<CategoryFilter>) {
      state.categoryFilter = action.payload
    },
  },
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

export const { setSortBy, selectCategoryFilter } = feedbacksSlice.actions

export const getRequests = (state: RootState) => {
  const { requests: stateRequests, sortBy } = state.feedbacks
  const requests = [...stateRequests]

  switch (sortBy) {
    case 'most upvotes':
      return requests.sort((a, b) => b.upvotes - a.upvotes)
    case 'most comments':
      return requests.sort(
        (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
      )
    case 'least upvotes':
      return requests.sort((a, b) => a.upvotes - b.upvotes)
    case 'least comments':
      return requests.sort(
        (a, b) => (a.comments?.length ?? 0) - (b.comments?.length ?? 0)
      )
  }
}

export default feedbacksSlice.reducer
