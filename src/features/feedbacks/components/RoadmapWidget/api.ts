const { REACT_APP_API_ENDPOINT } = process.env

export async function fetchRoadmapStatus() {
  return await fetch(`${REACT_APP_API_ENDPOINT}roadmap-status`)
}
