<script setup lang="ts">
  const props = defineProps({
    leftIcon: {
      type: String,
      default: 'file-text',
    },
    title: {
      type: String,
      default: '标题',
    },
  })
</script>

<template>
  <div class="user-item">
    <div class="left">
      <u-icon
        :name="props.leftIcon"
        size="40">
      </u-icon>
    </div>
    <div class="title">{{ props.title }}</div>
    <div class="right">
      <u-icon
        name="arrow-right"
        size="36">
      </u-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
    background: #fff;
    margin: 20rpx 0;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    .title {
      margin: 0 30rpx;
      flex: 1;
      color: $u-info-dark;
    }
  }
</style>
