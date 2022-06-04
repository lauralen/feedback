const { REACT_APP_API_ENDPOINT } = process.env

export async function fetchRequests() {
  return await fetch(`${REACT_APP_API_ENDPOINT}requests`)
}
