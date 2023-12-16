<template>
  <u-navbar
    :title="tabsStore.tabsList[tabsStore.currentTab].text"
    bgColor="transparent"
    height="88rpx"
    leftIcon=""
    :autoBack="true"
  >
  </u-navbar>

  <view class="calendar-wrap">
    <view class="calendar-content">
      <view v-for="item in lessons" :key="item.day" class="calendar-day-wrap">
        <view class="day-number">
          <text>{{ item.day }}</text>
        </view>
        <view class="light-lesson-wrap">
          <view
            :class="`lesson-item-wrap ${
              item.firstLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.firstLesson?.name || '' }}</text>
            <text> {{ item.firstLesson?.position || '' }}</text>
          </view>
          <view
            :class="`lesson-item-wrap ${
              item.secondLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.secondLesson?.name || '' }}</text>
            <text> {{ item.secondLesson?.position || '' }}</text>
          </view>
        </view>
        <view class="light-lesson-wrap">
          <view
            :class="`lesson-item-wrap ${
              item.thirdLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.thirdLesson?.name || '' }}</text>
            <text> {{ item.thirdLesson?.position || '' }}</text>
          </view>
          <view
            :class="`lesson-item-wrap ${
              item.fourthLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.fourthLesson?.name || '' }}</text>
            <text> {{ item.fourthLesson?.position || '' }}</text>
          </view>
        </view>
        <view class="night-lesson-wrap">
          <view
            :class="`lesson-item-wrap ${
              item.fifthLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.fifthLesson?.name || '' }}</text>
            <text> {{ item.fifthLesson?.position || '' }}</text>
          </view>
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
import { getToken, weekDays } from '@/utils'

const tabsStore = useTabsStore()

const handleTabChanged = (index: number) => {
  tabsStore.setCurrentTab(index)
}

onLoad(async () => {
  await handleFetchLessons()
})
const lessons = ref<AllLessons>([])

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
    .catch((err: any) => {
      console.log(err)
    })
}
</script>
<style lang="scss" scoped>
$dayButtonWidth: 12.6vw;
$dayNumberHeight: 3.2vh;

.calendar-wrap {
  padding-top: $pagePaddingTop;
  height: auto;

  .calendar-content {
    margin-top: 2vh;
    display: flex;
    flex-direction: row;
    padding: 0 2vw;
    justify-content: space-between;
    .calendar-day-wrap {
      width: $dayButtonWidth;

      .day-number {
        width: 100%;
        height: $dayNumberHeight;
        line-height: $dayNumberHeight;
        text-align: center;
        background-color: #d1d1d1;
        border-radius: $buttonRadius;
      }

      .light-lesson-wrap {
        margin-top: calc($dayNumberHeight);
        height: calc($dayNumberHeight * 8.4);
        display: flex;
        flex-direction: column;
        gap: calc($dayNumberHeight * 0.1);
      }

      .night-lesson-wrap {
        margin-top: calc($dayNumberHeight);
      }

      .lesson-item-wrap {
        height: calc($dayNumberHeight * 4);
        border-radius: $buttonRadius;
        border: 4rpx solid $borderOutlineColor;
        font-size: small;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .no-has-lesson-item {
        background-color: #fefefe;
      }

      .has-lesson-item {
        background-color: #bbe1fe;
      }
    }
  }
}
</style>
