<script setup lang="ts">

</script>

<template>
  <div class="user-assist">
     <div class="user-left">左边</div>
     <div class="user-center">中间</div>
     <div class="user-right">右边</div>
  </div>
</template>

<style lang="scss" scoped>
  .user-assist {
   display:flex;
   justify-content: space-around;
   align-items: center;
   width: 100%;
   height: 160rpx;
   background:#fff;
   margin:20rpx 0;
   border-radius: 20rpx;
   box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
  }
</style>
