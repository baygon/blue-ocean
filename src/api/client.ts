import axios from 'axios'
import { BASE_URL } from '@/api/config'

export const apiClient = axios.create({ baseURL: BASE_URL })

export function setApiCredentials(apiKey: string, token: string): void {
  apiClient.defaults.headers.common['Api-key'] = apiKey
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
