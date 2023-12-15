import { defineStore } from 'pinia'
import type { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    name: '江阳小道',
    avatar: '',
    workDescribe: '',
  }),
  getters: {},
  actions: {
    setInfo(info: any) {
      this.id = info.id
      this.name = info.name
      this.avatar = info.avatar
      this.workDescribe = info.workDescribe
    },
  },
})

export default useUserStore
