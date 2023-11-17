declare namespace TabsStore {
  interface TabsItem {
    text: string
    icon: string
    path: string
  }

  type TabsList = TabsItem[]

  interface TabsState {
    currentTab: number
    tabsList: TabsList
  }
}
