<template>
  <view
    class="manager-button"
    :style="{ backgroundColor: props.backgroundColor }"
  >
    <text>{{ props.name }}</text>
    <u-icon v-if="props.icon" :name="props.icon" size="40"></u-icon>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string
  icon?: string
  backgroundColor?: string
}>()
</script>

<style lang="scss" scoped>
$buttonHeight: 140rpx;
$buttonPaddingHor: 3vh;

.manager-button {
  padding: 0 $buttonPaddingHor;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: $buttonHeight;
  border-radius: $ButtonRadius;
  background-color: #2b8dd8;
  font-size: larger;
  color: #ffffff;
}
</style>
