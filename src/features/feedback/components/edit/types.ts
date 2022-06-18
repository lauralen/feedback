import { Category, State } from 'common/types'

export type RequestData = {
  title: string
  category: Category
  status: State
  details: string
}
