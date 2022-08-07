import { RoadmapState } from './types'

export const capitalizeEveryWord = (string: string): string =>
  string.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

export const statusColors: Record<RoadmapState, string> = {
  planned: 'coral',
  'in-progress': 'purple',
  live: 'blue.50',
}
