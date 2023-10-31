<script setup lang="ts">
  const props = defineProps({
    itemArticle: {
      type: Object,
      default: () => {},
    },
  })
  // console.log(props.itemArticle)

  const previewImage = (index: number, itemArr: any) => {
    console.log(index, itemArr)
    uni.previewImage({
      urls: itemArr,
      current: index,
    })
  }
</script>

<template>
  <div class="content-block">
    <div class="content-top">
      <div class="top-avatar">
        <image
          class="image"
          :src="props.itemArticle.user.avatarURL">
        </image>
      </div>
      <div class="top-center">
        <div class="top-name">{{ props.itemArticle.user.username }}</div>
        <div class="top-city">位置</div>
      </div>
      <div class="top-btn">按钮</div>
    </div>
    <div class="content-center">
      <div class="center-text">{{ props.itemArticle.content }}</div>
      <scroll-view
        class="scroll-view"
        scroll-x="true">
        <template
          v-for="(item, index) in props.itemArticle.image_urls"
          :key="index">
          <image
            v-if="item"
            class="scroll-view-item"
            :src="item"
            @click="previewImage(index, props.itemArticle.image_urls)">
          </image>
        </template>
      </scroll-view>
    </div>
    <div class="content-bottom">
      <div class="bottom-time">{{ props.itemArticle.publication_date }}</div>
      <div class="bottom-like">喜欢</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-block {
    background: #fff;
    margin: 20rpx;
    padding: 10rpx;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
    box-sizing: border-box;
    .content-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 120rpx;
      // background: #eee;
      .top-avatar {
        width: 100rpx;
        height: 100rpx;
        // background: pink;
        border-radius: 10rpx;
        border: 2rpx solid #000;
        overflow: hidden;
        .image {
          width: 100%;
          height: 100%;
        }
      }
      .top-center {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;
        flex: 1;
      }
    }
    .content-center {
      width: 100%;
      margin: 15rpx 0;
      // background-color: pink;
      .scroll-view {
        white-space: nowrap;
        width: 100%;
        // height: 300rpx;
        .scroll-view-item {
          display: inline-block;
          width: 33%;
          height: 200rpx;
          margin: 20rpx 5rpx;
          border-radius: 10rpx;
          overflow: hidden;
        }
      }
    }
    .content-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 66rpx;
      // background: #bbb;
    }
  }
</style>
