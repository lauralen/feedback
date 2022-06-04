import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import feedbacksReducer from '../features/feedbacks/feedbacksSlice'

export const store = configureStore({
  reducer: {
    feedbacks: feedbacksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
