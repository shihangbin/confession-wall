<script lang="ts" setup>
  const lists = [
    {
      name: '最新',
    },
    {
      name: '热门',
    },
  ]
</script>

<template>
  <div class="search-tabs">
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="lists"
        lineWidth="40rpx"
        lineHeight="6rpx"
        lineColor="#7A57D1"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#333',
          transform: 'scale(1)',
        }">
      </u-tabs>
    </u-sticky>
    <div class="search">
      <u-search
        animation
        show-action
        clearabled
        searchIconSize="40rpx"
        actionText="搜索"
        height="60rpx">
      </u-search>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $uni-bg-color;
    padding: 0 20rpx;
    margin-bottom: 10rpx;
    box-shadow: 0rpx 0rpx 18rpx 0rpx #c3c3e5;
    .search {
      width: 450rpx;
    }
  }
</style>
