<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="#ff9f49"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>
  <view class="home-wrap">
    <view class="account-nav-extension-view">
      <view class="notification-bell" @click="handleClickBell">
        <u-icon name="bell" size="32" :color="'#ffffff'" />
      </view>
      <view class="account-info-wrap">
        <view class="account-info-content">
          <view class="account-info">
            <view class="account-avatar-wrap">
              <image
                class="account-avatar"
                src="https://cdn.uviewui.com/uview/album/1.jpg"
              ></image>
            </view>
            <view class="account-info-detail-wrap">
              <text>桂林电子科技大学</text>
              <text>{{ `${userStore.name} ${userStore.number || 0}` }}</text>
            </view>
          </view>
          <u-icon name="arrow-right" size="32" @click="handleClickInfoArrow" />
        </view>
      </view>
    </view>
    <view class="home-content">
      <view class="card-wrap today-lessons-wrap">
        <text class="card-title">今日课程</text>
        <view class="today-lessons-content">
          <view
            class="today-lessons-item"
            v-if="lessons[new Date().getDay() - 1]?.firstLesson"
          >
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.firstLesson?.name
            }}</text>
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.firstLesson?.position
            }}</text>
            <text class="ellipsis-text">第一节</text>
            <text class="ellipsis-text">等国风</text>
          </view>
          <view
            class="today-lessons-item"
            v-if="lessons[new Date().getDay() - 1]?.secondLesson"
          >
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.secondLesson?.name
            }}</text>
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.secondLesson?.position
            }}</text>
            <text class="ellipsis-text">第二节</text>
            <text class="ellipsis-text">等国风</text>
          </view>
          <view
            class="today-lessons-item"
            v-if="lessons[new Date().getDay() - 1]?.thirdLesson"
          >
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.thirdLesson?.name
            }}</text>
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.thirdLesson?.position
            }}</text>
            <text class="ellipsis-text">第三节</text>
            <text class="ellipsis-text">等国风</text>
          </view>
          <view
            class="today-lessons-item"
            v-if="lessons[new Date().getDay() - 1]?.fourthLesson"
          >
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.fourthLesson?.name
            }}</text>
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.fourthLesson?.position
            }}</text>
            <text class="ellipsis-text">第四节</text>
            <text class="ellipsis-text">等国风</text>
          </view>
          <view
            class="today-lessons-item"
            v-if="lessons[new Date().getDay() - 1]?.fifthLesson"
          >
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.fifthLesson?.name
            }}</text>
            <text class="ellipsis-text">{{
              lessons[new Date().getDay() - 1]?.fifthLesson?.position
            }}</text>
            <text class="ellipsis-text">第五节</text>
            <text class="ellipsis-text">等国风</text>
          </view>
        </view>
      </view>
      <view class="card-wrap dormitory-wrap">
        <text class="card-title my-room" @click="handleClickRoom">
          我的房间
        </text>
        <view class="dormitory-info-item">
          <text>房间号: </text>
          <text>{{ userStore.dormNumber }}</text>
        </view>
        <view class="dormitory-info-item">
          <text>所在区域: </text>
          <text>{{ userStore.dormLocation }}</text>
        </view>
        <view class="dormitory-info-item">
          <text>电费余额: </text>
          <text>￥{{ userStore.EleChargeNumber }}</text>
          <text class="recharge-text" @click="handleClickRechargeEle">
            充值
          </text>
        </view>
      </view>
      <view class="card-wrap campus-cards-wrap">
        <text class="card-title">校园卡</text>
        <view class="campus-card-item">
          <text>余额: </text>
          <text>￥{{ userStore.cardChargeNumber }}</text>
          <text class="recharge-text" @click="handleClickRechargeCard">
            充值
          </text>
        </view>
      </view>
      <view class="button-wrap">
        <ManageButton
          name="离校"
          backgroundColor="#d05bed"
          icon="arrow-right"
          @click="handleClickApproval"
        />
      </view>
    </view>
  </view>

  <u-tabbar
    :value="tabsStore.currentTab || 0"
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
import { useTabsStore, useUserStore } from '@/store'
import { getStudentTabs, getToken, weekDays } from '@/utils'

const tabsStore = useTabsStore()
const userStore = useUserStore()

const lessons = ref<AllLessons>([])

watch(lessons, () =>
  lessons.value.sort(
    (a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day)
  )
)

