<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="transparent"
    height="66rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="manager-wrap">
    <text>manage</text>
  </view>
  <u-tabbar
    :value="tabsStore.currentTab"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    @change="handleTabChanged"
  >
    <template v-for="item in tabsStore.tabsList" :key="item.text">
      <u-tabbar-item :text="item.text" :icon="item.icon"></u-tabbar-item>
    </template>
  </u-tabbar>
</template>
<script lang="ts" setup>
import { useTabsStore } from '@/store'
import { getManagerTabs } from '@/utils'

const tabsStore = useTabsStore()

onLoad(() => {
  tabsStore.setTabsList(getManagerTabs())
})

const handleTabChanged = (index: number) => {
  console.log(index)
  tabsStore.setCurrentTab(index)
}
</script>
<style lang="scss" scoped>
.manager-wrap {
  padding-top: $navBarHeight;
  height: calc(100vh - $navBarHeight);
}
</style>
