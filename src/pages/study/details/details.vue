<script lang="ts" setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { useArticleStore } from '@/store/article'
  import { storeToRefs } from 'pinia'

  const articleStore = useArticleStore()
  const { studyItem } = storeToRefs(articleStore)

  onLoad(async (option: any) => {
    await articleStore.getStudyItemAction(option.id)
  })
  const detailsImg = (index: number) => {
    uni.previewImage({
      urls: studyItem.value.image_urls,
      current: index,
      loop: true,
    })
  }
</script>

<template>
  <div class="details">
    <u-swiper
      :list="studyItem?.image_urls"
      height="800"
      imgMode="aspectFit"
      @click="detailsImg"
      indicator
      indicatorMode="line"
      circular>
    </u-swiper>
    <div class="content">
      <div class="text">{{ studyItem?.content }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .details {
    .content {
      margin: 30rpx 20rpx;
      border-radius: 30rpx;
      padding: 10rpx 20rpx;
      border: 1rpx solid #000;
      .text {
        text-align: justify;
      }
    }
  }
</style>
