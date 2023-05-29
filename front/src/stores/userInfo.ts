import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({
    name: '',
    headImg: ''
  })
  //   const doubleCount = computed(() => count.value * 2)
  function getUserInfo() {
    userInfo.value.name = '网贤书城' 
    userInfo.value.headImg = 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180902/02addc93c44741d993d44b6e44fe19d7.jpeg'
  }

  

  return { userInfo, getUserInfo }
})
