<script lang="ts" setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  import { onShow } from '@dcloudio/uni-app'

  const userStore = useUserStore()
  const { userInfo }: any = storeToRefs(userStore)
  let messages = ref<string>('')

  onShow(async () => {
    await userStore.getUserAction()
  })

  const keyArray = ['age', 'gender', 'major', 'class']
  for (const key in userInfo.value) {
    if (keyArray.includes(key)) {
      messages.value += userInfo.value[key] + '/'
    }
  }

  const menu = uni.getSystemInfoSync().statusBarHeight

  const navLeftBtn = () => {
    uni.navigateBack()
  }

  const editBtn = () => {
    console.log('点击了头像')
  }

  const copy = () => {
    uni.setClipboardData({
      data: userInfo.value.wechat_or_qq,
      success: function (res) {
        uni.showToast({
          title: '复制成功',
        })
      },
    })
  }
</script>

<template>
  <div class="nav">
    <div
      class="nav-left-btn"
      :style="{ paddingTop: menu + 'px' }">
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
            :src="userInfo.avatar_path"
            size="166rpx"
            shape="square"
            @click="editBtn">
          </up-avatar>
        </div>
        <div class="nav-name">
          <up-text
            :lines="1"
            bold
            :text="userInfo.username"
            size="33rpx"
            color="#7a57d1">
          </up-text>
        </div>
        <div class="nav-message">
          <up-text
            :lines="1"
            :text="messages"
            size="30rpx">
          </up-text>
        </div>
      </div>
      <div class="nav-position">
        <div class="nav-wx">
          <div>微信/QQ：</div>
          <up-text
            :lines="1"
            size="30rpx"
            color="$u-content-color"
            :text="userInfo.wechat_or_qq"
            @click="copy">
          </up-text>
        </div>
        <div class="nav-sign">
          <div>个性签名：</div>
          <up-text
            :lines="1"
            size="30rpx"
            color="$u-content-color"
            :text="userInfo.sign">
          </up-text>
        </div>
        <div class="nav-like">
          <div class="like-left">
            <div class="like-item">粉丝：2</div>
            <div class="like-item">关注：3</div>
          </div>
          <div class="like-right">编辑/关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .nav {
    width: 100%;
    border-bottom: 6rpx solid #eee;
    box-sizing: border-box;
    // height: 350px;

    .nav-left-btn {
      position: relative;
      padding: 15rpx 20rpx 0 20rpx;
      width: 100%;
      height: 800rpx;
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
      height: 380rpx;
      border-radius: 30rpx 30rpx 0 0;
      background-color: #fff;
      // background-color: skyblue;
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
        // border-radius: 10rpx;
        // border: 2rpx solid #000;
      }
      .nav-name {
        position: absolute;
        top: 10rpx;
        left: 245rpx;
        font-weight: 700;
        font-size: 35rpx;
        box-sizing: border-box;
      }
      .nav-message {
        position: absolute;
        top: 60rpx;
        left: 235rpx;
      }
    }

    .nav-position {
      display: block;
      width: 93%;
      position: absolute;
      left: 30rpx;
      bottom: 16rpx;
      color: $u-content-color;
      font-size: 30rpx;
      box-sizing: border-box;
      // font-weight: 700;
      .nav-wx,
      .nav-sign {
        display: flex;
      }
      .nav-like {
        margin-top: 88rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .like-left {
          flex: 1;
          display: flex;
          .like-item {
            margin: 0 10rpx;
          }
        }
      }
      .like-right {
        padding: 8rpx 17rpx;
        background-color: #ccc;
        border-radius: 30rpx;
      }
    }
  }
</style>
