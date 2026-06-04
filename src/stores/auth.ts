import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { BASE_URL } from '@/api/config'
import { setApiCredentials } from '@/api/client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const ready = ref(false)

  async function init(apiKey: string): Promise<void> {
    const { data } = await axios.post<{ token: string }>(
      `${BASE_URL}/auth/token`,
      {},
      { headers: { 'Api-key': apiKey } },
    )
    token.value = data.token
    setApiCredentials(apiKey, data.token)
    ready.value = true
  }

  return { token, ready, init }
})
