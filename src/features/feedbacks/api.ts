import { FeedbacksResponse } from './types'

const { REACT_APP_API_ENDPOINT } = process.env

export const fetchRequests = async (): Promise<FeedbacksResponse> => {
  const response = await fetch(`${REACT_APP_API_ENDPOINT}feedbacks`)
  return response.json()
}
