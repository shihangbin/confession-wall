<script lang="ts" setup>
  import { ref } from 'vue'
  import { useArticleStore } from '@/store/article'
  import { showToastError } from '@/utils/handle.error'
  import { storeToRefs } from 'pinia'

  const articleStore = useArticleStore()
  const { articleList } = storeToRefs(articleStore)

  const content = ref('')
  const fileList: any = ref([])
  const imgArray: any = ref([])
  const imgI: any = ref([])
  const errcode: any = ref(0)

  const appId = uni.getStorageSync('appId')
  const secret = uni.getStorageSync('secret')

  uni.request({
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`,
    method: 'POST',
    success: (res: any) => {
      uni.setStorageSync('accessToken', res.data.access_token)
    },
  })

  // const upImages = async (imgArray: any) => {
  //   uni.showLoading({
  //     title: '上传中...',
  //     mask: true,
  //   })
  //   // 在一个 async 函数中使用 await
  //   const uploadImage = (item: any) => {
  //     const accessToken = uni.getStorageSync('accessToken')

  //     uni.uploadFile({
  //       url: `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${accessToken}`,
  //       method: 'POST',
  //       filePath: item,
  //       name: 'media', // 服务端接收文件的字段名
  //       success: (res: any) => {
  //         const result = JSON.parse(res.data) // 将返回的 JSON 字符串转换为对象
  //         errcode.value = result.errcode
  //       },
  //       fail: (res) => {
  //         console.error(res)
  //         uni.hideLoading()
  //       },
  //     })
  //   }

  //   const pushImg = async (item: any) => {
  //     console.log(errcode.value)
  //     if (errcode.value !== 0) {
  //       showToastError('none', '有违规信息')
  //       return
  //     }
  //     const token = uni.getStorageSync('token')

  //     const a = await uni.uploadFile({
  //       url: 'https://api.xbin.cn/article/images', // 仅为示例，非真实的接口地址
  //       filePath: item,
  //       name: 'file',
  //       header: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     let res = JSON.parse(a.data)

  //     if (res.code == 0 && errcode.value == 0) {
  //       showToastError('none', '发布成功')

  //       setTimeout(async () => {
  //         uni.switchTab({
  //           url: '/pages/index/index',
  //         })
  //         uni.hideLoading()
  //         articleList.value = []
  //         await articleStore.getArticleListAction(0, 5)
  //       }, 500)
  //     }
  //   }

  //   for (const item of imgArray) {
  //     imgI.value.push(uploadImage(item), await pushImg(item))
  //   }
  // }

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

  const publishArticle = async () => {
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
      success: (res: any) => {
        errcode.value = res.data.errcode
      },
      fail: (err) => {
        console.error('Request failed:', err)
      },
    })

    if (errcode.value !== 0) {
      showToastError('none', '有违规信息')
      return
    }

    if (content.value.length < 2) {
      showToastError('none', '字数少于二')
      return
    }

    const res: any = await upImages(imgArray.value)

    if (
      typeof res === 'undefined' ||
      imgI.value.length === imgArray.value.length
    ) {
      const result = await articleStore.postArticlePublish(content.value, 1)
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
            url: '/pages/index/index',
          })
          uni.hideLoading()
          articleList.value = []
          await articleStore.getArticleListAction(0, 5)
        }, 500)
      }
    }
  }

  // 获取上传状态
  const select = (e: any) => {
    imgArray.value = e.tempFilePaths
  }
  // 获取上传进度
  const remove = (e: any) => {
    imgArray.value.splice(imgArray.value.indexOf(e.tempFilePath), 1)
  }
</script>

<template>
  <div class="article">
    <div class="content">
      <div class="article-content">
        <u-textarea
          v-model="content"
          maxlength="520"
          placeholder="请输入内容"
          autoHeight
          focus
          count>
        </u-textarea>
      </div>
      <div class="article-images">
        <uni-file-picker
          v-model="fileList"
          fileMediatype="image"
          mode="grid"
          @select="select"
          @delete="remove" />
      </div>
    </div>
    <up-button
      @click="publishArticle"
      text="发布文章"
      shape="circle"
      color="#d2c1ec">
    </up-button>
  </div>
</template>

<style lang="scss" scoped>
  .article {
    padding: 20rpx;
    .content {
      margin-bottom: 40rpx;
      .article-content,
      .article-images {
        margin-top: 20rpx;
      }
    }
  }
</style>
