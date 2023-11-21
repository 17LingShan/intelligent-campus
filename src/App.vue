<script setup lang="ts">
import { getToken, mpUpdate } from '@/utils/index'
import { useTabsStore } from '@/store'

const tabsStore = useTabsStore()

onLaunch(() => {
  console.log('App Launch')
  const token = getToken()
  if (!token) {
    uni.navigateTo({ url: '/pages/common/login/index' })
  } else {
    tabsStore.setCurrentTab(0)
  }

  uni.hideHomeButton()
  // #ifdef MP
  mpUpdate()
  // #endif
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
