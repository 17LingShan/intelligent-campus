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
    <view class="account-nav-extension-view">
      <view class="logout-button" @click="handleClickLogout">
        <text>退出登录</text>
      </view>
    </view>
    <view class="account-content">
      <view class="search-button-wrap">
        <input v-model="searchStuNum" placeholder="请输入学号以查询" />
        <u-icon
          @click="handleClickSearch"
          name="search"
          size="36"
          :color="'#979797'"
        ></u-icon>
      </view>
      <view class="student-info-wrap">
        <view
          v-for="item in accountLists"
          :key="item.id"
          @click="handleClickInfoItem(item)"
          class="student-info-item"
        >
          <view class="item-text">
            <text>{{ item.name }}</text>
            <text>{{ item.stuNum }}</text>
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
import { clearToken, getToken } from '@/utils'

const tabsStore = useTabsStore()
const accountLists = ref<StuItem[]>([])
const searchStuNum = ref('')

onLoad(async () => {
  await handleFetchAllStu()
})

onShow(async () => {
  await handleFetchAllStu()
})

const handleTabChanged = (index: number) => {
  tabsStore.setCurrentTab(index)
}

const handleClickSearch = async () => {
  await handleFetchStuByStuNum()
}

watch(searchStuNum, async () => {
  if (searchStuNum.value === '') await handleFetchAllStu()
})

const handleFetchStuByStuNum = async () => {
  if (searchStuNum.value === '') {
    await handleFetchAllStu()
    return
  }

  await uni
    .request({
      url: `http://106.52.223.188:8760/api/campus/stu/stu-num?stuNum=${searchStuNum.value}`,
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      console.log(res.data)
      accountLists.value.splice(0, accountLists.value.length)
      accountLists.value.push({
        name: res.data.data.name,
        stuNum: res.data.data.number,
        id: res.data.data.id,
      })
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const handleFetchAllStu = async () => {
  await uni
    .request({
      url: 'http://106.52.223.188:8760/api/campus/stu',
      method: 'GET',
      header: { Authorization: getToken() },
    })
    .then((res: any) => {
      if (res.data.code === 0) {
        accountLists.value.splice(0, accountLists.value.length)
        res.data.data.forEach((item: any) => {
          if (item.name === '平台管理员' || !item.number) return
          accountLists.value.push({
            id: item.id,
            name: item.name,
            stuNum: item.number,
          })
        })
      }
    })
}

const handleClickInfoItem = (item: StuItem) => {
  uni.navigateTo({
    url: `/pages/manager/subPages/AccountInfo?name=${item.name}&id=${item.id}&stuNum=${item.stuNum}`,
  })
}

const handleClickLogout = () => {
  clearToken()
  uni.navigateTo({
    url: '/pages/common/login/index',
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
    height: 10vh;
    width: 100%;
    border-radius: 0 0 $buttonRadius $buttonRadius;
    background-color: $startBackgroundColor;
    z-index: 2;

    .logout-button {
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

  .account-content {
    height: auto;
    margin-top: calc($pagePaddingTop + 4vh);
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
