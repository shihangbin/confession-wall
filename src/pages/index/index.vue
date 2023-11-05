<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import searchTabs from './components/search-tabs.vue'
  import contentBlock from './components/content-item.vue'
  import { useArticleStore } from '@/store/article'
  import { storeToRefs } from 'pinia'

  const articleStore = useArticleStore()
  const { articleList } = storeToRefs(articleStore)

  onMounted(async () => {
    await articleStore.getArticleListAction()
  })
</script>
<template>
  <div class="index">
    <search-tabs></search-tabs>

    <template
      v-for="(item, index) in articleList"
      :key="item.id">
      <content-block :itemArticle="item"></content-block>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    min-height: calc(100vh - var(--window-top));
    background-color: $u-bg-color;
    // margin-bottom: 50rpx;
    padding-bottom: 100rpx;
  }
</style>
