<template>
  <u-navbar
    :title="`${pathName === 'card' ? '校园卡' : '电费'}充值`"
    bgColor="transparent"
    height="88rpx"
    :autoBack="true"
  >
  </u-navbar>

  <view class="charge-wrap">
    <view class="charge-content">
      <view class="charge-info-wrap">
        <view class="charge-info-item">
          <view class="charge-info-item-label">
            <text>{{ pathName === 'card' ? '姓名' : '房间' }}</text>
          </view>
          <input
            :placeholder="`请输入${pathName === 'card' ? '姓名' : '房间号'}`"
          />
        </view>
        <view class="charge-info-item">
          <view class="charge-info-item-label">
            <text>学号</text>
          </view>
          <input placeholder="请输入学号" />
        </view>
      </view>
      <view class="charge-money-wrap">
        <text>￥</text>
        <input value="20.00" />
      </view>
      <view class="money-buttons-wrap">
        <view class="money-button-item">
          <text>20元</text>
        </view>
        <view class="money-button-item">
          <text>50元</text>
        </view>
        <view class="money-button-item">
          <text>100元</text>
        </view>
      </view>
      <view class="pay-button-wrap">
        <view class="pay-button">
          <text>支付</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const pathName = ref('ele')

onLoad((option) => {
  const urlParams = option as { path: 'ele' | 'card'; id: string }
  console.log(urlParams)
  pathName.value = urlParams.path
})
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
