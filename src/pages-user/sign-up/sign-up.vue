<script lang="ts" setup>
  import { ref } from 'vue'
  import { signUP } from '@/api/user'
  import { showToastError } from '@/utils/handle.error'

  const username = ref('')
  const password1 = ref('')
  const password2 = ref('')

  const signUp = () => {
    if (!password1.value || !password2.value) {
      showToastError('none', '用户名或密码不能为空!')
      return
    }
    if (password1.value !== password2.value) {
      showToastError('none', '密码不一致!')
      return
    }
    signUP(username.value, password2.value).then((res: any) => {
      if (res.code === 0) {
        uni.navigateTo({
          url: '/pages-user/login/login',
        })
      }
      if (res.code === -1002) {
        showToastError('none', '用户存在请换一个用户名!')
      }
    })
  }
</script>

<template>
  <div class="sign-up">
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
          border="surround"
          prefixIcon="account"
          v-model="username"
          prefixIconStyle="font-size: 22px;color: #909399"
          clearable>
        </up-input>
      </div>
      <div class="password">
        <div class="top">
          <up-input
            type="password"
            shape="circle"
            placeholder="请输入密码"
            v-model="password1"
            border="surround"
            clearable
            prefixIcon="lock"
            prefixIconStyle="font-size: 22px;color: #909399"
            password>
          </up-input>
        </div>
        <div class="bottom">
          <up-input
            type="password"
            shape="circle"
            placeholder="确认密码"
            v-model="password2"
            border="surround"
            clearable
            prefixIcon="lock-fill"
            prefixIconStyle="font-size: 22px;color: #909399"
            password>
          </up-input>
        </div>
      </div>
      <div class="btn">
        <u-button
          text="注册"
          type="primary"
          shape="circle"
          @click="signUp">
        </u-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .sign-up {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-top: 66rpx;

    .title {
      display: flex;
    }
    .user-info {
      width: 80%;
      .username {
        margin-top: 30rpx;
      }
      .password {
        margin-top: 30rpx;
        .bottom {
          margin-top: 30rpx;
        }
      }
      .btn {
        margin-top: 66rpx;
      }
    }
  }
</style>
