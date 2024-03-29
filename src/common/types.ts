export type Status = 'idle' | 'loading' | 'failed'
export type Category = 'enhancement' | 'feature' | 'bug' | 'UI' | 'UX'
export type State = 'suggestion' | 'planned' | 'in-progress' | 'live'
export type RoadmapState = Exclude<State, 'suggestion'>

export type RoadmapStatus = Record<RoadmapState, number>

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
  status: State
  description: string
  comments?: Comment[]
}

export type RoadmapFeedback = Feedback & {
  status: RoadmapState
}
