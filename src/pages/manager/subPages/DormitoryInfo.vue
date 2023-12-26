<template>
  <u-navbar title="宿舍信息" bgColor="#ff9f49" height="88rpx" :autoBack="true">
  </u-navbar>
  <u-toast ref="dormToastRef"></u-toast>

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
          <text>房间号</text>
          <input v-model="addManInfo.dormId" />
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
            <input
              v-model="dormitoryDetail.id"
              :disabled="!isManager"
              placeholder="请输入房间号"
            />
          </view>
          <u-icon
            name="search"
            size="36"
            :color="dormitoryDetail.id && isManager ? '#323333' : 'transparent'"
            @click="handleSearchDorm"
          ></u-icon>
        </view>
        <view class="dormitory-roommate-item">
          <view class="item-text">
            <text>余额</text>
            <text class="item-text-value">
              ￥{{
                userStore.role === '学生' ? userStore.EleChargeNumber : eleCost
              }}
            </text>
          </view>
          <view
            v-if="!isManager"
            class="recharge-wrap"
            @click="handleChargeClicked"
          >
            <text class="recharge-text">充值</text>
          </view>
          <u-icon name="man-delete" size="36" :color="'transparent'"></u-icon>
        </view>
      </view>
      <view class="dormitory-roommate-wrap">
        <view class="section-title">
          <text>人员</text>
          <u-icon
            name="man-add"
            size="36"
            :color="isManager ? '#323333' : 'transparent'"
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
            <text class="item-text-value">{{ item.studentId }}</text>
          </view>
          <u-icon
            name="man-delete"
            size="36"
            :color="isManager ? '#323333' : 'transparent'"
            @click="handleDeleteMan(item)"
          ></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'
import { getToken } from '@/utils'
import { reactive, ref } from 'vue'

const userStore = useUserStore()

const showModal = ref(false)
const isManager = ref(false)
const dormToastRef = ref()
const eleCost = ref(0)

const addManInfo = reactive({
  dormId: '',
  studentId: '',
})

const dormitoryDetail = reactive<DormitoryDetailType>({
  id: '',
  surplus: '',
  roommateList: [],
})

onLoad(async (option) => {
  if (userStore.role !== '学生') isManager.value = true
  const urlParams = option as { id: string }
  dormitoryDetail.id = urlParams.id || ''

  if (dormitoryDetail.id) {
    await handleFetchRoomDetail()
  }
})

const handleSearchDorm = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/dormitory/${dormitoryDetail.id}`,
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      if (res.data.code === 0) {
        dormitoryDetail.roommateList.splice(
          0,
          dormitoryDetail.roommateList.length
        )
        eleCost.value = res.data.data.electricityCost
        res.data.data.stuList.forEach((item: any) => {
          dormitoryDetail.roommateList.push({
            name: item.name,
            studentId: item.id,
          })
        })
        return
      }
      dormToastRef.value.show({
        type: 'error',
        message: '房间id不存在  ',
      })
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const handleFetchRoomDetail = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/dormitory/${dormitoryDetail.id}`,
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      dormitoryDetail.roommateList.splice(
        0,
        dormitoryDetail.roommateList.length
      )
      res.data.data.stuList.forEach((item: any) => {
        dormitoryDetail.roommateList.push({
          name: item.name,
          studentId: item.id,
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleAddManClicked = () => {
  if (!isManager) return
  showModal.value = true
}
const handleClickConfirm = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/dormitory/bind`,
      method: 'PUT',
      header: { Authorization: getToken() },
      data: JSON.stringify({
        stuNum: addManInfo.studentId,
        dormitoryId: addManInfo.dormId,
      }),
    })
    .then((res: any) => {
      if (res.data.code !== 0) {
        dormToastRef.value.show({
          type: 'error',
          message: res.data.msg,
        })
        return
      }
      dormToastRef.value.show({
        type: 'success',
        message: '绑定成功',
      })
    })
    .catch((err: any) => {
      console.log(err)
    })

  handleClickClose()
}
const handleDeleteMan = async (item: any) => {
  console.log('delete', item.studentId)
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/dormitory/unbind?stuId=${item.studentId}`,
      method: 'PUT',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      if (res.data.code === 0) {
        dormToastRef.value.show({
          type: 'success',
          message: '删除成功',
        })
        handleFetchRoomDetail()
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const handleChargeClicked = () => {
  uni.navigateTo({
    url: `/pages/student/subPages/Charge?path=ele&id=${userStore.dormId}`,
  })
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
  height: auto;

  .dormitory-info-content {
    overflow: hidden;
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
  border: 4rpx solid $borderOutlineColor;
  border-radius: $buttonRadius;

  input {
    height: $buttonHeight;
    width: $middleItemWidth;
  }

  .item-text {
    position: relative;
    width: $itemTextWidth;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item-text-value {
      width: $middleItemWidth;
    }
  }

  .recharge-wrap {
    position: absolute;
    right: 20vw;

    .recharge-text {
      font-size: small;
      color: #4687b9;
      border-bottom: 2rpx solid #4687b9;
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
