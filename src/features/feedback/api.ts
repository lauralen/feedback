import { PostCommentBody } from './types'

const { REACT_APP_API_ENDPOINT } = process.env

export async function fetchRequest(id: string) {
  return await fetch(`${REACT_APP_API_ENDPOINT}request/${id}`)
}

export async function postComment(data: PostCommentBody) {
  return await fetch(`${REACT_APP_API_ENDPOINT}add-comment`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
