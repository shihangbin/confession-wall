<script setup lang="ts">
  const props = defineProps({
    itemArticle: {
      type: Array,
      default: () => [],
    },
  })
  console.log(props.itemArticle)
</script>
<template>
  <div class="article"></div>
</template>

<style lang="scss" scoped></style>
