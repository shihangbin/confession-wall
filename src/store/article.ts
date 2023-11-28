import { defineStore } from 'pinia'
import {
  getArticleItem,
  getArticleList,
  postArticle,
  getArticleSearch,
  delArticle,
  getCommentList,
  postComment,
  postLikeArticle,
  getLikeArticle,
  delLikeArticle,
  getLikeListArticle,
} from '@/service/modules/home'

export const useArticleStore = defineStore('article', {
  state: (): any => ({
    articleList: [],
    articleItem: {},
    commentList: {},
    commentNum: [],
    studyList: [],
    studyItem: {},
    likeNum: [],
  }),

  actions: {
    async getArticleListAction(
      offset: number,
      size: number,
      assort: number,
      sort: string
    ) {
      const articleList: any = await getArticleList(offset, size, assort, sort)
      this.articleList = [...this.articleList, ...articleList.data]
      return this.articleList
    },
    async getStudyListAction(
      offset: number,
      size: number,
      assort: number,
      sort: string
    ) {
      const studyList: any = await getArticleList(offset, size, assort, sort)
      this.studyList = [...this.studyList, ...studyList.data]
      return this.studyList
    },
    async getArticleSearchAction(search: string) {
      const articleList: any = await getArticleSearch(search)
      this.articleList = [...this.articleList, ...articleList.data]
      return this.articleList
    },
    async getArticleItemAction(id: string) {
      const articleItem: any = await getArticleItem(id)
      this.articleItem = articleItem.data
      return this.articleItem
    },
    async getStudyItemAction(id: string) {
      const studyItem: any = await getArticleItem(id)
      this.studyItem = studyItem.data
      return this.studyItem
    },
    async postArticlePublish(content: any, assort: number) {
      const publishArticle: any = await postArticle(content, assort)
      return publishArticle
    },
    async postStudyPublish(content: any, assort: number) {
      const publishArticle: any = await postArticle(content, assort)
      return publishArticle
    },
    async getCommentListAction(articleId: number) {
      const commentList: any = await getCommentList(articleId)
      this.commentList = commentList.data
      this.commentNum.push(commentList.data.length)
      return this.commentList
    },
    async postCommentPublish(content: any, articleId: number) {
      const publishComment: any = await postComment(content, articleId)
      return publishComment
    },
    async delArticleAction(id: string | number) {
      const res: any = await delArticle(id)
      return res
    },
    async postLikeAction(articleId: number, userId: number) {
      const res: any = await getLikeArticle(articleId, userId)

      if (typeof res.data == 'undefined' || res.data == null) {
        await postLikeArticle(articleId)
        console.log('点赞成功')
        return true
      } else {
        await delLikeArticle(res.data?.id)
        console.log('取消点赞')
        return false
      }
    },
    async getLikeListAction(articleId: number) {
      const res: any = await getLikeListArticle(articleId)

      this.likeNum.push({
        id: articleId,
        is_like: false,
        like_num: res.data.length,
      })

      return this.likeNum
    },
  },
})
