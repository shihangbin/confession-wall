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

  const upImages = async (imgArray: any) => {
    uni.showLoading({
      title: '上传中...',
      mask: true,
    })
    for (const item of imgArray) {
      const token = uni.getStorageSync('token')
      imgI.value.push(
        await uni.uploadFile({
          url: 'https://api.xbin.cn/article/images', // 仅为示例，非真实的接口地址
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
    if (content.value.length < 2) {
      showToastError('none', '字数少于二')
      return
    }

    const res: any = await upImages(imgArray.value)

    if (
      typeof res === 'undefined' ||
      imgI.value.length === imgArray.value.length
    ) {
      const result = await articleStore.postArticlePublish(content.value)
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
        }, 1000)
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
