<script setup lang="ts">
  import { ref } from 'vue'
  import { showToastError } from '@/utils/handle.error'

  const toAbout = () => {
    // uni.navigateTo({
    //   url: '/pages-login/sign-up/sign-up',
    // })
    showToastError('none', '开发中...')
  }
  const toLogin = () => {
    uni.navigateTo({
      url: '/pages-login/login/login',
    })
  }

  const show = ref(false)
  const open = () => {
    show.value = !show.value
  }
  const close = () => {
    show.value = false
  }
</script>

<template>
  <div class="user-assist">
    <div
      class="user-left"
      @click="open">
      <u-icon
        name="chat"
        size="45">
      </u-icon>
      <span class="text">交流/反馈</span>
    </div>
    <div
      class="user-center"
      @click="toAbout">
      <u-icon
        name="coupon"
        size="45">
      </u-icon>
      <span class="text">作者/关于</span>
    </div>
    <div
      class="user-right"
      @click="toLogin">
      <u-icon
        name="lock"
        size="45">
      </u-icon>
      <span class="text">登录/注册</span>
    </div>
  </div>
  <u-popup
    :show="show"
    mode="center"
    @close="close">
    <image
      style="width: 600rpx; height: 800rpx"
      mode="aspectFill"
      src="https://img.xbin.cn/images/2023/12/12-16-42-3eeebd.jpg">
    </image>
  </u-popup>
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
    box-sizing: border-box;
    .user-left,
    .user-center,
    .user-right {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .text {
      color: $u-info-dark;
      font-size: 26rpx;
      margin-top: 10rpx;
    }
  }
  .wx {
    width: 500rpx;
    height: 700rpx;
    .wx-img {
      width: 100%;
      height: 100%;
    }
  }
</style>
