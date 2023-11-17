<template>
  <!-- <view>
    <view class="login-form-wrap">
      <view class="title"> 欢迎登录 </view>
      <input
        v-model="tel"
        class="u-border-bottom"
        type="number"
        placeholder="请输入手机号"
      />
      <view class="u-border-bottom my-40rpx flex">
        <input
          v-model="code"
          class="flex-1"
          type="number"
          placeholder="请输入验证码"
        />
        <view>
          <u-code ref="uCodeRef" @change="codeChange" />
          <u-button :text="tips" type="success" size="mini" @click="getCode" />
        </view>
      </view>
      <button :style="[inputStyle]" class="login-btn" @tap="submit">
        登录
      </button>

      <view class="alternative">
        <view class="password"> 密码登录 </view>
        <view class="issue"> 遇到问题 </view>
      </view>
    </view>
  </view> -->

  <view class="login-wrap">
    <view class="login-container">
      <u-navbar title="登录" bgColor="transparent" leftIcon="" :autoBack="true">
      </u-navbar>
      <view class="login-content-wrap">
        <view class="login-icon-wrap">
          <image
            class="login-icon"
            src="@/static/images/login-icon.svg"
          ></image>
        </view>
        <view class="login-form-wrap">
          <view class="input-wrap">
            <input
              class="u-border-bottom"
              type="number"
              placeholder="用户名"
              v-model="loginFormValues.username"
            />
          </view>
          <view class="input-wrap">
            <input
              class="u-border-bottom"
              type="number"
              placeholder="密码"
              v-model="loginFormValues.password"
            />
          </view>
        </view>
        <view class="login-button-wrap">
          <view class="login-button-container">
            <button @click="handleLoginBtnClicked">登录</button>
          </view>
        </view>
        <view class="register-button-wrap">
          <view class="register-button-container">
            <text @click="handleRegisterBtnClicked">注册</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { setToken } from '@/utils'

const loginFormValues = reactive({
  username: '',
  password: '',
})

const handleLoginBtnClicked = () => {
  setToken('1234567890')
  uni.reLaunch({ url: '/pages/tab/home/index' })
}

const handleRegisterBtnClicked = () => {
  uni.navigateTo({ url: '/pages/common/register/index' })
}
</script>

<style lang="scss" scoped>
.login-wrap {
  display: flex;
  height: 100vh;

  .login-container {
    flex: 1;
    background: linear-gradient(
      to bottom,
      $startBackgroundColor,
      70%,
      $endBackgroundColor
    );

    .login-content-wrap {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2vh;

      .login-icon-wrap {
        position: relative;
        height: 140rpx;

        .login-icon {
          height: 100%;
          width: 100%;
        }
      }

      .login-form-wrap {
        height: 300rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1vh;

        .input-wrap {
          width: 100%;
          box-sizing: border-box;
          padding: 0 5vw;
          input {
            box-sizing: border-box;
            height: 110rpx;
            border-radius: 30rpx;
            padding: 0 6vw;
            background-color: $inputBackgroundColor;
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

      .register-button-wrap {
        height: 100rpx;

        .register-button-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          text {
            border-bottom: 1px solid #975050;
            color: #975050;
          }
        }
      }
    }
  }
}
</style>
