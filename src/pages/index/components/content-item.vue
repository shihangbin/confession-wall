<script setup lang="ts">
  import { ref, onUnmounted } from 'vue'
  import { timeFormat } from '@/utils/dayjs'
  import { useUserStore } from '@/store/user'
  import { useArticleStore } from '@/store/article'
  import { storeToRefs } from 'pinia'
  import { showToastError } from '@/utils/handle.error'

  const userStore = useUserStore()
  const articleStore = useArticleStore()

  const { userInfo }: any = storeToRefs(userStore)
  const { articleList, likeNum } = storeToRefs(articleStore)

  const props = defineProps({
    itemArticle: {
      type: Object,
      default: () => {},
    },
    commentNum: {
      type: Number,
      default: 0,
    },
    likeNum: {
      type: Object,
      default: () => {},
    },
  })

  let articleId = props.itemArticle?.id
  let userId = props.itemArticle?.user?.id
  let avatar = props.itemArticle?.user?.avatar_path
  let nickname = props.itemArticle?.user?.nickname
  let content = props.itemArticle?.content
  let imageURL = props.itemArticle?.image_urls
  let publication_date = props.itemArticle?.publication_date

  const previewImage = (index: number, itemArr: any) => {
    uni.previewImage({
      urls: itemArr,
      current: index,
    })
  }

  const toArticle = (id: string) => {
    uni.navigateTo({
      url: `/pages/index/article/article?id=${id}`,
    })
  }

  const toUserInfo = (id: string | number) => {
    uni.navigateTo({
      url: `/pages/user/user/user?id=${id}`,
    })
  }

  const show = ref(false)

  const list = ref([
    {
      name: '修改',
      type: 'edit',
      disabled: true,
    },
    {
      name: '删除',
      color: 'red',
      type: 'del',
      disabled: true,
    },
  ])

  const editArticleId = async (id: string | number) => {
    await userStore.getUserAction()
    show.value = !show.value
    if (userInfo.value.id === userId || userInfo.value.role == 'admin') {
      for (const item of list.value) {
        item.disabled = false
      }
    }
  }
  const sheetClose = () => {
    show.value = !show.value
  }
  const sheetSelect = async (e: any) => {
    if (e.type === 'edit') {
      showToastError('none', '开发中...')
    }

    if (e.type == 'del') {
      const res = await articleStore.delArticleAction(articleId)
      if (res.code === 0) {
        showToastError('none', res.message)
        articleList.value = []
        await articleStore.getArticleListAction()
      } else {
        showToastError('none', '删除文章失败：' + res.message)
      }
    }
  }
  // onShow(async () => {
  //   await userStore.getUserAction()
  // })

  const emit = defineEmits(['isLike'])

  let timer: any = null
  let result: any = null

  const likeBtn = async (id: number) => {
    showToastError('none', '有点问题暂时不用')
    return
    if (timer !== null) {
      // 如果定时器还在运行，取消上一次的调用
      clearTimeout(timer)
    }

    timer = setTimeout(async () => {
      try {
        result = await articleStore.postLikeAction(id, userInfo.value.id)

        for (const item of likeNum.value) {
          if (item.id == id && result) {
            item.like_num++
            emit('isLike')
          } else if (item.id == id && !result) {
            item.like_num--
            emit('isLike')
          }
        }
      } catch (error) {
        // 处理错误，例如显示提示或记录日志
        console.error('Error in likeBtn:', error)
      } finally {
        timer = null
      }
    }, 300)
  }

  // 确保在组件被卸载时清除定时器
  onUnmounted(() => {
    clearTimeout(timer)
  })

  const time = ref('')
  time.value = timeFormat(publication_date)
</script>

