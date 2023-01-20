import { Category, Comment, State } from 'common/types'

export type ResponseFeedback = {
  _id: number
  title: string
  category: Category
  upvotes: number
  status: State
  description: string
  comments?: Comment[]
}

export type FeedbacksResponse = {
  count: number
  data: ResponseFeedback[]
}

export type CategoryFilter = Category | 'all'
export type SortBy =
  | 'most upvotes'
  | 'least upvotes'
  | 'most comments'
  | 'least comments'
