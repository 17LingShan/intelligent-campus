<template>
  <u-navbar title="申请" bgColor="transparent" height="88rpx" :autoBack="true">
  </u-navbar>
  <u-toast ref="approvalToastRef"></u-toast>

  <view class="approval-wrap">
    <view class="approval-content">
      <view class="approval-type-wrap">
        <view class="approval-type-title">
          <text>离校类型</text>
        </view>
        <view class="approval-type-value-wrap">
          <view class="approval-type-value">
            <text>离校</text>
          </view>
          <u-icon name="arrow-down" size="24" />
        </view>
      </view>
      <view class="approval-access-list-wrap">
        <view class="approval-access-item">
          <text>四级</text>
          <u-icon
            v-if="userStore.cet4"
            name="checkmark"
            size="24"
            :color="'#34dd45'"
          />
          <u-icon v-else name="error-circle" size="24" :color="'#f45757'" />
        </view>
        <view class="approval-access-item">
          <text>六级</text>
          <u-icon
            v-if="userStore.cet6"
            name="checkmark"
            size="24"
            :color="'#34dd45'"
          />
          <u-icon v-else name="error-circle" size="24" :color="'#f45757'" />
        </view>
        <view class="approval-access-item">
          <text>学分</text>
          <u-icon
            v-if="userStore.credit"
            name="checkmark"
            size="24"
            :color="'#34dd45'"
          />
          <u-icon v-else name="error-circle" size="24" :color="'#f45757'" />
        </view>
      </view>
      <view class="approval-type-wrap">
        <view class="approval-type-title">
          <text>审批人</text>
        </view>
        <view class="approval-type-value-wrap">
          <view class="approval-type-value">
            <text>管理员</text>
          </view>
          <u-icon name="arrow-down" size="24" />
        </view>
      </view>
      <view class="approval-button-wrap">
        <view class="approval-button-content" @click="handleApproval">
          <text>申请</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'
import { getToken } from '@/utils'

const userStore = useUserStore()

const approvalToastRef = ref()

const handleApproval = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/apply`,
      method: 'POST',
      header: { Authorization: getToken() },
      data: JSON.stringify({
        stuId: userStore.id,
        type: '离校',
        content: '离校',
      }),
    })
    .then((res: any) => {
      if (res.data.code === 0) {
        approvalToastRef.value.show({
          type: 'success',
          message: '申请成功',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
        return
      }
      approvalToastRef.value.show({
        type: 'error',
        message: '申请失败, 请联系管理员',
      })
    })
    .catch((err: any) => {
      console.log(err)
    })
}
</script>
<style lang="scss" scoped>
$buttonMarginBottom: 1vh;
$buttonHeight: 80rpx;
$buttonPaddingHor: 2vh;
$buttonGap: 2vh;

.approval-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .approval-content {
    height: auto;
    margin-top: calc(6vh);
    padding: 0 $cardPaddingHor;

    .approval-type-wrap {
      height: $buttonHeight;
      padding: 0 $buttonPaddingHor;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      line-height: $buttonHeight;
      border-radius: $buttonRadius;
      border: 4rpx solid $borderOutlineColor;
      background-color: #fefefe;

      .approval-type-value-wrap {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 4vw;
      }
    }

    .approval-access-list-wrap {
      display: flex;
      flex-direction: column;
      gap: $buttonMarginBottom;
      margin: $buttonGap 0;
      padding: $buttonPaddingHor;
      background-color: #fefefe;
      min-height: 40vh;
      border-radius: $buttonRadius;
      border: 4rpx solid $borderOutlineColor;

      .approval-access-item {
        height: $buttonHeight;
        line-height: $buttonHeight;
        padding: 0 $buttonPaddingHor;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: $buttonRadius;
        border: 4rpx solid $borderOutlineColor;
      }
    }

    .approval-button-wrap {
      margin-top: $buttonGap;
      height: calc($buttonHeight * 1.1);
      line-height: calc($buttonHeight * 1.1);
      display: flex;
      justify-content: center;
      .approval-button-content {
        width: 30vw;
        border-radius: $buttonRadius;
        border: 4rpx solid #888888;
        background-color: #fefefe;
        text-align: center;
      }
    }
  }
}
</style>
