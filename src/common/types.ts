export type Status = 'idle' | 'loading' | 'failed'
export type Category = 'enhancement' | 'feature' | 'bug' | 'UI' | 'UX'
export type State = 'suggestion' | 'planned' | 'in-progress' | 'live'

type CommentBase = {
  content: string
  user: User
}

export type Reply = CommentBase & { replyingTo: string }

type User = {
  image: string
  name: string
  username: string
}

export type Comment = CommentBase & {
  id: number
  replies?: Reply[]
  replyingTo?: never
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
