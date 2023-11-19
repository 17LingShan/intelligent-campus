<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="#ff9f49"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="approval-wrap">
    <u-picker
      :show="showPicker"
      :columns="columns"
      @cancel="handleCancelPicker"
      @confirm="handleConfirmPicker"
    ></u-picker>
    <view class="approval-nav-extension-view">
      <view class="select-approval-type-button" @click="handleShowPicker">
        <text>全部</text>
      </view>
    </view>
    <view class="approval-content">
      <view
        v-for="item in approvalLists"
        class="approval-item-wrap"
        :key="item.studentId"
        @click="handleClickApprovalItem(item)"
      >
        <view class="notification-point"></view>
        <text class="approval-item-name ellipsis-text">{{ item.name }}</text>
        <text class="approval-item-id ellipsis-text">{{ item.studentId }}</text>
        <text class="approval-item-detail ellipsis-text">{{
          '“离校申请”正在等待审批'
        }}</text>
        <u-icon name="arrow-right" size="24"></u-icon>
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

const approvalLists = ref([
  { name: '这是啥', studentId: '32846284' },
  { name: '李四', studentId: '63276372' },
  { name: '王七', studentId: '10347278' },
])

const showPicker = ref(false)
const columns = reactive([['全部', '离校申请', '返家申请']])

const handleShowPicker = () => {
  showPicker.value = true
}

const handleCancelPicker = () => {
  showPicker.value = false
}

const handleConfirmPicker = (value: any) => {
  console.log(value.value[0])
  handleCancelPicker()
}

const handleClickApprovalItem = (item: { name: string; studentId: string }) => {
  console.log(item.name, item.studentId)
  uni.navigateTo({
    url: `/pages/manager/subPages/ApprovalDetail?name=${item.name}&studentId=${item.studentId}`,
  })
}

const handleTabChanged = (index: number) => {
  console.log(index)
  tabsStore.setCurrentTab(index)
}
</script>
<style lang="scss" scoped>
$buttonMarginBottom: 1vh;
$buttonHeight: 80rpx;
$buttonPaddingHor: 3vh;

.approval-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .approval-nav-extension-view {
    position: fixed;
    height: 10vh;
    width: 100%;
    border-radius: 0 0 $buttonRadius $buttonRadius;
    background-color: $startBackgroundColor;
    z-index: 1;

    .select-approval-type-button {
      position: absolute;
      right: 5vw;
      bottom: 2vh;
      width: 18vw;
      height: 6vh;
      line-height: 6vh;
      border-radius: $buttonRadius;
      background-color: #ffebd8;
      text-align: center;
    }
  }
  .approval-content {
    height: auto;
    margin-top: calc($buttonMarginBottom + $pagePaddingTop + 6vh);
    padding: 0 $cardPaddingHor;
    display: flex;
    flex-direction: column;
    gap: $buttonMarginBottom;

    .approval-item-wrap {
      position: relative;
      padding: 0 3vw 0 5vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: $buttonHeight;
      line-height: $buttonHeight;
      background-color: $approvalCardBackgroundColor;
      border-radius: $buttonRadius;

      .notification-point {
        position: absolute;
        width: 20rpx;
        height: 20rpx;
        background-color: #f45757;
        top: -5rpx;
        right: -5rpx;
        border-radius: 50%;
      }

      .ellipsis-text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .approval-item-name {
        width: 15%;
      }

      .approval-item-id {
        width: 25%;
      }
    }
  }
}
</style>
