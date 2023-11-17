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
        <view class="register-info-wrap">
          <view class="register-item-text-wrap">
            <text>绑定账号</text>
          </view>
          <view class="register-input-wrap">
            <input class="u-border-bottom" placeholder="学校" />
            <input class="u-border-bottom" type="number" placeholder="学号" />
            <input class="u-border-bottom" placeholder="姓名" />
            <input class="u-border-bottom" placeholder="身份证号" />
          </view>
        </view>
        <view class="register-info-wrap">
          <view class="register-item-text-wrap">
            <text>设置信息</text>
          </view>
          <view class="register-input-wrap">
            <input class="u-border-bottom" placeholder="用户名" />
            <input class="u-border-bottom" placeholder="密码" />
            <input class="u-border-bottom" type="number" placeholder="手机号" />
          </view>
        </view>

        <view class="login-button-wrap">
          <view class="login-button-container">
            <button>注册</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleRegisterBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
input {
  box-sizing: border-box;
  height: 100rpx;
  padding: 0 6vw;
  background-color: $inputBackgroundColor;
}

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
      gap: 3vh;

      .register-info-wrap {
        height: auto;
        padding: 0 5vw;

        .register-item-text-wrap {
          height: 60rpx;
          line-height: 60rpx;
          padding: 0 1vw;
          color: #a17145;
        }

        .register-input-wrap {
          & > input:first-child {
            border-radius: 30rpx 30rpx 0 0;
          }
          & > input:last-child {
            border-radius: 0 0 30rpx 30rpx;
          }
        }
      }
    }

    .login-button-wrap {
      height: 100rpx;

      .login-button-container {
        padding: 0 30vw;

        button {
          background-color: $buttonColor;
          line-height: 100rpx;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
