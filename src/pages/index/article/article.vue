<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onLoad } from '@dcloudio/uni-app'
  import { useArticleStore } from '../../../store/article'
  import { timeFormat } from '@/utils/dayjs'

  const articleStore = useArticleStore()
  const { articleItem } = storeToRefs(articleStore)

  onLoad(async (option: any) => {
    await articleStore.getArticleItemAction(option.id)
  })

  const previewImage = (index: number, itemArr: any) => {
    uni.previewImage({
      urls: itemArr,
      current: index,
    })
  }
</script>

<template>
  <div class="article">
    <div class="article-content">
      <div class="user">
        <image
          class="avatar"
          :src="articleItem?.user?.avatarURL">
        </image>
        <div class="info">
          <div class="name">{{ articleItem?.user?.username }}</div>
          <div>{{ timeFormat(articleItem?.publication_date) }}</div>
        </div>
      </div>
      <div class="content">
        <up-text
          size="32"
          lineHeight="50"
          :text="articleItem?.content">
        </up-text>
      </div>
      <up-image
        v-if="articleItem?.image_urls?.length == 1"
        :show-loading="true"
        :src="articleItem?.image_urls"
        width="710"
        height="500"
        mode="aspectFill"
        @click="previewImage(1, articleItem?.image_urls)">
      </up-image>
      <u-album
        v-else-if="articleItem?.image_urls?.length > 1"
        :urls="articleItem?.image_urls"
        rowCount="3"
        maxCount="9"
        multipleSize="230">
      </u-album>
    </div>
    <div class="comment">
      <div class="title">评论：</div>
      <div class="item">
        <div class="avatar">头像</div>
        <div class="messages">
          <div class="user">昵称</div>
          <div class="content">
            <up-text
              size="32"
              lineHeight="50"
              text="开发中...">
            </up-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .article {
    width: 100%;
    // height: 100vh;
    padding-bottom: 660rpx;
    background-color: $u-info-light;
    .article-content {
      width: 100%;
      padding: 20rpx;
      box-sizing: border-box;
      background-color: #fff;
      .user {
        display: flex;
        margin: 20rpx 0;
        box-sizing: border-box;
        .avatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 8rpx;
          border: 5rpx solid #000;
        }
        .info {
          display: flex;
          margin-left: 30rpx;
          flex-direction: column;
          justify-content: center;
          margin-left: 30rpx;
          .name {
            font-weight: 700;
          }
        }
      }
      .content {
        text-align: justify;
        letter-spacing: 5rpx;
        margin: 30rpx 0;
        box-sizing: border-box;
      }
    }
    .comment {
      // width: 100%;
      background-color: #fff;
      border-top: 20rpx solid $u-info-light;
      .title {
        height: 60rpx;
        // text-align: center;
        line-height: 60rpx;
        padding-left: 10rpx;
        border-left: 10rpx solid #7a57d1;
      }
      .item {
        display: flex;
        // align-items: center;
        border-top: 2rpx solid $u-info-light;
        background-color: #fff;
        letter-spacing: 3rpx;
        padding: 20rpx;
        box-sizing: border-box;

        .avatar {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
          background-color: #7a57d1;
          margin-right: 20rpx;
          box-sizing: border-box;
        }
        .messages {
          width: 600rpx;
          text-align: justify;
          letter-spacing: 5rpx;
          .user {
            color: $u-tips-color;
            margin-bottom: 10rpx;
          }
        }
      }
    }
  }
</style>