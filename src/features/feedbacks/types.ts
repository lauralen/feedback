export type Status = 'idle' | 'loading' | 'failed'

export type User = {
  image: string
  name: string
  username: string
}

export type Comment = {
  id: number
  content: string
  user: User
}

export type Feedback = {
  id: number
  title: string
  category: 'enhancement' | 'feature' | 'bug'
  upvotes: number
  status: 'suggestion' | 'planned' | 'in-progress' | 'live'
  description: string
  comments: Comment[]
}
