import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export const apiClient = axios.create({ baseURL: BASE_URL })

export function setApiCredentials(apiKey: string, token: string): void {
  apiClient.defaults.headers.common['Api-key'] = apiKey
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { BASE_URL }
