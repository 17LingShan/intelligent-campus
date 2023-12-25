import { defineStore } from 'pinia'
import type { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    number: '',
    name: '某某学生',
    role: '',
    mobile: '',
    dormId: '',
    dormNumber: '',
    dormLocation: '',
    idCardNumber: '',
  }),
  getters: {},
  actions: {
    setBaseInfo(info: any, role: string) {
      this.id = info.id
      this.name = info.name
      this.mobile = info.mobile
      this.role = role
    },
    setNumberInfo(info: any) {
      this.number = info.number
    },
    setDormInfo(info: any) {
      this.dormId = info.id
      this.dormNumber = info.roomNumber
      this.dormLocation = info.address
    },
  },
})

export default useUserStore
