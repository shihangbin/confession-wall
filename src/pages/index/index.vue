<script setup lang="ts">
  import searchTabs from '@/components/search-tabs.vue'
  import contentBlock from '@/components/content-block.vue'
  import '@/service/modules/home.ts'
 
</script>

<template>
  <div class="index">
    <search-tabs></search-tabs>
    <content-block></content-block>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    min-height: calc(100vh - var(--window-top));
    background-color: $u-bg-color;
  }
</style>
@/service/api/axios.js
