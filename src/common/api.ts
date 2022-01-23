import axios, { AxiosRequestConfig } from 'axios'

const { REACT_APP_GRAPHQL_ENDPOINT } = process.env

if (!REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT missing in .env file')
}

const GRAPHQL_ENDPOINT = REACT_APP_GRAPHQL_ENDPOINT as string

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  })

  instance.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json'
      return config
    },
    (error) => Promise.reject(error)
  )

  return instance
}

const graphQLClient = createAxiosInstance(GRAPHQL_ENDPOINT)

export async function fetchGraphQL<T>(
  { query, variables }: { query: string; variables?: unknown },
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await graphQLClient.post<T>('', { query, variables }, config)
  return response.data
}
