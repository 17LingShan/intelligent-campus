<template>
  <u-toast ref="registerToastRef"></u-toast>
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
            <input
              class="u-border-bottom"
              placeholder="学校"
              v-model="registerFormValues.school"
            />
            <input
              class="u-border-bottom"
              type="number"
              placeholder="学号"
              v-model="registerFormValues.number"
            />
            <input
              class="u-border-bottom"
              placeholder="姓名"
              v-model="registerFormValues.name"
            />
            <input
              class="u-border-bottom"
              placeholder="身份证号"
              v-model="registerFormValues.idCardNumber"
            />
          </view>
        </view>
        <view class="register-info-wrap">
          <view class="register-item-text-wrap">
            <text>设置信息</text>
          </view>
          <view class="register-input-wrap">
            <input
              class="u-border-bottom"
              placeholder="用户名"
              v-model="registerFormValues.account"
            />
            <input
              class="u-border-bottom"
              placeholder="密码"
              v-model="registerFormValues.password"
            />
            <input
              class="u-border-bottom"
              type="number"
              placeholder="手机号"
              v-model="registerFormValues.mobile"
            />
          </view>
        </view>
        <view class="login-button-wrap">
          <view class="login-button-container">
            <button @click="handleRegister">注册</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const registerToastRef = ref()
const registerFormValues = reactive({
  name: '',
  school: '',
  number: '',
  idCardNumber: '',
  password: '',
  account: '',
  mobile: '',
})

const handleRegister = async () => {
  let flag = false
  Object.keys(toRaw(registerFormValues)).every((item) => {
    if (item === '' || item === undefined || item === null) {
      flag = true
    }
  })

  if (flag) {
    registerToastRef.value.show({
      type: 'error',
      message: '请完善资料',
    })
    return
  }

  await uni
    .request({
      url: 'http://106.52.223.188:8760/api/authority/anno/stu/register',
      method: 'POST',
      data: JSON.stringify(registerFormValues),
    })
    .then((res: any) => {
      if (res.data.code !== 0) {
        registerToastRef.value.show({
          type: 'error',
          message: res.data.msg || '注册失败!',
        })
        return
      }
      registerToastRef.value.show({
        type: 'success',
        message: '注册成功!',
      })
      uni.navigateBack()
    })
    .catch((err) => {
      console.error(err)
    })
}

const handleRegisterBack = () => {
  uni.navigateBack()
  registerToastRef.value.show({
    type: 'error',
    message: '注册失败!',
  })
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
