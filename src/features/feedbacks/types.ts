export type Status = 'idle' | 'loading' | 'failed'

type Reply = any

type User = {
  image: string
  name: string
  username: string
}

type Comment = {
  id: number
  content: string
  user: User
  replies?: Reply[]
}

export type Feedback = {
  id: number
  title: string
  category: 'enhancement' | 'feature' | 'bug'
  upvotes: number
  status: 'suggestion' | 'planned' | 'in-progress' | 'live'
  description: string
  comments?: Comment[]
}
