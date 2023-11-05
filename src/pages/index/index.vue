<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { onPageScroll } from '@dcloudio/uni-app'
  import searchTabs from './components/search-tabs.vue'
  import contentBlock from './components/content-item.vue'
  import { useArticleStore } from '@/store/article'

  const articleStore = useArticleStore()
  const { articleList } = storeToRefs(articleStore)
  const scrollTop = ref(0)

  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
  })

  onMounted(async () => {
    await articleStore.getArticleListAction()
  })

  // const loading = ref(false)
  const loading = ref(true)
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
      mode="square"
      bottom="300"
      right="66"
      top="600">
    </up-back-top>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    min-height: calc(100vh - var(--window-top));
    background-color: $u-bg-color;
    // margin-bottom: 50rpx;
    padding-bottom: 500rpx;
  }
</style>
