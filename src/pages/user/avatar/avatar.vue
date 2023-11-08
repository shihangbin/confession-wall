<script lang="ts" setup>
  const imageStyles = {
    width: '400rpx',
    height: '400rpx',
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
          console.log(res)

          return res
        }, 1000)
      },
    })
  }
</script>

<template>
  <div class="avatar">
    <div class="avatar_path">
      <uni-file-picker
        :disable-preview="false"
        :del-icon="true"
        return-type="object"
        @select="select"
        :image-styles="imageStyles"
        >选择头像
      </uni-file-picker>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar {
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    margin-top: 50rpx;
    background-color: #fff;
  }
</style>
