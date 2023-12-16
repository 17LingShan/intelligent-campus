import { defineStore } from 'pinia'
import type { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    name: '某某学生',
    workDescribe: '',
    mobile: '',
    dormNumber: '',
    dormLocation: '',
    idCardNumber: '',
  }),
  getters: {},
  actions: {
    setBaseInfo(info: any) {
      console.log(info.mobile)
      this.id = info.id
      this.name = info.name
      this.mobile = info.mobile
      this.workDescribe = info.workDescribe
    },
    setDormInfo(info: any) {
      console.log('info', info)
      this.dormNumber = info.roomNumber
      this.dormLocation = info.address
    },
  },
})

export default useUserStore
