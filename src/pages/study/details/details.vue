<script lang="ts" setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { onLoad } from '@dcloudio/uni-app'
  import { useArticleStore } from '@/store/article'
  import { useUserStore } from '@/store/user'
  import { showToastError } from '@/utils/handle.error'
  import comPublish from '@/components/publish.vue'

  const articleStore = useArticleStore()
  const userStore = useUserStore()
  const { studyItem, studyList } = storeToRefs(articleStore)
  const { userInfo } = storeToRefs(userStore)

  const isPublish = ref(false)

  onLoad(async (option: any) => {
    await userStore.getUserAction()
    await articleStore.getStudyItemAction(option.id)
    if (studyItem?.value?.user.id === userInfo?.value.id) {
      isPublish.value = !isPublish.value
    }
  })
  const detailsImg = (index: number) => {
    uni.previewImage({
      urls: studyItem.value.image_urls,
      current: index,
      loop: true,
    })
  }

  const deleteBtn = async (id: string | number) => {
    const res = await articleStore.delArticleAction(id)
    if (res.code === 0) {
      showToastError('none', res.message)
      studyList.value = []
      await articleStore.getStudyListAction(0, 5, 2, 'DESC')
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/study/study',
        })
      }, 1000)
    }
  }
</script>

<template>
  <div class="details">
    <template v-if="studyItem?.image_urls[0] !== null">
      <u-swiper
        :list="studyItem?.image_urls"
        height="800"
        imgMode="aspectFit"
        @click="detailsImg"
        indicator
        indicatorMode="line"
        circular>
      </u-swiper>
    </template>
    <div class="content">
      <div class="text">{{ studyItem?.content }}</div>
    </div>
    <template v-if="isPublish">
      <com-publish
        icon="trash"
        @tap="deleteBtn(studyItem?.id)">
      </com-publish>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .details {
    min-height: 100vh;
    padding-bottom: 200rpx;
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
