<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(async () => {
  await auth.init('wolfykey')
  console.log('token:', auth.token)
  console.log('ready:', auth.ready)
})
</script>

<template>
  <RouterView />
</template>
