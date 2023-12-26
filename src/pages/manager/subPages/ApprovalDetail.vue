<template>
  <u-navbar title="申请详情" bgColor="#ff9f49" height="88rpx" :autoBack="true">
  </u-navbar>
  <u-toast ref="approvalToastRef"></u-toast>

  <view class="approval-detail-wrap">
    <view class="approval-detail-content">
      <view class="approval-type-wrap">
        <text>申请类型</text>
        <text>{{ params.type }}</text>
      </view>
      <view class="approval-data-wrap">
        <view class="approval-valid-item">
          <text>cet4</text>
          <u-icon
            v-if="params.cet4"
            name="checkmark"
            size="32"
            :color="'#07c160'"
          ></u-icon>
          <u-icon v-else name="error-circle" size="24" :color="'#f45757'" />
        </view>
        <view class="approval-valid-item">
          <text>cet6</text>
          <u-icon
            v-if="params.cet6"
            name="checkmark"
            size="32"
            :color="'#07c160'"
          ></u-icon>
          <u-icon v-else name="error-circle" size="24" :color="'#f45757'" />
        </view>
        <view class="approval-valid-item">
          <text>退宿</text>
          <u-icon name="error-circle" size="24" :color="'#f45757'" />
        </view>
      </view>
      <view class="valid-button-wrap">
        <view class="valid-reject-button" @click="handleClickReject">拒绝</view>
        <view class="valid-access-button" @click="handleClickAccess">同意</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { getToken } from '@/utils'

const params = reactive<ManageApprovalItem>({
  cet4: false,
  cet6: false,
  name: '',
  id: '',
  status: '',
  stuId: '',
  type: '',
})

const approvalToastRef = ref()

onLoad((option: AnyObject | undefined) => {
  const data = option as ManageApprovalItem
  params.cet4 = data.cet4
  params.cet6 = data.cet6
  params.name = data.name
  params.id = data.id
  params.status = data.status
  params.stuId = data.stuId
  params.type = data.type
})

const handleClickAccess = () => {
  handleFinishApproval(true)
}
const handleClickReject = () => {
  handleFinishApproval(false)
}

const handleFinishApproval = async (access: boolean) => {
  await uni
    .request({
      url: 'http://106.52.223.188:8760/api/campus/apply',
      method: 'PUT',
      header: { Authorization: getToken() },
      data: JSON.stringify({
        applyId: +params.id,
        status: access ? '通过' : '拒绝',
      }),
    })
    .then((res: any) => {
      if (res.data.code === 0) {
        approvalToastRef.value.show({
          type: 'success',
          message: '操作成功',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
}
</script>
<style lang="scss" scoped>
$buttonHeight: 80rpx;
$buttonCardPadding: 2vw;
$buttonBackgroundColor: #fefefe;

.approval-detail-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .approval-detail-content {
    height: 100%;
    margin-top: calc($pagePaddingTop);
    padding: 0 $cardPaddingHor;

    .approval-type-wrap {
      height: $buttonHeight;
      line-height: $buttonHeight;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      background-color: $buttonBackgroundColor;
      padding: 0 $buttonCardPadding;
      border: 4rpx solid $borderOutlineColor;
      border-radius: $buttonRadius;

      text:first-child {
        margin-right: 50vw;
      }
    }

    .approval-data-wrap {
      margin-top: 5vh;
      min-height: 40vh;
      padding: $buttonCardPadding $buttonCardPadding 0;
      display: flex;
      flex-direction: column;
      gap: 1vh;
      background-color: $buttonBackgroundColor;
      border-radius: $buttonRadius;

      .approval-valid-item {
        height: $buttonHeight;
        line-height: $buttonHeight;
        padding: 0 $buttonCardPadding;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 4rpx solid $borderOutlineColor;
        border-radius: $buttonRadius;
        background-color: $buttonBackgroundColor;
      }
    }

    .valid-button-wrap {
      margin-top: 15vh;
      height: calc($buttonHeight * 1.1);
      line-height: calc($buttonHeight * 1.1);
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      & > view {
        width: 30vw;
        text-align: center;
        border-radius: 20rpx;
      }

      .valid-reject-button {
        background-color: #fff;
        color: #f78a8a;
      }

      .valid-access-button {
        background-color: #07c160;
        color: #ffffff;
      }
    }
  }
}
</style>
