<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '../../../store/user'
  import { showToastError } from '../../../utils/handle.error'

  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)

  const imageStyles = {
    width: '300rpx',
    height: '300rpx',
    border: {
      color: '#eee',
      width: '5rpx',
      style: 'solid',
      radius: '10rpx',
    },
  }
  const select = (e: any) => {
    const url = e.tempFilePaths[0]
    const token = uni.getStorageSync('token')

    uni.uploadFile({
      url: 'https://api.xbin.cn/upload/avatar', // 仅为示例，非真实的接口地址
      filePath: url,
      name: 'file',
      header: {
        Authorization: `Bearer ${token}`,
      },
      success: (res: any) => {
        setTimeout(() => {
          res = JSON.parse(res.data)
          userInfo.value.avatar_path = res.avatarURL
          return res
        }, 1000)
      },
    })
  }

  const confirm = async () => {
    await userStore.putUserInfoAction(userInfo.value.id)

    setTimeout(() => {
      showToastError('none', '上传完成')
      uni.switchTab({
        url: '/pages/user/user',
      })
    }, 1000)
  }
</script>

<template>
  <div class="avatar">
    <div class="avatar_path">
      <div class="update-avatar">
        <uni-file-picker
          :disable-prediv="false"
          :del-icon="true"
          return-type="object"
          @select="select"
          :image-styles="imageStyles"
          >选择头像
        </uni-file-picker>
      </div>
    </div>
    <div class="example">
      <!-- 基础表单校验 -->
      <uni-forms ref="valiForm">
        <uni-forms-item label="昵称">
          <uni-easyinput
            v-model="userInfo.nickname"
            placeholder="请输入昵称" />
        </uni-forms-item>
        <uni-forms-item label="年龄">
          <uni-easyinput
            v-model="userInfo.age"
            placeholder="请输入年龄" />
        </uni-forms-item>
        <uni-forms-item label="联系方式">
          <uni-easyinput
            v-model="userInfo.wechat_or_qq"
            placeholder="请输入联系方式" />
        </uni-forms-item>
        <uni-forms-item label="性别">
          <uni-easyinput
            v-model="userInfo.gender"
            placeholder="请输入性别" />
        </uni-forms-item>
        <uni-forms-item label="专业">
          <uni-easyinput
            v-model="userInfo.major"
            placeholder="请输入专业" />
        </uni-forms-item>
        <uni-forms-item label="班级">
          <uni-easyinput
            v-model="userInfo.school_class"
            placeholder="请输入班级" />
        </uni-forms-item>
        <uni-forms-item
          label="个性签名"
          name="introduction">
          <uni-easyinput
            type="textarea"
            v-model="userInfo.say"
            placeholder="个性签名" />
        </uni-forms-item>
      </uni-forms>
      <button @click="confirm">提交</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar {
    width: 100vw;
    height: 100vh;
    .avatar_path {
      display: flex;
      margin: 30rpx 0;
      justify-content: center;
      .update-avatar {
        width: 280rpx;
        height: 280rpx;
      }
    }
    .example {
      padding: 40rpx;
      box-sizing: border-box;
    }
  }
</style>
