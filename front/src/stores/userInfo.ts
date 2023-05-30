import { computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = computed(() => {
    const user = localStorage.getItem('userInfo')
    return user ? JSON.parse(user) : {}
  })

  return { userInfo }
})
