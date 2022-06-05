import { Category } from 'common/types'

export type Status = 'idle' | 'loading' | 'failed'
export type CategoryFilter = Category | 'all'
export type SortBy =
  | 'most upvotes'
  | 'least upvotes'
  | 'most comments'
  | 'least comments'

type CommentBase = {
  content: string
  user: User
}

type Reply = CommentBase & { replyingTo: string }

type User = {
  image: string
  name: string
  username: string
}

type Comment = CommentBase & {
  id: number
  replies?: Reply[]
}

export type Feedback = {
  id: number
  title: string
  category: Category
  upvotes: number
  status: 'suggestion' | 'planned' | 'in-progress' | 'live'
  description: string
  comments?: Comment[]
}
