<template>
  <u-navbar title="宿舍信息" bgColor="#ff9f49" height="88rpx" :autoBack="true">
  </u-navbar>

  <u-modal
    :show="showModal"
    title="添加舍员"
    :showCancelButton="true"
    :cancelText="'取消'"
    @confirm="handleClickConfirm"
    @cancel="handleClickClose"
  >
    <view class="modal-slot-content">
      <view class="modal-input-wrap">
        <view class="modal-input-item">
          <text>姓名</text>
          <input v-model="addManInfo.name" />
        </view>
        <view class="modal-input-item">
          <text>学号</text>
          <input v-model="addManInfo.studentId" />
        </view>
      </view>
    </view>
  </u-modal>

  <view class="dormitory-info-wrap">
    <view class="dormitory-info-content">
      <view class="dormitory-detail-wrap">
        <view class="dormitory-roommate-item">
          <view class="item-text">
            <text>房间</text>
            <input v-model="dormitoryDetail.id" placeholder="请输入房间号" />
          </view>
          <u-icon
            name="search"
            size="36"
            :color="dormitoryDetail.id ? '#323333' : 'transparent'"
          ></u-icon>
        </view>
        <view class="dormitory-roommate-item">
          <view class="item-text">
            <text>余额</text>
            <text>￥{{ '0.00' }}</text>
          </view>
          <u-icon name="search" size="36" :color="'transparent'"></u-icon>
        </view>
      </view>
      <view class="dormitory-roommate-wrap">
        <view class="section-title">
          <text>人员</text>
          <u-icon
            name="man-add"
            size="36"
            :color="'#323333'"
            @click="handleAddManClicked"
          ></u-icon>
        </view>
        <view
          v-for="item in dormitoryDetail.roommateList"
          :key="item.studentId"
          class="dormitory-roommate-item"
        >
          <view class="item-text">
            <text>{{ item.name }}</text>
            <text>{{ item.studentId }}</text>
          </view>
          <u-icon name="man-delete" size="36" :color="'#323333'"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const showModal = ref(false)

const addManInfo = reactive({
  name: '',
  studentId: '',
})

const dormitoryDetail = reactive({
  id: '',
  surplus: '',
  roommateList: [
    { name: '张三', studentId: '32846284' },
    { name: '李四', studentId: '63276372' },
    { name: '王五', studentId: '10347277' },
  ],
})

const handleAddManClicked = () => {
  showModal.value = true
}

const handleClickConfirm = () => {
  console.log(addManInfo)
  addManInfo.name = ''
  addManInfo.studentId = ''
  handleClickClose()
}

const handleClickClose = () => {
  showModal.value = false
}
</script>
<style lang="scss" scoped>
$buttonHeight: 80rpx;
$middleItemWidth: 50vw;
$itemTextWidth: 80vw;
$modalInputHeight: 6vh;

.dormitory-info-wrap {
  padding-top: $pagePaddingTop;
  height: calc(100vh - $navBarHeight);

  .dormitory-info-content {
    height: 100%;
    padding: 0 $cardPaddingHor;
    .dormitory-detail-wrap {
      margin-top: 5vh;
      display: flex;
      flex-direction: column;
      gap: 2vh;
    }

    .dormitory-roommate-wrap {
      margin-top: 4vh;
      display: flex;
      flex-direction: column;
      gap: 2vh;

      .section-title {
        height: calc($buttonHeight * 0.6);
        line-height: calc($buttonHeight * 0.6);
        font-weight: lighter;
        padding: 0 2vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}

.dormitory-roommate-item {
  padding: 0 calc(2vw - 4rpx) 0 4vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: $buttonHeight;
  line-height: $buttonHeight;
  border: 4rpx solid #f2f2f2;
  border-radius: $buttonRadius;

  input {
    height: $buttonHeight;
    width: $middleItemWidth;
  }

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

.modal-slot-content {
  min-height: 15vh;
  width: 100%;
  .modal-input-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2vh;
    .modal-input-item {
      padding: 0 4vw;
      height: $modalInputHeight;
      line-height: $modalInputHeight;
      display: flex;
      flex-direction: row;
      border-radius: $buttonRadius;
      background-color: #f8faf8;
      text {
        width: 15%;
      }
      input {
        height: $modalInputHeight;
        width: 80%;
      }
    }
  }
}
</style>
