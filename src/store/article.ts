import { defineStore } from 'pinia'
import {
  getArticleItem,
  getArticleList,
  postArticle,
  getArticleSearch,
  delArticle,
  getCommentList,
  postComment,
} from '@/service/modules/home'

export const useArticleStore = defineStore('article', {
  state: (): any => ({
    articleList: [],
    articleItem: {},
    commentList: {},
    studyList: [],
    studyItem: {},
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
    async getCommentListAction(articleId: number) {
      const commentList: any = await getCommentList(articleId)
      this.commentList = commentList.data
      return this.commentList
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
    async postCommentPublish(content: any, articleId: number) {
      const publishComment: any = await postComment(content, articleId)
      return publishComment
    },
    async delArticleAction(id: string | number) {
      const res: any = await delArticle(id)
      return res
    },
  },
})
