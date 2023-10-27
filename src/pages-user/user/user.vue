<script lang="ts" setup>
  import userNav from './components/user-nav.vue'
  import userTabs from './components/user-tabs.vue'
</script>

<template>
  <div class="user">
    <user-nav></user-nav>

    <user-tabs></user-tabs>
  </div>
</template>

<style lang="scss" scoped>
  .user {
    width: 100%;
  }
</style>
