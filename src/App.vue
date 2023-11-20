<script setup lang="ts">
import { getToken, mpUpdate } from '@/utils/index'

onLaunch(() => {
  console.log('App Launch')
  const token = getToken()
  if (!token) {
    uni.navigateTo({ url: '/pages/common/login/index' })
  } else if (token === '1') {
    uni.navigateTo({ url: '/pages/manager/manage/index' })
  } else if (token === '2') {
    uni.navigateTo({ url: '/pages/student/home/index' })
  } else {
    uni.navigateTo({ url: '/pages/student/home/index' })
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
