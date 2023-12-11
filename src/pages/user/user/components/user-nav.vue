<script lang="ts" setup>
  const props = defineProps({
    info: {
      type: Object,
      default: () => {},
    },
    isLoginUser: {
      type: Boolean,
      default: false,
    },
  })

  const menu: any = uni.getSystemInfoSync().statusBarHeight

  const navLeftBtn = () => {
    uni.navigateBack()
  }

  const editBtn = () => {
    //在起始页面跳转到test.vue页面并传递参数
    if (props.isLoginUser) {
      uni.navigateTo({
        url: '/pages/user/update/update',
      })
    }
  }

  const copy = () => {
    uni.setClipboardData({
      data: props.info.wechat_or_qq,
      success: function (res) {
        uni.showToast({
          title: 'QQ/微信复制成功',
        })
      },
    })
  }
</script>

<template>
  <div class="nav">
    <div
      class="nav-left-btn"
      :style="{ paddingTop: menu + 12.5 + 'px' }">
      <u-icon
        name="arrow-left"
        color="$u-main-color"
        size="50"
        bold
        @click="navLeftBtn">
      </u-icon>
      <div class="nav-info">
        <div class="nav-avatar">
          <up-avatar
            :src="props.info?.avatar_path"
            size="166rpx"
            shape="square"
            mode="widthFix"
            @click="editBtn">
          </up-avatar>
        </div>
        <div class="nav-name">
          <up-text
            :lines="1"
            bold
            :text="props.info?.nickname"
            size="36rpx"
            color="#7a57d1">
          </up-text>
        </div>
        <div
          v-if="props.isLoginUser"
          class="nav-btn"
          @click="editBtn">
          编辑
        </div>
      </div>
    </div>
    <div class="nav-message">
      <h2 class="title">基本信息</h2>
      <div class="info">
        <div class="left">昵称</div>
        <div class="right">{{ props.info.nickname }}</div>
      </div>
      <div class="info">
        <div class="left">年龄</div>
        <div class="right">{{ props.info.age }}</div>
      </div>
      <div class="info">
        <div class="left">性别</div>
        <div class="right">{{ props.info.gender }}</div>
      </div>
      <div
        class="info"
        @click="copy">
        <div class="left">QQ/微信</div>
        <div class="right">{{ props.info.wechat_or_qq }}</div>
      </div>
    </div>
    <div class="nav-message">
      <h2 class="title">学校</h2>
      <div class="info">
        <div class="left">专业</div>
        <div class="right">{{ props.info.major }}</div>
      </div>
      <div class="info">
        <div class="left">班级</div>
        <div class="right">{{ props.info.school_class }}</div>
      </div>
    </div>
    <div class="nav-message">
      <h2 class="title">签名</h2>
      <div class="info">
        <div class="left">个性签名</div>
        <div class="right">{{ props.info.say }}</div>
      </div>
    </div>
    <div class="nav-message">
      <h2 class="title">账号</h2>
      <div class="info">
        <div class="left">ID</div>
        <div class="right">{{ props.info.id }}</div>
      </div>
      <div class="info">
        <div class="left">创建时间</div>
        <div class="right">
          <uni-dateformat
            :date="props.info.createAt"
            format="yyyy-MM-dd hh:mm">
          </uni-dateformat>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .nav {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: #f3f4f6;

    .nav-left-btn {
      position: relative;
      padding: 15rpx 20rpx 0 20rpx;
      width: 100%;
      // height: 800rpx;
      height: 600rpx;
      // background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
      background-image: url('https://img.xbin.cn/images/2023/10/08-00-33-fe4e96.png');
      // background-image: url('/static/tabBar/nav.png');
      background-size: 100% auto;
      box-sizing: border-box;
    }
    .nav-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      // height: 380rpx;
      height: 150rpx;
      border-radius: 30rpx 30rpx 0 0;
      background-color: #fff;
      // background-color: #f3f4f6;
      box-sizing: border-box;

      .nav-avatar {
        position: absolute;
        top: -60rpx;
        left: 50rpx;
        width: 166rpx;
        height: 166rpx;
        border-radius: 50%;
        border: 5rpx solid $u-main-color;
        overflow: hidden;
        background-color: #ccc;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        // border-radius: 10rpx;
        // border: 2rpx solid #000;
      }
      .nav-name {
        flex: 1;
        position: absolute;
        top: 10rpx;
        left: 245rpx;
        font-weight: 700;
        font-size: 35rpx;
        box-sizing: border-box;
      }
      .nav-btn {
        position: absolute;
        top: 75rpx;
        right: 20rpx;
        width: 160rpx;
        height: 60rpx;
        text-align: center;
        line-height: 60rpx;
        border-radius: 30rpx;
        background-color: #eee;
        // font-weight: 700;
      }
    }
    .nav-message {
      // margin: 20rpx;
      margin: 10rpx 0;
      padding: 30rpx;
      background-color: #fff;
      border-radius: 15rpx;
      box-sizing: border-box;

      .title {
        font-weight: 700;
        font-size: 33rpx;
        color: #303133;
        margin-bottom: 10rpx;
      }
      .info {
        padding: 10rpx 0;
        display: flex;
        font-size: 30rpx;
        .left {
          width: 160rpx;
          color: #909399;
        }
        .right {
          flex: 1;
          color: #303133;
        }
      }
    }
  }
</style>
