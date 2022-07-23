import { Category, State } from './types'
import { capitalizeEveryWord } from './utils'

export const feedbackCategories: Category[] = [
  'enhancement',
  'feature',
  'bug',
  'UI',
  'UX',
]
export const feedbackCategoriesLabels = feedbackCategories.map((option) =>
  capitalizeEveryWord(option)
)
export const feedbackStates: State[] = [
  'suggestion',
  'planned',
  'in-progress',
  'live',
]
