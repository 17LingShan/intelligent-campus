<template>
  <u-navbar
    :title="`${pathName === 'card' ? '校园卡' : '电费'}充值`"
    bgColor="transparent"
    height="88rpx"
    :autoBack="true"
  >
  </u-navbar>
  <u-toast ref="chargeToastRef"></u-toast>

  <view class="charge-wrap">
    <view class="charge-content">
      <view class="charge-info-wrap">
        <view class="charge-info-item">
          <view class="charge-info-item-label">
            <text>{{ pathName === 'card' ? '姓名' : '房间' }}</text>
          </view>
          <input v-if="pathName === 'ele'" v-model="dormInfo.id" disabled />
          <input v-else v-model="userName" disabled />
        </view>
        <view class="charge-info-item">
          <view class="charge-info-item-label">
            <text>学号</text>
          </view>
          <input v-model="userStore.id" placeholder="请输入学号" disabled />
        </view>
      </view>
      <view class="charge-money-wrap">
        <text>￥</text>
        <input v-model="chargeMoney" />
      </view>
      <view class="money-buttons-wrap">
        <view class="money-button-item" @click="selectMoney('20')">
          <text>20元</text>
        </view>
        <view class="money-button-item" @click="selectMoney('50')">
          <text>50元</text>
        </view>
        <view class="money-button-item" @click="selectMoney('100')">
          <text>100元</text>
        </view>
      </view>
      <view class="pay-button-wrap">
        <view class="pay-button" @click="handleCharge">
          <text>支付</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'
import { getToken } from '@/utils'

const pathName = ref('ele')
const userName = ref('')
const userStore = useUserStore()
const chargeToastRef = ref()

const dormInfo = reactive({
  id: '',
})

const chargeMoney = ref('20.00')

onLoad((option) => {
  const urlParams = option as {
    path: 'ele' | 'card'
    id: string
    userName?: string
  }
  console.log(urlParams)
  dormInfo.id = urlParams.id
  userName.value = urlParams.userName || ''
  pathName.value = urlParams.path
})

const selectMoney = (money: string) => {
  chargeMoney.value = money
}

const handleCharge = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/${
        pathName.value === 'card' ? 'stu' : 'dormitory'
      }/charge`,
      method: 'PUT',
      header: { Authorization: getToken() },
      data: JSON.stringify({
        [pathName.value === 'card' ? 'userId' : 'id']:
          pathName.value === 'card' ? userStore.id : dormInfo.id,
        money: chargeMoney.value,
      }),
    })
    .then((res: any) => {
      console.log(res.data)
      if (res.data.code === 0) {
        chargeToastRef.value.show({
          type: 'success',
          message: '充值成功',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
        return
      }
      chargeToastRef.value.show({
        type: 'error',
        message: '充值失败, 请联系管理员',
      })
    })
    .catch((err: any) => {
      console.log(err)
      chargeToastRef.value.show({
        type: 'error',
        message: '充值失败, 请联系管理员',
      })
    })
}
</script>
<style lang="scss" scoped>
$buttonMarginBottom: 1vh;
$buttonHeight: 100rpx;
$buttonPaddingHor: 3vh;
$buttonWidth: $buttonHeight * 0.8;

.charge-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .charge-content {
    margin-top: calc(6vh);
    height: auto;

    .charge-info-wrap {
      height: auto;
      margin-top: 10vh;
      display: flex;
      flex-direction: column;
      gap: 3vh;
      padding: 0 $buttonPaddingHor;
      .charge-info-item {
        height: $buttonHeight;
        padding: 0 $buttonPaddingHor;
        line-height: $buttonHeight;
        border-radius: $buttonRadius;
        border: 4rpx solid $borderOutlineColor;
        display: flex;
        flex-direction: row;
        gap: 5vw;

        input {
          width: 50vw;
          height: $buttonHeight;
        }
      }
    }

    .charge-money-wrap {
      height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      font-size: 2rem;

      input {
        width: 20vw;
        height: 2rem;
      }
    }

    .money-buttons-wrap {
      margin-top: 10vh;
      padding: 0 calc($buttonPaddingHor + 5vw);
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .money-button-item {
        width: calc($buttonHeight * 1.216);
        height: $buttonWidth;
        line-height: $buttonWidth;
        color: #5b95c0;
        border-radius: $buttonRadius;
        border: 4rpx solid #5b95c0;
        text-align: center;
      }
    }

    .pay-button-wrap {
      margin-top: 10vh;
      display: flex;
      justify-content: center;
      align-content: center;
      .pay-button {
        width: 30vw;
        height: $buttonWidth;
        line-height: $buttonWidth;
        text-align: center;
        color: aliceblue;
        border-radius: $buttonRadius;
        background-color: #07c160;
      }
    }
  }
}
</style>
