<script setup lang="ts">
  import { ref } from 'vue'
  import searchTabs from './components/search-tabs.vue'
  import contentBlock from './components/content-item.vue'
  import { getArticles } from '@/api/home'
  import { onShow } from '@dcloudio/uni-app'

  const articleData: any = ref(null)
  onShow(async () => {
    // 在组件挂载后进行异步操作，例如数据加载
    const res: any = await getArticles()
    articleData.value = res.data
  })
</script>
<template>
  <div class="index">
    <search-tabs></search-tabs>

    <template
      v-for="(item, index) in articleData"
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
