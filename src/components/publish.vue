<script lang="ts" setup>
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  import { showToastError } from '@/utils/handle.error'

  const userStore = useUserStore()
  const { userInfo }: any = storeToRefs(userStore)

  const props = defineProps({
    toUrl: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'trash',
    },
  })

  const publish = async () => {
    await userStore.getUserAction()
    if (userInfo.value.is_muted !== 0) {
      showToastError('none', '你被禁言了')
      return
    }
    if (props.toUrl == '') {
      return
    }
    uni.navigateTo({
      url: props.toUrl,
    })
  }
</script>

<template>
  <div class="publish">
    <div class="announce">
      <u-icon
        @click="publish"
        :name="props.icon"
        color="#fff"
        size="40">
      </u-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .publish {
    .announce {
      position: fixed;
      right: 43rpx;
      bottom: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
      box-sizing: border-box;
    }
  }
</style>
