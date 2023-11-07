<script lang="ts" setup>
  import { ref } from 'vue'
  import { useArticleStore } from '@/store/article'
  import { showToastError } from '@/utils/handle.error'

  const articleStore = useArticleStore()
  const content = ref('')
  const fileList: any = ref([])

  const publishArticle = async () => {
    if (content.value.length < 2) {
      showToastError('none', '字数少于二')
      return
    }
    const result = await articleStore.postArticlePublish(content.value)
    const code = result.code
    const msg = result.message

    if (code === 0) {
      content.value = ''
      fileList.value = []

      showToastError('none', msg)

      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index',
        })
        articleStore.getArticleListAction(0, 5)
      }, 1000)
    }
  }

  // 新增图片
  const afterRead = async (event: { file: ConcatArray<never> }) => {
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let lists: any = [].concat(event.file)
    let fileListLen = fileList.value.length
    lists.map((item: any) => {
      fileList.value.push({
        ...item,
        status: 'uploading',
        message: '上传中',
      })
    })
    for (let i = 0; i < lists.length; i++) {
      const result = await uploadFilePromise(lists[i].url)

      let item = fileList.value[fileListLen]
      fileList.value.splice(fileListLen, 1, {
        ...item,
        status: 'success',
        message: '上传完成',
        url: result,
      })
      fileListLen++
    }
  }

  const uploadFilePromise = (url: any) => {
    return new Promise((resolve, reject) => {
      // 创建 FormData 对象并添加文件
      const token = uni.getStorageSync('token')

      uni.uploadFile({
        url: 'https://api.xbin.cn/article/images', // 仅为示例，非真实的接口地址
        filePath: url,
        name: 'file',
        header: {
          Authorization: `Bearer ${token}`,
        },
        success: (res: any) => {
          setTimeout(() => {
            res = JSON.parse(res.data)
            resolve(res)
          }, 1000)
        },
      })
    })
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
        <u-upload
          :fileList="fileList"
          @afterRead="afterRead"
          :maxCount="9"
          width="220"
          height="220"
          multiple>
        </u-upload>
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
      .article-content {
        margin-top: 20rpx;
      }
      .article-images {
        margin-top: 20rpx;
      }
    }
  }
</style>
