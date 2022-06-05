import { RequestData } from './types'

const { REACT_APP_API_ENDPOINT } = process.env

export async function postRequest(data: RequestData) {
  return await fetch(`${REACT_APP_API_ENDPOINT}add-request`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
