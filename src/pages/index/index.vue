<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useArticleStore } from '@/store/article'
  import searchTabs from './components/search-tabs.vue'
  import contentItem from './components/content-item.vue'
  import comPublish from '@/components/publish.vue'
  import { showToastError } from '@/utils/handle.error'
  import {
    onLoad,
    onPageScroll,
    onPullDownRefresh,
    onReachBottom,
  } from '@dcloudio/uni-app'

  const articleStore = useArticleStore()
  const { articleList } = storeToRefs(articleStore)
  const offset = ref(0)
  const scrollTop = ref(0)
  const groupBy = ref(0)

  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
  })

  const getArticle = async (
    offset: number,
    size: number,
    assort: number,
    sort: string
  ) => {
    return await articleStore.getArticleListAction(offset, size, assort, sort)
  }

  const articleASC = async (e: any) => {
    groupBy.value = e.index
    await articleGroupBy()
  }

  const articleGroupBy = async () => {
    if (groupBy.value == 0) {
      articleList.value = []
      return await getArticle(0, 5, 1, 'DESC')
    } else if (groupBy.value == 1) {
      articleList.value = []
      return await getArticle(0, 5, 1, 'ASC')
    }
  }

  onLoad(async () => {
    await articleGroupBy()
  })

  onReachBottom(async () => {
    // 当页面滚动到底部时触发
    offset.value += 5
    if (groupBy.value == 0) {
      return await getArticle(offset.value, 5, 1, 'DESC')
    } else if (groupBy.value == 1) {
      return await getArticle(offset.value, 5, 1, 'ASC')
    }
  })

  onPullDownRefresh(async () => {
    offset.value = 0
    const result = await articleGroupBy()
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
</script>
<template>
  <div class="index">
    <search-tabs @tabs="articleASC"></search-tabs>
    <template
      v-for="item in articleList"
      :key="item.id">
      <content-item :itemArticle="item"></content-item>
    </template>
    <up-back-top
      :scroll-top="scrollTop"
      bottom="250rpx"
      right="66rpx"
      icon="arrow-up"
      :iconStyle="iconStyle"
      :customStyle="customStyle"
      top="600">
    </up-back-top>
    <com-publish></com-publish>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    min-height: calc(100vh - var(--window-top));
    background-color: $u-bg-color;
    // margin-bottom: 50rpx;
    padding-bottom: 500rpx;
    box-sizing: border-box;
  }
</style>
