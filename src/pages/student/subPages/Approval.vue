<template>
  <u-navbar title="申请" bgColor="transparent" height="88rpx" :autoBack="true">
  </u-navbar>

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
          <text>退宿</text>
          <u-icon name="error-circle" size="24" :color="'#f45757'" />
        </view>
        <view class="approval-access-item">
          <text>学分</text>
          <u-icon name="checkmark" size="24" :color="'#34dd45'" />
        </view>
        <view class="approval-access-item">
          <text>四六级</text>
          <u-icon name="checkmark" size="24" :color="'#34dd45'" />
        </view>
      </view>
      <view class="approval-type-wrap">
        <view class="approval-type-title">
          <text>审批人</text>
        </view>
        <view class="approval-type-value-wrap">
          <view class="approval-type-value">
            <text>xxx</text>
          </view>
          <u-icon name="arrow-down" size="24" />
        </view>
      </view>
      <view class="approval-button-wrap">
        <view class="approval-button-content">
          <text>申请</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup></script>
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
