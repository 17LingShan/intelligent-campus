<template>
  <u-navbar title="账户信息" bgColor="#ff9f49" height="88rpx" :autoBack="true">
  </u-navbar>
  <view class="account-wrap">
    <view class="account-nav-extension-view">
      <view class="account-avatar-wrap">
        <image
          class="account-avatar"
          src="https://cdn.uviewui.com/uview/album/1.jpg"
        ></image>
      </view>
    </view>
    <view class="account-content">
      <view class="account-edit-wrap">
        <text>归档此学生</text>
        <u-icon name="edit-pen" size="24" :color="'#6e6f6e'"></u-icon>
      </view>
      <view class="account-info-wrap">
        <view class="account-info-item">
          <text>用户名</text>
          <text>{{ accountInfo.account }}</text>
        </view>
        <view class="account-info-item">
          <text>姓名</text>
          <text>{{ accountInfo.name }}</text>
        </view>
        <view class="account-info-item">
          <text>编号</text>
          <text>{{ accountInfo.stuNum }}</text>
        </view>
        <view class="account-info-item">
          <text>学校</text>
          <text>桂林电子科技大学</text>
        </view>
        <view class="account-info-item">
          <text>身份</text>
          <text>学生</text>
        </view>
        <view class="account-info-item">
          <text>手机号码</text>
          <text>{{ accountInfo.mobile }}</text>
        </view>

        <view class="account-info-item">
          <text>宿舍</text>
          <text>{{ accountInfo.dorm || '暂无' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { getToken } from '@/utils'

const accountInfo = reactive({
  account: '',
  name: '',
  stuNum: '',
  school: '',
  mobile: '',
  role: '',
  dorm: '',
  id: '',
})

onLoad(async (option: AnyObject | undefined) => {
  const data = option as StuItem
  accountInfo.name = data.name
  accountInfo.account = data.name
  accountInfo.stuNum = data.stuNum
  accountInfo.id = data.id
  await handleFetchStu()
})

const handleFetchStu = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/stu/${accountInfo.id}`,
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      accountInfo.mobile = res.data.data.mobile
      accountInfo.dorm = res.data.data.dormitory?.roomNumber
    })
    .catch((err: any) => {
      console.log(err)
    })
}
</script>
<style lang="scss" scoped>
$avatarSize: 25vw;
$extensionHeight: 15vh;
$accountInfoHeight: 6vh;

.account-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .account-nav-extension-view {
    position: fixed;
    height: $extensionHeight;
    width: 100%;
    border-radius: 0 0 $buttonRadius $buttonRadius;
    background-color: $startBackgroundColor;
    z-index: 1;

    .account-avatar-wrap {
      position: absolute;
      bottom: calc($avatarSize * -0.3);
      left: calc(50% - $avatarSize * 0.5);
      height: $avatarSize;
      width: $avatarSize;

      .account-avatar {
        height: $avatarSize;
        width: $avatarSize;
        border-radius: $buttonRadius;
      }
    }
  }

  .account-content {
    margin-top: calc($extensionHeight + $pagePaddingTop);
    padding: 0 $cardPaddingHor;
    font-size: small;

    .account-edit-wrap {
      display: flex;
      height: 4vh;
      line-height: 4vh;
      padding: 0 2vw;
      flex-direction: row;
      justify-content: space-between;

      & > text {
        color: #f45757;
        border-bottom: 2rpx solid #f45757;
      }
    }

    .account-info-wrap {
      margin-top: 2vh;
      padding: $cardPaddingHor;
      border-radius: $buttonRadius;
      background-color: #f4f4ee;

      .account-info-item {
        height: $accountInfoHeight;
        line-height: $accountInfoHeight;
        padding: 0 5vw;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-bottom: 5rpx solid #e0e0dd;

        & > text:first-child {
          width: 30%;
          color: #a5a5a1;
        }

        & > text:last-child {
          width: 50%;
          text-align: center;
        }
      }
    }
  }
}
</style>
