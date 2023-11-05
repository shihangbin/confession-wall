import { defineStore } from 'pinia'
import { getArticleItem, getArticleList } from '@/service/modules/home'

export const useArticleStore = defineStore('article', {
  state: (): any => ({
    articleList: {},
    articleItem: {},
  }),

  actions: {
    async getArticleListAction() {
      const articleList: any = await getArticleList()
      this.articleList = articleList.data
    },

    async getArticleItemAction(id: string) {
      const articleItem: any = await getArticleItem(id)
      this.articleItem = articleItem.data
    },
  },
})
