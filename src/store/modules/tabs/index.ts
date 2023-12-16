import { defineStore } from 'pinia'

const useTabsStore = defineStore('tabs', {
  state: (): TabsStore.TabsState => ({
    currentTab: 0,
    tabsList: [],
  }),

  getters: {
    getTabsList(): TabsStore.TabsList {
      return this.tabsList
    },
  },

  actions: {
    setCurrentTab(index: number) {
      this.currentTab = index
      uni.switchTab({ url: this.tabsList[index].path })
    },
    setTabsList(tabsList: TabsStore.TabsList) {
      this.tabsList = tabsList
      this.currentTab = 0
      uni.switchTab({ url: this.tabsList[0].path })
    },
  },
})

export default useTabsStore
