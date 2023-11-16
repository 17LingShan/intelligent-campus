<template>
  <view class="register-wrap">
    <view class="register-container">
      <u-navbar
        title="注册"
        bgColor="transparent"
        @leftClick="handleRegisterBack"
      >
      </u-navbar>
      <view class="register-content-wrap">
        <view class="bind-account-wrap">
          <view class="bind-account-content">
            <text>绑定账号</text>
          </view>
        </view>
        <view class="setting-info-wrap">
          <view class="setting-info-content">
            <text>设置信息</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleRegisterBack = () => {
  console.log(123)
  uni.navigateTo({ url: '/pages/common/login/index' })
}
</script>

<style lang="scss" scoped>
.register-wrap {
  display: flex;
  height: 100vh;

  .register-container {
    flex: 1;
    background: linear-gradient(
      to bottom,
      $startBackgroundColor,
      70%,
      $endBackgroundColor
    );

    .register-content-wrap {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2vh;

      .bind-account-wrap {
      }
    }
  }
}
</style>
