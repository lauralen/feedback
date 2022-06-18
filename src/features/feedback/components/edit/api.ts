import { RequestData } from './types'

const { REACT_APP_API_ENDPOINT } = process.env

export async function editRequest(data: RequestData) {
  return await fetch(`${REACT_APP_API_ENDPOINT}edit-request`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}
