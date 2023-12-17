<script lang="ts" setup>
  import { ref } from 'vue'
  import { useArticleStore } from '@/store/article'
  import { showToastError } from '@/utils/handle.error'
  import { storeToRefs } from 'pinia'

  const articleStore = useArticleStore()
  const { studyList } = storeToRefs(articleStore)
  const content = ref('')
  const fileList: any = ref([])
  const imgArray: any = ref([])
  const imgI: any = ref([])
  const errcode: any = ref(87014)

  const appId = uni.getStorageSync('appId')
  const secret = uni.getStorageSync('secret')

  uni.request({
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`,
    method: 'POST',
    success: (res: any) => {
      uni.setStorageSync('accessToken', res.data.access_token)
    },
  })

  const upImages = async (imgArray: any) => {
    uni.showLoading({
      title: '上传中...',
      mask: true,
    })
    for (const item of imgArray) {
      const token = uni.getStorageSync('token')
      imgI.value.push(
        await uni.uploadFile({
          url: 'https://api.xbin.cn/article/images',
          filePath: item,
          name: 'file',
          header: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    }
  }
  const publishStudy = () => {
    const accessToken = uni.getStorageSync('accessToken')

    uni.request({
      url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`, // 请确保 accessToken 是有效的
      method: 'POST',
      header: {
        'content-type': 'application/json', // 设置请求头为 JSON
      },
      data: {
        content: content.value,
      },
      success: async (data: any) => {
        errcode.value = await data.data.errcode
        await publish()
      },
      fail: (err) => {
        console.error('Request failed:', err)
      },
    })
  }

  const publish = async () => {
    if (content.value.length < 2) {
      showToastError('none', '字数少于二')
      return
    }

    if (errcode.value !== 0) {
      showToastError('none', '有违规信息')
      return
    }

    if (imgArray.value.length === 0) {
      showToastError('none', '必须包含图片')
      return
    }

    const res: any = await upImages(imgArray.value)

    if (
      typeof res === 'undefined' ||
      imgI.value.length === imgArray.value.length
    ) {
      const result = await articleStore.postStudyPublish(content.value, 2)
      const code = result.code
      const msg = result.message

      if (code === 0 && imgI.value.length === imgArray.value.length) {
        uni.hideLoading()
        content.value = ''
        fileList.value = []
        imgArray.value = []

        showToastError('none', msg)

        setTimeout(async () => {
          uni.switchTab({
            url: '/pages/study/study',
          })
          uni.hideLoading()
          studyList.value = []
          await articleStore.getStudyListAction(0, 5, 2, 'DESC')
        }, 500)
      }
    }
  }

  // 获取上传状态
  const select = (e: any) => {
    imgArray.value = e.tempFilePaths
  }
  const remove = (e: any) => {
    imgArray.value.splice(imgArray.value.indexOf(e.tempFilePath), 1)
  }
</script>

<template>
  <div class="study">
    <div class="content">
      <div class="study-content">
        <u-textarea
          v-model="content"
          placeholder="请输入内容"
          maxlength="520"
          autoHeight
          focus
          count>
        </u-textarea>
      </div>
      <div class="study-images">
        <uni-file-picker
          v-model="fileList"
          fileMediatype="image"
          mode="grid"
          @select="select"
          @delete="remove" />
      </div>
    </div>
    <up-button
      @click="publishStudy"
      text="发布文章"
      shape="circle"
      color="#d2c1ec">
    </up-button>
  </div>
</template>

<style lang="scss" scoped>
  .study {
    padding: 20rpx;
    .content {
      margin-bottom: 40rpx;
      .study-content,
      .study-images {
        margin-top: 20rpx;
      }
    }
  }
</style>
