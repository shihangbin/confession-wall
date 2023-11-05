<script setup lang="ts">
  const toSignUP = () => {
    uni.navigateTo({
      url: '/pages-login/sign-up/sign-up',
    })
  }
  const toLogin = () => {
    uni.navigateTo({
      url: '/pages-login/login/login',
    })
  }
</script>

<template>
  <div class="user-assist">
    <div class="user-left">左边</div>
    <div
      class="user-center"
      @click="toLogin">
      中间
    </div>
    <div
      class="user-right"
      @click="toSignUP">
      右边
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-assist {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // width: 100vh;
    height: 160rpx;
    background: #fff;
    margin: 20rpx 0;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
  }
</style>