<template>
  <div class="content-block">
    <div class="content-top">
      <div class="top-avatar">
        <image
          :style="{ width: '100rpx', height: '100rpx' }"
          :src="avatar"
          @click="toUserInfo(userId)">
        </image>
      </div>
      <div class="top-center">
        <div class="top-name">{{ nickname }}</div>
        <!-- <div class="top-city">位置</div> -->
      </div>
      <div class="top-btn">
        <u-icon
          @click="editArticleId(articleId)"
          name="more-circle"
          color="#000"
          size="50">
        </u-icon>
        <u-action-sheet
          :actions="list"
          :show="show"
          cancelText="取消"
          :closeOnClickOverlay="true"
          :closeOnClickAction="true"
          @close="sheetClose"
          @select="sheetSelect"
          round="30rpx">
        </u-action-sheet>
      </div>
    </div>

    <div class="content-center">
      <up-text
        @click="toArticle(articleId)"
        :lines="2"
        size="32"
        lineHeight="50"
        :text="content">
      </up-text>
      <scroll-view
        enable-flex
        class="scroll-view_H"
        scroll-x="true">
        <template
          v-for="(item, index) in imageURL"
          :key="item">
          <div
            class="scroll-view-item"
            v-if="item">
            <image
              :src="item"
              :style="{ width: '100%', height: '100%' }"
              mode="aspectFill"
              @click="previewImage(index, imageURL)">
            </image>
          </div>
        </template>
      </scroll-view>
    </div>
    <div class="content-bottom">
      <div class="bottom-time">
        <uni-dateformat
          :date="time"
          format="yyyy-MM-dd hh:mm"
          :threshold="[60000, 3600000]">
        </uni-dateformat>
      </div>
      <div class="bottom-view">
        <div
          class="comment"
          @click="toArticle(articleId)">
          <u-icon
            name="chat"
            size="50">
          </u-icon>
          <span class="comment_num"> {{ props.commentNum || 0 }}</span>
        </div>
        <div
          class="bottom-like"
          @click="likeBtn(props.likeNum?.id)">
          <u-icon
            v-if="props.likeNum?.is_like"
            name="thumb-up"
            color="pink"
            size="50">
          </u-icon>
          <u-icon
            v-else
            name="thumb-up"
            size="50">
          </u-icon>
          <span class="like_num">
            {{ props.likeNum?.like_num || 0 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-block {
    background: #fff;
    padding: 20rpx;
    margin: 20rpx;
    margin-bottom: 30rpx;
    border-radius: 20rpx;
    overflow: hidden;
    // box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
    box-shadow: 0rpx 0rpx 18rpx 0rpx #c3c3e5;
    box-sizing: border-box;
    .content-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 120rpx;
      padding-bottom: 10rpx;
      // background: #eee;
      .top-avatar {
        width: 100rpx;
        height: 100rpx;
        // background: pink;
        border-radius: 8rpx;
        border: 5rpx solid #000;
        overflow: hidden;
      }
      .top-center {
        display: flex;
        flex-direction: column;
        margin-left: 30rpx;
        flex: 1;
        .top-name {
          font-weight: 700;
        }
      }
      .top-btn {
        padding: 10rpx;
      }
    }
    .content-center {
      width: 100%;
      margin: 15rpx 0;
      text-align: justify;
      letter-spacing: 5rpx;
      // background-color: pink;
      .scroll-view_H {
        white-space: nowrap;
        width: 100%;
        // height: 300rpx;
        .scroll-view-item {
          display: inline-block;
          width: 33%;
          height: 200rpx;
          margin: 20rpx 5rpx;
          border-radius: 10rpx;
          overflow: hidden;
        }
      }
    }
    .content-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 66rpx;
      // background: #bbb;
      .bottom-time {
        font-size: 26rpx;
        text-align: center;
      }
      .bottom-view {
        display: flex;
        font-size: 26rpx;
        color: $u-content-color;
        .comment {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30rpx;
          .comment_num {
            padding-left: 5rpx;
          }
        }
        .bottom-like {
          display: flex;
          justify-content: center;
          align-items: center;
          .like_num {
            padding-left: 5rpx;
          }
        }
      }
    }
  }
</style>
