<script lang="ts" setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  import { showToastError } from '@/utils/handle.error'

  const userStore = useUserStore()
  const { personage }: any = storeToRefs(userStore)

  onLoad(async (params: any) => {
    await userStore.getLikeAction(params.id)
  })

  const likeBtn = (id: string | number) => {
    showToastError('none', '有点问题暂时不用')
    return
    uni.navigateTo({
      url: `/pages/index/article/article?id=${id}`,
    })
  }
</script>

<template>
  <div class="like">
    <u-cell-group>
      <template
        v-for="item in personage"
        :key="item.id">
        <u-cell
          :title="item.content"
          :isLink="true"
          @click="likeBtn(item.article_id)"
          arrow-direction="left">
        </u-cell>
      </template>
    </u-cell-group>
  </div>
</template>

<style lang="scss" scoped></style>
