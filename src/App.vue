<script setup lang="ts">
// import { clearToken } from './utils'

function handleEnterApp() {
  // clearToken()
  uni.navigateTo({ url: '/pages/common/login/index' })
  uni.hideHomeButton()
}

onLoad(() => {
  console.log('App Launch')
  handleEnterApp()
})
onShow(() => {
  console.log('App Show')
  handleEnterApp()
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
