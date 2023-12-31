<script lang="ts" setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useLoginStore } from '@/store/login'
  import { useUserStore } from '@/store/user'
  import { showToastError } from '@/utils/handle.error'
  import privacy from '@/components/privacy.vue'

  const userStore = useUserStore()
  const loginStore = useLoginStore()
  const { isPrivacy } = storeToRefs(userStore)
  const { token, code, msg, key } = storeToRefs(loginStore)

  const username = ref<string>('')
  const password = ref<string>('')

  const toSignUP = () => {
    uni.navigateTo({
      url: '/pages-login/sign-up/sign-up',
    })
  }

  const loginBtn = async () => {
    if (isPrivacy.value) {
      uni.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        uni.hideLoading()
        showToastError('error', '网络错误')
      }, 10000)

      if (!username.value) {
        showToastError('error', '请输入用户名!')
        return
      }
      if (!password.value) {
        showToastError('error', '请输入密码!')
        return
      }

      await loginStore.loginAction(username.value, password.value)

      if (token.value && code.value === 0) {
        // 存储数据到本地存储
        uni.setStorageSync('token', token.value)

        setTimeout(() => {
          uni.hideLoading()
          uni.switchTab({
            url: '/pages/index/index',
          })
        }, 1000)
      } else {
        showToastError('error', msg.value)
      }
    } else {
      showToastError('none', '请同意隐私政策')
    }
  }

  const show = ref(false)

  const close = () => {
    show.value = false
  }
  const wxLoginBtn = () => {
    if (isPrivacy.value) {
      uni.login({
        provider: 'weixin', //使用微信登录
        success: function (loginRes) {
          uni
            .request({
              url: 'https://api.xbin.cn/login/wx',
              method: 'POST',
              data: {
                code: loginRes.code,
              },
            })
            .then((res: any) => {
              res = res.data
              key.value.appId = res.appid
              key.value.secret = res.secret
              const { openid } = res.data

              uni.setStorageSync('appId', res.appid)
              uni.setStorageSync('secret', res.secret)
              uni.setStorageSync('openid', openid)
              uni.setStorageSync('token', res.token)

              if (res.code === 0) {
                setTimeout(() => {
                  uni.switchTab({
                    url: '/pages/index/index',
                  })
                }, 1000)
              }
              // const token = uni.getStorageSync('token')
            })
        },
      })
    } else {
      showToastError('none', '请同意隐私政策')
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

        <privacy></privacy>

        <div class="btn">
          <div class="forget">
            <u-button
              text="忘记密码"
              plain
              type="primary"
              shape="circle"
              @click="show = true">
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
              text="密码登录"
              type="primary"
              shape="circle"
              @click="loginBtn">
            </u-button>
          </div>
        </div>
      </div>
    </div>

    <div class="wx-login">
      <u-button
        text="微信一键登录"
        type="primary"
        shape="circle"
        @click="wxLoginBtn">
      </u-button>
    </div>
    <u-popup
      :show="show"
      mode="center"
      @close="close">
      <div class="wx">
        <img
          class="wx-img"
          src="https://img.xbin.cn/school-wall/article_images/2023/11/03/c3aee3b17fe762b72bb745c1c"
          alt="" />
      </div>
    </u-popup>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    // height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      // display: flex;
      margin-top: 88rpx;
    }
    .user-info {
      width: 80%;

      .username,
      .password {
        margin: 30rpx 0;
      }
      .btn {
        margin-top: 30rpx;
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
    .wx-login {
      width: 80%;
      margin-top: 50rpx;
    }
    .wx {
      width: 500rpx;
      height: 700rpx;
      .wx-img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
