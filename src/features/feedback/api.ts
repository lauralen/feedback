const { REACT_APP_API_ENDPOINT } = process.env

export async function fetchRequest(id: string) {
  return await fetch(`${REACT_APP_API_ENDPOINT}request/${id}`)
}
