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
    articleItem: {},
  }),

  actions: {
    async getArticleListAction(offset: number, size: number) {
      const articleList: any = await getArticleList(offset, size)
      this.articleList = [...this.articleList, ...articleList.data]
      return this.articleList
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
    async postArticlePublish(content: any) {
      const publishArticle: any = await postArticle(content)
      return publishArticle
    },
    async delArticleAction(id: string | number) {
      const res: any = await delArticle(id)
      return res
    },
  },
})
