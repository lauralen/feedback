import { rest } from 'msw'

import { RoadmapStatus } from 'features/feedbacks/components/RoadmapCard/interfaces'

const { REACT_APP_API_ENDPOINT } = process.env

export const ROADMAP_STATUS_ENDPOINT = `${REACT_APP_API_ENDPOINT}roadmap-status`

export const mockStatus: RoadmapStatus = {
  planned: 2,
  'in-progress': 3,
  live: 0,
}

const handlers = [
  rest.get<RoadmapStatus>(ROADMAP_STATUS_ENDPOINT, (req, res, ctx) =>
    res(ctx.json(mockStatus))
  ),
]

export default handlers
