<template>
  <u-navbar title="申请" bgColor="transparent" height="88rpx" :autoBack="true">
  </u-navbar>

  <view class="approval-wrap">
    <view class="approval-content">
      <text>123</text>
    </view>
  </view>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
$buttonMarginBottom: 1vh;
$buttonHeight: 80rpx;
$buttonPaddingHor: 3vh;
.approval-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .approval-content {
    margin-top: calc($pagePaddingTop + 6vh);
    height: auto;
  }
}
</style>
