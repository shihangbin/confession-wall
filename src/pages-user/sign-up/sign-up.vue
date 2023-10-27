<script lang="ts" setup></script>

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
          shape="circle">
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
