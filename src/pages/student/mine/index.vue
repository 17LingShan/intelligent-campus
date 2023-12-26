<template>
  <u-navbar
    title="我的"
    bgColor="#ff9f49"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="account-wrap">
    <view class="account-nav-extension-view">
      <view class="notification-bell" @click="handleClickBell">
        <u-icon name="bell" size="32" :color="'#ffffff'"></u-icon>
      </view>
      <view class="account-avatar-wrap">
        <image
          class="account-avatar"
          src="https://cdn.uviewui.com/uview/album/1.jpg"
        ></image>
      </view>
    </view>
    <view class="account-content">
      <view class="account-info-wrap">
        <view class="account-info-item">
          <text>用户名</text>
          <text>{{ userStore.name }}</text>
        </view>
        <view class="account-info-item">
          <text>姓名</text>
          <text>{{ userStore.name }}</text>
        </view>
        <view class="account-info-item">
          <text>学号</text>
          <text>{{ userStore.number }}</text>
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
          <text>{{ userStore.mobile }}</text>
        </view>

        <view class="account-info-item">
          <text>宿舍</text>
          <text>{{ userStore.dormNumber ?? '未分配' }}</text>
        </view>
      </view>
      <view class="logout-button-wrap">
        <view class="logout-button" @click="handleClickLogout">
          <text>退出登录</text>
        </view>
      </view>
    </view>
  </view>
  <u-tabbar
    :value="tabsStore.currentTab"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    @change="handleTabChanged"
  >
    <template v-for="item in tabsStore.tabsList" :key="item.text">
      <u-tabbar-item :text="item.text" :icon="item.icon"></u-tabbar-item>
    </template>
  </u-tabbar>
</template>
<script lang="ts" setup>
import { clearToken } from '@/utils'
import { useTabsStore, useUserStore } from '@/store'

const tabsStore = useTabsStore()
const userStore = useUserStore()

const handleClickLogout = () => {
  clearToken()
  uni.navigateTo({
    url: '/pages/common/login/index',
  })
}

const handleTabChanged = (index: number) => {
  tabsStore.setCurrentTab(index)
}

const handleClickBell = () => {
  uni.navigateTo({
    url: '/pages/student/subPages/Notification',
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

    .notification-bell {
      position: absolute;
      top: 2vh;
      right: 4vw;
    }

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

    .logout-button-wrap {
      margin-top: 4vh;
      height: calc($accountInfoHeight);
      line-height: calc($accountInfoHeight);
      display: flex;
      flex-direction: row;
      justify-content: center;

      .logout-button {
        width: 50vw;
        border: 4rpx solid $borderOutlineColor;
        border-radius: $buttonRadius;
        color: #f45757;
        text-align: center;
      }
    }
  }
}
</style>
