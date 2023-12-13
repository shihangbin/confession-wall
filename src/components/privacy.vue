<script lang="ts" setup>
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'

  const userStore = useUserStore()
  const { isPrivacy } = storeToRefs(userStore)

  const toPrivacy = () => {
    uni.navigateTo({
      url: '/pages-login/privacy/web-view',
    })
  }

  const btnPrivacy = (e: any) => {
    if (e.detail.value[0] == undefined) {
      isPrivacy.value = true
    } else {
      isPrivacy.value = e.detail.value[0]
    }
    // if(!isPrivacy.value){

    // }
  }
</script>

<template>
  <div class="privacy">
    <checkbox-group
      class="label"
      @change="btnPrivacy">
      <label>
        <checkbox
          value="false"
          style="transform: scale(0.7)" />
        同意
      </label>
      <span
        class="text"
        @click="toPrivacy"
        >隐私政策条款</span
      >
    </checkbox-group>
  </div>
</template>

<style lang="scss" scoped>
  .privacy {
    margin: 50rpx 0;
    .label {
      display: flex;
      .text {
        margin-left: 10rpx;
        color: #3c9cff;
        border-bottom: 1px solid #3c9cff;
      }
    }
  }
</style>
