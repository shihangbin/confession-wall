import { defineStore } from 'pinia'
import { getArticleItem } from '@/service/modules/home'

export const useArticleStore = defineStore('article', {
  state: (): any => ({
    articleData: {},
  }),

  actions: {
    async getArticleListAction(id: string) {
      const articleResult: any = await getArticleItem(id)
      this.articleData = articleResult.data
    },
  },
})
