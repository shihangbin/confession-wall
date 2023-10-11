<script setup lang="ts">
 
</script>

<template>
  <div class="content-block">
   <div class="content-top">
    <div class="top-avatar">头像</div>
    <div class="top-center">
        <div class="top-name">昵称</div>
        <div class="top-city">位置</div>
    </div>
    <div class="top-btn">按钮</div>
   </div>
   <div class="content-center">
    <div class="center-text">内容</div>
    <div class="center-img">图片</div>
   </div>
   <div class="content-bottom">
    <div class="bottom-time">时间</div>
    <div class="bottom-like">喜欢</div>
   </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-block {
   background:pink;
   margin:20rpx;
   padding:10rpx;
   border-radius: 20rpx;
   overflow: hidden; 
   box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
   box-sizing: border-box;
   .content-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
    height:120rpx;
    background:#eee;
    .top-avatar {
     width:100rpx;
     height:100rpx;
     background:pink;
     border-radius:10rpx;
     border: 2rpx solid #000;
    }
    .top-center{
     display: flex;
     flex-direction: column;
     margin-left:20rpx;
     flex:1;
    }
   }
   .content-center{
    width:100%;
    height:200rpx;
    background:#ccc;
   }
   .content-bottom{
    display: flex;
    justify-content: space-between;
    width:100%;
    height:100rpx;
    background:#bbb;
   }
  }
</style>
