<script lang="ts" setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { onLoad } from '@dcloudio/uni-app'
  import userNav from './components/user-nav.vue'

  const userStore = useUserStore()
  const info = ref({})
  const isLoginUser = ref(false)

  onLoad(async (params: any) => {
    if (params.id === undefined) {
      info.value = await userStore.getUserAction()
      isLoginUser.value = true
    } else {
      info.value = await userStore.getUserInfoAction(params.id)
      isLoginUser.value = false
    }
  })
</script>

<template>
  <div class="user">
    <user-nav
      :info="info"
      :isLoginUser="isLoginUser">
    </user-nav>
  </div>
</template>

<style lang="scss" scoped>
  .user {
    width: 100%;
  }
</style>
