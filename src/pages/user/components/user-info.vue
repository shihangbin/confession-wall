<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/store/user'
  import { onLoad, onPullDownRefresh, onShow } from '@dcloudio/uni-app'
  import { showToastError } from '@/utils/handle.error'

  const userStore = useUserStore()
  const { userInfo, isLogin, showLogin, helloLogin }: any =
    storeToRefs(userStore)

  const getUserInfo = async () => {
    return await userStore.getUserAction()
  }

  onLoad(async () => {
    await getUserInfo()
  })

  onPullDownRefresh(async () => {
    const result = await getUserInfo()

    if (Object.keys(result).length > 0) {
      uni.stopPullDownRefresh()
      return
    }
    setTimeout(function () {
      showToastError('none', '网络错误')
      uni.stopPullDownRefresh()
      return
    }, 10000)
  })
  const goUser = () => {
    if (isLogin.value) {
      uni.navigateTo({
        url: '/pages/user/user/user',
      })
    } else if (isLogin.value) {
      login()
    }
  }

  const login = () => {
    uni.navigateTo({
      url: '/pages-login/login/login',
    })
  }
</script>

<template>
  <div class="user-info">
    <div class="avatar">
      <up-avatar
        :src="userInfo?.avatar_path"
        size="150"
        shape="square">
      </up-avatar>
    </div>
    <div class="message">
      <div class="name">
        <template v-if="isLogin">
          <span>Hi,{{ userInfo?.nickname }}</span>
        </template>
        <template v-else>
          <span>请先登录</span>
        </template>
      </div>
      <div class="hello">
        <template v-if="isLogin">
          <span>{{ helloLogin }}</span>
        </template>
        <template v-else>
          <span>请先登录</span>
        </template>
      </div>
    </div>
    <div class="login">
      <template v-if="isLogin">
        <span @click="goUser">
          {{ showLogin }}
        </span>
      </template>
      <template v-else>
        <span @click="login">点击登录</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-info {
    // width: 100%;
    height: 220rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    // box-shadow: 0px 0px 10px 1px rgba(142, 151, 242, 0.33);
    box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
    .avatar {
      width: 150rpx;
      height: 150rpx;
      background-color: $u-info-light;
      border-radius: 10rpx;
      border: 2rpx solid #000;
      overflow: hidden;
      box-sizing: border-box;
    }
    .message {
      flex: 1;
      margin: 0 40rpx;
      .name {
        font-size: 35rpx;
        font-weight: 700;
        margin-bottom: 20rpx;
        color: #7a57d1;
      }
      .hello {
        font-size: 23rpx;
      }
    }
  }
</style>
