<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import searchTabs from './components/search-tabs.vue'
  import contentBlock from './components/content-item.vue'
  import { getArticles } from '@/service/modules/home'

  const articleData: any = ref(null)

  onMounted(async () => {
    // 在组件挂载后进行异步操作，例如数据加载
    articleData.value = await getArticles().then((res: any) => {
      return res.data
    })
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
