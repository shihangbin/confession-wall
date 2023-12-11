<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onLoad } from '@dcloudio/uni-app'
  import { useArticleStore } from '../../../store/article'
  import { timeFormat } from '@/utils/dayjs'
  import { showToastError } from '@/utils/handle.error'

  const articleStore = useArticleStore()
  const { articleItem, commentList } = storeToRefs(articleStore)

  onLoad(async (option: any) => {
    await articleStore.getArticleItemAction(option.id)
    await articleStore.getCommentListAction(option.id)
  })

  const previewImage = (index: number, itemArr: any) => {
    uni.previewImage({
      urls: itemArr,
      current: index,
    })
  }

  // 无需使用 ref，直接声明常量
  const time = timeFormat(articleItem?.value.publication_date)

  // 无需使用 ref，直接声明常量
  let commentValue = ''

  const confirm = async (e: any) => {
    if (commentValue.length < 1) {
      showToastError('none', '评论字数小于2个字符')
      return
    }
    const result = await articleStore.postCommentPublish(
      commentValue,
      articleItem.value.id
    )
    if (result.code === 0) {
      commentValue = ''
      await articleStore.getCommentListAction(articleItem.value.id)
      showToastError('none', '评论成功')
    }
  }

  const toUserInfo = (id: string | number) => {
    console.log(id)

    uni.navigateTo({
      url: `/pages/user/user/user?id=${id}`,
    })
  }
</script>

<template>
  <div class="article">
    <div class="article-content">
      <div class="user">
        <div class="avatar">
          <image
            :style="{
              width: '100rpx',
              height: '100rpx',
            }"
            :src="articleItem?.user?.avatar_path"
            @click="toUserInfo(articleItem?.user?.id)">
          </image>
        </div>
        <div class="info">
          <div class="name">{{ articleItem?.user?.nickname }}</div>
          <div class="time">
            <uni-dateformat
              :date="time"
              format="yyyy-MM-dd hh:mm"
              :threshold="[60000, 3600000]">
            </uni-dateformat>
          </div>
        </div>
      </div>
      <div class="content">
        <up-text
          size="32"
          lineHeight="50"
          :text="articleItem?.content">
        </up-text>
      </div>
      <template v-if="articleItem?.image_urls?.[0] !== null">
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
      </template>
    </div>
    <div class="comment">
      <div class="title">评论：</div>
      <template
        v-for="item in commentList"
        :key="item.id">
        <div class="item">
          <div class="avatar">
            <image
              :style="{ width: '70rpx', height: '70rpx' }"
              :src="item?.user?.avatar_path">
            </image>
          </div>
          <div class="messages">
            <div class="user">{{ item?.user?.nickname }}</div>
            <div class="content">
              <up-text
                size="26"
                lineHeight="30"
                :text="item.content">
              </up-text>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="comment-input">
      <u-textarea
        v-model="commentValue"
        autoHeight
        count
        :cursorSpacing="20"
        @confirm="confirm"
        placeholder="请文明评论...">
      </u-textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .article {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 200rpx;
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
          .time {
            margin-top: 10rpx;
            font-size: 26rpx;
          }
        }
      }
      .content {
        text-align: justify;
        letter-spacing: 3rpx;
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
          // background-color: #7a57d1;
          margin-right: 20rpx;
          box-sizing: border-box;
          overflow: hidden;
        }
        .messages {
          width: 600rpx;
          text-align: justify;
          letter-spacing: 5rpx;
          .user {
            color: $u-tips-color;
            margin-bottom: 10rpx;
            font-size: 26rpx;
            font-weight: 700;
          }
        }
      }
    }
    .comment-input {
      position: fixed;
      bottom: 0rpx;
      width: 100%;
      // height: 150rpx;
      padding-bottom: 100rpx;
      background-color: #fff;
    }
  }
</style>
