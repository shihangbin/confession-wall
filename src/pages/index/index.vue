<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useArticleStore } from '@/store/article'
  import { useUserStore } from '@/store/user'
  import searchTabs from './components/search-tabs.vue'
  import contentItem from './components/content-item.vue'
  import comPublish from '@/components/publish.vue'
  import { showToastError } from '@/utils/handle.error'
  import {
    onLoad,
    onPageScroll,
    onPullDownRefresh,
    onReachBottom,
    onShow,
  } from '@dcloudio/uni-app'

  const userStore = useUserStore()
  const articleStore = useArticleStore()
  const { articleList, commentNum, likeNum } = storeToRefs(articleStore)
  const { userInfo }: any = storeToRefs(userStore)

  const offset = ref(0)
  const scrollTop = ref(0)
  const groupBy = ref(0)
  const uniLoad = ref('more')

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
    articleList.value = []
    if (groupBy.value === 0) {
      await getArticle(0, 5, 1, 'DESC')
    } else if (groupBy.value === 1) {
      await getArticle(0, 5, 1, 'ASC')
    }
  }

  onLoad(async () => {
    await fetchData()
  })

  // onShow(async () => {
  //   await fetchData()
  // })

  const fetchData = async () => {
    await articleGroupBy()
    await comment_num()
    await like_num()
    await userStore.getUserAction()
  }

  const isLike = async () => {
    await like_num()
  }

  const comment_num = async () => {
    commentNum.value = []
    for (const item of articleList.value) {
      await articleStore.getCommentListAction(item.id)
    }
  }

  const like_num = async () => {
    likeNum.value = []
    for (const item of articleList.value) {
      await articleStore.getLikeListAction(item.id, userInfo.value.id)
    }
  }

  onReachBottom(async () => {
    uniLoad.value = 'loading'
    offset.value += 5
    await getMoreArticles()
  })

  onPullDownRefresh(async () => {
    offset.value = 0
    await fetchData()
    uni.stopPullDownRefresh()
  })

  const getMoreArticles = async () => {
    if (groupBy.value === 0) {
      await getArticle(offset.value, 5, 1, 'DESC')
      return
    } else if (groupBy.value === 1) {
      await getArticle(offset.value, 5, 1, 'ASC')
      return
    }

    setTimeout(() => {
      showToastError('none', '网络错误')
      uni.stopPullDownRefresh()
      return
    }, 10000)
  }

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

  const url = '/pages-publish/article/article'
</script>

<template>
  <div class="index">
    <search-tabs @tabs="articleASC"></search-tabs>
    <template
      v-for="(item, index) in articleList"
      :key="item.id">
      <content-item
        :itemArticle="item"
        :commentNum="commentNum[index]"
        :likeNum="likeNum[index]"
        @isLike="isLike">
      </content-item>
    </template>
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
  .index {
    min-height: calc(100vh - var(--window-top));
    background-color: $u-bg-color;
    padding-bottom: 200rpx;
    box-sizing: border-box;
  }
</style>
