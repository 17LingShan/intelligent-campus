<template>
  <u-navbar title="通知" bgColor="#ff9f49" height="88rpx" :autoBack="true">
  </u-navbar>

  <view class="notification-wrap">
    <view class="notification-nav-extension-view"></view>
    <view class="notification-content">
      <view class="notification-item-wrap">
        <view class="notification-point"></view>
        <text class="approval-item-name ellipsis-text">你的申请: </text>
        <text class="approval-item-type ellipsis-text">离校</text>
        <text class="ellipsis-text">{{ '正在等待审批' }}</text>
      </view>
      <view class="notification-item-wrap">
        <view class="notification-point"></view>
        <text class="approval-item-name ellipsis-text">你的申请: </text>
        <text class="approval-item-type ellipsis-text">离校</text>
        <text class="ellipsis-text">{{ '正在等待审批' }}</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
$buttonMarginBottom: 1vh;
$buttonHeight: 80rpx;
$buttonPaddingHor: 3vh;
.notification-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .notification-nav-extension-view {
    position: fixed;
    height: 10vh;
    width: 100%;
    border-radius: 0 0 $buttonRadius $buttonRadius;
    background-color: $startBackgroundColor;
    z-index: 1;
  }

  .notification-content {
    height: auto;
    margin-top: calc($buttonMarginBottom + $pagePaddingTop + 6vh);
    padding: 0 $cardPaddingHor;
    display: flex;
    flex-direction: column;
    gap: $buttonMarginBottom;

    .notification-item-wrap {
      position: relative;
      padding: 0 3vw 0 5vw;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
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

      .approval-item-name {
        width: 20%;
      }

      .approval-item-type {
        width: 15%;
      }
    }
  }
}
</style>
