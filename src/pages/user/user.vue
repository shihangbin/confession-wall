<script setup lang="ts">
  import comUserInfo from './components/user-info.vue'
  import userAssist from './components/user-assist.vue'
  import userItem from './components/user-item.vue'
  import { showToastError } from '@/utils/handle.error'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'

  const userStore = useUserStore()
  const { userInfo }: any = storeToRefs(userStore)

  const articleBtn = () => {
    // showToastError('none', '开发中...')
    uni.navigateTo({
      url: `/pages/user/release/article?id=${userInfo.value.id}`,
    })
  }
  const likeBtn = () => {
    // showToastError('none', '开发中...')
    uni.navigateTo({
      url: `/pages/user/release/like?id=${userInfo.value.id}`,
    })
  }
</script>

<template>
  <div class="user">
    <com-user-info></com-user-info>
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
