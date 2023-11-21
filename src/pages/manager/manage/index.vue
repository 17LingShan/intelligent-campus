<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="#ff9f49"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="manager-wrap">
    <view class="manager-nav-extension-view"></view>
    <view class="manager-content">
      <view class="manager-button">
        <view class="avatar-wrap">
          <u-avatar
            shape="square"
            size="60"
            src="https://cdn.uviewui.com/uview/album/1.jpg"
            custom-style="margin: -3px 5px -3px 0"
          />
        </view>
        <view class="info-wrap">
          <text>{{ '桂林电子科技大学' }}</text>
          <text>{{ '管理员 xxx 47239472' }}</text>
        </view>
      </view>
      <ManageButton
        name="宿舍管理"
        icon="home"
        @click="handleClickManageDormitory"
      ></ManageButton>
      <ManageButton name="其他功能" backgroundColor="#32e44f"></ManageButton>
      <ManageButton name="其他功能" backgroundColor="#bf53e4"></ManageButton>
      <ManageButton name="其他功能" backgroundColor="#6d9cbf"></ManageButton>
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
import { useTabsStore } from '@/store'
import { getManagerTabs } from '@/utils'

const tabsStore = useTabsStore()

onLoad(() => {
  tabsStore.setTabsList(getManagerTabs())
})

const handleTabChanged = (index: number) => {
  console.log(index)
  tabsStore.setCurrentTab(index)
}

const handleClickManageDormitory = () => {
  uni.navigateTo({ url: '/pages/manager/subPages/DormitoryInfo' })
}
</script>
<style lang="scss" scoped>
$buttonMarginBottom: 2vh;
$buttonHeight: 140rpx;
$buttonPaddingHor: 3vh;

.manager-wrap {
  padding-top: $pagePaddingTop;
  height: auto;
  .manager-nav-extension-view {
    position: fixed;
    height: 6vh;
    width: 100%;
    border-radius: 0 0 $buttonRadius $buttonRadius;
    background-color: $startBackgroundColor;
  }
  .manager-content {
    height: 100%;
    margin-top: calc($buttonMarginBottom + $pagePaddingTop);
    padding: 0 $cardPaddingHor;
    display: flex;
    flex-direction: column;
    gap: $buttonMarginBottom;

    .manager-button {
      padding: 0 $buttonPaddingHor;
      height: $buttonHeight;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 3vw;
      border-radius: $buttonRadius;
      background-color: #fdb675;
      font-size: larger;

      .info-wrap {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: medium;
      }
    }
  }
}
</style>