onLoad(async () => {
  tabsStore.setTabsList(getStudentTabs())
  tabsStore.setCurrentTab(0)
  await handleFetchLessons()
  await handleFetchChargeInfo()
})

onShow(async () => {
  tabsStore.setTabsList(getStudentTabs())
  tabsStore.setCurrentTab(0)
  await handleFetchChargeInfo()
})

const handleFetchChargeInfo = async () => {
  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/stu/${userStore.id}`,
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      userStore.setChargeInfo(res.data.data)
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const handleFetchLessons = async () => {
  await uni
    .request({
      url: 'http://106.52.223.188:8760/api/campus/lesson',
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      lessons.value = [...res.data.data]
      lessons.value.sort(
        (a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day)
      )
    })
}

const handleTabChanged = (index: number) => {
  tabsStore.setCurrentTab(index)
}

const handleClickInfoArrow = () => {
  tabsStore.setCurrentTab(2)
}

const handleClickBell = () => {
  uni.navigateTo({
    url: '/pages/student/subPages/Notification',
  })
}

const handleClickRechargeEle = () => {
  uni.navigateTo({
    url: `/pages/student/subPages/Charge?path=ele&id=${userStore.dormId}`,
  })
}
const handleClickRechargeCard = () => {
  uni.navigateTo({
    url: `/pages/student/subPages/Charge?path=card&id=${userStore.id}&userName=${userStore.name}`,
  })
}
const handleClickRoom = () => {
  uni.navigateTo({
    url: `/pages/manager/subPages/DormitoryInfo?id=${userStore.dormId}`,
  })
}

const handleClickApproval = () => {
  uni.navigateTo({
    url: `/pages/student/subPages/Approval?id=${userStore.id}`,
  })
}
</script>
<style lang="scss" scoped>
$extensionHeight: 15vh;
$cardInsidePaddingHor: 4vw;
$cardTextItemHeight: 4vh;

.home-wrap {
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

    .account-info-wrap {
      position: absolute;
      left: 0;
      bottom: calc($extensionHeight * -0.2);
      width: 100%;
      padding: 0 $cardPaddingHor;
      box-sizing: border-box;

      .account-info-content {
        height: calc($extensionHeight * 0.6);
        padding: 0 $cardInsidePaddingHor;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
        border-radius: $buttonRadius;
        border: 4rpx solid $borderOutlineColor;

        .account-info {
          width: 60vw;
          height: calc($extensionHeight * 0.6);
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          gap: 8vw;
          align-items: center;

          .account-avatar-wrap {
            width: calc($extensionHeight * 0.5);
            height: calc($extensionHeight * 0.5);

            .account-avatar {
              width: 100%;
              height: 100%;
              border-radius: $buttonRadius;
            }
          }

          .account-info-detail-wrap {
            height: 100%;
            line-height: calc($extensionHeight * 0.6 * 0.5);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            & > text:last-child {
              font-size: small;
            }
          }
        }
      }
    }
  }

  .home-content {
    margin-top: calc($extensionHeight + $pagePaddingTop);
    height: auto;
    padding: 0 $cardPaddingHor;

    .card-title {
      height: $cardTextItemHeight;
      line-height: $cardTextItemHeight;
    }

    .card-wrap {
      padding: 0 $cardInsidePaddingHor 2vh;
      border-radius: $buttonRadius;
      border: 4rpx solid $borderOutlineColor;
    }
    .recharge-text {
      font-size: small;
      margin-left: 2vw;
      color: #4687b9;
      border-bottom: 2rpx solid #4687b9;
    }

    .today-lessons-wrap {
      .today-lessons-content {
        margin-top: 2vh;
        .today-lessons-item {
          height: $cardTextItemHeight;
          line-height: $cardTextItemHeight;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 4rpx solid $borderOutlineColor;
          & > text {
            width: 20%;
            text-align: center;
          }
        }
      }
    }

    .dormitory-wrap {
      margin-top: 2vh;

      .my-room {
        color: #4687b9;
        border-bottom: 2rpx solid #4687b9;
      }

      .dormitory-info-item {
        height: calc($cardTextItemHeight * 0.8);
        line-height: calc($cardTextItemHeight * 0.8);
      }
    }

    .campus-cards-wrap {
      margin-top: 2vh;
      .campus-card-item {
        height: calc($cardTextItemHeight * 0.8);
        line-height: calc($cardTextItemHeight * 0.8);
      }
    }

    .button-wrap {
      margin-top: 2vh;
    }
  }
}
</style>
