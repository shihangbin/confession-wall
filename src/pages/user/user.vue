<script setup lang="ts">
  import userInfo from './components/user-info.vue'
  import userAssist from './components/user-assist.vue'
  import userItem from './components/user-item.vue'
</script>

<template>
  <div class="user">
    <user-info></user-info>
    <user-assist></user-assist>
    <user-item></user-item>
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
