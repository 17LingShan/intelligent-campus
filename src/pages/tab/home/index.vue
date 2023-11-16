<template>
  <view class="flex flex-col items-center justify-center">
    <image
      class="mb-50rpx mt-200rpx h-200rpx w-200rpx"
      src="@/static/images/logo.png"
      width="200rpx"
      height="200rpx"
    />
    <view class="flex justify-center">
      <text class="font-size-36rpx color-gray-700">
        {{ store.userInfo.user_name || '123' }}
      </text>
      <button class="u-button" @click="handleClick">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { clearToken } from '@/utils'

const title = ref<string>()
title.value = import.meta.env.VITE_APP_TITLE

const store = useUserStore()

const handleClick = () => {
  console.log('click button')
  clearToken()
  uni.navigateTo({
    url: '/pages/common/login/index',
  })
}

console.log('store.user_name', store.user_name)
</script>
