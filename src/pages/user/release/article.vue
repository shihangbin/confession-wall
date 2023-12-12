<script lang="ts" setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'

  const userStore = useUserStore()
  const { personage }: any = storeToRefs(userStore)

  onLoad(async (params: any) => {
    await userStore.getAction(params.id)
  })

  const articleBtn = (id: string | number) => {
    uni.navigateTo({
      url: `/pages/index/article/article?id=${id}`,
    })
  }
</script>

<template>
  <div class="article">
    <u-cell-group>
      <template
        v-for="item in personage"
        :key="item.id">
        <u-cell
          :title="item.content"
          :isLink="true"
          @click="articleBtn(item.id)"
          arrow-direction="left">
        </u-cell>
      </template>
    </u-cell-group>
  </div>
</template>

<style lang="scss" scoped></style>
