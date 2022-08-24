import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import {
  Feedback,
  RoadmapFeedback,
  RoadmapState,
  State,
  Status,
} from 'common/types'

import { fetchRequests } from './api'
import { CategoryFilter, SortBy } from './types'

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
    upvoteRequest(state, action: PayloadAction<number>) {
      state.requests = state.requests.map((request) =>
        request.id === action.payload
          ? { ...request, upvotes: request.upvotes + 1 }
          : request
      )
    },
    changeRequestStatus(
      state,
      action: PayloadAction<{ requestId: number; status: State }>
    ) {
      state.requests = state.requests.map((request) => {
        if (request.id === action.payload.requestId) {
          return { ...request, status: action.payload.status }
        } else {
          return request
        }
      })
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

export const {
  setSortBy,
  selectCategoryFilter,
  upvoteRequest,
  changeRequestStatus,
} = feedbacksSlice.actions

export const getRequests = (state: RootState) => {
  const { requests: stateRequests, sortBy, categoryFilter } = state.feedbacks
  let requests = [...stateRequests]

  if (categoryFilter !== 'all') {
    requests = requests.filter(({ category }) => category === categoryFilter)
  }

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

type RoadmapRequests = Record<
  RoadmapState,
  { requests: RoadmapFeedback[]; count: number }
>

export const getRoadmapRequests = (state: RootState): RoadmapRequests => {
  const { requests } = state.feedbacks

  const result: RoadmapRequests = {
    planned: { requests: [], count: 0 },
    'in-progress': { requests: [], count: 0 },
    live: { requests: [], count: 0 },
  }

  requests.length &&
    requests
      .filter(({ status }) => status !== 'suggestion')
      .forEach((request) => {
        result[request.status].requests = [
          ...result[request.status].requests,
          request,
        ]

        result[request.status].count = result[request.status].requests.length
      })

  return result
}

type UiStatus = Status | 'noData'

export const getUiStatus = (state: RootState): UiStatus => {
  const { requests, status } = state.feedbacks

  const hasData = requests.length

  if (status !== 'failed' && status !== 'loading' && !hasData) {
    return 'noData'
  } else {
    return status
  }
}

export default feedbacksSlice.reducer
