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
              item.todayLessons.firstLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.todayLessons.firstLesson?.name || '' }}</text>
            <text> {{ item.todayLessons.firstLesson?.position || '' }}</text>
          </view>
          <view
            :class="`lesson-item-wrap ${
              item.todayLessons.secondLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.todayLessons.secondLesson?.name || '' }}</text>
            <text> {{ item.todayLessons.secondLesson?.position || '' }}</text>
          </view>
        </view>
        <view class="light-lesson-wrap">
          <view
            :class="`lesson-item-wrap ${
              item.todayLessons.thirdlyLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.todayLessons.thirdlyLesson?.name || '' }}</text>
            <text> {{ item.todayLessons.thirdlyLesson?.position || '' }}</text>
          </view>
          <view
            :class="`lesson-item-wrap ${
              item.todayLessons.fourthLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.todayLessons.fourthLesson?.name || '' }}</text>
            <text> {{ item.todayLessons.fourthLesson?.position || '' }}</text>
          </view>
        </view>
        <view class="night-lesson-wrap">
          <view
            :class="`lesson-item-wrap ${
              item.todayLessons.fifthLesson ? '' : 'no-'
            }has-lesson-item`"
          >
            <text>{{ item.todayLessons.fifthLesson?.name || '' }}</text>
            <text> {{ item.todayLessons.fifthLesson?.position || '' }}</text>
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

const tabsStore = useTabsStore()

const handleTabChanged = (index: number) => {
  console.log(index)
  tabsStore.setCurrentTab(index)
}

const lessons = [
  {
    day: '一',
    todayLessons: {
      fifthLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
  {
    day: '二',
    todayLessons: {
      firstLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
  {
    day: '三',
    todayLessons: {
      fifthLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
  {
    day: '四',
    todayLessons: {
      fourthLesson: {
        name: '就三件组成原理',
        position: '17409',
      },
      thirdlyLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
  {
    day: '五',
    todayLessons: {
      secondLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
  {
    day: '六',
    todayLessons: {
      secondLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
  {
    day: '日',
    todayLessons: {
      firstLesson: {
        name: '计算机忘了',
        position: '17409',
      },
      secondLesson: {
        name: '计算机忘了',
        position: '17409',
      },
    },
  },
]

console.log(lessons)
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
