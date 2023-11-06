<script lang="ts" setup>
  const publish = () => {
    uni.navigateTo({
      url: '/pages-publish/article/article',
    })
  }
</script>

<template>
  <div class="publish">
    <div class="announce">
      <u-icon
        @click="publish"
        name="edit-pen-fill"
        color="#fff">
      </u-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .publish {
    .announce {
      position: fixed;
      right: 43rpx;
      bottom: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
      box-sizing: border-box;
    }
  }
</style>
