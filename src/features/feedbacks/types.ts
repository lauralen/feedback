import { Category } from 'common/types'

export type CategoryFilter = Category | 'all'
export type SortBy =
  | 'most upvotes'
  | 'least upvotes'
  | 'most comments'
  | 'least comments'
