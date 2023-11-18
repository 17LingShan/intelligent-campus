<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="transparent"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="account-wrap">
    <text>account</text>
    <button class="u-button" @click="handleClick">登录</button>
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
import { clearToken } from '@/utils'

const tabsStore = useTabsStore()

const handleTabChanged = (index: number) => {
  console.log(index)
  tabsStore.setCurrentTab(index)
}

const handleClick = () => {
  console.log('click button')
  clearToken()

  uni.navigateTo({
    url: '/pages/common/login/index',
  })
}
</script>
<style lang="scss" scoped>
.account-wrap {
  padding-top: $pagePaddingTop;
  height: calc(100vh - $navBarHeight);
}
</style>
