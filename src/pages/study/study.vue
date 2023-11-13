<script lang="ts" setup>
  import { ref } from 'vue'
  import { useArticleStore } from '@/store/article'
  import { onLoad, onReachBottom } from '@dcloudio/uni-app'
  import { storeToRefs } from 'pinia'

  const articleStore = useArticleStore()
  const { studyList } = storeToRefs(articleStore)
  const offset = ref(0)
  const groupBy = ref(0)

  const getStudy = async (
    offset: number,
    size: number,
    assort: number,
    sort: string
  ) => {
    return await articleStore.getStudyListAction(offset, size, assort, sort)
  }

  onLoad(async () => {
    studyList.value = []
    await articleStore.getStudyListAction(0, 5, 1, 'DESC')
  })

  onReachBottom(async () => {
    // 当页面滚动到底部时触发
    offset.value += 5
    if (groupBy.value == 0) {
      return await getStudy(offset.value, 5, 1, 'DESC')
    } else if (groupBy.value == 1) {
      return await getStudy(offset.value, 5, 1, 'ASC')
    }
  })
</script>

<template>
  <div class="study">
    <template
      v-for="item in studyList"
      :key="item.id">
      <div class="item">
        <image
          style="width: 100%"
          :src="item.image_urls[0]"
          mode="widthFix">
        </image>
        <div class="content">
          <up-text
            size="26"
            :lines="2"
            :text="item.content">
          </up-text>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .study {
    width: 750rpx;
    min-height: 100vh;
    padding: 10rpx;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: $u-info-light;
    columns: 2;
    column-gap: 10rpx;
    .item {
      margin-bottom: 10rpx;
      border-radius: 8rpx;
      overflow: hidden;
      background-color: #fff;
      .content {
        text-align: justify;
        letter-spacing: 5rpx;
        padding: 10rpx;
      }
    }
  }
</style>
