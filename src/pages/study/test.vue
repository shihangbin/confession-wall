<template>
  <div class="waterfall-flow">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="waterfall-item"
      :style="itemStyle(index)">
      <img
        :src="item.imgSrc"
        alt="Item {{ index }}" />
    </div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const columnHeights = ref([0, 0, 0])
      const gutter = 10
      const items = ref([
        { imgSrc: 'https://placekitten.com/300/200?image=1' },
        { imgSrc: 'https://placekitten.com/300/200?image=2' },
        // 添加更多项...
      ])

      const itemStyle = (index) => {
        const column = index % 3 // 3列
        const left = column * (300 + gutter)
        const top = columnHeights.value[column]
        columnHeights.value[column] += 200 + gutter

        return {
          position: 'absolute',
          left: `${left}px`,
          top: `${top}px`,
        }
      }

      onMounted(() => {
        // 在组件挂载后进行一些操作
      })

      // 返回数据和方法，使它们在模板中可用
      return {
        items,
        itemStyle,
      }
    },
  }
</script>

<style scoped>
  .waterfall-flow {
    position: relative;
  }

  .waterfall-item {
    width: 300px;
    margin-bottom: 10px;
  }
</style>
