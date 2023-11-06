<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useArticleStore } from '@/store/article'
  import searchTabs from './components/search-tabs.vue'
  import contentBlock from './components/content-item.vue'
  import comPublish from '@/components/publish.vue'
  import { onPageScroll } from '@dcloudio/uni-app'

  const articleStore = useArticleStore()
  const { articleList } = storeToRefs(articleStore)

  onMounted(async () => {
    await articleStore.getArticleListAction()
  })

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
</script>
<template>
  <div class="index">
    <search-tabs></search-tabs>
    <template
      v-for="(item, index) in articleList"
      :key="item.id">
      <content-block :itemArticle="item"></content-block>
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
