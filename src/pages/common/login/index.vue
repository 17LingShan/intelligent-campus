<template>
  <u-navbar title="登录" bgColor="transparent" leftIcon="" :autoBack="true" />
  <u-toast ref="loginToastRef"></u-toast>
  <view class="login-wrap">
    <view class="login-container">
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
import { useUserStore } from '@/store'

import { getStudentTabs, getManagerTabs, setToken, getToken } from '@/utils'
import { useTabsStore } from '@/store'

const tabsStore = useTabsStore()
const userStore = useUserStore()

const loginToastRef = ref()
const loginFormValues = reactive({
  username: '',
  password: '',
})

const handleFetchDormInfo = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/stu/${userStore.id}`,
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      userStore.setDormInfo(res.data.data.dormitory)
    })
    .catch((err) => {})
}

const handleLogin = async () => {
  await uni
    .request({
      url: 'http://106.52.223.188:8760/api/authority/anno/login',
      method: 'POST',
      data: JSON.stringify({
        account: loginFormValues.username,
        password: loginFormValues.password,
      }),
    })
    .then(async (res: any) => {
      userStore.setBaseInfo(res.data.data.user, res.data.data.role)
      setToken(res.data.data.token.token)
      if (res.data.data.role === '学生') {
        tabsStore.setTabsList(getStudentTabs())
        await handleFetchDormInfo()
      } else {
        tabsStore.setTabsList(getManagerTabs())
      }

      uni.reLaunch({ url: tabsStore.tabsList[0].path })
      tabsStore.setCurrentTab(0)
    })
    .catch(() => {
      loginToastRef.value.show({
        type: 'error',
        message: '账号或密码错误',
      })
    })
}

const handleLoginBtnClicked = async () => {
  if (!loginFormValues.username || !loginFormValues.password) {
    loginToastRef.value.show({
      type: 'error',
      message: '请输入账户和密码',
    })
    return
  }

  await handleLogin()
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
