<script setup lang="ts">
  const list = [
    {
      name: '表白区',
    },
    {
      name: '学习区',
    },
  ]
</script>
<template>
  <u-sticky bgColor="#fff">
    <u-tabs
      :list="list"
      lineWidth="40rpx"
      lineHeight="6rpx"
      lineColor="#7A57D1"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
      :inactiveStyle="{
        color: '#333',
        transform: 'scale(1)',
      }">
    </u-tabs>
  </u-sticky>
</template>
<style scoped lang="scss"></style>
