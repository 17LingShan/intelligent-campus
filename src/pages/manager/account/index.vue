<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="#ff9f49"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="account-wrap">
    <view class="account-nav-extension-view"></view>
    <view class="account-content">
      <view class="search-button-wrap">
        <input placeholder="请输入学号以查询" />
        <u-icon name="search" size="36" :color="'#979797'"></u-icon>
      </view>
      <view class="student-info-wrap">
        <view
          v-for="item in accountLists"
          :key="item.studentId"
          @click="handleClickInfoItem(item)"
          class="student-info-item"
        >
          <view class="item-text">
            <text>{{ item.name }}</text>
            <text>{{ item.studentId }}</text>
          </view>
          <u-icon name="info-circle" size="30" :color="'#979797'"></u-icon>
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
import { useTabsStore } from '@/store'

const tabsStore = useTabsStore()
const accountLists = ref([
  { name: '这是啥', studentId: '32846284' },
  { name: '李四', studentId: '63276372' },
  { name: '王七', studentId: '10347278' },
])
const handleTabChanged = (index: number) => {
  tabsStore.setCurrentTab(index)
}

const handleClickInfoItem = (item: { name: string; studentId: string }) => {
  console.log(item.name)
  uni.navigateTo({
    url: `/pages/manager/subPages/AccountInfo?name=${item.name}&studentId=${item.studentId}`,
  })
}
</script>
<style lang="scss" scoped>
$buttonHeight: 80rpx;
$buttonPaddingHor: 3vh;
$middleItemWidth: 50vw;
$itemTextWidth: 80vw;

.account-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .account-nav-extension-view {
    position: fixed;
    height: 6vh;
    width: 100%;
    border-radius: 0 0 $buttonRadius $buttonRadius;
    background-color: $startBackgroundColor;
    z-index: 2;
  }

  .account-content {
    height: auto;
    margin-top: $pagePaddingTop;
    padding: 0 $cardPaddingHor;
    display: flex;
    flex-direction: column;
    gap: 4vh;

    .search-button-wrap {
      padding: 0 $buttonPaddingHor;
      height: $buttonHeight;
      line-height: $buttonHeight;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: 4rpx solid $borderOutlineColor;
      border-radius: $buttonRadius;

      input {
        width: 100%;
        height: $buttonHeight;
        line-height: $buttonHeight;
      }
    }

    .student-info-wrap {
      display: flex;
      flex-direction: column;
      gap: 1vh;
      .student-info-item {
        display: flex;
        flex-direction: row;
        padding: 0 $buttonPaddingHor;
        justify-content: space-between;
        height: $buttonHeight;
        line-height: $buttonHeight;
        align-items: center;
        border: 4rpx solid $borderOutlineColor;
        border-radius: $buttonRadius;
        .item-text {
          width: $itemTextWidth;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          text:last-child {
            width: $middleItemWidth;
          }
        }
      }
    }
  }
}
</style>
