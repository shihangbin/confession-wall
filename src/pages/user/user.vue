<script setup lang="ts">
  import userInfo from './components/user-info.vue'
  import userAssist from './components/user-assist.vue'
  import userItem from './components/user-item.vue'
  import { showToastError } from '@/utils/handle.error'

  const articleBtn = () => {
    showToastError('none', '开发中...')
  }
  const likeBtn = () => {
    showToastError('none', '开发中...')
  }
</script>

<template>
  <div class="user">
    <user-info></user-info>
    <user-assist></user-assist>
    <user-item
      leftIcon="file-text"
      title="我的文章"
      @tap="articleBtn">
    </user-item>
    <user-item
      leftIcon="thumb-up"
      title="我的点赞"
      @tap="likeBtn">
    </user-item>
  </div>
</template>

<style scoped lang="scss">
  .user {
    background-color: $u-info-light;
    padding: 20rpx;
    box-sizing: border-box;
    width: 100%;
    min-height: calc(100vh - var(--window-top));
  }
</style>
