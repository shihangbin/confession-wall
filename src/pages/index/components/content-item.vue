<script setup lang="ts">
  import { ref } from 'vue'
  import { timeFormat } from '@/utils/dayjs'
  import { useUserStore } from '@/store/user'
  import { useArticleStore } from '@/store/article'
  import { storeToRefs } from 'pinia'
  import { showToastError } from '@/utils/handle.error'

  const userStore = useUserStore()
  const articleStore = useArticleStore()

  const { userInfo } = storeToRefs(userStore)
  const { articleList } = storeToRefs(articleStore)

  const props = defineProps({
    itemArticle: {
      type: Object,
      default: () => {},
    },
  })

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

  const articleId = async (id: string | number) => {
    await userStore.getUserAction()
    show.value = !show.value
    if (userInfo.value.id === props?.itemArticle?.user?.id) {
      for (const item of list.value) {
        item.disabled = false
      }
    }
  }
  const sheetClose = () => {
    show.value = !show.value
  }
  const sheetSelect = async (e: any) => {
    if (e.type == 'edit') {
      showToastError('none', '开发中...')
    }
    if (e.type == 'del') {
      console.log('del', props.itemArticle?.id)
      const res = await articleStore.delArticleAction(props.itemArticle?.id)
      if (res.code === 0) {
        showToastError('none', res.message)
        articleList.value = []
        await articleStore.getArticleListAction()
      }
    }
  }
</script>

<template>
  <div class="content-block">
    <div class="content-top">
      <div class="top-avatar">
        <image
          @click="toUserInfo(props.itemArticle?.user?.id)"
          class="image"
          :src="props.itemArticle?.user?.avatar_path">
        </image>
      </div>
      <div class="top-center">
        <div class="top-name">{{ props.itemArticle?.user?.nickname }}</div>
        <div class="top-city">位置</div>
      </div>
      <div class="top-btn">
        <u-icon
          @click="articleId(props.itemArticle?.id)"
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
        @click="toArticle(props.itemArticle?.id)"
        :lines="2"
        size="32"
        lineHeight="50"
        :text="props.itemArticle?.content">
      </up-text>
      <scroll-view
        class="scroll-view"
        scroll-x="true">
        <template
          v-for="(item, index) in props.itemArticle?.image_urls"
          :key="index">
          <image
            v-if="item"
            class="scroll-view-item"
            :src="item"
            mode="aspectFill"
            @click="previewImage(index, props.itemArticle?.image_urls)">
          </image>
        </template>
      </scroll-view>
    </div>
    <div class="content-bottom">
      <div class="bottom-time">
        {{ timeFormat(props.itemArticle?.publication_date) }}
      </div>
      <div class="bottom-like">喜欢</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-block {
    background: #fff;
    margin: 20rpx;
    padding: 10rpx;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0rpx 0rpx 8rpx 0rpx #c3c3e5;
    box-sizing: border-box;
    .content-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 120rpx;
      // background: #eee;
      .top-avatar {
        width: 100rpx;
        height: 100rpx;
        // background: pink;
        border-radius: 8rpx;
        border: 5rpx solid #000;
        overflow: hidden;
        .image {
          width: 100%;
          height: 100%;
        }
      }
      .top-center {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;
        flex: 1;
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
      .scroll-view {
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
    }
  }
</style>
