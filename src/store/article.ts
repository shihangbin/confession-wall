import { defineStore } from 'pinia'
import {
  getArticleItem,
  getArticleList,
  postArticle,
  getArticleSearch,
  delArticle,
} from '@/service/modules/home'

export const useArticleStore = defineStore('article', {
  state: (): any => ({
    articleList: [],
    studyList: [],
    articleItem: {},
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
    async delArticleAction(id: string | number) {
      const res: any = await delArticle(id)
      return res
    },
  },
})
