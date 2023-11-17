import { defineStore } from 'pinia'

const useTabsStore = defineStore('tabs', {
  state: (): TabsStore.TabsState => ({
    currentTab: 0,
    tabsList: [
      { text: '首页', icon: 'home', path: '/pages/tab/home/index' },
      { text: '课程表', icon: 'calendar', path: '/pages/tab/list/index' },
      { text: '我的', icon: 'account', path: '/pages/tab/user/index' },
    ],
  }),

  getters: {
    getTabsList(): TabsStore.TabsList {
      return this.tabsList
    },
  },

  actions: {
    setCurrentTab(tab: number) {
      this.currentTab = tab
      console.log(123)
      console.log(this.tabsList[tab].path)
      uni.switchTab({ url: this.tabsList[tab].path })
    },
  },
})

export default useTabsStore
