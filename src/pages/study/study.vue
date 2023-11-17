<script lang="ts" setup>
  import { ref } from 'vue'
  import { useArticleStore } from '@/store/article'
  import {
    onLoad,
    onPageScroll,
    onPullDownRefresh,
    onReachBottom,
  } from '@dcloudio/uni-app'
  import { storeToRefs } from 'pinia'
  import { showToastError } from '@/utils/handle.error'
  import comPublish from '@/components/publish.vue'

  const articleStore = useArticleStore()
  const { studyList } = storeToRefs(articleStore)
  const offset = ref(0)
  const groupBy = ref(0)
  const uniLoad = ref('more')

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
    await articleStore.getStudyListAction(0, 5, 2, 'DESC')
  })

  onReachBottom(async () => {
    // 当页面滚动到底部时触发
    uniLoad.value = 'loading'
    offset.value += 5
    if (groupBy.value == 0) {
      await getStudy(offset.value, 5, 2, 'DESC')
    } else if (groupBy.value == 1) {
      await getStudy(offset.value, 5, 2, 'ASC')
    }
    if (studyList.value.length == studyList.value.length) {
      setTimeout(() => {
        uniLoad.value = 'noMore'
        uni.stopPullDownRefresh()
      }, 2000)
      return
    }
  })

  onPullDownRefresh(async () => {
    offset.value = 0
    studyList.value = []

    const result = await articleStore.getStudyListAction(0, 5, 2, 'DESC')

    if (result.length > 0) {
      uni.stopPullDownRefresh()
      return
    }
    setTimeout(function () {
      showToastError('none', '网络错误')
      uni.stopPullDownRefresh()
      return
    }, 10000)
  })

  const toDetails = (id: string | number) => {
    //在起始页面跳转到test.vue页面并传递参数
    uni.navigateTo({
      url: `/pages/study/details/details?id=${id}`,
    })
  }

  const scrollTop = ref(0)

  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
  })

  const customStyle = {
    width: '100rpx',
    height: '100rpx',
  }
  const iconStyle = {
    width: '100rpx',
    height: '100rpx',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
    borderRadius: '50%',
    color: '#fff',
  }
  const url = '/pages-publish/study/study'
</script>

<template>
  <div class="study">
    <div class="study-content">
      <template
        v-for="(item, index) in studyList"
        :key="item.id">
        <div
          class="item"
          @click="toDetails(item.id)">
          <template v-if="item.image_urls[0] !== null">
            <image
              style="width: 100%"
              :src="item.image_urls[0]"
              mode="widthFix">
            </image>
          </template>
          <div class="content">
            <up-text
              size="26"
              :lines="5"
              :text="item.content">
            </up-text>
          </div>
        </div>
      </template>
    </div>
    <div>
      <uni-load-more :status="uniLoad"></uni-load-more>
    </div>
    <up-back-top
      :scroll-top="scrollTop"
      bottom="250rpx"
      right="66rpx"
      icon="arrow-up"
      :iconStyle="iconStyle"
      :customStyle="customStyle"
      top="600">
    </up-back-top>
    <com-publish
      :toUrl="url"
      icon="edit-pen">
    </com-publish>
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
    padding-bottom: 200rpx;
    .study-content {
      -moz-column-count: 2;
      -webkit-column-count: 2;
      column-count: 2;
      column-gap: 10rpx;
      -moz-column-gap: 10rpx;
      -webkit-column-gap: 10rpx;
      .item {
        -moz-page-break-inside: avoid;
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid;
        margin-bottom: 10rpx;
        border-radius: 8rpx;
        overflow: hidden;
        background-color: #fff;
        // box-shadow: 0rpx 0rpx 18rpx 0rpx #c3c3e5;
        // border: 1rpx solid #c7c1ed;
        border: 1rpx solid $u-info;
        box-sizing: border-box;
        .content {
          text-align: justify;
          letter-spacing: 5rpx;
          padding: 10rpx;
        }
      }
    }
  }
</style>
