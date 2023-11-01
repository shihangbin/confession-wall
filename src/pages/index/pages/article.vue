<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { getArticleItem } from '@/service/modules/home'

  const articleData: any = ref(null)

  onLoad(async (option: any) => {
    const res = await getArticleItem(option.id)
    articleData.value = res.data
  })

  const previewImage = (index: number, itemArr: any) => {
    uni.previewImage({
      urls: itemArr,
      current: index,
    })
  }
</script>

<template>
  <div class="article">
    <div class="user">
      <image
        class="avatar"
        :src="articleData?.user?.avatarURL">
      </image>
      <div class="info">
        <div>{{ articleData?.user?.username }}</div>
        <div>{{ articleData?.publication_date }}</div>
      </div>
    </div>
    <div class="content">{{ articleData?.content }}</div>
    <!-- <u-album
      v-if="articleData?.image_urls.length == 1"
      :urls="articleData?.image_urls"
      singleSize="710"
      singleMode="aspectFit">
    </u-album> -->
    <up-image
      v-if="articleData?.image_urls.length == 1"
      :show-loading="true"
      :src="articleData?.image_urls"
      width="710"
      height="500"
      mode="aspectFill"
      @click="previewImage(1, articleData?.image_urls)">
    </up-image>
    <u-album
      v-else-if="articleData?.image_urls.length > 1"
      :urls="articleData?.image_urls"
      rowCount="3"
      maxCount="9"
      multipleSize="230">
    </u-album>
  </div>
</template>

<style lang="scss" scoped>
  .article {
    width: 100vh;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: pink;
    .user {
      display: flex;
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 8rpx;
        border: 5rpx solid #000;
      }
    }
  }
</style>
