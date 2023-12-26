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
    cardChargeNumber: '',
    EleChargeNumber: '',
    cet4: false,
    cet6: false,
    credit: false,
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
    setChargeInfo(info: any) {
      this.EleChargeNumber = info.dormitory.electricityCost.toString()
      this.cet4 = info.cet4
      this.cet6 = info.cet6
      this.credit = info.credit
    },
    setDormInfo(info: any) {
      this.dormId = info.id
      this.dormNumber = info.roomNumber
      this.dormLocation = info.address
    },
  },
})

export default useUserStore
