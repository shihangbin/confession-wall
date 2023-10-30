<script lang="ts" setup>
  // import { uni } from '@dcloudio/uni-h5'
  import { ref } from 'vue'
  import { login } from '@/service/modules/login'
  import { userLogin } from '@/store/login'
  import { storeToRefs } from 'pinia'

  const loginStore = userLogin()
  const { token }: any = storeToRefs(loginStore)
  console.log(token)

  const username = ref('')
  const password = ref('')

  const toSignUP = () => {
    uni.navigateTo({
      url: '/pages-user/sign-up/sign-up',
    })
  }

  const loginBtn = async () => {
    const res: any = await login(username.value, password.value)

    if (res.code === 0) {
      if (typeof sessionStorage !== 'undefined') {
        // 在浏览器环境中使用 sessionStorage
        sessionStorage.setItem('token', res.data.token)
        token.value = sessionStorage.getItem('token')
      } else {
        // 在小程序环境中使用小程序的本地存储方法
        uni.setStorageSync('token', res.data.token)
        token.value = uni.getStorageSync('token')
      }

      uni.showLoading({
        title: '加载中',
      })

      setTimeout(function () {
        uni.hideLoading()
        uni.switchTab({
          url: '/pages/index/index',
        })
      }, 1000)
    }
  }
</script>

<template>
  <div class="login">
    <div class="title">
      <up-image
        src="https://img.xbin.cn/images/2023/10/26-16-00-f30348.png"
        width="200px"
        height="100px"
        mode="widthFix">
      </up-image>
    </div>
    <div class="user-info">
      <div class="username">
        <up-input
          type="text"
          shape="circle"
          placeholder="请输入账号"
          v-model="username"
          border="surround"
          prefixIcon="account"
          prefixIconStyle="font-size: 22px;color: #909399"
          clearable>
        </up-input>
      </div>
      <div class="password">
        <up-input
          type="password"
          shape="circle"
          placeholder="请输入密码"
          v-model="password"
          border="surround"
          clearable
          prefixIcon="lock"
          prefixIconStyle="font-size: 22px;color: #909399"
          password>
        </up-input>
        <div class="btn">
          <div class="forget">
            <u-button
              text="忘记密码"
              plain
              type="primary"
              shape="circle">
            </u-button>
          </div>
          <div class="sign-up">
            <u-button
              text="注册"
              type="primary"
              plain
              shape="circle"
              @click="toSignUP">
            </u-button>
          </div>
          <div class="login-btn">
            <u-button
              text="登录"
              type="primary"
              shape="circle"
              @click="loginBtn">
            </u-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      display: flex;
    }
    .user-info {
      width: 80%;

      .username,
      .password {
        margin: 30rpx 0;
      }
      .btn {
        margin-top: 66rpx;
        display: flex;
        justify-content: space-between;
        .login-btn {
          flex: 1;
        }
        .forget,
        .sign-up {
          margin-right: 20rpx;
        }
      }
    }
  }
</style>
